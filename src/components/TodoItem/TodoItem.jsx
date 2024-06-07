import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

const TodoItem = ({ todo, onDelete, onComplete }) => {
	return (
		<ListItem disablePadding divider={true}>
			
			<Checkbox
				edge='start'
				checked={todo.completed}
				disabled={todo.completed}
				disableRipple
				onChange={() => onComplete(todo.id)}
			/>

			<ListItemText primary={todo.todo} />

			{!todo.completed && (
				<IconButton
					edge='end'
					aria-label='delete'
					onClick={() => onDelete(todo.id)}
				>
					XXX
				</IconButton>
			)}

		</ListItem>
	);
};

export default TodoItem;