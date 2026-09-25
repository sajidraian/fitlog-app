"use client";

import Link from "next/link";
import { Workout } from "@/types";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workout/${workout.id}`} className="block">
      <div className="bg-[#121212] border border-zinc-800/80 rounded-3xl p-4 overflow-hidden shadow-xl transition-all hover:border-zinc-700 flex flex-col justify-between space-y-4 cursor-pointer">
        
    
        <div className="w-full h-52 bg-zinc-900 rounded-2xl overflow-hidden relative">
          <img 
            src={workout.image} 
            alt={workout.name} 
            className="w-full h-full object-cover object-center" 
          />
        </div>

   
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups && workout.muscleGroups.length > 0 ? (
            workout.muscleGroups.map((group, idx) => (
              <span key={idx} className="bg-[#ccff00] text-black text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
                {group}
              </span>
            ))
          ) : (
            <span className="bg-[#ccff00] text-black text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
              LEGS
            </span>
          )}
        </div>

    
        <div className="space-y-1">
          <h3 className="text-lg font-black uppercase tracking-tight text-white">{workout.name}</h3>
          <p className="text-zinc-400 text-xs font-medium">{workout.equipment}</p>
        </div>

      
        <div className="bg-[#18181b]/50 border border-zinc-800/80 rounded-2xl p-3.5 flex items-center justify-between text-xs font-semibold text-zinc-300">
          <span className="flex items-center gap-1.5">⏱️ {workout.duration} min</span>
          <span className="flex items-center gap-1.5">🔥 {workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1.5 text-zinc-300">⭐ {workout.rating || "4.9"}</span>
        </div>

      </div>
    </Link>
  );
}