import {React} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import "./LandingPage.css";

const LandingPage = () => {

    // useEffect(() => {
    //     const userInfo = localStorage.getItem("userInfo");
      
    //     if(userInfo){
    //       history.push("/mycodes");
    //     }
    //     }, [history]);

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