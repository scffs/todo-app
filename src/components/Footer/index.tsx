import React from 'react';
import { Link, Typography } from '@mui/material';

const Footer = () => (
  <footer>
    <Typography variant='h5' sx={{ mt: 4 }} align='center'>
      Made with love by
      {' '}
      <Link href='https://github.com/scffs' target='_blank' rel='noopener'>
        @scffs
      </Link>
    </Typography>
  </footer>
);

export default Footer;
