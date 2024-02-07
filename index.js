const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.listen(5001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports.app = app;

const todos = [
    { id: 1, text: "Brush teeth", completed: false },
    { id: 2, text: "Pet dog", completed: false },
    { id: 3, text: "Make Coffee", completed: false },
    { id: 4, text: "Write code", completed: false },
];

app.get("/todos", function (req, res) {
    return res.send(todos);
});

app.get("/todos/:id", (req, res) => {
    let result = null;
    const id = req.params.id;

    todos.forEach((todo) => {
        todo.id == id ? (result = todo) : null;
    });

    return res.send(result);
});

app.post("/todos", (req, res) => {
    const newID = todos.length + 1;
    const newTodo = {
        id: newID,
        text: req.body.text,
        completed: req.body.completed,
    };
    todos.push(newTodo);
    return res.send(todos);
});

app.put("/todos", (req, res) => {
    let todoToUpdate = todos.find((todo) => {
        return todo.id == req.body.id;
    });

    todoToUpdate = {
        id: req.body.id,
        text: req.body.text,
        completed: req.body.completed,
    };

    let index = todos.findIndex((todo) => {
        return todo.id == req.body.id;
    });

    todos[index] = todoToUpdate;

    return res.send(todos);
});

app.delete("/todos/:id", function (req, res) {
    let index = todos.findIndex((todo) => {
        return todo.id == req.params.id;
    });

    todos.splice(index, 1);

    return res.send(todos);
});
