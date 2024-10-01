export function format(todo) {
	return `${todo.id} - [${todo.done ? 'x' : ' '}] ${todo.title}`;
}

export function formatList(todos) {
	return todos.map(format)
}

function nextId(todos) {
	const ids = todos.map(todo => todo.id);
	if (ids.length === 0) {
		return 1;
	}
	const maxId = Math.max(...ids);
	return maxId + 1;
}

export function list(store) {
	return store.get();
}

export function add(store, params) {
	const [title] = params;
	const todos = store.get()
	const newTodo = {
		title,
		done: false,
		id: nextId(todos)
	}
	const toStore = [...todos, newTodo]
	store.set(toStore)
	return newTodo;
}

export function findById(store, id) {
	const todos = store.get();
	const todo = todos.find(todo => todo.id === id);
	return todo;
}
/**
 * Filters the list of todos based on their done status.
 * 
 * @param {Object} store - The store that holds the todos.
 * @param {string} status - The status to filter by; can be 'done' or 'not-done'.
 * @returns {Array} - An array of todos that match the specified status. 
 *                    Returns an empty array if the status is invalid or no todos match.
 */
export function findByStatus(store, status) {
	const todos = store.get();
	let filteredTodo = [];

	if (status === 'done') {
		filteredTodo = todos.filter(todo => todo.done);
		return filteredTodo;
	} else if (status === 'not-done') {
		filteredTodo = todos.filter(todo => !todo.done);
		return filteredTodo;
	}
	return filteredTodo;
}