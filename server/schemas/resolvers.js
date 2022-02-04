//define the query and mutation functionality to work with the mongoose models
// use the functionality in the user-controller.js as a guide
// in models there is both a User and a Book

const { User } = require('../models');
// didnt call Book because Book is a subdocument of the User

//need the following: 1. createUser (DONE), 2. getSingleUser (DONE), 3. saveBook (MAYBE DONE), 4. deleteBook (DONE), 5. login (HOW AND WHERE)


const resolvers = {
  Query: {
    books: async () => {
      return Book.find().sort({ createdAt: -1 });
    },
//getSingleUser
    me: async (parent, args, context) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    //createUser
    createUser: async (parent, { username, email, password }) => {
      return User.create({ username, email, password });
    },
    //saveBook
    saveBook: async (parent, { bookId, authors, description, image, link, title }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { bookId: { _id } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    // deleteBook: async (parent, { thoughtId }) => {
    //   return Thought.findOneAndDelete({ _id: thoughtId });
    // },
    //deleteBook
    deleteBook: async (parent, { userId, bookId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { _id: bookId } } },
        { new: true }
      );
    },
  },
};

//NEED LOGIN

module.exports = resolvers;
