import * as CONSTANTS from "./constants";

const userJson = localStorage.getItem("user");
let user = null;

if(userJson) {
    user = JSON.parse(userJson);
}

const initialState = {
    walletType: user ? user.walletType : null,
    walletAddress: user ? user.walletAddress : null,
    isVerified: user ? user.isVerified : false,
    profileImage: user ? user.profileImage : "",
    balance:null
}

export default (state=initialState,  action) => {
    switch(action.type){
        case CONSTANTS.WALLET_CONNECT_SUCCESS:
            return{
                ...state,
                walletType:action.payload.walletType,
                walletAddress:action.payload.walletAddress,
                isVerified: action.payload.isVerified,
                profileImage:action.payload.profileImage
            }
        case CONSTANTS.WALLET_CONNECT_FAILED:
            return{
                ...state,
                walletType:null,
                walletAddress:null,
                isVerified:false,
                profileImage:""
            }
  

        default:
           return state;
    }
}