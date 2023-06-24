import React, { FC, memo } from 'react';
import {
  Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';

import { Interfaces } from './interfaces';

const Task: FC<Interfaces> = ({ task, completed, onToggle }) => (
  <ListItem>
    <ListItemButton onClick={onToggle}>
      <ListItemIcon>
        <Checkbox checked={completed} />
      </ListItemIcon>
      <ListItemText primary={task} style={{ textDecoration: completed ? 'line-through' : undefined }} />
    </ListItemButton>
  </ListItem>
);

export default memo(Task);
