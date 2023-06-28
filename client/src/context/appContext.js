import React, { createContext, useContext, useState, useReducer } from "react";
import { reducer } from "./reducer";
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

// Create Context object
const AppContext = createContext();

const AppProvider = ({ children }) => {
  // const [state, setState] = useState(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    });
    clearAlert();
  };

  const clearAlert = () => {
    return setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 9000);
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};

//Creating new Hook to reduce multiple line of code
//i.e. No need to import useContext and AppContext statements everytime.Only import useAppContext hook
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
