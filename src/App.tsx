import React, { useEffect } from "react";
import AppRouter from "./components/AppRouter";
import {
  useGetAllCombinationsQuery,
  useGetAllVoteOptionsQuery,
  useSaveVoteCombinationMutation,
} from "./services/api";

function App() {
  const responseOptions = useGetAllVoteOptionsQuery(null);
  const [saveCombination, result] = useSaveVoteCombinationMutation();
  const responseCombinations = useGetAllCombinationsQuery(null);
  useEffect(() => {
    if (responseCombinations.isLoading) return;
    if (responseCombinations.data?.length) return;
    if (!responseOptions || !responseOptions.data) return;
    if (responseCombinations?.data?.length) return;
    const allOptionsIds = responseOptions.data[0].options.map((o) => o.id);
    const saveCombinations = async (ids: string[]) => {
      if (!ids.length) return;
      let counter = 0;
      for (let i = 0; i < ids.length; i++) {
        for (let j = i + 1; j < ids.length; j++) {
          try {
            counter += 1;
            saveCombination({
              id: counter,
              options: [+ids[i], +ids[j]],
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    try {
      saveCombinations(allOptionsIds);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, [responseCombinations, responseOptions]);
  // useEffect(() => {
  //   if (!responseOptions || !responseOptions.data) return;
  //   if (responseCombinations?.data?.length) return;
  //   const allOptionsIds = responseOptions.data[0].options.map((o) => o.id);
  //   const saveCombinations = async (ids: string[]) => {
  //     if (!ids.length) return;
  //     let counter = 0;
  //     for (let i = 0; i < ids.length; i++) {
  //       for (let j = i + 1; j < ids.length; j++) {
  //         try {
  //           counter += 1;
  //           saveCombination({
  //             id: counter,
  //             options: [+ids[i], +ids[j]],
  //           });
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       }
  //     }
  //   };
  //   try {
  //     saveCombinations(allOptionsIds);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // eslint-disable-next-line
  // }, [responseOptions, responseCombinations]);
  return (
    <div className="h-full">
      <AppRouter />
    </div>
  );
}

export default App;
