import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders tic tac toe title', () => {
  render(<App />);
  expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument();
});

test('shows player X turn initially', () => {
  render(<App />);
  expect(screen.getByText(/Player X's turn/i)).toBeInTheDocument();
});

test('renders 9 squares on the board', () => {
  const { container } = render(<App />);
  const squares = container.querySelectorAll('.square');
  expect(squares.length).toBe(9);
});

test('clicking a square places X marker', () => {
  const { container } = render(<App />);
  const squares = container.querySelectorAll('.square');
  fireEvent.click(squares[0]);
  expect(squares[0].textContent).toBe('X');
});

test('alternates between X and O turns', () => {
  const { container } = render(<App />);
  const squares = container.querySelectorAll('.square');
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  expect(squares[0].textContent).toBe('X');
  expect(squares[1].textContent).toBe('O');
});

test('new game button resets the board', () => {
  const { container } = render(<App />);
  const squares = container.querySelectorAll('.square');
  fireEvent.click(squares[0]);
  const newGameBtn = screen.getByText('New Game');
  fireEvent.click(newGameBtn);
  const freshSquares = container.querySelectorAll('.square');
  freshSquares.forEach(sq => expect(sq.textContent).toBe(''));
});
