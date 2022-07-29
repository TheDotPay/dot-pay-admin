// import { ethers } from 'ethers';
// import Web3Modal from 'web3modal';
// import Web3 from "web3";


// const getWalletProvider = async() => {
//   // const userJson = localStorage.getItem("user");
//   const user1 = {
//     wallet:localStorage.getItem('wallet'),
//     walletType:localStorage.getItem('wallet_type')
//   }

//   console.log(localStorage.getItem('wallet'));
//   console.log(localStorage.getItem('wallet_type'));
//   console.log(user1);
  
// //  let user = null
// //   if(user1) {
// //      user = JSON.parse(user1);
// //   } else {
// //      return null;
// //   }

//   let provider = null;

//   if (window.ethereum && user1.walletType === process.env.REACT_APP_WALLET_TYPE_METAMASK) {
//       //const web3Modal = new Web3Modal()
//       //await web3Modal.connect()
//       const { ethereum } = window;
//       provider = new ethers.providers.Web3Provider(ethereum);
//     } 

//     return provider; 
// }

// export default getWalletProvider;

import { ethers } from 'ethers';


const getWalletProvider = async() => {
	const walletType = localStorage.getItem("wallet_type");
    let provider = null;

    if (window.ethereum && walletType === process.env.REACT_APP_WALLET_TYPE_METAMASK) {
       
       
        const { ethereum } = window;
        provider = new ethers.providers.Web3Provider(ethereum);
     } 

      return provider; 
}

export default getWalletProvider;

