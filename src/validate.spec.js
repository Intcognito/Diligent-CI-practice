import { validateAddParams, validateFindByIdParams, validateFindByStatusParams } from "./validate";


describe('validateAddParams', () => {
	it('should pass and return with the original params with single string', () => {
		const params = ['Todo'];
		const expected = ['Todo'];

		const current = validateAddParams(params);

		expect(current).toStrictEqual(expected);
	})

	it('should pass and return with the original params with single string separated with spaces', () => {
		const params = ['Todo Item'];
		const expected = ['Todo Item'];

		const current = validateAddParams(params);

		expect(current).toStrictEqual(expected);
	})

	it('should throw when multiple strings given', () => {
		const params = ['Todo Item', 'Other string'];

		expect(() => validateAddParams(params))
			.toThrow('Give a title as the only parameter in parenthesis.');
	})

	it('should throw when no params given.', () => {
		const params = [];

		expect(() => validateAddParams(params))
			.toThrow('Give a title as the only parameter in parenthesis.');
	})

	it('should throw when the param is not a string', () => {
		const params = [5];

		expect(() => validateAddParams(params))
			.toThrow('The title must be a non zero length string.');
	})

	it('should throw when the param is a zero length string', () => {
		const params = [''];

		expect(() => validateAddParams(params))
			.toThrow('The title must be a non zero length string.');
	})


})

describe('validateFindByIdParams', () => {
	it('should pass and return the parsed numeric value when valid ID is provided', () => {
		const params = ['5'];
		const expected = 5;

		const current = validateFindByIdParams(params);

		expect(current).toStrictEqual(expected);
	});

	it('should throw an error if more than one parameter is provided', () => {
		const params = ['5', '10'];

		expect(() => validateFindByIdParams(params)).toThrow('You must provide exactly one ID.');
	});

	it('should throw an error if no parameters are provided', () => {
		const params = [];

		expect(() => validateFindByIdParams(params)).toThrow('You must provide exactly one ID.');
	});

	it('should throw an error if the ID is not a number', () => {
		const params = ['abc'];

		expect(() => validateFindByIdParams(params)).toThrow('The ID must be a numeric value greater than 0.');
	});

	it('should throw an error if the ID is less than or equal to 0', () => {
		const params = ['-1'];

		expect(() => validateFindByIdParams(params)).toThrow('The ID must be a numeric value greater than 0.');
	});
});

/**
 * Tests for the validateFindByStatusParams function which validates the input parameters
 * for the findByStatus function.
 *
 * The validateFindByStatusParams function checks:
 * - If exactly one parameter is provided, returning the status if valid.
 * - If the provided status is either 'done' or 'not-done'.
 * - Throws an error if the parameter is missing or more than one parameter is provided.
 * - Throws an error if the status is invalid.
 */

describe('validateFindByStatusParams', () => {
	it('should return status if it is "done"', () => {
		const params = ['done'];
		const current = validateFindByStatusParams(params);
		expect(current).toBe('done');
	});

	it('should return status if it is "not-done"', () => {
		const params = ['not-done'];
		const current = validateFindByStatusParams(params);
		expect(current).toBe('not-done');
	});

	it('should throw an error if status is invalid', () => {
		const params = ['invalid'];
		expect(() => validateFindByStatusParams(params))
			.toThrow('Invalid status. Please use "done" or "not-done');
	});

	it('should throw an error if no status is provided', () => {
		const params = [];
		expect(() => validateFindByStatusParams(params))
			.toThrow('You must provide exactly one status (done/not-done).');
	});

	it('should throw an error if more than one status is provided', () => {
		const params = ['done', 'not-done'];
		expect(() => validateFindByStatusParams(params))
			.toThrow('You must provide exactly one status (done/not-done).');
	});
});