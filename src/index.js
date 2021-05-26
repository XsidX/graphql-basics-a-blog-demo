import { GraphQLServer } from 'graphql-yoga'

//working with arrays of scalar types
const typeDefs = `
    type Query{
        greeting( name: String, position: String ): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
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
        greeting(parent,args,ctx,info) {
            if(args.name && args.position){
                return `Hello, ${args.name}! You are my favourite ${args.position}`
            }else{
                return 'Hello'
            }
            
        },
        add(parent, args, ctx, info){
            if(args.numbers.length===0){
                return 0
            }

            //[1, 5, 10, 2]
            return args.numbers.reduce((accumulator, current) =>{
                return accumulator + current
            })
        },
        grades(parent, args, ctx, info) {
            return [90, 80, 97]
        },
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