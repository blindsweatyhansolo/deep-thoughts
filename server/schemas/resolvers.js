// GRAPHQL RESOLVERS //
const { User, Thought } = require('../models');

// BP: methods get the same name of the query/mutation they are resolvers for
const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },

    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },

    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    }
  }
};

module.exports = resolvers;

// NOTES //
/** resolvers can accept four arguments (IN ORDER)
 * parent: used for nested resolvers to handle complicated actions
 * args: object of all values passed into a query/mutation request as parameters
 * context: object that allows for the same data to be accessible by all resolvers (logged in
 * status or API access token)
 * info: contains extra information about an opertations current state (advanced)
 */