const express = require('express')
const graphqlHttp = require('express-graphql').graphqlHTTP
const dotenv = require('dotenv');
const schema = require('./schema/schema')

const mongoose = require('mongoose')

const app = express()
dotenv.config();

mongoose.connect(process.env.MongoDB_URI)

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