interface Task {
  id: number;
  task: string;
  completed: boolean;
}

export interface Interfaces {
  tasks: Task[];
  onToggle: (id: number) => void;
}
