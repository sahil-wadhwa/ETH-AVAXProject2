// src/components/SimpleContract.js
import React, { useState } from 'react';
import { ethers } from 'ethers';


const SimpleContract = () => {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your actual contract address
  const abi = [
      {
          "constant": false,
          "inputs": [
              {
                  "name": "x",
                  "type": "uint256"
              }
          ],
          "name": "set",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [],
          "name": "get",
          "outputs": [
              {
                  "name": "",
                  "type": "uint256"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
      }
  ];
    const [newValue, setNewValue] = useState('');
    const [storedValue, setStoredValue] = useState('');

    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545'); // Replace with your RPC URL
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer)

    const getValue = async () => {
        const value = await contract.get();
        setStoredValue(value.toString());
    };

    const setValue = async () => {
    try {
        if (!newValue) return;
        const tx = await contract.set(newValue,{ gasLimit: 300000 });
        await tx.wait();
    } catch (error) {
        console.error('Error setting value:', error);
    }
};

    return (
        <div>
            <h2>Simple Storage Contract</h2>
            <div>
                <p>Stored Value: {storedValue}</p>
                <button onClick={getValue}>Get Value</button>
            </div>
            <div>
                <input type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                <button onClick={setValue}>Set Value</button>
            </div>
        </div>
    );
};

export default SimpleContract;
