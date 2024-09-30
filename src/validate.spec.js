import { validateAddParams, validateFindByTitleParams } from "./validate";

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

describe("findvalidateFindByTitleParams", () => {
	//true
	it("should be successfull when valid title was given", () => {
		const param = ["Todo1"];
		const expected = "Todo1";

		const current = validateFindByTitleParams(param);
		expect(current).toStrictEqual(expected);
	});

	//0 parameter
	it("should throw an Error if the parameter is less or more than 1", () => {
		const param = [""];
		expect(() =>
			validateFindByTitleParams(param).toThrow(
				"You have to give exactly one parameter as a title!"
			)
		);
	});

	//more than 1 parameter
	it("should throw an Error if the parameter is less or more than 1", () => {
		const params = ["todo1", "todo2"];
		expect(() =>
			validateFindByTitleParams(params).toThrow(
				"You have to give exactly one parameter as a title!"
			)
		);
	});

	//parameter is not a string
	it("should throw an error if the title is not a string", () => {
		const params = [7];
		expect(() =>
			validateFindByTitleParams(params).toThrow(
				"The title has to be a string or atleast 3 character long."
			)
		);
	});

	//parameter is less then 3 character
	it("should throw an error if the title is less than 3 character", () => {
		const params = ["To"];
		expect(() =>
			validateFindByTitleParams(params).toThrow(
				"The title has to be a string or atleast 3 character long."
			)
		);
	});
});
