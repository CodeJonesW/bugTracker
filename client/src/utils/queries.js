import gql from "graphql-tag";

export const QUERY_ME = gql`
  {
    me {
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
