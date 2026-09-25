"use client";

import React from "react";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import { usePlan } from "@/context/PlanContext";

export default function Home() {
  const { workouts } = usePlan();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-wide">
          The Library
        </h1>
        <p className="text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <WorkoutLibrary initialWorkouts={workouts} />
    </main>
  );
}