"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types";
import { initialWorkouts } from "@/data/workouts";

interface PlanContextType {
  plan: Workout[];
  setPlan: React.Dispatch<React.SetStateAction<Workout[]>>;
  saved: Workout[];
  workouts: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  toggleComplete: (id: string | number) => void;
  saveWorkout: (workout: Workout) => void;
  removeSaved: (id: string | number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [workouts] = useState<Workout[]>(initialWorkouts);

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) return;
    if (!plan.some((item) => String(item.id) === String(workout.id))) {
      setPlan([...plan, workout]);
    }
  };

  const removeFromPlan = (id: string | number) => {
    setPlan(plan.filter((item) => String(item.id) !== String(id)));
  };

  const toggleComplete = (id: string | number) => {
    setPlan(
      plan.map((item) =>
        String(item.id) === String(id)
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const saveWorkout = (workout: Workout) => {
    if (!saved.some((item) => String(item.id) === String(workout.id))) {
      setSaved([...saved, workout]);
    }
  };

  const removeSaved = (id: string | number) => {
    setSaved(saved.filter((item) => String(item.id) !== String(id)));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        setPlan,
        saved,
        workouts,
        addToPlan,
        removeFromPlan,
        toggleComplete,
        saveWorkout,
        removeSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within PlanProvider");
  return context;
};