import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  status: Status;
  databaseUser: DatabaseUser
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
