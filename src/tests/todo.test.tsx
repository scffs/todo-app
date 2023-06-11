import React from 'react';
import { describe, it } from 'vitest';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Todo from '../components/Todo';

describe('Todo App', () => {
  let input: HTMLInputElement;
  let addButton: HTMLButtonElement;
  let activeButton: HTMLButtonElement;
  let completedButton: HTMLButtonElement;

  beforeEach(() => {
    const rendered = render(<Todo />);
    input = rendered.getByLabelText('What needs to be done?') as HTMLInputElement;
    addButton = rendered.getByText('Add Task') as HTMLButtonElement;

    const clearCompletedButton = screen.getByText('Clear Completed');
    fireEvent.click(clearCompletedButton);
  });

  it('should add new tasks to the task list', () => {
    act(() => {
      render(<Todo />);
    });

    fireEvent.change(input, { target: { value: 'Todo' } });
    fireEvent.click(addButton);

    setTimeout(() => {
      const tasks = screen.getAllByText('Todo');
      expect(tasks).toHaveLength(2);
    }, 300);
  });

  it('should toggle a task from all to completed', () => {
    const { getAllByText } = render(<Todo />);

    setTimeout(() => {
      const tasks = getAllByText(/Тестовое/);
      fireEvent.click(tasks[0]);
      fireEvent.click(activeButton);
      expect(screen.getByText(/Тестовое/));
    }, 300);
  });

  it('should add and remove a new task from the task list', () => {
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    const removeButton = screen.getByRole('button', { name: 'Clear Completed' });
    fireEvent.click(removeButton);

    const removedTask = screen.queryByLabelText('New Task');
    expect(removedTask).toBeNull();
  });

  it('should add a new task to the task list and check how many tasks are left', () => {
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(screen.getByText('2 tasks left'));
  });

  it('should add a new task and move it to the completed tasks list', () => {
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    completedButton = screen.getByText(/Completed/);
    fireEvent.click(completedButton);

    setTimeout(() => {
      expect(screen.getByText('New Task'));
    }, 100);
  });
});
