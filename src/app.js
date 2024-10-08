import { list, formatList, format, add, findById, complete, findTodoByTitle } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams, validateFindByIdParams, validateId, validateFindByTitleParams } from './validate.js';

export function createApp(todoStore, args) {
	const [, , command, ...params] = args;

  switch (command) {
    case 'list':
      const todos = list(todoStore)
      display([
        ...formatList(todos),
        `You have ${todos.length} todos.`
      ]);
      break;
    case 'add':
      const validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(['New Todo added:', format(added)])
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
    case 'find-by-id':
      const validatedId = validateFindByIdParams(params);
      const todoById = findById(todoStore, validatedId);
      if (!todoById) {
        display([`Todo with ID ${validatedId} not found.`]);
        break;
      }
      display(['Todo by Id:', format(todoById)]);
      break;
    case 'complete':
      const validatedInput = validateId(todoStore, params);
      const completed = complete(todoStore, validatedInput);
      display(['Todo completed:', format(completed)]);
      break;
    default:
      throw new AppError(`Unknown command: ${command}`)
  }
}
