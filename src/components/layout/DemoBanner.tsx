import React from "react";
import { Info } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="bg-[#F6EFE6] border-b border-[#E8DEC0]/80 text-stone-700 text-xs py-2 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#C85A32] shrink-0" />
          <span>
            <strong className="font-semibold text-stone-900">Academic Demo:</strong>{" "}
            Sample sellers, mock menus, and simulated orders. Food images are
            illustrative stock photography and not genuine kitchen submissions.
          </span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-medium text-stone-500 bg-white/70 px-2 py-0.5 rounded border border-[#E0D5C7]">
          College Showcase Prototype
        </span>
      </div>
    </div>
  );
}
