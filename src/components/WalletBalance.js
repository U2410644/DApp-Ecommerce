import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const WalletBalance = () => {
  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  const getWalletBalance = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the selected account
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];

        // Get the balance in Wei
        const weiBalance = await web3.eth.getBalance(userAddress);

        // Convert Wei to Ether
        const etherBalance = web3.utils.fromWei(weiBalance, 'ether');

        setBalance(etherBalance);
        setAddress(userAddress);
      } catch (error) {
        setError('Your wallet is not connected!! Error fetching balance: ');
      }
    } else {
      setError('MetaMask not detected');
    }
  };

  useEffect(() => {
    getWalletBalance();
  }, []); // Fetch the balance on component mount

  return (
    <div className="container">
    <div className="card text-dark bg-light">
      <div className="card-body">
        <p className="card-text"><b>Your MetaMask wallet address: </b>{address}</p>
        <p className="card-text"><b>Your MetaMask wallet balance: </b>{balance} ETH</p>
      </div>
    </div>
    {error && <p>{error}</p>}
  </div>
  );
};

export default WalletBalance;
