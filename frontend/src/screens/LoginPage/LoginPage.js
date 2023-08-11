import {React, useState, useEffect} from 'react'
import MainScreen from '../../components/MainScreen.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useNavigate} from 'react-router-dom';
import "./LoginPage.css";
import Loading from "../../components/Loading.js";
import ErrorMessage from "../../components/ErrorMessage.js";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../actions/userActions.js";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const {loading, error, userInfo} = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
  if(userInfo){
    navigate("/mycodes")
  }
  }, [navigate, userInfo]);


  const submitHandler = async (e) =>{
    e.preventDefault();
    dispatch(login(email, password));
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

// import React, { useState, useEffect } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Loading from "../../components/Loading";
// import ErrorMessage from "../../components/ErrorMessage";
// import { login } from "../../actions/userActions";
// import MainScreen from "../../components/MainScreen";
// import "./LoginPage.css";

// function LoginPage({ history }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin) || 0;
//   const { loading, error, userInfo } = userLogin;

//   useEffect(() => {
//     if (userInfo) {
//       history.push("/mynotes");
//     }
//   }, [history, userInfo]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(login(email, password));
//   };

//   return (
//     <MainScreen title="LOGIN">
//       <div className="loginContainer">
//         {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
//         {loading && <Loading />}
//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               value={email}
//               placeholder="Enter email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={password}
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//         <Row className="py-3">
//           <Col>
//             New Customer ? <Link to="/register">Register Here</Link>
//           </Col>
//         </Row>
//       </div>
//     </MainScreen>
//   );
// }

// export default LoginPage;