const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
//getSingleUser
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Apologies but you are not logged in");
    },
  },

  Mutation: {
    //createUser
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    //saveBook
    saveBook: async (parent, { bookData }, context) => {
      if(context.user){
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: bookData }},
        { new: true, runValidators: true}
      );
      }
    },

    //deleteBook
    deleteBook: async (parent, { bookId }, context) => {
      if(context.user){
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      }
    },

//login user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Nope, try again');
      }

      const token = signToken(user);
      return { token, user };
    },

  },
};

module.exports = resolvers;
