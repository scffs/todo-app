import React, { lazy, Suspense, useState } from 'react';
import {
  Alert, Box, Button, ButtonGroup, TextField, useMediaQuery, useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Loader from '../Loader';

const TaskList = lazy(() => import('../TaskList'));

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

type TaskFilter = 'all' | 'active' | 'completed';

const filters: TaskFilter[] = ['all', 'active', 'completed'];

const tasksList: Task[] = [
  {
    id: 0,
    task: 'Тестовое задание',
    completed: false,
  },
  {
    id: 1,
    task: 'Прекрасный код',
    completed: true,
  },
  {
    id: 2,
    task: 'Покрытие тестами',
    completed: true,
  },
  {
    id: 3,
    task: 'Готовность к работе',
    completed: true,
  },
];

const Todo = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(650));

  const [tasks, setTasks] = useState<Task[]>(tasksList);
  const [newTask, setNewTask] = useState('');
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all');
  const [error, setError] = useState<string>('');
  const [idCounter, setIdCounter] = useState<number>(tasksList.findLastIndex((task) => task.id) + 1);

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
        <Suspense fallback={<Loader />}>
          <TaskList tasks={filteredTasks} onToggle={handleToggleTask} />
        </Suspense>
      </Box>
      <Box
        mt={4}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          flexDirection: isSmallScreen ? 'column' : 'row',
          gap: isSmallScreen ? '30px' : '0',
        }}
      >
        <Button variant='outlined' fullWidth={isSmallScreen}>
          {remainingTasks}
          {' '}
          tasks left
        </Button>
        <ButtonGroup fullWidth={isSmallScreen}>
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
        <Button variant='outlined' onClick={handleClearCompleted} fullWidth={isSmallScreen} startIcon={<DeleteIcon />}>
          Clear Completed
        </Button>
      </Box>
    </Box>
  );
};

export default Todo;
