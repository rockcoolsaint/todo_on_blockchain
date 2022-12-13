import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { toDoListABI, toDoListAddress } from "../context/constants";

export const connect = async () => {
  const fetchContract = (signerOrProvider) => new ethers.Contract(toDoListAddress, toDoListABI, signerOrProvider);

  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = await fetchContract(signer);
  return contract;
}