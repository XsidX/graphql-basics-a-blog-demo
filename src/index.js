import { GraphQLServer } from 'graphql-yoga'

//Type definitions [schema]--->operations ans datastructures

const typeDefs = `
    type Query{
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`
    

//Resolvers----->set of functions that run, query data

const resolvers = {
    Query: {
        hello() {
            return 'This is my first query'
        },
        name() {
            return 'Sidney Kaguli'
        },
        location() {
            return 'Nairobi'
        },
        bio() {
            return 'Startup founder'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() =>{
    console.log('The server is up!')
}) 