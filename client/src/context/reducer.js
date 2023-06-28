
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

export const reducer = (state,action)=>{
   
    if(action.type===DISPLAY_ALERT)
    {
        return {
            // isLoading: false,
            showAlert: true,
            alertText: "Please fill all values..",
            alertType: "danger",
        }
    }

    if(action.type===CLEAR_ALERT)
    {
        return {
            // isLoading: false,
            showAlert: true,
            alertText: "",
            alertType: "",
        }
    }

  throw new Error(`no such action :${action.type}`);
    
}

