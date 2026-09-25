"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/utils/api";
import { Workout } from "@/types";
import { usePlan } from "@/context/PlanContext";
import toast from "react-hot-toast";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkoutDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToPlan, saveWorkout, plan, saved } = usePlan();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const data = await getWorkoutById(id);
        if (!data) {
          notFound();
        } else {
          setWorkout(data);
        }
      } catch (err) {
        console.error("Error fetching workout detail:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0d10] flex items-center justify-center text-[#ccff00] font-black text-sm uppercase tracking-widest">
        Loading Workout...
      </div>
    );
  }

  if (!workout) {
    return null;
  }

  const isInPlan = plan.some((w) => w.id === workout.id);
  const isSaved = saved.some((w) => w.id === workout.id);

  const handleAddToPlan = () => {
    if (isInPlan) {
      toast.error("Already in today's plan!");
      return;
    }
    if (plan.length >= 5) {
      toast.error("Plan limit reached (Max 5 exercises)!");
      return;
    }
    addToPlan(workout);
    toast.success("Added to today's plan!");
  };

  const handleSaveWorkout = () => {
    if (isSaved) {
      toast.error("Already saved!");
      return;
    }
    saveWorkout(workout);
    toast.success("Saved for later!");
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Navigation Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#ccff00] transition-colors uppercase tracking-wider"
          >
            <span>←</span> Back to Library
          </Link>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#12141a] border border-[#1e222a] rounded-3xl p-6 sm:p-8 lg:p-10">
          
          {/* Left Side — Visual / Media */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative w-full aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-full min-h-[320px] rounded-2xl overflow-hidden border border-[#232730] bg-[#1a1d26]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Side — Details & Specs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header & Category Tags */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups.map((group, idx) => (
                  <span
                    key={idx}
                    className="bg-[#ccff00] text-black text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none">
                {workout.name}
              </h1>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {workout.description ||
                  "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
              </p>
            </div>

            {/* Key Specs Table / Panel */}
            <div className="bg-[#0a0a0c] border border-[#1e222a] rounded-2xl p-4 sm:p-5 space-y-3 text-xs">
              <h3 className="text-gray-400 font-black uppercase tracking-wider text-[10px] border-b border-[#1e222a] pb-2">
                KEY SPECIFICATIONS
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-500 font-bold uppercase text-[10px]">Equipment</p>
                  <p className="font-extrabold text-white mt-0.5">{workout.equipment}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-bold uppercase text-[10px]">Difficulty</p>
                  <p className="font-extrabold text-[#ccff00] mt-0.5">{workout.difficulty || "Intermediate"}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-bold uppercase text-[10px]">Sets</p>
                  <p className="font-extrabold text-white mt-0.5">{workout.sets || 4}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-bold uppercase text-[10px]">Reps</p>
                  <p className="font-extrabold text-white mt-0.5">{workout.reps || "6-8"}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-bold uppercase text-[10px]">Duration</p>
                  <p className="font-extrabold text-white mt-0.5">⏱ {workout.duration} min</p>
                </div>
                <div>
                  <p className="text-gray-500 font-bold uppercase text-[10px]">Calories</p>
                  <p className="font-extrabold text-white mt-0.5">🔥 {workout.caloriesBurned} kcal</p>
                </div>
                <div>
                  <p className="text-gray-500 font-bold uppercase text-[10px]">Rating</p>
                  <p className="font-extrabold text-white mt-0.5">⭐ {workout.rating}</p>
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="space-y-3">
              <h3 className="font-black text-sm uppercase tracking-wider text-white">
                INSTRUCTIONS
              </h3>
              
              <ol className="space-y-2.5 text-xs text-gray-300">
                {(
                  workout.instructions || [
                    "Lie flat on the bench, set eyes under the bar, plant feet firmly, and grip slightly wider than shoulder-width.",
                    "Unrack with tight upper back, lower the bar smoothly to mid-chest while tucking elbows at roughly 45 degrees.",
                    "Press straight up explosively, driving through the floor and squeezing chest at the top lockout.",
                    "Maintain arch and body tension across all reps before racking safely."
                  ]
                ).map((step, index) => (
                  <li key={index} className="flex gap-3 bg-[#0a0a0c]/50 p-3 rounded-xl border border-[#1e222a]">
                    <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black font-black text-[10px] flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToPlan}
                disabled={isInPlan}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                  isInPlan
                    ? "bg-[#1f260a] text-[#ccff00] border border-[#ccff00]/40 cursor-not-allowed"
                    : "bg-[#ccff00] text-black hover:bg-[#b5e600] active:scale-95 shadow-lg"
                }`}
              >
                <span>➕</span>
                <span>{isInPlan ? "Added to Plan" : "Add to today's plan"}</span>
              </button>

              <button
                onClick={handleSaveWorkout}
                disabled={isSaved}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-wider transition-all border ${
                  isSaved
                    ? "border-[#ccff00]/40 text-[#ccff00] bg-[#1a1d26] cursor-not-allowed"
                    : "border-[#2a2f3d] text-white hover:border-gray-500 bg-[#12141a] active:scale-95"
                }`}
              >
                <span>🔖</span>
                <span>{isSaved ? "Saved" : "Save for later"}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}