//import logo from './logo.svg';
//import './App.css';

import {
  BrowserRouter as Router,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

import ProductList from "./containers/ProductList";
import AddProduct from "./containers/AddProduct";

function App() {
  return (
    // <div className="App">
      <Router>
        <div className="container">
          <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/addproduct" element={<AddProduct />} />
          </Routes>
        </div>
      </Router>
    //</div>
  );
}

export default App;
