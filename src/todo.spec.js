import { jest } from '@jest/globals';
import { add, findById, format, formatList, list, complete, findTodoByTitle, editTitle } from './todo.js';

function createMockStore(data) {
    return {
        get: jest.fn(() => data),
        set: jest.fn(),
    };
}

describe("format", () => {
    it("should format a not done todo", () => {
        const todo = { title: "todo title", id: 1, done: false };
        const expected = "1 - [ ] todo title";

        const current = format(todo);

        expect(current).toStrictEqual(expected);
    });

    it("should format a done todo", () => {
        const todo = { title: "todo title", id: 1, done: true };
        const expected = "1 - [x] todo title";

        const current = format(todo);

        expect(current).toStrictEqual(expected);
    });
});

describe("formatList", () => {
    it("should format a list of todos", () => {
        const todos = [
            { title: "todo title", id: 1, done: true },
            { title: "todo title 2", id: 2, done: false },
        ];
        const expected = ["1 - [x] todo title", "2 - [ ] todo title 2"];
        const current = formatList(todos);

        expect(current).toStrictEqual(expected);
    });
    it("should return an empty list, if an empty list is given", () => {
        const todos = [];
        const expected = [];

        const current = formatList(todos);

        expect(current).toStrictEqual(expected);
    });
});

describe("list", () => {
    it("should list the todos", () => {
        const mockStore = createMockStore([
            { id: 1, title: "Todo 1", done: false },
            { id: 2, title: "Todo 2", done: true },
        ]);
        const expected = [
            { id: 1, title: "Todo 1", done: false },
            { id: 2, title: "Todo 2", done: true },
        ];

        const current = list(mockStore);

        expect(current).toStrictEqual(expected);
    });

    it("should return an empty list, if nothing is stored", () => {
        const mockStore = createMockStore([]);
        const expected = [];

        const current = list(mockStore);

        expect(current).toStrictEqual(expected);
    });
});

describe("add", () => {
    it("should add a new todo to an empty store, done false, id is 1", () => {
        const params = ["New Todo"];
        const mockStore = createMockStore([]);
        const expected = {
            id: 1,
            done: false,
            title: "New Todo",
        };

        const current = add(mockStore, params);

        expect(current).toStrictEqual(expected);
        expect(mockStore.set.mock.calls[0][0]).toStrictEqual([expected]);
    });

    it("should append a new todo to the existing items", () => {
        const params = ["New Todo"];
        const stored = [{ id: 1, title: "Todo 1", done: true }];
        const mockStore = createMockStore(stored);
        const expected = {
            id: 2,
            done: false,
            title: "New Todo",
        };

        const current = add(mockStore, params);

        expect(current).toStrictEqual(expected);
        expect(mockStore.set.mock.calls[0][0]).toStrictEqual([...stored, expected]);
    });

    it("should calculate the id by max id + 1, missing ids in a sequence", () => {
        const params = ["New Todo"];
        const stored = [
            { id: 2, title: "Todo 1", done: true },
            { id: 4, title: "Todo 1", done: true },
        ];
        const mockStore = createMockStore(stored);
        const expected = {
            id: 5,
            done: false,
            title: "New Todo",
        };

        const current = add(mockStore, params);

        expect(current).toStrictEqual(expected);
        expect(mockStore.set.mock.calls[0][0]).toStrictEqual([...stored, expected]);
    });
});

describe("find-by-id", () => {
    it("should return the todo item a valid ID is provided", () => {
        const mockStore = createMockStore([
            { id: 1, title: "Todo 1", done: false },
            { id: 2, title: "Todo 2", done: true },
        ]);
        const id = 1;
        const expected = { id: 1, title: "Todo 1", done: false };
        const current = findById(mockStore, id);
        expect(current).toStrictEqual(expected);
    });
});

describe('complete', () => {
    it('should complete the todo if ID is found', () => {
        const mockTodos = createMockStore([
            { id: 1, title: "First task", done: false },
            { id: 2, title: "Second task", done: false }
        ]);
        const id = 2;

        const expected = { id: 2, title: "Second task", done: true };
        const actual = complete(mockTodos, id);

        expect(actual).toStrictEqual(expected);
    });
});

describe("find-by-title", () => {
    it("should return the todos which titles are matching or contains the given parameter", () => {
        const mockStore = createMockStore([
            { id: 1, title: "Todo 1", done: true },
            { id: 2, title: "Todo 2", done: false },
            { id: 3, title: "Todo 2 something", done: false },
            { id: 4, title: "something", done: false },
        ]);

        const current = findTodoByTitle(mockStore, "todo");
        const expected = [
            { id: 1, title: "Todo 1", done: true },
            { id: 2, title: "Todo 2", done: false },
            { id: 3, title: "Todo 2 something", done: false },
        ];
        expect(current).toStrictEqual(expected);
    });
});

describe("edit-title", () => {
    it("should return the edited todo", () => {
        const mockStore = createMockStore([
            { id: 1, title: "Todo 1", done: false },
            { id: 2, title: "Todo 2", done: true },
        ]);

        const id = 1;
        const newTitle = "Something Todo";
        const expected = { id: 1, title: "Something Todo", done: false };
        const current = editTitle(mockStore, id, newTitle);
        expect(current).toStrictEqual(expected);
    });

    it("should edit the todos file", () => {
        const stored = [
            { id: 1, title: "Todo 1", done: false },
            { id: 2, title: "Todo 2", done: true },
        ];
        const mockStore = createMockStore(stored);

        const id = 1;
        const newTitle = "Something Todo";
        const expected = [
            { id: 1, title: "Something Todo", done: false },
            { id: 2, title: "Todo 2", done: true },
        ];
        editTitle(mockStore, id, newTitle);
        expect(mockStore.set.mock.lastCall).toStrictEqual([expected]);
    });
});
