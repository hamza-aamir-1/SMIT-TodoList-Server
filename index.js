require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")

const TodoModel = require("./models/Todos")
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://root:root@cluster0.gh8v8b6.mongodb.net/todolist?retryWrites=true&w=majority")

app.get("/getTodos", (request, response) => {
    TodoModel.find({}, (err, result) => {
        if (!err) {
            response.json(result)
        } else {
            response.json(err)
        }
    })
})
app.post("/createTodo", async (req, res) => {
    const todo = req.body;
    const newTodo = new TodoModel(todo);
    await newTodo.save()

    res.json(todo)
})

// app.put("/updateTodo/:id", async (req, res) => {
//     const todos = req.body
//     TodoModel.findByIdAndUpdate(id, todos => {

//             // todos.save()

//             if (!err) {
//                 console.log(todos)
//                 todos.title = updated
//                 res.send("Todo has been successfully updated in DB")
//             } else {
//                 res.send("error updated in DB")
//             }
//     })
// })
app.put("/updateTodo", (req, res) => {
    
    const { id, title } = req.body
    try {
        TodoModel.findById(id, (err, todo) => {
            console.log(todo)
            todo.title = title
            todo.save()
            res.send("todo has been successfully updated in DB")
            console.log(todo)
        })
    }
    catch (err) {
        res.send("Getting error from server")
    }
})

app.delete("/deleteTodo/:id", async (req, res) => {
    const id = req.params.id

    await TodoModel.findByIdAndRemove(id).exec()
    res.send("Todo has been successfully deleted from DB")
})

const PORT = process.env.PORT || "8000"
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})