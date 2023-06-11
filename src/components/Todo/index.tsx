import React, { useState } from 'react';
import {
  Alert, Box, Button, ButtonGroup, TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import TaskList from '../TaskList';

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

type TaskFilter = 'all' | 'active' | 'completed';

const filters: TaskFilter[] = ['all', 'active', 'completed'];

const Todo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all');
  const [error, setError] = useState<string>('');
  const [idCounter, setIdCounter] = useState<number>(0);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskItem: Task = {
        id: idCounter,
        task: newTask,
        completed: false,
      };

      setTasks([...tasks, newTaskItem]);
      setNewTask('');
      setError('');
      setIdCounter(idCounter + 1);
    } else {
      setError('There is no task text');
    }
  };

  const handleToggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
    setError('');
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const activeTasks = tasks.filter((task) => !task.completed);

  let filteredTasks: Task[] = tasks;
  if (taskFilter === 'active') {
    filteredTasks = activeTasks;
  } else if (taskFilter === 'completed') {
    filteredTasks = completedTasks;
  }

  const remainingTasks = activeTasks.length;

  const handleClearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  return (
    <Box>
      <TextField
        label='What needs to be done?'
        variant='outlined'
        value={newTask}
        onChange={handleTaskInputChange}
        fullWidth
        margin='normal'
      />
      <Button variant='contained' onClick={handleAddTask}>
        Add Task
      </Button>
      {error && <Alert sx={{ mt: 2 }} severity='error'>{error}</Alert>}
      <Box mt={4}>
        <TaskList tasks={filteredTasks} onToggle={handleToggleTask} />
      </Box>
      <Box mt={4} display='flex' justifyContent='space-between' alignItems='center'>
        <Button variant='contained'>
          {remainingTasks}
          {' '}
          tasks left
        </Button>
        <ButtonGroup>
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={taskFilter === filter ? 'contained' : 'outlined'}
              onClick={() => setTaskFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </ButtonGroup>
        <Button variant='outlined' onClick={handleClearCompleted} startIcon={<DeleteIcon />}>
          Clear Completed
        </Button>
      </Box>
    </Box>
  );
};

export default Todo;
