import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders tic tac toe title', () => {
  render(<App />);
  expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument();
});

test('shows player X turn initially', () => {
  render(<App />);
  expect(screen.getByText(/Player X's turn/i)).toBeInTheDocument();
});

test('renders 9 squares', () => {
  render(<App />);
  const buttons = document.querySelectorAll('.square');
  expect(buttons.length).toBe(9);
});

test('clicking a square places X', () => {
  render(<App />);
  const squares = document.querySelectorAll('.square');
  fireEvent.click(squares[0]);
  expect(squares[0].textContent).toBe('X');
});

test('alternates between X and O', () => {
  render(<App />);
  const squares = document.querySelectorAll('.square');
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  expect(squares[0].textContent).toBe('X');
  expect(squares[1].textContent).toBe('O');
});

test('new game button resets board', () => {
  render(<App />);
  const squares = document.querySelectorAll('.square');
  fireEvent.click(squares[0]);
  fireEvent.click(screen.getByText('New Game'));
  expect(squares[0].textContent).toBe('');
});
