"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
    
        <Link href="/" className="text-xl font-black tracking-wider text-white">
          FITLOG
        </Link>

      
        <nav className="flex items-center gap-1 bg-[#121212] border border-zinc-800/80 p-1.5 rounded-full">
          <Link
            href="/"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              isActive("/")
                ? "bg-[#18181b] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              isActive("/my-plan")
                ? "bg-[#18181b] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

  
        <div className="flex items-center gap-6">
          
        
          <Link href="/my-plan" className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white transition-all">
            <span>Plan</span>
            <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-black flex items-center justify-center text-[11px]">
              {plan.length}
            </span>
          </Link>

       
          <Link href="/my-plan" className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white transition-all">
            <span>Saved</span>
            <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-black flex items-center justify-center text-[11px]">
              {saved.length}
            </span>
          </Link>

        </div>

      </div>
    </header>
  );
}