import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Guess the Number heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Guess the Number/i);
  expect(headingElement).toBeInTheDocument();
});
