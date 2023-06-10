import React, { FC } from 'react';
import { List } from '@mui/material';

import Task from '../Task';

import { TaskListProps } from './TaskListProps';

import s from './TaskList.module.css';

const TaskList: FC<TaskListProps> = ({ tasks, onToggle }) => (
  <List className={s.taskList}>
    {tasks.map(({ id, completed, task }) => (
      <Task key={id} task={task} completed={completed} onToggle={() => onToggle(id)} />
    ))}
  </List>
);

export default TaskList;
