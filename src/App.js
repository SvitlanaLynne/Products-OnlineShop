import "./App.css";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route } from "react-router-dom";
import { ProductsDataProvider } from "./components/ProductsDataContext";

function App() {
  return (
    <ProductsDataProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
    </ProductsDataProvider>
  );
}

export default App;
