import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//  Contract for the user vote initial options selections and combinations ids
interface VoteState {
  initialOptionsSelection: number[];
  combinations: number[];
}

const initialState: VoteState = {
  initialOptionsSelection: [],
  combinations: [],
};

const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    setInitialOptionsSelection(state, action: PayloadAction<number>) {
      if (state.initialOptionsSelection.includes(action.payload)) {
        state.initialOptionsSelection = state.initialOptionsSelection.filter(
          (o) => o !== action.payload
        );
      } else {
        state.initialOptionsSelection = [
          ...state.initialOptionsSelection,
          action.payload,
        ];
      }
    },
    setCombinations(state, action: PayloadAction<number[]>) {
      state.combinations = action.payload;
    },
  },
});

export const { setInitialOptionsSelection, setCombinations } =
  voteSlice.actions;
export default voteSlice.reducer;
