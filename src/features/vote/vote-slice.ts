import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//  Contract for the user vote initial options selections and combinations ids
interface VoteState {
  initialOptionsSelection: number[];
  combinations: number[];
  currentVoteCombinationIdx: number;
  combinationVoteResult: Record<number, number>;
}

const initialState: VoteState = {
  initialOptionsSelection: [],
  combinations: [],
  currentVoteCombinationIdx: 0,
  combinationVoteResult: {},
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
    setCurrentVoteCombinationIdx(state, action: PayloadAction<number>) {
      state.currentVoteCombinationIdx = action.payload;
    },
    setCombinationVoteResult(
      state,
      action: PayloadAction<Record<number, number>>
    ) {
      state.combinationVoteResult[+Object.keys(action.payload)[0]] =
        Object.values(action.payload)[0];
    },
  },
});

export const {
  setInitialOptionsSelection,
  setCombinations,
  setCurrentVoteCombinationIdx,
  setCombinationVoteResult,
} = voteSlice.actions;
export default voteSlice.reducer;
