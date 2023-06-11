import React from 'react';
import { test } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from '../App';

test('App should render with the correct text', () => {
  render(<App />);

  setTimeout(() => {
    expect(screen.getByText('Made with love by'));
  }, 500);
});
