import React, {useEffect, useState} from 'react';
import Web3Modal, { Provider } from 'web3modal';
import { ethers, Signer } from 'ethers';

//INTERNAL Import
import {toDoListAddress, toDoListABI} from './constants'
import { connect } from '../utils/contract_connect';

// const fetchContract = (signerOrProvider) => new ethers.Contract(toDoListAddress, toDoListABI, signerOrProvider);

export const ToDoListContext = React.createContext();

export const ToDolistProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [allToDoList, setAllToDoList] = useState([]);
  const [myList, setMyList] = useState([]);

  const [allAddresses, setAllAddresses] = useState([]);

  //-------Connect METAMASK
  const checkIfWalletIsConnected = async() => {
    // if (typeof window !== 'undefined') { //this conditional is also correct
      if(!window.ethereum) return setError("please install metamask");

      const account = await window.ethereum.request({method: "eth_requestAccounts"});
      if(account.length) {
        setCurrentAccount(account[0]);
        // console.log(account[0]);
      } else {
        setError("Please Install MetaMask & connect, reload");
      }
    // }
  };

  //---CONNECT WALLET
  const connectWallet = async() => {
    if(!window.ethereum) return setError("please install metamask");

    const account = await window.ethereum.request({method: "eth_requestAccounts"});

    setCurrentAccount(account[0]);
  }

  //INTERACTING WITH SMART CONTRACT

  const toDoList = async (message) => {
    try {
      // CONNECTING WITH SMART CONTRACT

      const contract = await connect();
      const createList = await contract.createList(message);
      createList.wait();
      console.log(createList)
    } catch (error) {
      setError("Something wrong creating list")
    }
  }

  const getToDoList = async() => {
    try {
      // CONNECTING WITH SMART CONTRACT
      const contract = await connect();

      // GET DATA
      const getAllAddresses = await contract.getAddress();
      setAllAddresses(getAllAddresses)

      getAllAddresses.map(async (el) => {
        const getSingleData = await contract.getCreatorData(el);
        allToDoList.push(getSingleData);
      })

      const allMessages = await contract.getMessages();
      setMyList(allMessages)
    } catch (error) {
      setError("Something wrong Getting Data");
    }
  }

  // CHANGE STATE OF TODOLIST FALSE/TRUE
  const change = async (address) => {
    try {
      // CONNECTING WITH SMART CONTRACT
      const contract = await connect();

      const state = await contract.toggle(address);
      state.wait();
      console.log(state);
    } catch (error) {
      setError("Something wrong Changing status");
    }
  }

  return (
    <ToDoListContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        getToDoList,
        toDoList,
        change,
        currentAccount,
        error,
        allToDoList,
        myList,
        allAddresses,
      }}
    >
      {children}
    </ToDoListContext.Provider>
  )
}

// const ToDolistApp = () => {
//   return (
//     <div>ToDolistApp</div>
//   )
// }

// export default ToDolistApp