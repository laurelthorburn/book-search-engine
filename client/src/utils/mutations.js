import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createUser($userId: ID!, $username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      User {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: ID!, $authors: String, $description: String, $title: String, $image: String, $link: String) {
    saveBook(userId: $userId) {
      _id
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(book: $bookId) {
      _id
      name
      books
    }
  }
`;
