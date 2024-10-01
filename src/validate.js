import { AppError } from "./app-error.js";

export function validateAddParams(params) {
	if (params.length !== 1) {
		throw new AppError("Give a title as the only parameter in parenthesis.");
	}
	const [title] = params;
	if (typeof title !== "string" || title?.length === 0) {
		throw new AppError("The title must be a non zero length string.");
	}
	return params;
}

export function validateId(todoStore, id) {
  const parsedId = parseInt(id[0]);
  const todos = todoStore.get();
  const todo = todos.find(task => task.id === parsedId);

  if (id.length !== 1) {
    throw new AppError('Please provide exactly one ID!');
  }
  if (typeof parsedId !== 'number') {
    throw new AppError('The id must be a number.');
  }
  if (parsedId <= 0) {
    throw new AppError('The id must be a number greater than zero.');
  }
  if (!todo) {
    throw new AppError('Todo not found by ID.');
  }

  return parsedId;
}

export function validateFindByIdParams(params) {
  if (params.length !== 1) {
    throw new AppError('You must provide exactly one ID.');
  }

  const [id] = params;
  if (isNaN(id) || id <= 0) {
    throw new AppError('The ID must be a numeric value greater than 0.');
  }
  return parseInt(params, 10);
}

export function validateFindByTitleParams(params) {
	// checks if the user forgot the parameter or not
	if (params.length !== 1) {
		throw new AppError("You have to give exactly one parameter as a title!");
	}

	const [title] = params;

	//checks if the given title is not a string and if its less than 3 characters
	//if one of the checks are true then it throws an AppError
	if (typeof title !== "string" || title?.length < 3) {
		throw new AppError(
			"The title has to be a string and atleast 3 character long."
		);
	}
	return title;
}
