import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_BUG, SAVE_BUG } from "../utils/mutations";
// import { removeBookId } from "../utils/localStorage";

import Auth from "../utils/auth";

const SavedBugs = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBug, { error }] = useMutation(REMOVE_BUG);

  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBug = async (bookId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBug({
        variables: { bookId },
      });

      // upon success, remove book's id from localStorage
      //   removeBugId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      {console.log(userData)}
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s bugs!</h1>
          ) : (
            <h1>Login to view Bugs</h1>
          )}
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.bugsReported?.length
            ? `Viewing ${userData.bugsReported.length} saved ${
                userData.bugsReported.length === 1 ? "book" : "books"
              }:`
            : "No saved bugs!"}
        </h2>
        <CardColumns>
          {userData.bugsReported?.map((bug) => {
            return (
              <Card key={bug.bugId} border="dark">
                {bug.image ? (
                  <Card.Img
                    src={bug.image}
                    alt={`The cover for ${bug.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{bug.title}</Card.Title>
                  <p className="small">Authors: {bug.authors}</p>
                  <Card.Text>{bug.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBug(bug.bugId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBugs;
