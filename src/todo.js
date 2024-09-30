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

export function findTodoByTitle(store, title) {
	const todos = store.get();
	const re = new RegExp(title, "i");
	// creates a new array with the todos which titles are matching with the regular expression (the given parameter with case insensitive format)
	const filteredTodos = todos.filter((todo) => {
		if (todo.title.match(re)) {
			return todo;
		}
	});
	return filteredTodos;
}
