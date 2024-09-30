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
			//title parameter checking
			const validatedTitle = validateFindByTitleParams(params);

			//Searching for the todo with the given title
			const foundTodos = findTodoByTitle(todoStore, validatedTitle);

			//checking if the result array has items or not
			// if it doesnt it displays that there is no todos with the given parameter
			if (foundTodos.length == 0) {
				display(["No todos found with this title!"]);
				break;
			}

			// if it has then displays it/them
			display(["Found todos:", ...formatList(foundTodos)]);
			break;
		default:
			throw new AppError(`Unknown command: ${command}`);
	}
}
