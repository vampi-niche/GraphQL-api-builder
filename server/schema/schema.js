const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql

//dummy data

const book = [
    {name: 'book_1', genre: 'genre_1', id: '1'},
    {name: 'book_2', genre: 'genre_2', id: '2'},
    {name: 'book_3', genre: 'genre_3', id: '3'},

]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLString}},
            resolve(parent, args){
                //getData
                return book.find(e => e.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery})