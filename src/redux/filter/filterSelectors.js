import { createSelector } from '@reduxjs/toolkit';
import { selectTasks } from '../task/taskSelectors';

export const selectStatusFilter = state => state.filter.status;

export const selectTasksCount = createSelector([selectTasks], allTasks => {
	return allTasks.reduce(
		(count, todo) => {
			if (todo.completed) {
				count.completed += 1;
			} else {
				count.active += 1;
			}
			return count;
		},
		{ active: 0, completed: 0 },
	);
});

export const selectVisibleTasks = createSelector([selectTasks, selectStatusFilter], (allTasks, filterStatus) => {
	if (filterStatus === 'active') {
		return allTasks.filter(todo => !todo.completed);
	} else if (filterStatus === 'completed') {
		return allTasks.filter(todo => todo.completed);
	} else {
		return allTasks;
	}
});
