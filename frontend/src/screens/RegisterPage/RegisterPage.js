import {React, useState, useEffect} from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate  } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./RegisterPage.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions.js";

const RegisterPage =({history}) =>{

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/mycodes");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else dispatch(register(name, email, password, pic));
  };

  const postDetails = (pics) =>{
    if(!pics){
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);

    if(pics.type === "image/jpeg" || pics.type === "image/png"){
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Codify");
      data.append("cloud_name", "drpvq7u1u");
      fetch("https://api.cloudinary.com/v1_1/drpvq7u1u/image/upload", {
        method: "post",
        body: data,
      })
      .then((res)=> res.json())
      .then((data) =>{
        console.log(data);
        setPic(data.url.toString());
      })
      .catch((err) =>{
        console.log(err);
      });
    }else{
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <MainScreen title="Sign up">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
      <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mt-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
               value={name}
              placeholder="Enter name"
               onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mt-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
               value={email}
              placeholder="Enter email"
               onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
               value={password}
              placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mt-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
               value={confirmpassword}
              placeholder="Confirm Password"
               onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic" className="mt-4">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control 
            onChange={(e) => postDetails(e.target.files[0])}
            id="custom-file"
            type="file"
            label="Upload Profile Picture"
            custom 
            
            />
          </Form.Group>

          

          <Button variant="primary" type="submit" className="mt-4">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterPage;