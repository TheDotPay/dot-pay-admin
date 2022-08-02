import { ethers } from "ethers";
import Web3 from "web3";
import getWalletProvider from "../../../utils/getWalletProvider";
import * as CONTRACT from "../../../contracts";

const web3Object = new Web3(new Web3.providers.HttpProvider(`${process.env.REACT_APP_BLOCKCHAIN_NETWORK}`));

const DotBankAddress = process.env.REACT_APP_DOTPAY_ADDRESS;

export const addMerchant =(walletAddress, currentShare, sharingCliffValue) => async (dispatch, getState) => {
    try {
      if (currentShare > sharingCliffValue) {
        console.log("invalid arguments of share");
        return Promise.reject("invalid arguments of share");
      }
      const provider = await getWalletProvider();
      if (!provider) {
        throw new Error("Only metamask is supported");
      } else {
        const signer = provider.getSigner();
        console.log(signer, "signer");

        const dotPayContract = new ethers.Contract(
          DotBankAddress,
          CONTRACT.DotPayContract.abi,
          signer
        );
        console.log(dotPayContract);
        let transaction = await dotPayContract.addMerchant(
          walletAddress,
          currentShare,
          sharingCliffValue
        );
        let tx = await transaction.wait();
        let event = tx.events[0];
        console.log(event, "event");
        return event;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };

  export const addVerifier = (VerifierAddress) => async () => {
    try{
      const provider = await getWalletProvider();
      if (!provider) {
        throw new Error("Only metamask is supported"); }
     else {
      const signer = provider.getSigner();
      console.log(signer, "signer");

      const dotPayContract = new ethers.Contract(
        DotBankAddress,
        CONTRACT.DotPayContract.abi,
        signer
      );
      console.log(dotPayContract);
     let transaction = await dotPayContract.addVerifier(VerifierAddress);
     let tx = await transaction.wait();

     console.log(tx,"check")
     return true;
    }
    }
    catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  export const removeVerifier = (VerifierAddress) => async () => { 
    try{
      const provider = await getWalletProvider();
      if (!provider) {
        throw new Error("Only metamask is supported"); }
     else {
      const signer = provider.getSigner();
      console.log(signer, "signer");

      const dotPayContract = new ethers.Contract(
        DotBankAddress,
        CONTRACT.DotPayContract.abi,
        signer
      );
      console.log(dotPayContract);
     let transaction = await dotPayContract.removeVerifier(VerifierAddress);
     let tx = await transaction.wait();
     console.log(tx,"check")
     return true;
    }
    }
    catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  export const isMerchantBlocked =(merchantContractAddress) =>async (dispatch, getState) => {
    try {
        const dotPayContract = new web3Object.eth.Contract(CONTRACT.DotPayContract.abi, DotBankAddress);
        console.log(dotPayContract,"contract")
        merchantContractAddress=  merchantContractAddress.substr(merchantContractAddress.length -40);
        merchantContractAddress='0x'+merchantContractAddress;
        const currentStatus = await dotPayContract.methods.getMerchantStatus(merchantContractAddress).call();
        console.log(currentStatus, "transaction");
        return currentStatus;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };

export const blockMerchant = (merchantContractAddress) => async (dispatch, getState) => {
    try {
      
      const provider = await getWalletProvider();
      if (!provider) {
        throw new Error("Only metamask is supported");
      } else {
        const signer = provider.getSigner();
        console.log(signer, "signer");
        const dotPayContract = new ethers.Contract(
          DotBankAddress,
          CONTRACT.DotPayContract.abi,
          signer
        );
        merchantContractAddress=  merchantContractAddress.substr(merchantContractAddress.length -40);
        merchantContractAddress='0x'+merchantContractAddress;
        console.log(merchantContractAddress,"merchant redefined address")
        let transaction = await dotPayContract.blockMerchant(merchantContractAddress);
        console.log(transaction, "transaction");

        return true;
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };


export const unBlockMerchant = (merchantContractAddress) => async (dispatch, getState) => {
  try {   const provider = await getWalletProvider();
    if (!provider) {
      throw new Error("Only metamask is supported");
    } else {
      const signer = provider.getSigner();
      console.log(signer, "signer");
      const dotPayContract = new ethers.Contract(DotBankAddress,CONTRACT.DotPayContract.abi,signer);
      merchantContractAddress=  merchantContractAddress.substr(merchantContractAddress.length -40);
      merchantContractAddress='0x'+merchantContractAddress;
      console.log(merchantContractAddress,"merchant redefined address")
      let transaction = await dotPayContract.unBlockMerchant(merchantContractAddress);
      console.log(transaction, "transaction");

      return false;
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
