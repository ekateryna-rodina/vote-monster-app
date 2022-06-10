import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserVoteBaseTable } from "../types/UserVoteBaseTable";
import { Vote } from "../types/Vote";
import { VoteOptions } from "../types/VoteOptions";
const baseUrl = process.env.REACT_APP_API_URL;
console.log("env", baseUrl);
export const voteMonsterApi = createApi({
  reducerPath: "voteMonsterApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Records"],
  endpoints: (builder) => ({
    createUser: builder.mutation<any, any>({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
        credentials: "include",
      }),
    }),
    getCurrentUser: builder.query<any, void>({
      query: (user) => ({
        url: "users/currentUser",
        method: "GET",
        credentials: "include",
      }),
    }),
    createSession: builder.mutation<any, any>({
      query: (userCredentials) => ({
        url: "sessions",
        method: "POST",
        body: userCredentials,
        credentials: "include",
      }),
    }),
    clearSession: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "sessions",
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getAllVoteOptions: builder.query<
      { sectionId: string; options: VoteOptions }[],
      null
    >({
      query: () => ({
        url: "voteOptions",
        method: "GET",
      }),
    }),
    getAllCombinations: builder.query<[], null>({
      query: () => ({
        url: "voteCombinations",
        method: "GET",
      }),
    }),
    getCombinationById: builder.query<
      { id: number; options: number[] }[],
      number
    >({
      query: (id) => ({
        url: `voteCombinations?id=${id}`,
        method: "GET",
      }),
    }),
    getCombinationsByOptions: builder.query<{}, number[][]>({
      query: function (options) {
        let url = "voteCombinations?";
        const optionsList = options.map((o) => `options=${o}`);
        url += optionsList.join("&");
        return {
          url,
          method: "GET",
        };
      },
    }),
    startVoting: builder.mutation<null, UserVoteBaseTable>({
      query: (params) => ({
        url: "userVoteResult",
        method: "POST",
        body: params,
      }),
    }),
    getUserVoteOptions: builder.query<UserVoteBaseTable, string>({
      query: (userId) => ({
        url: `userVoteResult/${userId}`,
        method: "GET",
      }),
    }),
    saveVote: builder.mutation<undefined, Vote>({
      query: (record) => ({
        url: "userVoteResult",
        method: "PUT",
        body: record,
        credentials: "include",
      }),
    }),
    saveVoteCombination: builder.mutation<
      undefined,
      { id: number; options: number[] }
    >({
      query: (combination) => ({
        url: "voteCombinations",
        method: "POST",
        body: combination,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useCreateSessionMutation,
  useGetAllVoteOptionsQuery,
  useGetUserVoteOptionsQuery,
  useGetAllCombinationsQuery,
  useClearSessionMutation,
  useGetCurrentUserQuery,
  useSaveVoteMutation,
  useSaveVoteCombinationMutation,
  useGetCombinationsByOptionsQuery,
  useGetCombinationByIdQuery,
} = voteMonsterApi;
