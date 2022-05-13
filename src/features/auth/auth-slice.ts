import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isConnected: boolean;
}

const initialState: AuthState = {
  isConnected: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { setIsConnected } = authSlice.actions;
export default authSlice.reducer;
