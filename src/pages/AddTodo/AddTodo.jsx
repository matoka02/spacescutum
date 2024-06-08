import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';

import { addTask } from '../../redux/task/taskOperations';

const AddTodo = () => {
	const dispatch = useDispatch();

	const handleSubmit = (evt) => {
		evt.preventDefault();

		const data = new FormData(evt.currentTarget);
		const todoText = data.get('todo');

		if (todoText.trim() === '') { 
			return toast.error('Please fill todo'); 
		}

		const newTodo = {
			todo: todoText.trim(),
			completed: false,
			userId: 51,
		};

		dispatch(addTask(newTodo));
		evt.target.reset();
	};

	return (
		<>
			<Toolbar />
			<Container
				component='main'
				maxWidth='sm'
				sx={{ p: 3 }}
			>
				<Box
					component='form'
					onSubmit={handleSubmit}
					noValidate
					autoComplete='off'
				>
					<TextField
						id='todo'
						name='todo'
						label='New Todo'
						multiline
						rows={5}
						fullWidth
					/>
					<Button
						type='submit'
						size='medium'
						variant='contained'
						sx={{ mt: 3 }}
					>
						Add Todo
					</Button>
				</Box>
			</Container>
		</>
	);
}

export default AddTodo;
