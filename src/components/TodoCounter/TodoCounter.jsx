import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { selectTasksCount } from '../../redux/filter/filterSelectors';
import { selectTasks } from '../../redux/task/taskSelectors';

const TodoCounter = () => {
	const { active, completed } = useSelector(selectTasksCount);
	const totalTodos = useSelector(selectTasks);

	return (
		<Box component='div'>
			<Typography>Active: {active}</Typography>
			<Typography>Completed: {completed}</Typography>
			<Typography>Total: {totalTodos.length}</Typography>
		</Box>
	);
};

export default TodoCounter;
