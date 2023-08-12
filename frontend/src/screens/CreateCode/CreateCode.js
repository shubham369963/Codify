import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen.js";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createCodeAction } from "../../actions/codeActions.js";
import Loading from "../../components/Loading.js";
import ErrorMessage from "../../components/ErrorMessage.js";
import ReactMarkdown from "react-markdown";
import {useNavigate} from 'react-router-dom';

function CreateCode({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const codeCreate = useSelector((state) => state.codeCreate);
  const { loading, error, code } = codeCreate;

  console.log(code);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createCodeAction(title, content, category));
    resetHandler();
    navigate("/mycodes");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Code Block">
      <Card>
        <Card.Header>Create a New Code Block</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content" className="mt-4">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                style={{fontSize: "15px", lineHeight: "13px"}}
                placeholder="Enter the Syntax"
                rows={30}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Code Preview</Card.Header>
                <Card.Body style={{fontSize: "12px", lineHeight: "3px"}}>
                  <code><ReactMarkdown >{content}</ReactMarkdown></code>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content" className="mt-4">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary" className="mt-4">
              Create Code
            </Button>
            <Button className="mx-2 mt-4" onClick={resetHandler} variant="danger">
              Reset
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateCode;