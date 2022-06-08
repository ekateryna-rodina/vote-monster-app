export type UserVoteBaseTable = {
  userId: string;
  combinationId: string;
  votingOptionIds: string[];
  createdAt: Date;
  leadingId: string | undefined;
};
