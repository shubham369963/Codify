import './App.css';
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import LandingPage from "./screens/LandingPage/LandingPage.js";
import MyCodes from "./screens/MyCodes/MyCodes.js";
import LoginPage from "./screens/LoginPage/LoginPage.js";
import RegisterPage from "./screens/RegisterPage/RegisterPage.js";
import CreateCode from "./screens/CreateCode/CreateCode.js";
import SingleCode from "./screens/SingleCode/SingleCode.js";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen.js";
import{ BrowserRouter, Route, Routes }from "react-router-dom";
import {useState} from "react"
const App = () =>{

  const [search, setSearch] = useState("")

  return(
  <BrowserRouter>
  <Header setSearch={setSearch}/>
  <main>
  <Routes>
  <Route path="/" element={<LandingPage/>} exact ></Route> 
  <Route path="/login" element={<LoginPage/>} ></Route> 
  <Route path="/profile" element={<ProfileScreen/>} ></Route> 
  <Route path="/register" element={<RegisterPage/>} ></Route> 
  <Route path="/createcode" element={<CreateCode/>} ></Route> 
  <Route path="/code/:id" element={<SingleCode/>} ></Route> 
  <Route path="/mycodes" element={<MyCodes search={search}/>} ></Route> 
  </Routes>
  </main>
  <Footer/>
  </BrowserRouter>
  )
  }































// function App() {
//   return (
//     <div className="App">
//       <h1>Hello World</h1>
//     </div>
//   );
// }

// function App() {
//   return (
//     <>
//       Hello World
//     </>
//   );
// }

// const App = () => {
// return <div>Hello World</div>
// }

// const App = () => (<div>Hello World</div>)


export default App;
