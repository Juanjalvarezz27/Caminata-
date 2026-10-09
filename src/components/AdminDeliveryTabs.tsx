"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface AdminDeliveryTabsProps {
  currentStatus: string;
  totalCount: number;
  pendingCount: number;
  deliveredCount: number;
}

export default function AdminDeliveryTabs({
  currentStatus = "all",
  totalCount,
  pendingCount,
  deliveredCount,
}: AdminDeliveryTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (status: "all" | "pendientes" | "entregados") => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    startTransition(() => {
      const target = params.toString() ? `/admin?${params.toString()}` : "/admin";
      router.push(target);
    });
  };

  const tabs = [
    {
      id: "all",
      label: "Todos",
      count: totalCount,
      activeColor: "bg-[#0F0F11] text-white",
      badgeColor: "bg-white/20 text-white",
    },
    {
      id: "pendientes",
      label: "No entregados",
      count: pendingCount,
      activeColor: "bg-amber-600 text-white shadow-2xs",
      badgeColor: "bg-white/25 text-white",
    },
    {
      id: "entregados",
      label: "Entregados",
      count: deliveredCount,
      activeColor: "bg-emerald-600 text-white shadow-2xs",
      badgeColor: "bg-white/25 text-white",
    },
  ];

  return (
    <div className={`flex items-center gap-1 p-1 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8] ${isPending ? "opacity-70" : ""}`}>
      {tabs.map((tab) => {
        const isActive = currentStatus === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id as "all" | "pendientes" | "entregados")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none ${
              isActive
                ? tab.activeColor
                : "text-[#5C5C64] hover:text-[#0F0F11] hover:bg-white"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-extrabold ${
                isActive
                  ? tab.badgeColor
                  : "bg-[#EFECE6] text-[#4A4A52]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
