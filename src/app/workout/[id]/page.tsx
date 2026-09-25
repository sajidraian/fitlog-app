"use client";

import { useState, useEffect, use } from "react";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import { Workout } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";

type Params = Promise<{ id: string }>;

export default function WorkoutDetails({ params }: { params: Params }) {
  const { id } = use(params);
  const { plan, saved, addToPlan, addToSaved, removeFromPlan, removeFromSaved } = usePlan();
  
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-[#0a0a0a]">
        <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="text-center py-32 bg-[#0a0a0a] text-white">
        <h2 className="text-2xl font-bold mb-4">Workout Not Found</h2>
        <Link href="/" className="text-[#ccff00] underline text-sm">Back to Home</Link>
      </div>
    );
  }

  const isAlreadyInPlan = plan.some((item) => item.id === workout.id);
  const isPlanFull = plan.length >= 5 && !isAlreadyInPlan;
  const isAlreadySaved = saved.some((item) => item.id === workout.id);

  const handlePlanToggle = () => {
    if (isAlreadyInPlan) {
      removeFromPlan(workout.id);
      toast.error(`Removed "${workout.name}" from plan`, {
        style: { background: "#1a1a1a", color: "#f87171", border: "1px solid rgba(248, 113, 113, 0.3)" },
      });
    } else {
      if (isPlanFull) {
        toast.error("Today's plan is full! (Max 5 lifts)", {
          style: { background: "#1a1a1a", color: "#f87171", border: "1px solid rgba(248, 113, 113, 0.3)" },
        });
        return;
      }
      addToPlan(workout);
      toast.success(`Added "${workout.name}" to plan! 💪`, {
        style: { background: "#1a1a1a", color: "#ccff00", border: "1px solid rgba(204, 255, 0, 0.3)" },
      });
    }
  };

  const handleSaveToggle = () => {
    if (isAlreadySaved) {
      removeFromSaved(workout.id);
      toast.error(`Removed "${workout.name}" from saved`, {
        style: { background: "#1a1a1a", color: "#f87171", border: "1px solid rgba(248, 113, 113, 0.3)" },
      });
    } else {
      addToSaved(workout);
      toast.success(`Saved "${workout.name}" successfully!`, {
        style: { background: "#1a1a1a", color: "#ccff00", border: "1px solid rgba(204, 255, 0, 0.3)" },
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ব্যাক বা লিঙ্ক */}
        <Link href="/" className="text-xs font-bold text-zinc-400 hover:text-white mb-8 inline-block">
          ← BACK TO LIBRARY
        </Link>

        {/* মেইন ডিটেইলস কার্ড কন্টেইনার */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start bg-[#121212] border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* বামপাশের ইমেজ সেকশন */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 h-[380px] sm:h-[480px]">
            <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
          </div>

          {/* ডানপাশের ইনফো ও ডিটেইলস সেকশন */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">{workout.name}</h1>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{workout.description}</p>
              
              {/* মাসল গ্রুপ ট্যাগ (নিয়ন গ্রীন ব্যাকগ্রাউন্ড) */}
              <div className="flex flex-wrap gap-2 mt-4">
                {workout.muscleGroups.map((group, idx) => (
                  <span key={idx} className="bg-[#ccff00] text-black text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-md">
                    {group}
                  </span>
                ))}
              </div>
            </div>

            {/* মেটিক ডাটা টেবিল (স্ক্রিনশটের স্টাইল অনুযায়ী) */}
            <div className="bg-[#18181b] border border-zinc-800/80 rounded-2xl overflow-hidden text-xs">
              <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase tracking-wider">Equipment</span>
                <span className="font-extrabold text-white text-right">{workout.equipment}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase tracking-wider">Difficulty</span>
                <span className="font-extrabold text-white uppercase text-right">{workout.difficulty}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase tracking-wider">Sets</span>
                <span className="font-extrabold text-white text-right">{workout.sets}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase tracking-wider">Reps</span>
                <span className="font-extrabold text-white text-right">{workout.reps}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase tracking-wider">Duration</span>
                <span className="font-extrabold text-white text-right">{workout.duration} min</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase tracking-wider">Calories</span>
                <span className="font-extrabold text-white text-right">{workout.caloriesBurned} kcal</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3">
                <span className="text-zinc-500 font-bold uppercase tracking-wider">Rating</span>
                <span className="font-extrabold text-[#ccff00] text-right">{workout.rating}</span>
              </div>
            </div>

            {/* ইন্সট্রাকশনস সেকশন */}
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300">Instructions</h3>
              <ol className="space-y-1.5 text-xs text-zinc-400 list-decimal list-inside leading-relaxed">
                {workout.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            {/* অ্যাকশন বাটন (নিয়ন গ্রীন এবং সেভ বাটন) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handlePlanToggle}
                disabled={isPlanFull}
                className={`flex-1 font-extrabold py-3.5 px-5 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 ${
                  isPlanFull
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
                    : isAlreadyInPlan
                    ? "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                    : "bg-[#ccff00] text-black hover:bg-[#b3e600]"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  {isAlreadyInPlan ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  ) : (
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  )}
                </svg>
                <span>{isPlanFull ? "Plan is full (Max 5)" : isAlreadyInPlan ? "Remove from plan" : "Add to today's plan"}</span>
              </button>

              <button
                onClick={handleSaveToggle}
                className={`font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 ${
                  isAlreadySaved
                    ? "bg-red-500/10 border border-red-500/30 text-red-400"
                    : "bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700"
                }`}
              >
                <svg className="w-4 h-4" fill={isAlreadySaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>{isAlreadySaved ? "Saved" : "Save for later"}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}