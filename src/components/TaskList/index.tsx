import React, { FC, lazy, Suspense } from 'react';
import { List } from '@mui/material';

import { TaskListProps } from './TaskListProps';

import s from './TaskList.module.css';

import Loader from '../Loader';

const Task = lazy(() => import('../Task'));

const TaskList: FC<TaskListProps> = ({ tasks, onToggle }) => (
  <List className={s.taskList}>
    {tasks.map(({ id, completed, task }) => (
      <Suspense key={id} fallback={<Loader />}>
        <Task task={task} completed={completed} onToggle={() => onToggle(id)} />
      </Suspense>
    ))}
  </List>
);

export default TaskList;
