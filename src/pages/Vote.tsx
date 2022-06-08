import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ProgressBar from "../components/progressBar/ProgressBar";
import {
  setCombinationVoteResult,
  setCurrentVoteCombinationIdx,
} from "../features/vote/vote-slice";
import {
  useGetAllVoteOptionsQuery,
  useGetCombinationByIdQuery,
} from "../services/api";
import { VoteOption } from "../types/VoteOptions";

const Vote: React.FC = () => {
  const { currentVoteCombinationIdx, combinations, combinationVoteResult } =
    useAppSelector((state) => state.vote);
  const { data: allVoteOptions } = useGetAllVoteOptionsQuery(null);
  const dispatch = useAppDispatch();
  const { data } = useGetCombinationByIdQuery(
    combinations[currentVoteCombinationIdx]
  );
  const [currentCombinationOptions, setCurrentCombinationOptions] = useState<
    VoteOption[] | undefined
  >();

  const navigate = useNavigate();
  useEffect(() => {
    if (!data || !data.length) return;
    const combinationOptionIds = data[0].options;
    setCurrentCombinationOptions(
      allVoteOptions![0].options.filter((o) =>
        combinationOptionIds.includes(+o.id)
      )
    );
  }, [data, allVoteOptions]);
  useEffect(() => {
    if (currentVoteCombinationIdx >= combinations.length) {
      navigate("/result");
    }
    // eslint-disable-next-line
  }, [currentVoteCombinationIdx, combinations]);
  const voteHandler = (id: number) => {
    dispatch(setCombinationVoteResult({ [data![0].id]: id }));
  };
  const continueHandler = () => {
    dispatch(setCurrentVoteCombinationIdx(currentVoteCombinationIdx + 1));
    navigate(`/vote`);
  };
  return (
    <>
      <ProgressBar progress={30} />
      <h3>What do you consider a higher priority?</h3>
      <div className="flex flex-col justify-center items-center gap-4">
        {currentCombinationOptions?.map((o) => (
          <div
            key={o.id}
            onClick={() => voteHandler(o.id)}
            className={`p-2 text-[1em] box-content flex justify-center items-center text-center border border-gray-600 rounded-md cursor-pointer ${
              combinationVoteResult[data![0].id] === o.id
                ? "border-blue-500 text-blue-500"
                : ""
            }`}
          >
            {o.name}
          </div>
        ))}
      </div>
      <div className="h-8 absolute bottom-4 left-4 right-4">
        <button
          className={`w-[calc(100%-2.5rem)] h-full text-sm bg-gray-600 text-white rounded-md mr-2 ${
            !(!data || data![0].id in combinationVoteResult)
              ? "btn-disabled"
              : ""
          }`}
          onClick={continueHandler}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default Vote;
