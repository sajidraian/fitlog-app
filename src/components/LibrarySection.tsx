"use client";

import { useState, useEffect } from "react";
import { getAllWorkouts } from "@/utils/api";
import { Workout } from "@/types";
import WorkoutCard from "@/components/WorkoutCard";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredWorkouts = workouts.filter((w) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = w.name.toLowerCase().includes(query);
    const tagMatch = w.muscleGroups?.some((group) => group.toLowerCase().includes(query));
    return nameMatch || tagMatch;
  });

  return (
    <section id="workout-library" className="space-y-6 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">THE LIBRARY</h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-medium">Twelve lifts covering every major muscle group.</p>
        </div>

        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search by name or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121212] border border-zinc-800 focus:border-[#ccff00] px-4 py-2.5 rounded-xl text-xs text-white placeholder-zinc-500 outline-none transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredWorkouts.length === 0 ? (
        <div className="text-center py-16 bg-[#121212] border border-zinc-800 rounded-2xl">
          <p className="text-zinc-400 text-xs font-bold uppercase">No workouts found matching "{searchQuery}"</p>
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