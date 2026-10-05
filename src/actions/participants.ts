"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface RegisterState {
  success?: boolean;
  message?: string;
  dorsal?: string;
  error?: string;
}

export async function registerParticipant(
  _prevState: RegisterState | null,
  formData: FormData
): Promise<RegisterState> {
  const nombre = formData.get("nombre")?.toString().trim();
  // Normaliza cédula a mayúsculas y sin espacios para evitar duplicados por formato
  const cedula = formData.get("cedula")?.toString().trim().toUpperCase().replace(/\s+/g, "");
  const telefono = formData.get("telefono")?.toString().trim();
  const genero = formData.get("genero")?.toString().trim();
  const terminosAceptados = formData.get("terminosAceptados") === "on";

  if (!nombre || !cedula || !telefono || !genero) {
    return { error: "Todos los campos del formulario son obligatorios." };
  }

  if (!["Femenino", "Masculino"].includes(genero)) {
    return { error: "Por favor selecciona una opción de género válida." };
  }

  if (nombre.length < 3 || nombre.length > 120) {
    return { error: "El nombre debe contener entre 3 y 120 caracteres." };
  }

  if (cedula.length < 5 || cedula.length > 20) {
    return { error: "La cédula debe contener entre 5 y 20 caracteres válidos." };
  }

  if (telefono.length < 7 || telefono.length > 25) {
    return { error: "El número de teléfono debe contener entre 7 y 25 caracteres." };
  }

  if (!terminosAceptados) {
    return { error: "Debes aceptar las bases legales para poder participar." };
  }

  try {
    // Genera el número de dorsal atómico de 4 dígitos directamente en PostgreSQL
    const dorsalResult = await prisma.$queryRaw<[{ dorsal: string }]>`
      SELECT lpad(nextval('participant_dorsal_seq')::text, 4, '0') AS dorsal;
    `;
    const dorsal = dorsalResult[0].dorsal;

    const participant = await prisma.participant.create({
      data: {
        dorsal,
        nombre,
        cedula,
        telefono,
        genero,
        terminosAceptados: true,
      },
      select: {
        dorsal: true,
      },
    });

    return {
      success: true,
      dorsal: participant.dorsal,
      message: "¡Inscripción exitosa! Tu cupo ha sido reservado para la Caminata 10K.",
    };
  } catch (error) {
    // Código P2002 en Prisma indica violación de restricción única
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const targets = error.meta?.target as string[] | string | undefined;
      const targetStr = Array.isArray(targets) ? targets.join(",") : (targets || "");
      if (targetStr.includes("cedula")) {
        return {
          error: "Esta cédula de identidad ya se encuentra registrada en el evento.",
        };
      }
      if (targetStr.includes("dorsal")) {
        // En caso excepcional de desajuste manual de la secuencia, se sincroniza y reintenta
        try {
          await prisma.$executeRawUnsafe(`
            SELECT setval('participant_dorsal_seq', COALESCE((SELECT MAX(CAST(dorsal AS INTEGER)) FROM "Participant"), 0) + 1, false);
          `);
          const retryResult = await prisma.$queryRaw<[{ dorsal: string }]>`
            SELECT lpad(nextval('participant_dorsal_seq')::text, 4, '0') AS dorsal;
          `;
          const retried = await prisma.participant.create({
            data: {
              dorsal: retryResult[0].dorsal,
              nombre,
              cedula,
              telefono,
              genero,
              terminosAceptados: true,
            },
            select: { dorsal: true },
          });
          return {
            success: true,
            dorsal: retried.dorsal,
            message: "¡Inscripción exitosa! Tu cupo ha sido reservado para la Caminata 10K.",
          };
        } catch {
          return { error: "No se pudo asignar el número de dorsal. Intenta nuevamente." };
        }
      }
      return {
        error: "Ya existe un registro con estos datos. Intenta nuevamente.",
      };
    }

    return {
      error: "Ocurrió un error inesperado al procesar tu registro. Intenta nuevamente.",
    };
  }
}
