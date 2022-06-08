import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setInitialOptionsSelection } from "../../features/vote/vote-slice";
import { useGetAllVoteOptionsQuery } from "../../services/api";
import { VoteOptions } from "../../types/VoteOptions";

const VoteOptionList = () => {
  const [voteOptions, setVoteOptions] = useState<VoteOptions | undefined>();
  const { initialOptionsSelection } = useAppSelector((state) => state.vote);
  const dispatch = useAppDispatch();
  const response = useGetAllVoteOptionsQuery(null);
  useEffect(() => {
    if (!response || !response.data) return;
    setVoteOptions(response.data[0].options);
  }, [response]);

  const selectHandler = (id: number) => {
    dispatch(setInitialOptionsSelection(id));
  };
  return (
    <div className="grid grid-cols-4 gap-4 overflow-y-auto overflow-x-hidden">
      {voteOptions?.map((o) => (
        <div
          key={o.id}
          onClick={() => selectHandler(+o.id)}
          className={`w-16 h-16 p-1 text-[.5em] box-content flex justify-center items-center text-center border border-gray-600 rounded-md cursor-pointer ${
            initialOptionsSelection.includes(+o.id)
              ? "border-blue-500 text-blue-500"
              : ""
          }`}
        >
          {o.name}
        </div>
      ))}
    </div>
  );
};

export default VoteOptionList;
