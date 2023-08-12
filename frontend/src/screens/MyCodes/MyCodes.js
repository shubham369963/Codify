import {React, useEffect} from 'react';
import MainScreen from '../../components/MainScreen.js';
import {Link, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import Loading from "../../components/Loading.js";
import ErrorMessage from "../../components/ErrorMessage.js";
import {useDispatch, useSelector} from "react-redux";
import {listCodes, deleteCodeAction} from "../../actions/codeActions.js"

const MyCodes = ({search}) => {

  const dispatch = useDispatch();

  const codeList = useSelector((state) => state.codeList);
  const { loading, error , codes } = codeList;

  const userLogin = useSelector((state)=> state.userLogin);
  const {userInfo} = userLogin;

  const codeCreate = useSelector((state) => state.codeCreate);
  const { success: successCreate } = codeCreate;

  const codeUpdate = useSelector((state) => state.codeUpdate);
  const { success: successUpdate } = codeUpdate;

  const codeDelete = useSelector((state) => state.codeDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = codeDelete;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ??')) {
      dispatch(deleteCodeAction(id))
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listCodes());
    if(!userInfo){
      navigate("/");
    }
  }, [dispatch, successCreate,navigate, userInfo, successUpdate,successDelete]);

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}..`}>
      <Link to="/createcode">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Repository
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading /> }
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading/>}
      {codes?.reverse().filter((filteredCode) => (
        filteredCode.title.toLowerCase().includes(search.toLowerCase())
      )).map((code) => (
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
              <h6>
                <Badge bg="dark">Category - {code.category}</Badge>
              </h6>
              <code className="blockquote mb-0">
                <pre style={{fontSize: "15px", lineHeight: "12px"}}>{code.content}</pre>
                <footer className="blockquote-footer">Created On{" "}
                <cite className="Source Title">
                  {code.createdAt.substring(0, 10)}
                </cite>
                </footer>
              </code>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyCodes;
