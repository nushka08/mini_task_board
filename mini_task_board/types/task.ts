export type TaskStatus = "to-do" | "ongoing" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  created_at: string;
}

export interface CreateTaskInput {
  title: string;
  status?: TaskStatus;
}
