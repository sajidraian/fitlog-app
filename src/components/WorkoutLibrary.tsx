"use client";

import React, { useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types";

interface WorkoutLibraryProps {
  initialWorkouts?: Workout[];
}

export default function WorkoutLibrary({ initialWorkouts = [] }: WorkoutLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "duration" | "calories">("name");

  const filtered = initialWorkouts.filter((workout: Workout) => {
    return (
      workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.equipment?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sorted = [...filtered].sort((a: Workout, b: Workout) => {
    if (sortBy === "duration") {
      return (b.duration ?? 0) - (a.duration ?? 0);
    }
    if (sortBy === "calories") {
      return (b.caloriesBurned ?? 0) - (a.caloriesBurned ?? 0);
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, tag, equipment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500"
        />
        <select
          value={sortBy}
          onChange={(e: any) => setSortBy(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500"
        >
          <option value="name">Sort by Name</option>
          <option value="duration">Sort by Duration</option>
          <option value="calories">Sort by Calories</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((workout: Workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}