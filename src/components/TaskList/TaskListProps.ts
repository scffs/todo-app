interface Task {
  id: number;
  task: string;
  completed: boolean;
}

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}
