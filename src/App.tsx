import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Search from './components/Search';
import Wishlist from './components/Wishlist';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="w-full mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
