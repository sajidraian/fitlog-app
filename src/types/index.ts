export interface Workout {
  id: string | number;
  name: string;
  category?: string;
  equipment?: string;
  muscleGroups?: string[];
  description?: string;
  difficulty?: string;
  sets?: number;
  reps?: number;
  instructions?: string[];
  duration?: number;
  caloriesBurned?: number;
  completed?: boolean;
  [key: string]: any;
}