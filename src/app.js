import { list, formatList, format, add, findById, findByStatus } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams, validateFindByIdParams, validateFindByStatusParams } from './validate.js';

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
    case 'find-by-status':
      // Validate the status parameter and retrieve todos based on their completion status
      const validatedStatus = validateFindByStatusParams(params);

      // Retrieve todos from the store that match the validated status 
      const todosByStatus = findByStatus(todoStore, validatedStatus);

      // Check if any todos were found with the specified status
      if (todosByStatus.length === 0) {
        // Display a message indicating no todos were found
        display([`No todos found with status '${validatedStatus}'.`]);
        break;
      }
      // Display the list of todos found and the count of matching todos
      display([
        ...formatList(todosByStatus), // Format the list of todos for display
        `You have ${todosByStatus.length} todos with status '${validatedStatus}'.`// Show the count
      ])
      break;
    default:
      throw new AppError(`Unknown command: ${command}`)
  }
}
