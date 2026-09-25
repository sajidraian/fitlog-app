"use client";

import { useState, useEffect } from "react";
import { getAllWorkouts } from "@/utils/api";
import { Workout } from "@/types";
import WorkoutCard from "@/components/WorkoutCard";

type SortOption = "duration" | "calories" | "rating";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredWorkouts = workouts
    .filter((workout) => {
      const query = searchQuery.toLowerCase().trim();

      if (!query) return true;

      const nameMatch = workout.name.toLowerCase().includes(query);

      const tagMatch = workout.muscleGroups?.some((group) =>
        group.toLowerCase().includes(query)
      );

      return nameMatch || tagMatch;
    })
    .sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });

  return (
    <section id="workout-library" className="space-y-6 pt-6">

      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              THE LIBRARY
            </h2>

            <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-medium">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

        
          <div className="w-full lg:w-72">
            <input
              type="text"
              placeholder="Search by name or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-zinc-800 focus:border-[#ccff00] px-4 py-2.5 rounded-xl text-xs text-white placeholder-zinc-500 outline-none transition-all"
            />
          </div>
        </div>

   
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-zinc-800/70 pt-4">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
            {filteredWorkouts.length}{" "}
            {filteredWorkouts.length === 1 ? "Workout" : "Workouts"} Found
          </p>

          <div className="flex items-center gap-3">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
              Sort By
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as SortOption)
                }
                className="appearance-none bg-[#121212] border border-zinc-800 hover:border-zinc-700 focus:border-[#ccff00] text-white text-xs font-bold px-4 py-2.5 pr-9 rounded-xl outline-none cursor-pointer transition-all"
                aria-label="Sort workouts"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[10px]">
                ▼
              </span>
            </div>
          </div>
        </div>
      </div>

 
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>

          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
            Loading workouts...
          </p>
        </div>
      ) : filteredWorkouts.length === 0 ? (
       
        <div className="text-center py-16 bg-[#121212] border border-zinc-800 rounded-2xl">
          <p className="text-zinc-400 text-xs font-bold uppercase">
            No workouts found matching "{searchQuery}"
          </p>
        </div>
      ) : (
     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}