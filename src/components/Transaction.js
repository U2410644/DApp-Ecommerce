import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
import { ethers } from 'ethers';
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
//import { providers } from 'ethers';
// Import necessary modules from ethers.js
import { utils, providers} from 'ethers';

// Use getAddress and parseEther from utils
//const { getAddress, parseEther, ...otherUtils } = utils;

// Your code using getAddress and parseEther
//const address = utils.getAddress('0x07a2CD20Feced7E7D711C21547a1f8AE5eb10b72');
//const amountInWei = utils.parseEther('0');



const Transaction = ({cartTotal}) => {
    
   
  const [amount, setAmount] = useState(cartTotal);
  const [destinationAddress, setDestinationAddress] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const { isCartOpen, cart } = useSelector(state => state.cartReducer);

  
  


  
 

  /*useEffect(() => {
    console.log("transaction"+cartTotal);

    const initPayButton = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
        } catch (err) {
          setStatus('User denied account access', err);
        }
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        setStatus('No Metamask (or other Web3 Provider) installed');
      }
    };

    initPayButton();
  }, []);*/
  const startPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });
      console.log({ ether, addr });
      console.log("tx", tx);
      setTxs([tx]);
    } catch (err) {
      setError(err.message);
      window.alert(err.message);
    }
  };
  
  /*const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // Check if Ethereum provider is available
      if (!window.ethereum) {
        throw new Error('Ethereum provider not found');
      }
  
      // Request account access using eth_requestAccounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      const paymentAddress = '0xD22756925C2F820fc1Af2D848048699E839f0135'; // Replace with the actual payment address
      const amountEth = parseFloat(amount);
  
      // Use web3.utils.toWei instead of deprecated web3.toWei
      const amountWei = window.web3.utils.toWei(amountEth.toString(), 'ether');
  
      // Use sendTransaction from Ethereum provider
      const transactionHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            to: paymentAddress,
            value: amountWei,
          },
        ],
      });
  
      console.log('Payment successful. Transaction hash:', transactionHash);
      setStatus('Payment successful');
    } catch (err) {
      console.error('Payment failed', err);
      setStatus('Payment failed');
    }
  };
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };
  

  return (
    <div className="container border border-dark">
    <form className="m-4" onSubmit={handleSubmit}>
    <div className="">
      <main className="mt-4 p-4">
        <h1 className="">
          Send ETH payment
        </h1>
        <div className="">
          <div className="my-3">
            <input
              type="text"
              name="addr"
              className="e"
              placeholder="Recipient Address"
            />
          </div>
          <div className="my-3">
            <input
              name="ether"
              type="text"
              className="input input-bordered block w-full focus:ring focus:outline-none"
              placeholder="Amount in ETH"
            />
          </div>
        </div>
      </main>
      <footer className="p-4">
        <button
          type="submit"
          className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
        >
          Pay now
        </button>
        <ErrorMessage message={error} />
        <TxList txs={txs} />
      </footer>
    </div>
  </form>
  </div>
  );
};

export default Transaction;
