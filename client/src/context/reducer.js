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

import { initialState } from "./appContext";

export const reducer = (state, action) => {
  //****************************************************** ALERT-START ********************************************************
  if (action.type === DISPLAY_ALERT) {
    return {
      // isLoading: false,
      showAlert: true,
      alertText: "Please fill all values..",
      alertType: "danger",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      // isLoading: false,
      showAlert: true,
      alertText: "",
      alertType: "",
    };
  }
  //****************************************************** ALERT-END ********************************************************

  //****************************************************** REGISTER-USER-START ********************************************************
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "Registration Successful! Redirecting...",
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //****************************************************** REGISTER-USER-END ********************************************************

  //****************************************************** LOGIN-USER-START ********************************************************
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting...",
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //****************************************************** LOGIN-USER-END ********************************************************

  //****************************************************** TOGGLE-SIDEBAR-START ********************************************************
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...initialState,
      showSidebar: !state.showSidebar,
    };
  }
  //****************************************************** TOGGLE-SIDEBAR-END ********************************************************

  //****************************************************** LOGOUT-USER-START ********************************************************
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: "",
      jobLocation: "",
    };
  }
  //****************************************************** LOGOUT-USER-END ********************************************************

  //****************************************************** REGISTER-USER-START ********************************************************
  // if (action.type === REGISTER_USER_BEGIN) {
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  // }

  // if (action.type === REGISTER_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     user: action.payload.user,
  //     token: action.payload.token,
  //     userLocation: action.payload.location,
  //     jobLocation: action.payload.location,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "Registration Successful! Redirecting...",
  //   };
  // }

  // if (action.type === REGISTER_USER_ERROR) {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }
  //****************************************************** REGISTER-USER-END ********************************************************

  //****************************************************** UPDATE-USER-START ********************************************************
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User profile updated Successful..!",
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  //****************************************************** UPDATE-USER-END ********************************************************

  //****************************************************** HANDLE_CHANGE-START ********************************************************
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "full-time",
      status: "pending",
    };
    return {...state,...initialState}
  }
  //****************************************************** HANDLE_CHANGE-END ********************************************************

  if (action.type === CREATE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Job Created..",
    };
  }

  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      // alertText: "Provide all Values....",
    };
  }

  throw new Error(`no such action :${action.type}`);
};
