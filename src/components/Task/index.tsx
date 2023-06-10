import React, { FC } from 'react';
import {
  Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';

import { TaskProps } from './TaskProps';

const Task: FC<TaskProps> = ({ task, completed, onToggle }) => (
  <ListItem>
    <ListItemButton onClick={onToggle}>
      <ListItemIcon>
        <Checkbox checked={completed} />
      </ListItemIcon>
      <ListItemText primary={task} style={{ textDecoration: completed ? 'line-through' : undefined }} />
    </ListItemButton>
  </ListItem>
);

export default Task;
