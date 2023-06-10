import React from 'react';
import { render, screen } from '@testing-library/react';

test('App render', () => {
  render(<div>rendered</div>);

  expect(screen.getByText('rendered'));
});
