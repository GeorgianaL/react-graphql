const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch');
// const typeDefs = require('./schemas/schema');

const baseURL = `https://jsonplaceholder.typicode.com`;

const typeDefs = `
  type Query {
    users: [user]
    posts: [post]
    getPost(id: Int!): post
  }
  type post {
    id: Int
    userId: Int
    title: String
    body: String
  }
  type user {
    id: Int
    name: String
    username: String
    email: String
  }
`;

const resolvers = {
  Query: {
    users: () => {
      return fetch(`${baseURL}/users`).then(res => res.json())
    },
    posts: () => {
      return fetch(`${baseURL}/posts`).then(res => res.json())
    },
    getPost: (parent, args) => {
      const { id } = args
      return fetch(`${baseURL}/posts/${id}`).then(res => res.json())
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
