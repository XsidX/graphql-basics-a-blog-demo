import { v4 as uuidv4 } from 'uuid'

//Enum
//1. A special type that defines a set of constants.
//2. This type can be used as the type for a field( similar to scalar and custom types)
//3. Values for the field must be one of the constants for the type


//UserRole ---standard, editor, admin

// type User{
//     role: UserRole!
// }


const Mutation = {

    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some((user) => {
            return user.email === args.data.email
        })

        if (emailTaken) {
            throw new Error('Email taken.')
        }

        const user = {
            id: uuidv4(),
            ...args.data

        }

        db.users.push(user)
        return user

    },

    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if (userIndex === -1) {
            throw new Error('User not found!')
        }

        const deletedUsers = users.splice(userIndex, 1)

        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id

            if (match) {
                db.comments = db.comments.filter((comment) => comment.post !== post.id)
            }

            return !match

        })

        db.comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUsers[0]
    },
    //destructure args
    updateUser(parent, { id, data }, { db }, info) {

        const user = db.users.find((user) => user.id === id)

        if(!user) {
            throw new Error( 'User not Found!' )
        }

        if (typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email)

            if (emailTaken) {
                throw new Error( 'Email taken' )
            }


            user.email = data.email
        }

        if (typeof data.name === 'string') {
            user.name = data.name
        }

        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user
    },

    createPost(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        if (!userExists) {
            throw new Error('User not Found')
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        if(args.data.published === true){
        pubsub.publish('post', {
            post: {
                mutation: 'CREATED',
                data: post
            }
        })
        }

        return post


    },

    deletePost(parent, args, { db, pubsub }, info) {

        const postIndex = db.posts.findIndex((post) => post.id === args.id)

        if (postIndex === -1) {
            throw new Error('Post not found!')
        }

        const [post] = db.posts.splice(postIndex, 1)

        db.comments = db.comments.filter((comment) => comment.post !== args.id)

        if (post.published) {
            pubsub.publish('post', {  
                post: {
                    mutation: 'DELETED',
                    data: post
                }
            })
        }


        return post

    },

    updatePost(parent, { id, data }, { db, pubsub }, info ) {
        const post = db.posts.find((post) => post.id === id)
        const originalPost = { ...post }
        if(!post) {
            throw new Error( "Post not Found!" )
        }
        if(typeof data.title === 'string'){
        post.title = data.title
        }

        if (typeof data.body === 'string'){
        post.body = data.body
        }

        if (typeof data.published === 'boolean'){
            post.published= data.published
        
        
            if(originalPost.published && !post.published) {
                //deleted

                pubsub.publish('post', {
                    post: {
                        mutation: 'DELETED',
                        data: originalPost

                    }
                })
            } else if(!originalPost.published && post.published) {
                //created
                pubsub.publish('post', {
                    post: {
                        mutation: 'CREATED',
                        data: post
                    }
                })
            }
            
        }else if(post.published) {
            //updated

            pubsub.publish('post', {
                post: {
                    mutation: 'UPDATED',
                    data: post
                }
            })
        }
        return post
    },


    createComment(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)
        const postExists = db.posts.some((post) => post.id === args.data.post)

        if (!userExists) {
            throw new Error('User not Found!')
        } else if (!postExists) {
            throw new Error('Post not Found!')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)
        pubsub.publish(`comment ${args.data.post}`, {
            comment: {
                mutation: "CREATED",
                data: comment
            }
        }) 

        return comment
    },

    updateComment(parent, { id, data}, { db, pubsub }, info) {
        const comment = db.comments.find((comment) => comment.id === id)

        if(!comment){
            throw new Error("Comment not Found!")
        }

        if(typeof data.text === 'string'){
        comment.text = data.text
        }

        pubsub.publish(`comment ${comment.post}`, {
            comment: {
                mutation: "UPDATED",
                data: comment
            }
        })

        return comment
        
    },

    deleteComment(parent, args, { db, pubsub }, info) {
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if (commentIndex === -1) {
            throw new Error('Comment not found!')
        }

        const { commentDeleted } = db.comments.splice(commentIndex, 1)
        pubsub.publish(`comment ${commentDeleted.post}`, {
            comment: {
                mutation: "DELETED",
                data: commentDeleted
            }
        })
        return commentDeleted

    }
}

export { Mutation as default }