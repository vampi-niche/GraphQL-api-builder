const express = require('express')
const graphqlHttp = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHttp({
    schema,
    graphiql:true

}))

app.listen(4001,()=>{
    console.log('Listening on :4001')
})