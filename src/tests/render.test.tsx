import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from '../App';

describe('App', () => {
  it('should render the app with the correct text', () => {
    render(<App />);

    expect(screen.getByText('Made with love by'));
  });
});
