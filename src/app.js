import { list, formatList, format, add, findTodoByTitle } from "./todo.js";
import { display } from "./display.js";
import { AppError } from "./app-error.js";
import { validateAddParams, validateFindByTitleParams } from "./validate.js";

export function createApp(todoStore, args) {
	const [, , command, ...params] = args;

	switch (command) {
		case "list":
			const todos = list(todoStore);
			display([...formatList(todos), `You have ${todos.length} todos.`]);
			break;
		case "add":
			const validated = validateAddParams(params);
			const added = add(todoStore, validated);
			display(["New Todo added:", format(added)]);
			break;
		case "find-by-title":
			const validatedTitle = validateFindByTitleParams(params);
			const foundTodos = findTodoByTitle(todoStore, validatedTitle);
			console.log(foundTodos);
			// if(foundTodos){
			//   display([''])
			// }
			// else{
			//   display([''])
			// }
			break;
		default:
			throw new AppError(`Unknown command: ${command}`);
	}
}
