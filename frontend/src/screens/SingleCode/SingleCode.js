import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen.js";
import axios from "axios";
import {useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCodeAction, updateCodeAction } from "../../actions/codeActions.js";
import ErrorMessage from "../../components/ErrorMessage.js";
import Loading from "../../components/Loading.js";
import ReactMarkdown from "react-markdown";

function SingleCode({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const codeUpdate = useSelector((state) => state.codeUpdate);
  const { loading, error } = codeUpdate;

  const navigate = useNavigate();
  
  const codeDelete = useSelector((state) => state.codeDelete);
  const { loading: loadingDelete, error: errorDelete } = codeDelete;
  
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCodeAction(id));
    }
    navigate("/mycodes");
  };
const { id } = useParams();

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/codes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateCodeAction(id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate("/mycodes");
  };

  return (
    <MainScreen title="Edit a Code Block">
      <Card>
        <Card.Header>Edit your Code</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content" className="mt-4">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the Syntax"
                style={{fontSize: "15px", lineHeight: "13px"}}
                rows={30}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Code Preview</Card.Header>
                <Card.Body style={{fontSize: "12px", lineHeight: "3px"}}>
                  <code><ReactMarkdown>{content}</ReactMarkdown></code>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content" className="mt-4">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit" className="mt-4">
              Update Code
            </Button>
            <Button
              className="mx-2 mt-4"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleCode;