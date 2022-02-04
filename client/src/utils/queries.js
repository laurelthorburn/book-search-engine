import { gql } from '@apollo/client';

//is it GET_ME or QUERY_ME, bc QUERY = GET

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks{
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;


