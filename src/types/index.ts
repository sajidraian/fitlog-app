export interface Workout {
  id: string | number; // string এবং number দুটোই এলাউ করা হলো
  name: string;
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  image: string;
  completed?: boolean; // completed প্রপার্টি যোগ করা হলো
}