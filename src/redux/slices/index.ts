import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import postSlice from "./post.slice";

export default combineReducers({
  auth: authSlice,
	post: postSlice
});