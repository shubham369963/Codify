import './App.css';
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import LandingPage from "./screens/LandingPage/LandingPage.js";
import MyCodes from "./screens/MyCodes/MyCodes.js";
import{ BrowserRouter, Route, Routes }from "react-router-dom";
const App = () =>(
  <BrowserRouter>
  <Header/>
  <main>
  <Routes>
  <Route path="/" element={<LandingPage/>} exact ></Route> 
  <Route path="/mycodes" element={<MyCodes/>} ></Route> 
  </Routes>
  </main>
  <Footer/>
  </BrowserRouter>
)































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
