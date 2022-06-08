import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  account: string().nonempty({ message: "Name is required" }),
});

export type CreateUserSchema = TypeOf<typeof createUserSchema>;
