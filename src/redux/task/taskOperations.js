import axios from 'axios';
import toast from 'react-hot-toast';

import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://dummyjson.com';

const instance = axios.create({
	baseURL: BASE_URL,
});

export const fetchTasks = createAsyncThunk('todos/fetchAll', async (_, thunkApi) => {
	try {
		const { data } = await instance.get('/todos?limit=0');
		return data;
	} catch (error) {
		console.log(error);
		toast.error('Connection failed, please try again');

		return thunkApi.rejectWithValue(error.message);
	}
});

export const addTask = createAsyncThunk('todos/addTask', async (todo, thunkApi) => {
	try {
		const { data } = await instance.post('/todos/add', todo);
		toast.success('New Todo added!');
		// Fake API always give new todo the same id=151, so we manually add a random id between 151 and 300.
		data.id = Math.floor(Math.random() * (300 - 151 + 1)) + 151;

		return data;
	} catch (error) {
		console.log(error);
		toast.error('Connection failed, please try again');

		return thunkApi.rejectWithValue(error.message);
	}
});

export const deleteTask = createAsyncThunk('todos/deleteTask', async (todoId, thunkApi) => {
	try {
		const { data } = await instance.delete(`/todos/${todoId}`);
		toast.success('Todo deleted!');
		return data;
	} catch (error) {
		console.log(error);
		// Fake API not delete custom Todo from database, so we imitate a success result
		if (error.response.status === 404) {
			toast.success('Todo deleted!');
			return thunkApi.rejectWithValue(todoId);
		} else {
			toast.error('Connection failed, please try again');
			return thunkApi.rejectWithValue(error.message);
		}
	}
});

export const toggleCompleted = createAsyncThunk('todos/toggleCompleted', async (todoId, thunkApi) => {
	try {
		const { data } = await instance.put(`/todos/${todoId}`, {
			completed: true,
		});
		toast.success('Congratulations! Todo completed!');
		return data;
	} catch (error) {
		console.log(error);
		// Fake API not add custom Todo to database, so we imitate a success result
		if (error.response.status === 404) {
			toast.success('Congratulations! Todo completed!');
			return thunkApi.rejectWithValue(todoId);
		} else {
			toast.error('Connection failed, please try again');
			return thunkApi.rejectWithValue(error.message);
		}
	}
});




