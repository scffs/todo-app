import React, {
  lazy, Suspense, useState, useCallback, useMemo
} from 'react';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Loader from '../Loader';

import { tasksList } from './data';

import { TaskFilter, Task } from './interfaces';

const TaskList = lazy(() => import('../TaskList'));

const filters: TaskFilter[] = ['all', 'active', 'completed'];

const Todo = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(650));

  const [tasks, setTasks] = useState<Task[]>(tasksList);
  const [newTask, setNewTask] = useState('');
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all');
  const [error, setError] = useState<string>('');
  const [idCounter, setIdCounter] = useState<number>(
    tasksList.findLastIndex((task) => task.id) + 1,
  );

  const handleAddTask = useCallback(() => {
    if (newTask.trim() !== '') {
      const newTaskItem: Task = {
        id: idCounter,
        task: newTask,
        completed: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTaskItem]);
      setNewTask('');
      setError('');
      setIdCounter((prevIdCounter) => prevIdCounter + 1);
    } else {
      setError('There is no task text');
    }
  }, [newTask, idCounter]);

  const handleToggleTask = useCallback(
    (id: number) => {
      setTasks((prevTasks) => prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }));
    },
    [],
  );

  const handleTaskInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTask(e.target.value);
      setError('');
    },
    [],
  );

  const filteredTasks = useMemo(() => {
    if (taskFilter === 'active') {
      return tasks.filter((task) => !task.completed);
    } if (taskFilter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  }, [tasks, taskFilter]);

  const remainingTasks = useMemo(
    () => tasks.filter((task) => !task.completed).length,
    [tasks],
  );

  const handleClearCompleted = useCallback(() => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  }, []);

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
      {error && (
        <Alert sx={{ mt: 2 }} severity='error'>
          {error}
        </Alert>
      )}
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
        <Button
          variant='outlined'
          onClick={handleClearCompleted}
          fullWidth={isSmallScreen}
          startIcon={<DeleteIcon />}
        >
          Clear Completed
        </Button>
      </Box>
    </Box>
  );
};

export default Todo;
