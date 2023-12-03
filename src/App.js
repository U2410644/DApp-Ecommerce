import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Bill from "./components/Bill";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter
//import CryptoPaymentsForm from "./components/CryptoPaymentsForm";
import Transaction from "./components/Transaction";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const { isCartOpen, cart } = useSelector((state) => state.cartReducer);
  const [value, setValue] = useState();

  useEffect(() => {
    console.log(cartTotal);
  }, []);

  const dispatch = useDispatch();

  const cartTotal = cart
    .map((item) => {
      //console.log("carttotal in app"+ t1);

      return item.price * item.quantity;
    })
    .reduce((preVal, curVal) => {
      //console.log("carttotal in app"+ t2);

      return preVal + curVal;
    }, 0);

  return (
    <Router>
      <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/bill" element={<Transaction cartTotal={cartTotal} />} />
        </Routes>
        <Cart cartTotal={cartTotal}>
          <Transaction cartTotal={cartTotal} />
        </Cart>
      </div>
    </Router>
  );
}

export default App;
