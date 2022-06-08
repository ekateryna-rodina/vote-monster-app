import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import {
  useGetAllCombinationsQuery,
  useGetAllVoteOptionsQuery,
} from "../services/api";
import { sort } from "../utils/topologicalSort";

const Result = () => {
  const { initialOptionsSelection, combinations, combinationVoteResult } =
    useAppSelector((state) => state.vote);
  const responseCombinations = useGetAllCombinationsQuery(null);
  const allOptions = useGetAllVoteOptionsQuery(null);
  const [ranked, setRanked] = useState<string[]>([]);
  const generateDepsList = () => {
    if (!responseCombinations.data?.length) return;

    const activeCombinations = responseCombinations.data.filter(
      (c: { id: number; options: number[] }) => combinations.includes(c.id)
    );
    const deps: number[][] = activeCombinations.reduce(
      (acc: number[][], current: { id: number; options: number[] }) => {
        const combinationId = current.id;
        const options = current.options;
        const leadingId: number = combinationVoteResult[combinationId];
        const loosingId: number = options.filter((o) => o !== leadingId)[0];
        const newDeps = [loosingId, leadingId];
        acc.push(newDeps);
        return acc;
      },
      []
    );
    return deps;
  };
  useEffect(() => {
    const deps: number[][] | undefined = generateDepsList();
    console.log(deps);
    const ranked = sort(initialOptionsSelection, deps as number[][]);
    const rankedTitles = ranked.map(
      (id) => allOptions.data![0].options.filter((o) => o.id === id)[0].name
    );
    setRanked(rankedTitles);
    // eslint-disable-next-line
  }, [responseCombinations, initialOptionsSelection]);
  return (
    <div>
      {ranked.map((r) => (
        <div key={r}>{r}</div>
      ))}
    </div>
  );
};

export default Result;
