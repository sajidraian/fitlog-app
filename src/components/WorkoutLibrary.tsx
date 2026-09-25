"use client";

import { useState, useMemo } from "react";
import WorkoutCard from "./WorkoutCard";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets?: number;
  reps?: number;
  rating: number;
  description: string;
  instructions: string[];
}

export default function WorkoutLibrary({ workouts }: { workouts: Workout[] }) {
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [workouts, sortBy]);

  return (
    <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
     
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-medium">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sort By:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#121212] border border-zinc-800 text-white text-xs font-extrabold uppercase tracking-wider px-4 py-2.5 rounded-xl appearance-none pr-10 focus:outline-none focus:border-[#ccff00] transition-all cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={{
              ...workout,
              sets: workout.sets ?? 3,
              reps: workout.reps?.toString() ?? "10",
            }}
          />
        ))}
      </div>
    </section>
  );
}