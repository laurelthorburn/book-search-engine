const { gql } = require('apollo-server-express');

//savedBooks = this will be an array of the Book type
// ! means this field value can never be bull
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    #users: [User]
    #user(username: String!): User
    #books(username: String): [Book]
    me: User
  }

  #input type to handle all these parameters

  input BookInput {
  authors: [String]
  description: String
  title: String
  bookId: ID!
  image: String
  link: String
}

  type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  saveBook(bookData: BookInput!): User
  deleteBook(bookId: ID!): User
  login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
