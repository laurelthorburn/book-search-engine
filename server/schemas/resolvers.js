//define the query and mutation functionality to work with the mongoose models
// use the functionality in the user-controller.js as a guide
// in models there is both a User and a Book

const { User } = require('../models');
// didnt call Book because Book is a subdocument of the User
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

//need the following: 1. createUser (DONE), 2. getSingleUser (DONE), 3. saveBook (MAYBE DONE), 4. deleteBook (DONE), 5. login (HOW AND WHERE)


const resolvers = {
  Query: {
//getSingleUser
    me: async (parent, args, context) => {
      return User.findOne({ _id: userId });
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
        {
          $addToSet: { savedBooks: bookData },
        },
        {
          new: true,
        }
      );
      }
    },

    //deleteBook
    deleteBook: async (parent, { bookId }, context) => {
      if(context.user){
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      }
    },

//login user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

  },
};

module.exports = resolvers;
