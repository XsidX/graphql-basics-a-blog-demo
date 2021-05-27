import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuidv4 } from 'uuid';

//Mutation--->create
// The input Type

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
    published: true,
    author: '1',
    
}, {
        id: '1234',
        title: 'Saas companies',
        body: 'Why Saas companies prosper, get all the bits here',
        published: false,
    author: '1',
    
    }, {
        id: '12345',
        title: 'Founder Mentality',
        body: 'First and foremost, should you be the CEO?',
        published: false,
    author: '2',
  
    },
]

const comments = [{
    id: 'c1',
    text: 'Great perspective right there',
    author: '1',
    post: '123'
    }, {
        id: 'c2',
        text: 'This is the best thing I have read today',
    author: '1',
    post: '123'
    }, {
        id: 'c3',
        text: 'Oh, who knew thaaaat!!',
    author: '2',
    post: '1234'
    }, {
        id: 'c4',
        text: 'Just wow...',
    author: '3',
    post: '12345'
    },]



const typeDefs = `
    type Query{
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
       
    }

    type Mutation {
        createUser(data: CreateUserInput): User!
        createPost(data: CreatePostInput): Post!
        createComment(data: CreateCommentInput): Comment!
    }

    input CreateUserInput {
        name: String!,
        email: String!,
        age: Int
    }

    input CreatePostInput {
        title: String!,
        body: String!,
        published: Boolean!,
        author: ID!
    }

    input CreateCommentInput {
        text: String!,
        author: ID!,
        post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]

    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]
        
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
        
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
        
       comments(parent, args, ctx, info) {
           return comments
       }
       
    },

    Mutation: {

        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => {
                return user.email === args.data.email
            })

            if(emailTaken) {
                throw new Error('Email taken.')
            }

            const user ={
                id: uuidv4(),
                ...args.data

            }

            users.push(user)
            return user

        },

        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)
            if(!userExists) {
                throw new Error('User not Found')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)
            return post

            
        },

        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)
            const postExists = posts.some((post) => post.id === args.data.post)

            if(!userExists){
                throw new Error('User not Found!')
            }else if(!postExists){
                throw new Error('Post not Found!')
            }

            const comment = {  
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)
            return comment
        }
    },


    Post: {
        author(parent, args, ctx, info){
            return users.find((user) =>{
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }

    },
    User: {
        posts(parent, args, ctx, info){
            return posts.filter((post) =>{
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },

    


}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() =>{
    console.log('The server is up! on localhost:4000...')
}) 