import {
    CODE_CREATE_FAIL,
    CODE_CREATE_REQUEST,
    CODE_CREATE_SUCCESS,
    CODE_DELETE_FAIL,
    CODE_DELETE_REQUEST,
    CODE_DELETE_SUCCESS,
    CODE_LIST_FAIL,
    CODE_LIST_REQUEST,
    CODE_LIST_SUCCESS,
    CODE_UPDATE_FAIL,
    CODE_UPDATE_REQUEST,
    CODE_UPDATE_SUCCESS,
  } from "../constants/codeConstants.js";
  import axios from "axios";
  
  export const listCodes = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: CODE_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/codes`, config);
  
      dispatch({
        type: CODE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CODE_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const createCodeAction = (title, content, category) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: CODE_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/codes/create`,
        { title, content, category },
        config
      );
  
      dispatch({
        type: CODE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CODE_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deleteCodeAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CODE_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/codes/${id}`, config);
  
      dispatch({
        type: CODE_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CODE_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updateCodeAction = (id, title, content, category) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: CODE_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/codes/${id}`,
        { title, content, category },
        config
      );
  
      dispatch({
        type: CODE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CODE_UPDATE_FAIL,
        payload: message,
      });
    }
  };