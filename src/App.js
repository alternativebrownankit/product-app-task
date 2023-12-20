import './App.css';
import ProductDisplay from './Components/ProductDisplay';
import ProductForm from './Components/ProductForm';
import {
  Route,
  Routes,
} from "react-router-dom";
import ECommerceListing from './Components/ECommerceListing';
import Home from './Components/Home';
import ProductListed from './Components/ProductListed';

function App() {
  
  return (
    <div className="App">
      {/* Use the browser router in index.js of src */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/productForm" element={<ProductForm />} />
          <Route path="/updated" element={<ProductDisplay />} />
          <Route path="/listing" element={<ECommerceListing />} />
          <Route path="/productListed" element={<ProductListed />} />
        </Routes>
      
    </div>
  );
}

export default App;
