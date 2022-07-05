// GRAPHQL TYPE DEFINITIONS //
// Defines every piece of data the client can expect to work with through query/mutation

// import the gql tagged template function (advanced use of template literals, allows for
// the parsing of template literals with a function)
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
`;

// export the typeDefs
module.exports = typeDefs;

// NOTES: //
/**
 * The use of ! after type definition in query means the data MUST exist before that
 * query can be carried out, otherwise an error is thrown and the query won't ever reach
 * the associated resolver function
 */