import { SET_USER_INFO, LOGOUT_USER, DASHBOARD_OPEN } from "../actions/CatAction";

const initialState = {
  currentUser: null,
  dashboardOpen: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        currentUser: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
      };
    case DASHBOARD_OPEN:
      return {
        ...state,
        dashboardOpen: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
