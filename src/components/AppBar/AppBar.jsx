import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const pages = [
	{ page: 'Home', path: '/' },
	{ page: 'Todos', path: 'todos' },
	{ page: 'Add Todo', path: 'add-todo' },
];


const MainAppBar = () => {
	const navigate = useNavigate();

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar component='nav'>
				<Toolbar>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1, fontSize: { xs: '0.875rem', sm: '1.25rem' } }}
					>
						TodosApp
					</Typography>
					<Box>
						{pages.map(({ page, path }) => (
							<Button
								key={page}
								sx={{ color: '#fff', fontSize: { xs: '0.625rem', sm: '0.875rem' } }}
								onClick={() => navigate(`${path}`)}
							>
								{page}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default MainAppBar;
