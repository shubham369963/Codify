import {React, useState} from 'react'
import MainScreen from '../../components/MainScreen.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import axios from "axios";
import "./LoginPage.css";
import Loading from "../../components/Loading.js";
import ErrorMessage from "../../components/ErrorMessage.js";
const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  const submitHandler = async (e) =>{
    e.preventDefault();
    
    try{
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };

      setLoading(true);

      const {data} = await axios.post("/api/users/login", {
        email,
        password,
      }, config);

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
    }catch(error){
      setError(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <MainScreen title="Login">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading/>}
        <Form onSubmit={submitHandler}> 
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
               value={email}
              placeholder="Enter email"
               onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="mt-4">Password</Form.Label>
            <Form.Control
              type="password"
               value={password}
              placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default LoginPage