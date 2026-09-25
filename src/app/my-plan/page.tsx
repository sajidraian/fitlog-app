"use client";

import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved } = usePlan();
  
  const [activeTab, setActiveTab] = useState<"todays" | "saved">("todays");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  const totalMinutes = plan.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalCalories = plan.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);

  const currentItems = activeTab === "todays" ? plan : saved;

  const sortedItems = [...currentItems].sort((a, b) => {
    if (sortBy === "duration") {
      return (b.duration || 0) - (a.duration || 0);
    } else if (sortBy === "calories") {
      return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    } else if (sortBy === "rating") {
      return (b.rating || 4.9) - (a.rating || 4.9);
    }
    return 0;
  });

  const handleMarkAsDone = (id: number, name: string) => {
    if (activeTab === "todays") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }

    toast.success(`Completed & removed "${name}" from ${activeTab === "todays" ? "plan" : "saved"}! 🎉`, {
      style: { background: "#1a1a1a", color: "#ccff00", border: "1px solid rgba(204, 255, 0, 0.3)" },
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
    
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">MY PLAN</h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">Cap of five lifts for today. Finish them, then load more.</p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#121212] border border-zinc-800/80 p-6 rounded-3xl">
          <div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Exercises</p>
            <p className="text-3xl font-black text-[#ccff00] mt-1">{plan.length}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Minutes</p>
            <p className="text-3xl font-black text-white mt-1">{totalMinutes}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Calories</p>
            <p className="text-3xl font-black text-white mt-1">{totalCalories}</p>
          </div>
        </div>

     
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          
          <div className="bg-[#121212] border border-zinc-800/80 p-1 rounded-2xl flex items-center">
            <button
              onClick={() => setActiveTab("todays")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "todays"
                  ? "bg-[#18181b] text-white border border-zinc-700/50 shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "saved"
                  ? "bg-[#18181b] text-white border border-zinc-700/50 shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
                className="bg-[#121212] border border-zinc-800 text-white text-xs font-extrabold px-4 py-2.5 pr-8 rounded-xl outline-none focus:border-[#ccff00] cursor-pointer appearance-none"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-xs">▼</span>
            </div>
          </div>
        </div>

     
        {sortedItems.length === 0 ? (
          <div className="border border-dashed border-zinc-800/80 bg-[#121212]/30 rounded-3xl py-28 px-4 text-center space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-xl font-black uppercase tracking-tight text-white">NOTHING HERE YET</h3>
              <p className="text-zinc-400 text-xs font-medium">
                {activeTab === "todays" ? "Browse the library and add a lift to get today moving." : "No saved workouts found."}
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-block bg-[#ccff00] hover:bg-[#b3e600] text-black font-black text-xs uppercase px-8 py-3.5 rounded-full shadow-lg shadow-[#ccff00]/10 transition-all"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedItems.map((workout) => (
              <div 
                key={workout.id} 
                className="bg-[#121212] border border-zinc-800/80 rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl transition-all hover:border-zinc-700"
              >
          
                <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
                  <div className="w-24 h-16 sm:w-32 sm:h-20 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0">
                    <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">{workout.name}</h3>
                    <p className="text-zinc-400 text-xs font-medium">{workout.equipment}</p>
                    <div className="flex items-center gap-4 text-xs text-zinc-300 font-semibold pt-1">
                      <span className="flex items-center gap-1">⏱️ {workout.duration} min</span>
                      <span className="flex items-center gap-1">🔥 {workout.caloriesBurned} kcal</span>
                      <span className="flex items-center gap-1 text-zinc-300">⭐ {workout.rating || "4.9"}</span>
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
                    {activeTab === "todays" ? "Mark as Done" : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}