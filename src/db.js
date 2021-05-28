const users = [{
    id: '1',
    name: 'Sido',
    email: 'sid@example.com',
    age: '22'
}, {
    id: '2',
    name: 'Garry',
    email: 'garry@example.com',
    age: '30'
}, {
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
    published: true,
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

const db = {
    users,
    posts,
    comments
}

export { db as default }