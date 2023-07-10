import React, { createContext, useContext, useReducer } from "react"; //useState
import { reducer } from "./reducer";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from "./actions";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: false,
};

// Create Context object
const AppContext = createContext();

const AppProvider = ({ children }) => {
  // const [state, setState] = useState(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;

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
    }, 1000);
  };

  //****************************************************** AKASH-CODE-START ********************************************************

  // ADD AKASH'S BELOW CODE HERE

  //****************************************************** AKASH-CODE-END ********************************************************

  //****************************************************** MY-CODE-START ********************************************************

  //************************************ LOCAL-STORAGE-START ************************************

  // Store user,token,location into localStorage bcoz after refreshing the page it will uses local storage values
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };
  //************************************ LOCAL-STORAGE-END ************************************

  //************************************ REGISTER-USER-START ************************************

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });

    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token, location } = response.data;
      console.log(response);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //************************************ REGISTER-USER-END ************************************

  //************************************ LOGIN-USER-START ************************************

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });

    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token, location } = data;

      console.log("====================================");
      console.log(user);
      console.log("====================================");

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });

      const hello = user;
      console.log("Payload data ===>>" + hello);

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //************************************ LOGIN-USER-END ************************************

  //************************************ TOGGLE-SIDEBAR-START ******************************
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  //************************************ TOGGLE-SIDEBAR-END ********************************

  //************************************ LOGOUT-USER-START *********************************
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  //************************************ LOGOUT-USER-END ***********************************

  //************************************ UPDATE-USER-START *********************************
  const updateUser = async (currentUser) => {
    // console.log(currentUser);
    try {
      const { data } = await axios.patch("/api/v1/auth/updateUser",currentUser)
      
      //for axios global setup - it will add Authorization with token for every API request
      const {data:tours } = await axios.get("https://course-api.com/react-tours-project")
      console.log(data);
      console.log(tours);


    } catch (error) {
      console.log(error.response);
    }
  };
  //************************************ UPDATE-USER-END ***********************************

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        removeUserFromLocalStorage,
        toggleSidebar,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//Creating new Hook to reduce multiple line of code
//i.e. No need to import useContext and AppContext statements everytime.Only import useAppContext hook
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };

//****************************************************** AKASH-CODE-START ********************************************************

//! local Storage /adding and removing [token] from local storage
/*
     const addUserToLocalStorage = ({ user, token, location }) => {

          localStorage.setItem('user', JSON.stringify(user))

          localStorage.setItem('token', token)

          localStorage.setItem('location', location)

      }

      const removeUserFromLocalStorage = () => {

          localStorage.removeItem('token')

          localStorage.removeItem('user')

          localStorage.removeItem('location')

      }

 

    //*************************LOGIN & REGISTER********************************

 

    //*********LOGIN AND REGISTER Separately APPROACH 1.....(it is better for email verification)

 

     const registerUser = async (currentUser) => {

          // console.log(currentUser)

          dispatch({ type: REGISTER_USER_BEGIN })

          try {

              const response = await axios.post('/api/v1/auth/register', currentUser)

              // console.log(response)

              const { user, token, location } = response.data //we need data to be stored i.e we use [response.data]

 

              dispatch({

                  type: REGISTER_USER_SUCCESS,

                  payload: { user, token, location }

              })

 

              //adding localStorage that holds and store following data

              addUserToLocalStorage({ user, token, location })

 

          } catch (error) {

              console.log(error.response)

              dispatch({

                  type: REGISTER_USER_ERROR,

                  payload: { msg: error.response.data.msg } //getting error from response

              })

          }

          clearAlert()

      }

 

      const loginUser = async (currentUser) => {

          dispatch({ type: LOGIN_USER_BEGIN })

          try {

              const { data } = await axios.post('/api/v1/auth/login',currentUser)

              const { user, token, location } = data //we need here data to be fetched not store i.e we use only [data]

 

              dispatch({

                  type: LOGIN_USER_SUCCESS,

                  payload: { user, token, location }

              })
     console.log('====================================');
      console.log(user);
      console.log('====================================');

              addUserToLocalStorage({ user, token, location })

          } catch (error) {

              dispatch({

                  type: LOGIN_USER_ERROR,

                  payload: { msg: error.response.data.msg} //getting error from response

              })

          }

          clearAlert()

      }

  */
//****************************************************** AKASH-CODE-END ********************************************************
