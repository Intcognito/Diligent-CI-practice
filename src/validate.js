import { AppError } from "./app-error.js";

export function validateAddParams(params) {
  if (params.length !== 1) {
    throw new AppError('Give a title as the only parameter in parenthesis.');
  }
  const [title] = params;
  if (typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.')
  }
  return params;
}

export function validateId(id) {
  const parsedId = parseInt(id[0]);

  if (typeof parsedId !== 'number') {
    throw new AppError('The id must be a number.')
  }
  if (parsedId <= 0) {
    throw new AppError('The id must be a number greater than zero.')
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
