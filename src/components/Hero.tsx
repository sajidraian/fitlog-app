"use client";

import Image from "next/image";

export default function Hero() {
  const handleScrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const libraryElement = document.getElementById("library");
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#0c0d10] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-[#12141a] border border-[#1e222a] rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            <span className="text-[#ccff00] text-[11px] sm:text-xs font-black uppercase tracking-widest block">
              WORKOUT LIBRARY
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none font-sans">
              TRAIN WITH INTENT. <br />
              LOG EVERY SET.
            </h1>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>

            <div className="pt-2">
              <a
                href="#library"
                onClick={handleScrollToLibrary}
                className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-[#b5e600] active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <span>BROWSE WORKOUTS</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square">
              <Image
                src="/hero-workout.png"
                alt="FitLog Hero Banner"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}