"use client";

import React from "react";
import { useParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types";
import Link from "next/link";

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = params?.id;
  const { workouts, addToPlan, plan, removeFromPlan } = usePlan();

  const workout = workouts.find(
    (item: Workout) => String(item.id) === String(id)
  );

  if (!workout) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Workout Not Found</h2>
        <Link
          href="/"
          className="text-emerald-400 hover:underline"
        >
          ← Back to Workouts
        </Link>
      </div>
    );
  }

  const isInPlan = plan.some((item: Workout) => String(item.id) === String(workout.id));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/"
        className="inline-flex items-center text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        ← Back to Workouts
      </Link>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {workout.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups?.map((group: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-500/20"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              isInPlan ? removeFromPlan(workout.id) : addToPlan(workout)
            }
            className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${
              isInPlan
                ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                : "bg-emerald-500 text-black hover:bg-emerald-400"
            }`}
          >
            {isInPlan ? "Remove from Plan" : "Add to Plan"}
          </button>
        </div>

        {workout.description && (
          <p className="text-zinc-300 mb-8 text-lg leading-relaxed">
            {workout.description}
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-800">
            <p className="text-zinc-400 text-sm">Difficulty</p>
            <p className="text-white font-semibold capitalize">
              {workout.difficulty || "N/A"}
            </p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-800">
            <p className="text-zinc-400 text-sm">Target Sets</p>
            <p className="text-white font-semibold">
              {workout.sets || "N/A"}
            </p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-800">
            <p className="text-zinc-400 text-sm">Target Reps</p>
            <p className="text-white font-semibold">
              {workout.reps || "N/A"}
            </p>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-800">
            <p className="text-zinc-400 text-sm">Est. Duration</p>
            <p className="text-white font-semibold">
              {workout.duration ? `${workout.duration} mins` : "N/A"}
            </p>
          </div>
        </div>

        {workout.instructions && workout.instructions.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Instructions</h2>
            <ol className="space-y-3">
              {workout.instructions.map((step: string, index: number) => (
                <li
                  key={index}
                  className="flex gap-4 text-zinc-300 bg-zinc-800/30 p-4 rounded-xl border border-zinc-800/50"
                >
                  <span className="font-bold text-emerald-400">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}