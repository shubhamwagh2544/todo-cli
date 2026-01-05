import {program} from 'commander';
import {fetchTodos, saveTodos} from "./store.ts";

program
    .name('TodoApp')
    .description('Todo CLI Application')
    .version('1.0.0')

program
    .command('add <text>')
    .description('add a new todo')
    .action((text: string) => {
        const todos = fetchTodos();

        const todo = {
            id: Date.now(),
            text,
            done: false,
        };

        todos.push(todo);
        saveTodos(todos);

        console.log("Added:", todo.text);
    })

program.parse();
