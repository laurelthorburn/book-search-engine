const { gql } = require('apollo-server-express');

//savedBooks = this will be an array of the Book type

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    title: String
    image: image
    link: String
  }

  type Auth {
    token: [Thought]!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [authors]!, description: String!, title: String!, bookId: ID!, image: String!, link: : String!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;

