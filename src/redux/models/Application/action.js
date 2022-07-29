import * as CONSTANTS from "./constants";
import  *  as  CONTRACT from "../../../contracts";  

export const setLoading = (val, message='') => async (dispatch, getState) => {
   try {
        if(val === true) {
           dispatch({ type: CONSTANTS.SET_LOADING_TRUE, payload:message});
        } else {
           dispatch({ type: CONSTANTS.SET_LOADING_FALSE, payload:''});
        }
   } catch (error) {
      console.log(error);
      return null;
   }
}

// export const fetchLoading = ()