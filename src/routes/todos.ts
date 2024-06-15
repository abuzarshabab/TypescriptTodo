import { Router } from "express";
import { Todo } from "../models/todo";
import { ObjectId } from "mongodb";

const router = Router();
let todos: Array<Todo> = []

router.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to the home page"})
})

router.post('/todo', (req, res) => {
  console.log(req.body)
  const body = req.body;

  const newTodo: Todo = {
    id: new ObjectId().toString(),
    name: body.name,
    date: new Date(),
    isCompleted: false,
  }

  todos.push(newTodo)
  res.status(201).json({ data: newTodo, messsage: "Todo inserted successfull" })
})

router.get('/todo', (req, res, next) => {
  res.status(200).json({ data: todos, messsage: "Todos fetched successfully" })
}) 

router.patch('/todo/:todoId', (req, res, next) => {
  const todoId = req.params.todoId;
  let matchedTodo: Todo;

  for (let todo of todos) {
    if (todo.id == todoId) {
      console.log(todo)
      todo.isCompleted = true;
      matchedTodo = todo;
    }
  }

  res.status(201).json({ messsage: "Task marked completed" })
})


router.put('/todo/:todoId', (req, res, next) => {
  const todoId = req.params.todoId;

  const todoIndex = todos.findIndex(todo => todo.id == todoId)

  if (!todoIndex) {
    return res.status(404).json({ messsage: "Could Not found" })
  }

  todos[todoIndex].name = req.body.name;

  res.status(201).json({ messsage: "Modified",  todo: todos[todoIndex] })
});

router.delete('/todo/:todoId', (req, res, next) => {
  const todoId = req.params.todoId;

  todos = todos.filter(todo => todo.id !== todoId);
  res.status(2000).json({ messsage: "Modified",  todos });
})



export default router;
