const Subscription = {
    count: {
        subscribe(paremt, args, { pubsub }, info) {
            let count = 0

            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count    //object/property shorthand
                })
            }, 1000)

            return pubsub.asyncIterator('count')
        }
    }
}

export { Subscription as default}