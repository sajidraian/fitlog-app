"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#07080a] border-b border-[#181a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        

        <Link
          href="/"
          onClick={closeMenu}
          className="font-black text-xl tracking-wider text-white uppercase font-sans"
        >
          FITLOG
        </Link>

       
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              pathname === "/"
                ? "bg-[#1c2208] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              pathname === "/my-plan"
                ? "bg-[#1c2208] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

     
        <div className="hidden md:flex items-center gap-5 text-xs font-bold">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black text-[11px] font-extrabold flex items-center justify-center">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full border border-gray-600 text-gray-300 text-[11px] font-bold flex items-center justify-center">
              {saved.length}
            </span>
          </Link>
        </div>

        <div className="flex md:hidden items-center">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
            className="text-gray-300 hover:text-white p-2 rounded-lg bg-[#12141a] border border-[#1e222a]"
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

   
      {isOpen && (
        <div className="md:hidden bg-[#0c0d10] border-b border-[#1e222a] px-4 pt-3 pb-5 space-y-4">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={closeMenu}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                pathname === "/"
                  ? "bg-[#1c2208] text-[#ccff00]"
                  : "text-gray-300 hover:bg-[#12141a]"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={closeMenu}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                pathname === "/my-plan"
                  ? "bg-[#1c2208] text-[#ccff00]"
                  : "text-gray-300 hover:bg-[#12141a]"
              }`}
            >
              My Plan
            </Link>
          </nav>

          <div className="pt-3 border-t border-[#1e222a] flex items-center justify-around text-xs font-bold">
            <Link href="/my-plan" onClick={closeMenu} className="flex items-center gap-2 text-gray-300">
              <span>Plan</span>
              <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black text-[11px] font-extrabold flex items-center justify-center">
                {plan.length}
              </span>
            </Link>

            <Link href="/my-plan" onClick={closeMenu} className="flex items-center gap-2 text-gray-300">
              <span>Saved</span>
              <span className="w-5 h-5 rounded-full border border-gray-600 text-gray-300 text-[11px] font-bold flex items-center justify-center">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}