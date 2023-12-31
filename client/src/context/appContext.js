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
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
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
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
};

// Create Context object
const AppContext = createContext();

const AppProvider = ({ children }) => {
  // const [state, setState] = useState(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  // Axios-setup
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // Request
  authFetch.interceptors.request.use(
    (config) => {
      // config.headers.common["Authorization"] = `Bearer ${state.token}`;  //Not working with 'common'
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

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
    }, 3000);
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
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      console.log(data);
      const { user, token, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
  //************************************ UPDATE-USER-END *************************************

  //************************************ HANDLE-CHANGE-START *********************************
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { company, position, jobLocation, jobType, status } = state;

      await authFetch.post("/jobs", {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });

      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });

    } catch (error) {
      if (error.response.status === 401) return 
        dispatch({ type: CREATE_JOB_ERROR, payload: { msg: "Please provide all values... ERROR : "+error.response.data } })
      
    }
    clearAlert();
  };

  //************************************ HANDLE-CHANGE-END ***********************************

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
        handleChange,
        clearValues,
        createJob,
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
