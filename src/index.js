import { GraphQLServer } from 'graphql-yoga'

//custom types
const typeDefs = `
    type Query{
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String
        age: Int!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`
    

//Resolvers----->set of functions that run, query data

const resolvers = {
    Query: {
       me() {
           return {
               id: '123098',
               name: 'sid',
            //    email: 'sid2example.com',
               age: 22
           }
       },

       post() {
            return {
                id: '123',
                title: 'Make it',
                body: 'Making it as a startup founder in your 20s',
                published: false
            }
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