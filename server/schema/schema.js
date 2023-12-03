const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql

//dummy data

const books = [
    {name: 'book_1', genre: 'genre_1', id: '1'},
    {name: 'book_2', genre: 'genre_2', id: '2'},
    {name: 'book_3', genre: 'genre_3', id: '3'},

]

const authors = [
    {name: 'author_1', age: 21, id: '1'},
    {name: 'author_2', age: 22, id: '2'},
    {name: 'author_3', age: 23, id: '3'},

]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})
const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                //getData
                return books.find(e => e.id === args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                //getData
                return authors.find(e => e.id === args.id)
            }
        }

    }
})

module.exports = new GraphQLSchema({query: RootQuery})