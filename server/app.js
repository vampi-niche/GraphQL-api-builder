const express = require('express')
const graphqlHttp = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')

const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb+srv://vamliniche:Test_Vamlil@learning-graphql-mongod.xehkic4.mongodb.net/')

mongoose.connection.once('open', ()=>{

    console.log("connected to databse")
})

app.use('/graphql', graphqlHttp({
    schema,
    graphiql:true

}))

app.listen(4001,()=>{
    console.log('Listening on :4001')
})