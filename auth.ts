import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn() {
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (token.status && session.user) {
        session.user.status = token.status;
      }

      return session;
    },

    async jwt({ token, trigger }) {
      if (trigger == "signUp") {
        await fetch(`http://localhost:8000/create-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: token.sub,
            email: token.email,
            name: token.name,
          }),
        });
      }

      if (!token.sub) {
        return token;
      }

      const res = await fetch(`http://localhost:8000/get-user/${token.sub}`);
      const { success, data } = await res.json();

      if (!success) {
        return token;
      }

      token.role = data.role;
      token.status = data.status;

      return token;
    },
  },
  
  session: { strategy: "jwt" },
  ...authConfig,
});
