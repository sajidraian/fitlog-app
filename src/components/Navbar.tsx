"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [isOpen, setIsOpen] = useState(false);

  const isWorkoutsActive = pathname === "/";
  const isMyPlanActive = pathname === "/my-plan";
  const isSavedActive = pathname === "/saved";

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
      
        <Link href="/" className="text-xl font-black tracking-widest text-white uppercase">
          FITLOG
        </Link>

        <nav className="hidden md:flex items-center gap-3 bg-[#121212] border border-zinc-800/80 px-4 py-2 rounded-full">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
              isWorkoutsActive
                ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/10"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
              isMyPlanActive
                ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/10"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="hidden sm:flex items-center gap-2 bg-[#121212] border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-zinc-300 transition-all"
          >
            <span>Plan</span>
            <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black flex items-center justify-center text-[11px] font-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/saved"
            className="hidden sm:flex items-center gap-2 bg-[#121212] border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-zinc-300 transition-all"
          >
            <span>Saved</span>
            <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center justify-center text-[11px] font-black">
              {saved.length}
            </span>
          </Link>

      
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#121212] border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

     
      {isOpen && (
        <div className="md:hidden bg-[#121212] border-b border-zinc-800 px-4 pt-3 pb-5 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider ${
              isWorkoutsActive ? "bg-[#ccff00] text-black" : "text-zinc-300 hover:bg-zinc-800/60"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setIsOpen(false)}
            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider ${
              isMyPlanActive ? "bg-[#ccff00] text-black" : "text-zinc-300 hover:bg-zinc-800/60"
            }`}
          >
            <span>My Plan</span>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isMyPlanActive ? "bg-black text-[#ccff00]" : "bg-zinc-800 text-zinc-300"}`}>
              {plan.length}
            </span>
          </Link>
          <Link
            href="/saved"
            onClick={() => setIsOpen(false)}
            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider ${
              isSavedActive ? "bg-[#ccff00] text-black" : "text-zinc-300 hover:bg-zinc-800/60"
            }`}
          >
            <span>Saved Workouts</span>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isSavedActive ? "bg-black text-[#ccff00]" : "bg-zinc-800 text-zinc-300"}`}>
              {saved.length}
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}