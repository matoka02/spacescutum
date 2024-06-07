import { useSelector } from 'react-redux';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { selectStatusFilter } from '../../redux/filter/filterSelectors';

const StatusFilter = ({ onChangeFilter }) => {
	const filter = useSelector(selectStatusFilter);

	return (
		<ToggleButtonGroup
			size='small'
			color='primary'
			value={filter}
			exclusive
			onChange={onChangeFilter}
			aria-label='Filter todos'
		>
			<ToggleButton value='all'>All</ToggleButton>
			<ToggleButton value='active'>Active</ToggleButton>
			<ToggleButton value='completed'>Completed</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default StatusFilter;
