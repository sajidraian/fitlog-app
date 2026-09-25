"use client";

export default function Hero() {
  const scrollToWorkouts = () => {
    const section = document.getElementById("workout-library");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-[#121212] border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
   
      <div className="max-w-xl space-y-4 z-10 text-center lg:text-left">
        <span className="text-[#ccff00] text-xs font-black uppercase tracking-widest inline-block">
          WORKOUT LIBRARY
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight sm:leading-none">
          TRAIN WITH INTENT. LOG EVERY SET.
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-medium max-w-md mx-auto lg:mx-0">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
        </p>
        <div className="pt-2">
          <button
            onClick={scrollToWorkouts}
            className="w-full sm:w-auto bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#ccff00]/10 cursor-pointer active:scale-95 flex items-center justify-center gap-2 mx-auto lg:mx-0"
          >
            <span>BROWSE WORKOUTS</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>

     
      <div className="w-full lg:w-[380px] h-56 sm:h-72 lg:h-80 relative flex-shrink-0 flex items-center justify-center">
        <img
          src="/banner.png"
          alt="Gym Workout Banner"
          className="w-full h-full object-contain opacity-95 drop-shadow-2xl"
        />
      </div>
    </section>
  );
}