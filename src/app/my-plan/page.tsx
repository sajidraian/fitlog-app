"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import toast from "react-hot-toast";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeSaved, toggleDone } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [searchQuery, setSearchQuery] = useState("");

  const rawList = activeTab === "plan" ? plan : saved;

 
  const filteredList = useMemo(() => {
    return rawList.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(query);
      const matchEquipment = item.equipment?.toLowerCase().includes(query);
      const matchCategory = item.category?.toLowerCase().includes(query);
      const matchMuscles = item.muscleGroups?.some((m) => m.toLowerCase().includes(query));

      return matchName || matchEquipment || matchCategory || matchMuscles;
    });
  }, [rawList, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
    
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#1e222a] pb-4">
          <div className="flex gap-6 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab("plan")}
              className={`pb-2 relative ${activeTab === "plan" ? "text-[#ccff00]" : "text-gray-400"}`}
            >
              Today's Plan ({plan.length})
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`pb-2 relative ${activeTab === "saved" ? "text-[#ccff00]" : "text-gray-400"}`}
            >
              Saved ({saved.length})
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by workout name or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#12141a] border border-[#1e222a] text-white text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#ccff00] w-full sm:w-72"
          />
        </div>

     
        <div className="space-y-4">
          {filteredList.length === 0 ? (
            <p className="text-gray-500 text-xs text-center py-8">No workouts match your search.</p>
          ) : (
            filteredList.map((workout) => (
              <div key={workout.id} className="bg-[#12141a] border border-[#1e222a] p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#1a1d26]">
                    <Image src={workout.image} alt={workout.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{workout.name}</h4>
                    <p className="text-xs text-gray-400">{workout.equipment}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}