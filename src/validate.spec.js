import {
	validateAddParams,
	validateFindByIdParams,
	validateEditTitleParams,
} from "./validate";

describe("validateAddParams", () => {
	it("should pass and return with the original params with single string", () => {
		const params = ["Todo"];
		const expected = ["Todo"];

		const current = validateAddParams(params);

		expect(current).toStrictEqual(expected);
	});

	it("should pass and return with the original params with single string separated with spaces", () => {
		const params = ["Todo Item"];
		const expected = ["Todo Item"];

		const current = validateAddParams(params);

		expect(current).toStrictEqual(expected);
	});

	it("should throw when multiple strings given", () => {
		const params = ["Todo Item", "Other string"];

		expect(() => validateAddParams(params)).toThrow(
			"Give a title as the only parameter in parenthesis."
		);
	});

	it("should throw when no params given.", () => {
		const params = [];

		expect(() => validateAddParams(params)).toThrow(
			"Give a title as the only parameter in parenthesis."
		);
	});

	it("should throw when the param is not a string", () => {
		const params = [5];

		expect(() => validateAddParams(params)).toThrow(
			"The title must be a non zero length string."
		);
	});

	it("should throw when the param is a zero length string", () => {
		const params = [""];

		expect(() => validateAddParams(params)).toThrow(
			"The title must be a non zero length string."
		);
	});
});

describe("validateFindByIdParams", () => {
	it("should pass and return the parsed numeric value when valid ID is provided", () => {
		const params = ["5"];
		const expected = 5;

		const current = validateFindByIdParams(params);

		expect(current).toStrictEqual(expected);
	});

	it("should throw an error if more than one parameter is provided", () => {
		const params = ["5", "10"];

		expect(() => validateFindByIdParams(params)).toThrow(
			"You must provide exactly one ID."
		);
	});

	it("should throw an error if no parameters are provided", () => {
		const params = [];

		expect(() => validateFindByIdParams(params)).toThrow(
			"You must provide exactly one ID."
		);
	});

	it("should throw an error if the ID is not a number", () => {
		const params = ["abc"];

		expect(() => validateFindByIdParams(params)).toThrow(
			"The ID must be a numeric value greater than 0."
		);
	});

	it("should throw an error if the ID is less than or equal to 0", () => {
		const params = ["-1"];

		expect(() => validateFindByIdParams(params)).toThrow(
			"The ID must be a numeric value greater than 0."
		);
	});
});

describe("validateEditTitleParams", () => {
	it("should pass and return the params if id and newTitle is valid", () => {
		const params = ["1", "Something todo"];
		const expected = [1, "Something todo"];

		const current = validateEditTitleParams(params);

		expect(current).toStrictEqual(expected);
	});

	it("should throw an error if more than 2 parameter is provided", () => {
		const params = ["1", "Something todo", "something", "more"];

		expect(() => {
			validateEditTitleParams(params).toThrow(
				"You must provide an ID and a new title as parameters"
			);
		});
	});

	it("should throw an error if less than 2 parameter is provided", () => {
		const params = ["1"];

		expect(() => {
			validateEditTitleParams(params).toThrow(
				"You must provide an ID and a new title as parameters"
			);
		});
	});

	it("should throw an error if id is not a number", () => {
		const params = ["notNumber", "Something todo"];

		expect(() => {
			validateEditTitleParams(params).toThrow(
				"The ID must be a numeric value greater than 0"
			);
		});
	});

	it("should throw an error if id is less or equal 0", () => {
		const params = ["0", "Something todo"];

		expect(() => {
			validateEditTitleParams(params).toThrow(
				"The ID must be a numeric value greater than 0"
			);
		});
	});

	it("should throw an error if newTitle is not a string", () => {
		const params = ["1", "12"];

		expect(() => {
			validateEditTitleParams(params).toThrow(
				"The new title must be a string and has to be at least 1 character long"
			);
		});
	});

	it("should throw an error if newTitle's length less than 1", () => {
		const params = ["notNumber", ""];

		expect(() => {
			validateEditTitleParams(params).toThrow(
				"The new title must be a string and has to be at least 1 character long"
			);
		});
	});
});
