"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types";

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  saveWorkout: (workout: Workout) => void;
  removeSaved: (id: string | number) => void;
  toggleDone: (id: string | number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  
  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_plan");
    const localSaved = localStorage.getItem("fitlog_saved");
    if (localPlan) setPlan(JSON.parse(localPlan));
    if (localSaved) setSaved(JSON.parse(localSaved));
  }, []);

  
  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: Workout) => {
    setPlan((prev) => [...prev, { ...workout, completed: false }]);
  };

  const removeFromPlan = (id: string | number) => {
    setPlan((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const saveWorkout = (workout: Workout) => {
    setSaved((prev) => [...prev, workout]);
  };

  const removeSaved = (id: string | number) => {
    setSaved((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const toggleDone = (id: string | number) => {
    setPlan((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
        toggleDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
}