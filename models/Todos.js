const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

const TodoModel = mongoose.model('todos', TodoSchema);

module.exports = TodoModel;