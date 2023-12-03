import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../redux/action';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const [walletAddress, setWalletAddress] =useState("");
    const [currentBalance,setcurrentBalance] =useState("");
  

    const handleOne=(text)=>{

        if(text=="Metamask"){
            connectWallet();
            document.getElementById("metamaskBtn").innerText = text+" Connected";
        }
      

    }
  
   

  useEffect(() => {
    
    getMyAccount();
    addWalletListener();
   
   
  }, []);

  const connectWallet= async()=>{
   if(window.ethereum){
    try{
      const accounts=await window.ethereum.request({method: "eth_requestAccounts"});
      console.log(accounts[0]);
      setWalletAddress(accounts[0]);

    }
    catch(err){
      console.error(err.message);
    }
   }
   else{
    window.alert("Please Install MetaMask");
   }


  }

  const getMyAccount = async()=>{

    if(window.ethereum){
      try{
        const accounts=await window.ethereum.request({method: "eth_accounts"});

        if(accounts.length>0){
        console.log(accounts[0]);
        setWalletAddress(accounts[0]);
        }
        else{
          console.log("Need to connect wallet");
        }
  
                   }
      catch(err){
        console.error(err.message);
      }
     }
     else{
      console.log("Please Install MetaMask");
     }

  }

  const addWalletListener=()=>{

    if(window.ethereum){
      window.ethereum.on("accountsChanged",(accounts)=>{
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);

      });

    }else{
      setWalletAddress("");
      console.log("Please Install MetaMask Wallet");
    }
  };




    const { cart } = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">MidLead Shopping Cart</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                   
                        <li className="nav-item">
                          
                            <div
                                title="Cart"
                                className="nav-link cart_icon"
                              
                                onClick={() => dispatch(toggleCart(true))}
                            >
                                <img src="/images/bag-icon.svg" alt="bag-icon" />
                                {cart.length ? <span className="badge">{cart.length}</span> : null}
                            </div>
                           
                        </li>
                        

                        <li>
                        <button className="btn btn-primary ml-4" onClick={connectWallet}>
          {walletAddress && walletAddress.length > 0 ? 'Connected to MetaMask' : 'Not Connected to MetaMask '}
        </button>
    </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
