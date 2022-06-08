import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCombinations } from "../../features/vote/vote-slice";
import { useGetCombinationsByOptionsQuery } from "../../services/api";
import SectionTitle from "../sectionTitle/SectionTitle";
import VoteOptionList from "../voteOptionList/VoteOptionList";

const FilterVoteOptions = () => {
  const { initialOptionsSelection } = useAppSelector((state) => state.vote);
  const [combinationOptionIds, setCombinationOptionIds] = useState<number[][]>(
    []
  );
  const { data } = useGetCombinationsByOptionsQuery(combinationOptionIds, {
    skip: !combinationOptionIds.length,
  });
  const dispatch = useAppDispatch();
  const startVotingHandler = () => {
    console.log(initialOptionsSelection);
    const selected = [...initialOptionsSelection].sort((a, b) => a - b);
    const combinations: number[][] = [];
    // create vote combinations for user and save to the repo
    for (let i = 0; i < selected.length; i++) {
      for (let j = i + 1; j < selected.length; j++) {
        combinations.push([+selected[i], +selected[j]]);
      }
    }
    setCombinationOptionIds(combinations);
  };
  useEffect(() => {
    if (!data) return;
    dispatch(setCombinations((data as []).map((d: { id: number }) => d.id)));
    // eslint-disable-next-line
  }, [combinationOptionIds, data]);
  return (
    <div className="h-full p-4">
      <SectionTitle>
        What should your tax dollar fund? Choose at least 5.
      </SectionTitle>
      <VoteOptionList />
      <div className="h-8 absolute bottom-4 left-4 right-4">
        <button
          className="w-[calc(100%-2.5rem)] h-full text-sm bg-gray-600 text-white rounded-md mr-2"
          onClick={startVotingHandler}
        >
          Continue
        </button>
        <button
          className="w-8 h-full text-sm bg-blue-500 text-white rounded-md"
          onClick={() => null}
        >
          Im
        </button>
      </div>
    </div>
  );
};

export default FilterVoteOptions;
