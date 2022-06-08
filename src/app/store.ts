import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth-slice";
import voteReducer from "../features/vote/vote-slice";
import { voteMonsterApi } from "../services/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vote: voteReducer,
    [voteMonsterApi.reducerPath]: voteMonsterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      voteMonsterApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
