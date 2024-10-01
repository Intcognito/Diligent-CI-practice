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

export function validateFindByIdParams(params) {
	if (params.length !== 1) {
		throw new AppError("You must provide exactly one ID.");
	}

	const [id] = params;
	if (isNaN(id) || id <= 0) {
		throw new AppError("The ID must be a numeric value greater than 0.");
	}
	return parseInt(params, 10);
}

export function validatedEditTitleParams(params) {
	if (params.length !== 2) {
		throw new AppError("You must provide an ID and a new title as parameters");
	}

	const [id, newTitle] = params;

	if (isNaN(id) || id <= 0) {
		throw new AppError("The ID must be a numeric value greater than 0");
	}
	if (!isNaN(newTitle) || newTitle.length < 1) {
		throw new AppError(
			"The new title must be a string and has to be at least 1 character long"
		);
	}

	return parseInt(id), newTitle;
}
