import { list, formatList, format, add, findById, complete } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams, validateFindByIdParams, validateId } from './validate.js';

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
