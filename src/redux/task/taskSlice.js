import { createSlice } from '@reduxjs/toolkit';

import { addTask, deleteTask, fetchTasks, toggleCompleted } from './taskOperations';
import { tasksInitialState } from './initialState';

const taskSlice = createSlice({
	name: 'tasks',
	initialState: tasksInitialState,
	extraReducers: builder => {
		builder
			.addCase(fetchTasks.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchTasks.fulfilled, (state, { payload }) => {
				state.allTodos = payload.todos;
				state.isLoading = false;
			})
			.addCase(fetchTasks.rejected, state => {
				state.allTodos = null;
				state.isLoading = false;
			})
			.addCase(toggleCompleted.fulfilled, (state, { payload }) => {
				const index = state.allTodos.findIndex(todo => todo.id === payload.id);
				state.allTodos.splice(index, 1, payload);
			})
			.addCase(toggleCompleted.rejected, (state, { payload }) => {
				// Fake API not add custom Todo to database, so we imitate a success result
				const index = state.allTodos.findIndex(todo => todo.id === payload);
				const todo = state.allTodos.find(todo => todo.id === payload);
				todo.completed = true;
				state.allTodos.splice(index, 1, todo);
			})
			.addCase(addTask.fulfilled, (state, { payload }) => {
				state.allTodos.push(payload);
			})
			.addCase(deleteTask.fulfilled, (state, { payload }) => {
				const index = state.allTodos.findIndex(todo => todo.id === payload.id);
				state.allTodos.splice(index, 1);
			})
			.addCase(deleteTask.rejected, (state, { payload }) => {
				const index = state.allTodos.findIndex(todo => todo.id === payload);
				state.allTodos.splice(index, 1);
			});
	},
});

export const taskReducer = taskSlice.reducer;
