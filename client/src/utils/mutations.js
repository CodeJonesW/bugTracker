import gql from "graphql-tag";

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

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BUG = gql`
  mutation saveBug($bugData: BugInput!) {
    saveBug(bugData: $bugData) {
      _id
      username
      email
      bugsReported {
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_BUG = gql`
  mutation removeBug($bugId: ID!) {
    removeBug(bugId: $bugId) {
      _id
      username
      email
      bugsReported {
        image
        description
        title
        link
      }
    }
  }
`;
