const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql

//dummy data

const books = [
    {name: 'book_1', genre: 'genre_1', id: '1', authorId: '1'},
    {name: 'book_2', genre: 'genre_2', id: '2', authorId: '2'},
    {name: 'book_3', genre: 'genre_3', id: '3', authorId: '3'},
    {name: 'book_4', genre: 'genre_4', id: '4', authorId: '2'},
    {name: 'book_5', genre: 'genre_5', id: '5', authorId: '3'},
    {name: 'book_6', genre: 'genre_6', id: '6', authorId: '3'},


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
        genre:{type:GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent, args){
                return authors.find(e => e.id === parent.id)
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return books.filter(e => e.authorId === parent.id)
            }
        }
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