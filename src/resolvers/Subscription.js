const Subscription = {

    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info) {
            const post = db.posts.find((post) => post.id === postId && post.published)
        
            if(!post) {
                throw new Error('Post not found!')
            }

            return pubsub.asyncIterator(`comment ${postId}`)
        
        }
    },

    post: {
        subscribe(parent, { userId }, { db, pubsub }, info) {
            const user = db.users.find((user) => user.id === userId)

            if(!user) {
                throw new Error('User not found!')
            }

            return pubsub.asyncIterator(`post ${userId}`)


        }
    }
}

export { Subscription as default}