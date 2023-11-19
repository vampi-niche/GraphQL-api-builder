const express = require('express')
const graphqlHttp = require('express-graphql').graphqlHTTP

const app = express()

app.use('/graphql', graphqlHttp({

}))

app.listen(4000,()=>{
    console.log('Listening on :4000')
})