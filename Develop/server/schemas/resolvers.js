const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-password')
            return userData;
        }
        throw new AuthenticationError ('You are not logged in')
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne(
        { email },
      );
      if (!user) {
        throw new AuthenticationError ('Your username or password is invalid!')
      }
      const userPassword = await user.isCorrectPassword(password)
      if (!userPassword) {
        throw new AuthenticationError ('Your username or password is invalid!')
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
        if (context.user) {
            const updateUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }
            );
            return updateUser;
        }
        throw new AuthenticationError ('You are not logged in')
    },
    removeBook: async (parent, { bookId }, context) =>{
        if (context.user) {
            const updateUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
            return updateUser;
        }
        throw new AuthenticationError ('You are not logged in')
    }
  },
};

module.exports = resolvers;