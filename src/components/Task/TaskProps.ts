export interface TaskProps {
  task: string;
  completed: boolean;
  onToggle: () => void;
}
