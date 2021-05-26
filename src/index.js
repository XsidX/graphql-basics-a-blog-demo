import { GraphQLServer } from 'graphql-yoga'

//working with arrays of custom types

//Demo user data
const users = [{
    id: '1',
    name: 'Sido',
    email: 'sid@example.com',
    age: '22'
},{
    id: '2',
    name: 'Garry',
    email: 'garry@example.com',
    age: '30'
},{
    id: '3',
    name: 'Shelly',
    email: 'shelly@example.com',
   
}]

const posts = [{
    id: '123',
    title: 'Make it',
    body: 'Making it as a startup founder in your 20s',
    published: true
}, {
        id: '1234',
        title: 'Saas companies',
        body: 'Why Saas companies prosper, get all the bits here',
        published: false
    }, {
        id: '1235',
        title: 'Founder Mentality',
        body: 'First and foremost, should you be the CEO?',
        published: false
    },
]

const typeDefs = `
    type Query{
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
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

        users(parent, args, ctx, info){
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
            })
        },

        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) =>{
                return post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
            })
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