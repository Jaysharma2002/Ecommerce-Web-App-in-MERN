import React, { useState } from 'react';
import Beauty from './components/beauty';
import Cart from './components/cart';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Adminheader from './components/Adminheader';
import AdminContent from './components/AdminContent';
import AdminOrder from './components/AdminOrder';
import Register from './components/Register';
import Order from './components/Order';
import ProductComponent from './components/ProductComponent';
import UserProfile from './components/UserProfile';

function AppContent() {
  const location = useLocation();
  
  const [data, setData] = useState(null);
  const [productId, setProductId] = useState();
  const [searchedProduct, setSearchedProduct] = useState("");
  const [product, setProducts] = useState([]);
  const [selectedcategory, setSelectedcategory] = useState("All");
  const [addedToCart, setAddedtocart] = useState(0);
  const [productInCart, setProductInCart] = useState(false);
  const [userId, setUserId] = useState();
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [profileupdate,setProfileUpdate]=useState(false)

  return (
    <div className="AllFrame">
      {/* Show Header based on route */}
      {!["/", "/admin", "/Payment", "/thankyou", "/register", "/adminorder"].includes(location.pathname) && (
        <Header
          setSelectedcategory={setSelectedcategory}
          searchedProduct={searchedProduct}
          setSearchedProduct={setSearchedProduct}
          addedToCart={addedToCart}
          productInCart={productInCart}
          setProductInCart={setProductInCart}
          selectedcategory={selectedcategory}
          profileupdate={profileupdate}
        />
      )}

      {/* Show Admin Header based on route */}
      {!["/viewprofile", "/productcomponent", "/home", "/", "/cart", "/Payment", "/thankyou", "/register", "/order"].includes(location.pathname) && (
        <Adminheader
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchProduct={searchProduct}
          setSearchProduct={setSearchProduct}
        />
      )}

      <Routes>
        <Route path="/" element={<Login setUserId={setUserId} />} />
        <Route
          path="/home"
          element={
            <Beauty
              selectedcategory={selectedcategory}
              setProducts={setProducts}
              searchedProduct={searchedProduct}
              setAddedtocart={setAddedtocart}
              addedToCart={addedToCart}
              setProductInCart={setProductInCart}
              setData={setData}
              data={data}
              setProductId={setProductId}
            />
          }
        />
        <Route
          path="/cart"
          element={<Cart product={product} setProducts={setProducts} setAddedtocart={setAddedtocart} addedToCart={addedToCart} userId={userId} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminContent selectedCategory={selectedCategory} searchProduct={searchProduct} />} />
        <Route path="/adminorder" element={<AdminOrder />} />
        <Route path="/order" element={<Order />} />
        <Route
          path="/productcomponent"
          element={<ProductComponent data={data} productId={productId} setProductInCart={setProductInCart} setProducts={setProducts} setAddedtocart={setAddedtocart} addedToCart={addedToCart} />}
        />
        <Route path="/viewprofile" element={<UserProfile setProfileUpdate={setProfileUpdate}/>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
