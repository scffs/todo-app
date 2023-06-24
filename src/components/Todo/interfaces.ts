export interface Task {
  id: number;
  task: string;
  completed: boolean;
}

export type TaskFilter = 'all' | 'active' | 'completed';
