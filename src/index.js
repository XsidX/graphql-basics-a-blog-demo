import { GraphQLServer } from 'graphql-yoga'

//Type definitions [schema]--->operations and datastructures
// Scalar types----->String, Boolean, Int, Float, ID
const typeDefs = `
    type Query{
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`
    

//Resolvers----->set of functions that run, query data

const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        name() {
            return 'Sido'
        },
        age() {
            return 22
        },
        employed() {
            return true
        },
        gpa() {
            return null
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() =>{
    console.log('The server is up! on localhost:4000...')
}) 