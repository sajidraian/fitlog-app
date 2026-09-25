"use client";

import React from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const {
    plan,
    addToPlan,
    removeFromPlan,
    saved,
    saveWorkout,
    removeSaved,
    toggleComplete,
  } = usePlan();

  const isInPlan = plan.some(
    (item: Workout) => String(item.id) === String(workout.id)
  );

  const isSaved = saved.some(
    (item: Workout) => String(item.id) === String(workout.id)
  );

  const isPlanFull = plan.length >= 5 && !isInPlan;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white line-clamp-1">
            {workout.name}
          </h3>
          <button
            onClick={() =>
              isSaved ? removeSaved(workout.id) : saveWorkout(workout)
            }
            className="text-zinc-400 hover:text-amber-400 transition-colors p-1"
            title={isSaved ? "Remove from saved" : "Save workout"}
          >
            {isSaved ? "★" : "☆"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {workout.muscleGroups?.map((group: string, idx: number) => (
            <span
              key={idx}
              className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20"
            >
              {group}
            </span>
          ))}
          {workout.equipment && (
            <span className="bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded-full border border-zinc-700">
              {workout.equipment}
            </span>
          )}
        </div>

        {workout.description && (
          <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
            {workout.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 mb-4 bg-zinc-800/40 p-3 rounded-xl border border-zinc-800/80">
          <div>
            <span>Duration: </span>
            <span className="text-white font-medium">
              {workout.duration ? `${workout.duration}m` : "N/A"}
            </span>
          </div>
          <div>
            <span>Calories: </span>
            <span className="text-white font-medium">
              {workout.caloriesBurned ? `${workout.caloriesBurned} kcal` : "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
        <Link
          href={`/workout/${workout.id}`}
          className="flex-1 text-center bg-zinc-800 text-zinc-200 text-sm font-medium py-2 rounded-xl hover:bg-zinc-700 transition-colors"
        >
          View Details
        </Link>

        {isInPlan ? (
          <>
            <button
              onClick={() => toggleComplete(workout.id)}
              className={`text-xs px-3 py-2 rounded-xl font-medium transition-colors ${
                workout.completed
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {workout.completed ? "Done ✓" : "Mark Done"}
            </button>
            <button
              onClick={() => removeFromPlan(workout.id)}
              className="bg-red-500/10 text-red-400 text-sm px-3 py-2 rounded-xl hover:bg-red-500/20 transition-colors border border-red-500/20"
            >
              Remove
            </button>
          </>
        ) : (
          <button
            onClick={() => addToPlan(workout)}
            disabled={isPlanFull}
            className={`text-sm font-medium px-4 py-2 rounded-xl transition-colors ${
              isPlanFull
                ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                : "bg-emerald-500 text-black hover:bg-emerald-400"
            }`}
          >
            {isPlanFull ? "Cap Reached (5/5)" : "Add to Plan"}
          </button>
        )}
      </div>
    </div>
  );
}