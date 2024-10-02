import { jest } from '@jest/globals';
import { validateAddParams, validateFindByIdParams, validateId, validateFindByTitleParams, validateEditTitleParams } from "./validate";

function createMockStore(data) {
  return {
    get: jest.fn(() => data),
    set: jest.fn()
  }
}

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

describe('validateId', () => {
  it('should pass and return with the parsed ID when valid number is provided', () => {
    const mockTodos = createMockStore([
      { id: 1, title: "First task", done: false },
      { id: 2, title: "Second task", done: false }
    ]);
    const id = ['1'];

    const expected = 1;
    const actual = validateId(mockTodos, id);

    expect(actual).toStrictEqual(expected);
  });

  it('should throw an error if the ID is not a number', () => {
    const mockTodos = createMockStore([
      { id: 1, title: "First task", done: false },
      { id: 2, title: "Second task", done: false }
    ]);
    const id = ['one'];

    expect(() => validateId(mockTodos, id).toThrow('The id must be a number.'));
  });
  
  it('should throw an error if the ID is not a positive number', () => {
    const mockTodos = createMockStore([
      { id: 1, title: "First task", done: false },
      { id: 2, title: "Second task", done: false }
    ]);
    const id = ['-1'];

    expect(() => validateId(mockTodos, id).toThrow('The id must be a number greater than zero.'));
  });

  it('should throw an error if the ID is not found in the todos list', () => {
    const mockTodos = createMockStore([
      { id: 1, title: "First task", done: false },
      { id: 2, title: "Second task", done: false }
    ]);
    const id = ['3'];

    expect(() => validateId(mockTodos, id).toThrow('Todo not found by ID.'));
  });

  it('should throw an error if there is more than one ID provided', () => {
    const mockTodos = createMockStore([
      { id: 1, title: "First task", done: false },
      { id: 2, title: "Second task", done: false }
    ]);
    const id = ['1', '2'];

    expect(() => validateId(mockTodos, id).toThrow('Please provide exactly one ID!'));
  });

  it('should throw an error if no ID is provided', () => {
    expect(() => validateId(mockTodos, id).toThrow('Please provide exactly one ID!'));
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
})
