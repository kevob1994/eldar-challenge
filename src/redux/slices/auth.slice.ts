import { IAuthState } from "@interfaces/auth.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "@services/auth.service";
import { decodeToken } from "@utils/jwt-decode";

const initialState: IAuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

if (initialState.token) {
  initialState.user = decodeToken(initialState.token);
}

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const response = await loginService(credentials);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error en el login";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
