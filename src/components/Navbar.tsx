"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="h-20 flex items-center justify-between">

       
          <Link
            href="/"
            onClick={closeMenu}
            className="text-xl font-black tracking-wider text-white"
          >
            FITLOG
          </Link>

        
          <nav className="hidden md:flex items-center gap-1 bg-[#121212] border border-zinc-800/80 p-1.5 rounded-full">
            <Link
              href="/"
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                isActive("/")
                  ? "bg-[#18181b] text-[#ccff00]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Workout
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

  
          <div className="hidden md:flex items-center gap-5">

          
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white transition-all"
            >
              <span>Plan</span>

              <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-black flex items-center justify-center text-[11px]">
                {plan.length}
              </span>
            </Link>

      
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white transition-all"
            >
              <span>Saved</span>

              <span className="w-6 h-6 rounded-full border border-[#ccff00] text-[#ccff00] font-black flex items-center justify-center text-[11px]">
                {saved.length}
              </span>
            </Link>
          </div>

    
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden w-10 h-10 rounded-xl border border-zinc-800 bg-[#121212] flex items-center justify-center text-white hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
          >
            {menuOpen ? (
              <span className="text-xl leading-none">✕</span>
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="block w-5 h-0.5 bg-current rounded-full" />
                <span className="block w-5 h-0.5 bg-current rounded-full" />
                <span className="block w-5 h-0.5 bg-current rounded-full" />
              </span>
            )}
          </button>
        </div>

       
        {menuOpen && (
          <div className="md:hidden pb-5">
            <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-3 space-y-2">

            
              <Link
                href="/"
                onClick={closeMenu}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive("/")
                    ? "bg-[#18181b] text-[#ccff00]"
                    : "text-zinc-300 hover:bg-[#18181b] hover:text-white"
                }`}
              >
                <span>Workout</span>

                {isActive("/") && (
                  <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
                )}
              </Link>

           
              <Link
                href="/my-plan"
                onClick={closeMenu}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive("/my-plan")
                    ? "bg-[#18181b] text-[#ccff00]"
                    : "text-zinc-300 hover:bg-[#18181b] hover:text-white"
                }`}
              >
                <span>My Plan</span>

                {isActive("/my-plan") && (
                  <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
                )}
              </Link>

              
              <div className="border-t border-zinc-800 pt-3 mt-3 grid grid-cols-2 gap-2">

                <Link
                  href="/my-plan"
                  onClick={closeMenu}
                  className="flex items-center justify-between bg-[#0a0a0a] border border-zinc-800 rounded-xl px-4 py-3"
                >
                  <span className="text-xs font-bold text-zinc-400">
                    Plan
                  </span>

                  <span className="w-6 h-6 rounded-full bg-[#ccff00] text-black font-black flex items-center justify-center text-[11px]">
                    {plan.length}
                  </span>
                </Link>

            
                <Link
                  href="/my-plan"
                  onClick={closeMenu}
                  className="flex items-center justify-between bg-[#0a0a0a] border border-zinc-800 rounded-xl px-4 py-3"
                >
                  <span className="text-xs font-bold text-zinc-400">
                    Saved
                  </span>

                  <span className="w-6 h-6 rounded-full border border-[#ccff00] text-[#ccff00] font-black flex items-center justify-center text-[11px]">
                    {saved.length}
                  </span>
                </Link>

              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}