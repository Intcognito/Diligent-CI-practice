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

/**
 * Validates the parameters for the findByStatus function.
 *
 * @param {Array} params - The parameters to validate; should contain exactly one status.
 * @throws {AppError} - Throws an error if the parameters are invalid:
 *                      - If the length of params is not 1.
 *                      - If the status is not 'done' or 'not-done'.
 * @returns {string} - Returns the valid status ('done' or 'not-done').
 */

export function validateFindByStatusParams(params) {
	if (params.length !== 1) {
		throw new AppError('You must provide exactly one status (done/not-done).')
	}
	const [status] = params;
	if (status !== 'done' && status !== 'not-done') {
		throw new AppError('Invalid status. Please use "done" or "not-done"')
	}
	return status;
}
