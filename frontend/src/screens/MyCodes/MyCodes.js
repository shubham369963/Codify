import {React, useEffect, useState} from 'react';
import MainScreen from '../../components/MainScreen.js';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";


const MyCodes = () => {

  const [codes, setCodes] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ??')) {
    }
  };

  const fetchCodes = async()=>{
    const {data} = await axios.get("/api/codes");
    setCodes(data);
  }

  console.log(codes);

  useEffect(() => {
    fetchCodes();
  }, [])

  return (
    <MainScreen title="Welcome Back Shubham Halade..">
      <Link to="createcode">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Repository
        </Button>
      </Link>

      {codes.map((code) => (
        <Accordion key={code._id}>
          <Accordion.Item eventKey="0" style={{ margin: 10 }}>
            <Accordion.Header
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  color: 'black',
                  textDecoration: 'none',
                  flex: 1,
                  cursor: 'pointer',
                  alignSelf: 'center',
                  fontSize: 20,
                }}
              >
                {code.title}
              </span>
              <div>
                <Button
                  variant="success"
                  className="mx-2"
                  href={`/code/${code._id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(code._id)}
                >
                  Delete
                </Button>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <h4>
                <Badge bg="dark">Category - {code.category}</Badge>
              </h4>
              <blockquote className="blockquote mb-0">
                <p>{code.content}</p>
                <footer className="blockquote-footer">Created On date</footer>
              </blockquote>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyCodes;
