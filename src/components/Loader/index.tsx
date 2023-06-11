import React from 'react';
import { CircularProgress } from '@mui/material';

const Loader = () => (
  <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} color='primary' />
);

export default Loader;
