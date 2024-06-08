import { createSlice } from '@reduxjs/toolkit';

import { addTask, deleteTask, fetchTasks, toggleCompleted } from './taskOperations';
import { tasksInitialState } from './initialState';

// common functions if the API allows Add, Delete, PUT operations
// const handlePending = state => {
// 	state.isLoading = true;
// }
// const handleRejected = (state, { payload }) => {
// 	state.isLoading = false;
// 	state.error = payload;
// };

// function simulators
const handleFetchPending = state => {
	state.isLoading = true;
}

const handleFetchFulfilled = (state, { payload }) => {
	state.allTasks = payload.todos;
	state.isLoading = false;
}

const handleFetchRejected = (state) => {
	state.allTasks = null;
	state.isLoading = false;
}

const handleAddFulfilled = (state, { payload }) => {
	state.allTasks.push(payload);
}

const handleDeleteFulfilled = (state, { payload }) => {
	const index = state.allTasks.findIndex(todo => todo.id === payload.id);
	state.allTasks.splice(index, 1);
}

const handleDeleteRejected = (state, { payload }) => {
	const index = state.allTasks.findIndex(todo => todo.id === payload);
	state.allTasks.splice(index, 1);
}

const handleToggleFulfilled = (state, { payload }) => {
	const index = state.allTasks.findIndex(todo => todo.id === payload.id);
	state.allTasks.splice(index, 1, payload);
}

const handleToggleRejected = (state, { payload }) => {
	// Fake API not add custom Todo to database, so we imitate a success result
	const index = state.allTasks.findIndex(todo => todo.id === payload);
	const todo = state.allTasks.find(todo => todo.id === payload);
	todo.completed = true;
	state.allTasks.splice(index, 1, todo);
}

const taskSlice = createSlice({
	name: 'tasks',
	initialState: tasksInitialState,
	extraReducers: builder => {
		builder
			.addCase(fetchTasks.pending, handleFetchPending)
			.addCase(fetchTasks.fulfilled, handleFetchFulfilled)
			.addCase(fetchTasks.rejected, handleFetchRejected)
			.addCase(addTask.fulfilled, handleAddFulfilled)
			.addCase(deleteTask.fulfilled, handleDeleteFulfilled)
			.addCase(deleteTask.rejected, handleDeleteRejected)
			.addCase(toggleCompleted.fulfilled, handleToggleFulfilled)
			.addCase(toggleCompleted.rejected, handleToggleRejected);
	},
});

export const taskReducer = taskSlice.reducer;
