const mongoose = require('mongoose')

const schema = mongoose.Schema

const authorSchema = new schema({
    name: String,
    age: Number,
    // authorId: String
})

module.exports = mongoose.model('Author', authorSchema)