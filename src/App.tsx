import React, { lazy, Suspense } from 'react';
import { Box } from '@mui/material';

import Loader from './components/Loader';

const Todo = lazy(() => import('./components/Todo'));

const App = () => (
  <Box sx={{
    maxWidth: 1000, mx: 'auto', my: 4, p: 2, position: 'relative',
  }}
  >
    <Suspense fallback={<Loader />}>
      <Todo />
    </Suspense>
  </Box>
);

export default App;
