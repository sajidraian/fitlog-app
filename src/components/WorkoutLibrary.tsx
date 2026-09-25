"use client";

import { useState, useMemo } from "react";
import { Workout } from "@/types";
import WorkoutCard from "./WorkoutCard";

type SortOption = "duration" | "calories" | "rating";

interface LibraryProps {
  workouts: Workout[];
}

export default function WorkoutLibrary({ workouts }: LibraryProps) {
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  
  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "duration") return b.duration - a.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [workouts, sortBy]);

  return (
    <section id="library" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
  
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>


        <div className="flex items-center justify-center sm:justify-end gap-2 text-xs">
          <label htmlFor="sort-library" className="text-gray-400 font-bold uppercase tracking-wider">
            Sort By:
          </label>
          <select
            id="sort-library"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-[#12141a] border border-[#1e222a] text-white font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-[#ccff00] cursor-pointer"
          >
            <option value="duration">Duration (High to Low)</option>
            <option value="calories">Calories (High to Low)</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>

    </section>
  );
}