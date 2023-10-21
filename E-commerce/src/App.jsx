import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import ProductPage from "./Pages/ProductPage";

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element ={<ProductPage/>} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
