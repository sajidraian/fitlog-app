"use client";

import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types";
import { usePlan } from "@/context/PlanContext";
import toast from "react-hot-toast";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, saveWorkout, removeFromPlan, removeSaved } = usePlan();

  const isInPlan = plan.some((item) => String(item.id) === String(workout.id));
  const isSaved = saved.some((item) => String(item.id) === String(workout.id));
  
  
  const isPlanFull = plan.length >= 5;

  const handlePlanToggle = () => {
    if (isInPlan) {
      removeFromPlan(workout.id);
      toast.success("Removed from today's plan");
    } else {
      if (isPlanFull) {
        toast.error("Plan limit reached! Maximum 5 workouts allowed.");
        return;
      }
      addToPlan(workout);
      toast.success("Added to today's plan");
    }
  };

  const handleSaveToggle = () => {
    if (isSaved) {
      removeSaved(workout.id);
      toast.success("Removed from saved list");
    } else {
      saveWorkout(workout);
      toast.success("Saved to your list");
    }
  };

  return (
    <div className="bg-[#12141a] border border-[#1e222a] rounded-2xl p-4 flex flex-col justify-between hover:border-[#ccff00]/40 transition-all">
      <div className="space-y-3">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#1a1d26]">
          <Image src={workout.image} alt={workout.name} fill className="object-cover" />
        </div>

        <div>
          <h3 className="font-black text-sm uppercase text-white tracking-tight">{workout.name}</h3>
          <p className="text-gray-400 text-xs">{workout.equipment}</p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
        </div>
      </div>

      <div className="pt-4 space-y-2">
        <div className="flex items-center gap-2">
        
          <button
            onClick={handlePlanToggle}
            disabled={!isInPlan && isPlanFull}
            className={`flex-1 py-2 rounded-xl text-xs font-black uppercase transition-all ${
              isInPlan
                ? "bg-[#ccff00] text-black"
                : isPlanFull
                ? "bg-gray-800 text-gray-500 cursor-not-allowed opacity-60"
                : "bg-[#1c2208] text-[#ccff00] border border-[#ccff00]/30 hover:bg-[#ccff00] hover:text-black"
            }`}
          >
            {isInPlan ? "✓ In Today's Plan" : isPlanFull ? "Plan Full (5/5)" : "+ Add to Plan"}
          </button>

          <button
            onClick={handleSaveToggle}
            className={`p-2 rounded-xl border text-xs font-bold transition-all ${
              isSaved ? "border-[#ccff00] text-[#ccff00]" : "border-[#1e222a] text-gray-400 hover:text-white"
            }`}
          >
            {isSaved ? "★" : "☆"}
          </button>
        </div>

        <Link
          href={`/workout/${workout.id}`}
          className="block text-center w-full py-1.5 text-xs text-gray-400 hover:text-white font-bold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}