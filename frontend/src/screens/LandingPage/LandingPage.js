import {React, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import "./LandingPage.css";
import {useNavigate} from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
      
        if(userInfo){
            navigate("/mycodes");
        }
        }, [navigate]);

  return (
    <div className="main">
        <Container>
            <Row>
                <div className="intro-text">
                    <h1 className="title">Welcome to Codify</h1>
                    <p className="subtitle">One Safe Place for all your Codes</p>
                </div>
                <div className="buttonContainer">
                    <a href="/login">
                        <Button size="lg" className="landingbutton">
                            Login
                        </Button>
                    </a>
                    <a href="/register">
                        <Button size="lg" className="landingbutton" variant="outline-primary">
                            Signup
                        </Button>
                    </a>
                </div>
            </Row>
        </Container>
    </div>
  )
}

export default LandingPage