const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')
const author = require('../models/author')


const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql

//dummy data

// const books = [
//     {name: 'book_1', genre: 'genre_1', id: '1', authorId: '1'},
//     {name: 'book_2', genre: 'genre_2', id: '2', authorId: '2'},
//     {name: 'book_3', genre: 'genre_3', id: '3', authorId: '3'},
//     {name: 'book_4', genre: 'genre_4', id: '4', authorId: '2'},
//     {name: 'book_5', genre: 'genre_5', id: '5', authorId: '3'},
//     {name: 'book_6', genre: 'genre_6', id: '6', authorId: '3'},


// ]

// const authors = [
//     {name: 'author_1', age: 21, id: '1'},
//     {name: 'author_2', age: 22, id: '2'},
//     {name: 'author_3', age: 23, id: '3'},

// ]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent, args){
                //return authors.find(e => e.id === parent.authorId) // parent is book containing authorID that needs to be searched in match with author's id
                return Author.findById(parent.authorId)
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
                //return books.filter(e => e.authorId === parent.id) // parent is author containing id that needs to be matched with book's author id
                return Book.find({ authorId: parent.id})
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
                //return books.find(e => e.id === args.id)
                return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                //getData
               // return authors.find(e => e.id === args.id)
               return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return books
                return Book.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
               // return authors
               return author.find({})
            }
        }

    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor: {
            type: AuthorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parents, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})