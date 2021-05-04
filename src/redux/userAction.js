import axios from "axios";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
} from "./userTypes";
const fetchUserRequest = (flag) => {
  return {
    type: FETCH_USER_REQUEST,
    payload: flag,
  };
};
const fetchUserSuccess = (userData) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: userData,
  };
};

const fetchUserError = (err) => {
  return {
    type: FETCH_USER_ERROR,
    payload: err,
  };
};

export const fetchUserItem = (users) => {
  return (dispatch) => {
    dispatch(fetchUserRequest(true));
    axios
      .get(`https://randomuser.me/api?results=${users}`)
      .then((data) => dispatch(fetchUserSuccess(data.data.results)))
      .catch((err) => dispatch(fetchUserError(err)));
  };
};
