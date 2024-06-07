import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

import { selectVisibleTasks } from '../../redux/filter/filterSelectors';
import { deleteTask, toggleCompleted } from '../../redux/task/taskOperations';
import { setStatusFilter } from '../../redux/filter/filterSlice';
import { selectIsLoading } from '../../redux/task/taskSelectors';

import TodoCounter from '../../components/TodoCounter/TodoCounter';
import TodoItem from '../../components/TodoItem/TodoItem';
import StatusFilter from '../../components/StatusFilter/StatusFilter';

const todosPerPage = 10;

const Todos = () => {
	const [page, setPage] = useState(1);
	const [item, setItem] = useState(0);
	const [currentTodos, setCurrentTodos] = useState([]);

	const dispatch = useDispatch();
	const todos = useSelector(selectVisibleTasks);
	const isLoading = useSelector(selectIsLoading);

	const amountOfPages = Math.ceil(todos.length / todosPerPage);

	useEffect(() => {
		const endOffset = item + todosPerPage;
		const paginationItems = todos.slice(item, endOffset);
		setCurrentTodos(paginationItems);
	}, [todos, item]);

	const handleChangePage = (_, value) => {
		setPage(value);
		setItem(value * todosPerPage - todosPerPage);
	};

	const handleChangeFilter = (_, newfilter) => {
		dispatch(setStatusFilter(newfilter));
		setPage(1);
		setItem(0);
	};

	const handleComplete = todoId => {
		if (currentTodos.length === 1 && todos.length > 1) {
			setItem(prevState => prevState - 10);
			setPage(prevState => prevState - 1);
		}
		dispatch(toggleCompleted(todoId));
	};

	const handleDelete = todoId => {
		if (currentTodos.length === 1 && todos.length > 1) {
			setItem(prevState => prevState - 10);
			setPage(prevState => prevState - 1);
		}
		dispatch(deleteTask(todoId));
	};

	return (
		<>
			<Toolbar />
			<Container
				component='main'
				maxWidth='lg'
				sx={{ p: 3 }}
			>
				{isLoading ? (
					<CircularProgress />
				) : (
					<>
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								alignItems: 'flex-end',
								justifyContent: { xs: 'space-around', sm: 'space-between' },
							}}
						>
							<TodoCounter />
							<StatusFilter onChangeFilter={handleChangeFilter} />
						</Box>
						<List>
							{todos?.length > 0 ? (
								currentTodos.map(todo => (
									<TodoItem
										key={todo.id}
										todo={todo}
										onDelete={handleDelete}
										onComplete={handleComplete}
									/>
								))
							) : (
								<p>Nothing found</p>
							)}
						</List>
						{currentTodos.length > 0 && (
							<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
								<Pagination
									count={amountOfPages}
									page={page}
									onChange={handleChangePage}
									variant='outlined'
									color='primary'
								/>
							</Box>
						)}
					</>
				)}
			</Container>
		</>
	);
}

export default Todos;
