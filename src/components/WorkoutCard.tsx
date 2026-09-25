"use client";

import Link from "next/link";
import { Workout } from "@/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="bg-[#121212] border border-zinc-800/80 hover:border-zinc-700 rounded-3xl overflow-hidden p-4 flex flex-col justify-between transition-all group shadow-xl h-full cursor-pointer">
        <div>
        
          <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-zinc-900 mb-4">
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {workout.muscleGroups?.map((group, idx) => (
              <span key={idx} className="bg-[#ccff00] text-black text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
                {group}
              </span>
            ))}
          </div>

         
          <h3 className="text-lg font-black uppercase tracking-wide text-white group-hover:text-[#ccff00] transition-colors">
            {workout.name}
          </h3>

       
          <p className="text-xs text-zinc-400 font-medium mt-0.5">{workout.equipment}</p>
        </div>

       
        <div className="mt-5 pt-3 border-t border-zinc-800/60">
          <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/60 border border-zinc-800/80 px-3.5 py-2.5 rounded-xl">
            <span>⏱ {workout.duration} min</span>
            <span>🔥 {workout.caloriesBurned} kcal</span>
            <span className="text-[#ccff00] font-bold">★ {workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}