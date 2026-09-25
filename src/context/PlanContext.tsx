"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Workout } from "@/types";

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: Workout["id"]) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: Workout["id"]) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_plan");
    const savedBookmarks = localStorage.getItem("fitlog_saved");
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedBookmarks) setSaved(JSON.parse(savedBookmarks));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
    }
  }, [plan, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [saved, isLoaded]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) return;
    if (!plan.some((item) => item.id === workout.id)) {
      setPlan([...plan, workout]);
    }
  };

  const removeFromPlan = (id: Workout["id"]) => {
    setPlan(plan.filter((item) => item.id !== id));
  };

  const addToSaved = (workout: Workout) => {
    if (!saved.some((item) => item.id === workout.id)) {
      setSaved([...saved, workout]);
    }
  };

  const removeFromSaved = (id: Workout["id"]) => {
    setSaved(saved.filter((item) => item.id !== id));
  };

  return (
    <PlanContext.Provider value={{ plan, saved, addToPlan, removeFromPlan, addToSaved, removeFromSaved }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
}