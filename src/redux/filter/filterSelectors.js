import { createSelector } from '@reduxjs/toolkit';
import { selectTasks } from '../task/taskSelectors';

export const selectStatusFilter = state => state.filter.status;

export const selectTasksCount = createSelector([selectTasks], allTodos => {
	return allTodos.reduce(
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

export const selectVisibleTasks = createSelector([selectTasks, selectStatusFilter], (allTodos, filterStatus) => {
	if (filterStatus === 'active') {
		return allTodos.filter(todo => !todo.completed);
	} else if (filterStatus === 'completed') {
		return allTodos.filter(todo => todo.completed);
	} else {
		return allTodos;
	}
});
