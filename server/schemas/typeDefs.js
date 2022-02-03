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
    _id: ID!
    authors: String
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: [User]!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    me: User
  }

  type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  saveBook(authors: String, description: String, title: String, bookId: ID!, image: String, link: String!): User
  deleteBook(bookId: ID!): User
}
`;

module.exports = typeDefs;

// type Mutation {
//   login(email: String!, password: String!): Auth
  // addUser(username: String!, email: String!, password: String!): Auth
  // saveBook(authors: [authors]!, description: String!, title: String!, bookId: ID!, image: String!, link: : String!): User
//   removeBook(bookId: ID!): User
// }