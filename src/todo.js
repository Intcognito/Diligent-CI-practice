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
	console.log(store);
	console.log(id);
	console.log(newTitle);
	console.log("----------------");

	const foundTodo = findById(store, id);
	if (!foundTodo) {
		throw new AppError(`Todo with ID ${id} not found.`);
	}
	console.log("found todo: " + foundTodo);
}
