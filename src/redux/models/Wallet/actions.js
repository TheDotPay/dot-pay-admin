
import * as CONSTANTS from "./constants";


// export const checkUser = (data) => async (dispatch, getState) => {
//   try {

//     const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}` + "/user/check_user", data, { headers: { "Content-Type": "application/json" } });
    
//     if(response.status === 200 && response.data) {
//        const data = response.data;
//        if(data.success) {
//           localStorage.setItem("user", JSON.stringify(data.data));
//           dispatch({ type: CONSTANTS.WALLET_CONNECT_SUCCESS, payload:data.data});
//        } else {
//           dispatch({ type: CONSTANTS.WALLET_CONNECT_FAILED });
//        }
//        return response.data;
//     } else {
//        dispatch({ type: CONSTANTS.WALLET_CONNECT_FAILED });
//        return new Promise.reject("An error has occured");
//     }
//    } catch (error) {
//     dispatch({ type: CONSTANTS.WALLET_CONNECT_FAILED });
//     return new Promise.reject(error);
//   }

// }
