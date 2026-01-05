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

program
    .command("list")
    .description("List all todos")
    .action(() => {
        const todos = fetchTodos();
        if (todos.length === 0) {
            return console.log("No todos found.");
        }

        todos.forEach((t) => {
            console.log(`${t.done ? "[✓]" : "[✕]"} ${t.id} - ${t.text}`);
        });
    });

program
    .command("done <id>")
    .description("Mark a todo as done")
    .action((id: string) => {
        const todos = fetchTodos();
        const todo = todos.find((t) => t.id === Number(id));

        if (!todo) {
            return console.log("Todo not found.");
        }

        todo.done = true;
        saveTodos(todos);

        console.log("Completed:", todo.text);
    });

program
    .command("delete <id>")
    .description("Delete a todo")
    .action((id: string) => {
        let todos = fetchTodos();
        /*
        const index = todos.findIndex(todo => todo.id === Number(id))
        if (index === -1) {
            console.log("Todo not found.");
        } else {
            todos.splice(index, 1)
            saveTodos(todos)
        }
        */
        const before = todos.length;
        todos = todos.filter((t) => t.id !== Number(id));
        saveTodos(todos);

        if (todos.length === before) {
            console.log("Todo not found.");
        } else {
            console.log("Removed todo:", id);
        }
    });

program.parse();
