import { AppError } from "./app-error.js";

export function format(todo) {
	return `${todo.id} - [${todo.done ? "x" : " "}] ${todo.title}`;
}

export function formatList(todos) {
	return todos.map(format);
}

function nextId(todos) {
	const ids = todos.map((todo) => todo.id);
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
	const todos = store.get();
	const newTodo = {
		title,
		done: false,
		id: nextId(todos),
	};
	const toStore = [...todos, newTodo];
	store.set(toStore);
	return newTodo;
}

export function findById(store, id) {
	const todos = store.get();
	const todo = todos.find((todo) => todo.id === id);
	return todo;
}

export function editTitle(store, id, newTitle) {
	const foundTodo = findById(store, id);
	if (!foundTodo) {
		throw new AppError(`Todo with ID ${id} not found.`);
	}

	let updatedTodo = {};
	const updatedTodos = store.get().map((todo) => {
		if (todo.id == id) {
			updatedTodo = { ...todo, title: newTitle };
			return { ...todo, title: newTitle };
		}
		return todo;
	});

	store.set(updatedTodos);
	return updatedTodo;
}
