"use client";

import React from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const { plan, saved } = usePlan();

  return (
    <header className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-emerald-400">FitLog</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-zinc-300 hover:text-white font-medium transition-colors text-sm"
          >
            Library
          </Link>

          <Link
            href="/my-plan"
            className="relative text-zinc-300 hover:text-white font-medium transition-colors text-sm flex items-center gap-1.5"
          >
            <span>My Plan</span>
            {plan.length > 0 && (
              <span className="bg-emerald-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {plan.length}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
            <span>Saved:</span>
            <span className="text-amber-400 font-bold">{saved?.length || 0}</span>
          </div>
        </nav>
      </div>
    </header>
  );
}