import { Outlet } from 'react-router-dom';
import MainAppBar from '../AppBar/AppBar';

const Layout = () => {
	return (
		<>
			<MainAppBar />
			<Outlet />
		</>
	);
}

export default Layout;
