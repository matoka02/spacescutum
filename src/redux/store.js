import { configureStore } from '@reduxjs/toolkit';


import { filterReducer } from './filter/filterSlice';
import { taskReducer } from './task/taskSlice';

const store = configureStore({
	reducer: {
		todos: taskReducer,
		filter: filterReducer,
	},
});

export default store;
