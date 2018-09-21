
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Person with an user account',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {type: GraphQLString},
    id: {type: GraphQLString},
    username: {type: GraphQLString},
  }),
});

const fetchUsers = () => fetch(`${baseURL}/users`).then(res => res.json());

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: root => fetchUsers,
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => // Fetch the person with ID `args.id`,
    },
  });
