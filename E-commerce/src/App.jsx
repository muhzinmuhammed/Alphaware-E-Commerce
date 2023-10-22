import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element ={<ProductPage/>} />
        <Route path="/cart" element ={<CartPage/>} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
