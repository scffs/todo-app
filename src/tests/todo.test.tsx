import React from 'react';
import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

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
    activeButton = rendered.getByText('Add Task') as HTMLButtonElement;
    completedButton = rendered.getByText('Add Task') as HTMLButtonElement;
  });

  describe('Add Tasks', () => {
    it('should add new tasks to the task list', () => {
      fireEvent.change(input, { target: { value: 'Todo 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Todo 2' } });
      fireEvent.click(addButton);

      const tasks = screen.getAllByText(/Todo/);
      expect(tasks).toHaveLength(2);
    });
  });

  describe('Toggle Task', () => {
    it('should toggle a task from all to completed', () => {
      const { getAllByText } = render(<Todo />);

      fireEvent.change(input, { target: { value: 'Todo 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Todo 2' } });
      fireEvent.click(addButton);

      const tasks = getAllByText(/Todo 2/);
      fireEvent.click(tasks[0]);

      fireEvent.click(activeButton);
      expect(screen.getByText(/Todo 1/));
    });
  });

  describe('Remove Task', () => {
    it('should add and remove a new task from the task list', () => {
      fireEvent.change(input, { target: { value: 'New Task' } });
      fireEvent.click(addButton);

      const removeButton = screen.getByRole('button', { name: 'Clear Completed' });
      fireEvent.click(removeButton);

      const removedTask = screen.queryByLabelText('New Task');
      expect(removedTask).toBeNull();
    });
  });

  describe('Task Count', () => {
    it('should add a new task to the task list and check how many tasks are left', () => {
      fireEvent.change(input, { target: { value: 'New Task' } });
      fireEvent.click(addButton);

      expect(screen.getByText('1 tasks left'));
    });
  });

  describe('Check Completed Tasks', () => {
    it('should add a new task and move it to the completed tasks list', () => {
      fireEvent.change(input, { target: { value: 'New Task' } });
      fireEvent.click(addButton);

      completedButton = screen.getByText(/Completed/);
      fireEvent.click(completedButton);

      expect(screen.getByText('New Task'));
    });
  });
});
