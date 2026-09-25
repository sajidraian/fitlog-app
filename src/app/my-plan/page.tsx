"use client";

import React, { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types";

export default function MyPlanPage() {
  const { plan, toggleComplete } = usePlan();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "duration" | "calories">("name");

  const filteredPlan = plan.filter((workout: Workout) => {
    return (
      workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.muscleGroups?.some((m: string) =>
        m.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const sortedPlan = [...filteredPlan].sort((a: Workout, b: Workout) => {
    if (sortBy === "duration") {
      return (b.duration ?? 0) - (a.duration ?? 0);
    }
    if (sortBy === "calories") {
      return (b.caloriesBurned ?? 0) - (a.caloriesBurned ?? 0);
    }
    return a.name.localeCompare(b.name);
  });

  const totalCalories = plan.reduce(
    (acc: number, item: Workout) => acc + (item.caloriesBurned ?? 0),
    0
  );
  const totalDuration = plan.reduce(
    (acc: number, item: Workout) => acc + (item.duration ?? 0),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">My Workout Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
          <p className="text-zinc-400 text-sm">Total Workouts</p>
          <p className="text-2xl font-bold text-white">{plan.length} / 5</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
          <p className="text-zinc-400 text-sm">Est. Total Duration</p>
          <p className="text-2xl font-bold text-white">{totalDuration} mins</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
          <p className="text-zinc-400 text-sm">Total Calories Burned</p>
          <p className="text-2xl font-bold text-white">{totalCalories} kcal</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search plan workouts..."
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

      {sortedPlan.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <p className="text-zinc-400">No workouts found in your plan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPlan.map((workout: Workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
}