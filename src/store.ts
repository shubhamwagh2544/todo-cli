import { readFileSync, writeFileSync, existsSync } from "fs";

export type Todo = {
    id: number;
    text: string;
    done: boolean;
};

const FILE = "todos.json";

function fetchTodos(): Todo[] {
    if (!existsSync(FILE)) {
        return [];
    }
    return JSON.parse(readFileSync(FILE, "utf8"));
}

function saveTodos(todos: Todo[]) {
    writeFileSync(FILE, JSON.stringify(todos, null, 2));
}

export {
    fetchTodos,
    saveTodos
}
