export interface UserProfile {
  name: string;
  course: string;
  date: string;
}

export interface StationData {
  id: number;
  completed: boolean;
  rating: number; // 0 to 3 (stars)
}

export interface AppState {
  profile: UserProfile;
  stations: Record<number, StationData>;
}
