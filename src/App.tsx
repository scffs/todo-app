import React from 'react';
import { Box, Link, Typography } from '@mui/material';

import Todo from './components/Todo';

const App = () => (
  <Box sx={{
    maxWidth: 1000, mx: 'auto', my: 4, p: 2,
  }}
  >
    <Todo />
    <Typography variant='h5' sx={{ mt: 4 }} align='center'>
      Made with love by
      {' '}
      <Link href='https://github.com/scffs' target='_blank' rel='noopener'>
        @scffs
      </Link>
    </Typography>
  </Box>
);

export default App;
