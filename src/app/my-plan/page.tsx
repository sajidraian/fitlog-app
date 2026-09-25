"use client";

import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyPlanPage() {
  const { plan, removeFromPlan } = usePlan();


  const totalMinutes = plan.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = plan.reduce(
    (acc, curr) => acc + curr.caloriesBurned,
    0,
  );

  const handleMarkAsDone = (id: number, name: string) => {
    removeFromPlan(id);
    toast.success(`Completed & removed "${name}" from plan! 🎉`, {
      style: {
        background: "#1a1a1a",
        color: "#ccff00",
        border: "1px solid rgba(204, 255, 0, 0.3)",
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
   
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">
            MY PLAN
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#121212] border border-zinc-800/80 p-6 rounded-3xl">
          <div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
              Exercises
            </p>
            <p className="text-3xl font-black text-[#ccff00] mt-1">
              {plan.length}
            </p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
              Minutes
            </p>
            <p className="text-3xl font-black text-white mt-1">
              {totalMinutes}
            </p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
              Calories
            </p>
            <p className="text-3xl font-black text-white mt-1">
              {totalCalories}
            </p>
          </div>
        </div>

    
        <div className="space-y-4">
          {plan.length === 0 ? (
            <div className="text-center py-20 bg-[#121212] border border-zinc-800 rounded-3xl">
              <p className="text-zinc-400 text-xs font-bold uppercase">
                No lifts added to your plan yet. Add up to 5 lifts!
              </p>
              <Link
                href="/"
                className="inline-block mt-4 bg-[#ccff00] text-black font-extrabold text-xs uppercase px-6 py-3 rounded-full"
              >
                Browse Workouts
              </Link>
            </div>
          ) : (
            plan.map((workout) => (
              <div
                key={workout.id}
                className="bg-[#121212] border border-zinc-800/80 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl transition-all hover:border-zinc-700"
              >
        
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-24 h-20 sm:w-32 sm:h-24 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                      {workout.name}
                    </h3>
                    <p className="text-zinc-400 text-xs font-medium">
                      {workout.equipment}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-zinc-300 font-semibold pt-1">
                      <span className="flex items-center gap-1">
                        ⏱️ {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        🔥 {workout.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1 text-[#ccff00]">
                        ⭐ {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>

               
          
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="flex-1 md:flex-none bg-[#18181b] hover:bg-zinc-800/80 border border-zinc-700/60 text-white font-extrabold py-3 px-6 rounded-full text-xs uppercase tracking-wider text-center transition-all"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleMarkAsDone(workout.id, workout.name)}
                    className="flex-1 md:flex-none bg-[#ccff00] hover:bg-[#b3e600] text-black font-black py-3 px-6 rounded-full text-xs uppercase tracking-wider text-center transition-all shadow-lg shadow-[#ccff00]/10"
                  >
                    Mark as Done
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
