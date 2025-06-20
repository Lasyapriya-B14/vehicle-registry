import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/prisma"
 
export default{
  adapter: PrismaAdapter(db),
  providers: [Google]
} satisfies NextAuthConfig