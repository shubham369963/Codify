import {
    CODE_UPDATE_REQUEST,
    CODE_UPDATE_SUCCESS,
    CODE_UPDATE_FAIL,
    CODE_CREATE_FAIL,
    CODE_CREATE_REQUEST,
    CODE_CREATE_SUCCESS,
    CODE_DELETE_FAIL,
    CODE_DELETE_REQUEST,
    CODE_DELETE_SUCCESS,
    CODE_LIST_FAIL,
    CODE_LIST_REQUEST,
    CODE_LIST_SUCCESS,
  } from "../constants/codeConstants.js";
  
  export const codeListReducer = (state = { codes: [] }, action) => {
    switch (action.type) {
      case CODE_LIST_REQUEST:
        return { loading: true };
      case CODE_LIST_SUCCESS:
        return { loading: false, codes: action.payload };
      case CODE_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const codeCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CODE_CREATE_REQUEST:
        return { loading: true };
      case CODE_CREATE_SUCCESS:
        return { loading: false, success: true };
      case CODE_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const codeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CODE_DELETE_REQUEST:
        return { loading: true };
      case CODE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case CODE_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const codeUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case CODE_UPDATE_REQUEST:
        return { loading: true };
      case CODE_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case CODE_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };