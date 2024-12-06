import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import User from "./models/User"
import connectDB from "./config/database"
import bcryptjs from "bcryptjs";

export default {
    providers: [
        Credentials({
          credentials: {
            username: { label: "Email", type: "email"  },
            password: { label: "Password", type: "password" },
          },

        }),

        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          authorization: {
              params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code",
              },
          },
          
      }),

      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB,
        authorization:{
          params: { access_type: 'offline', prompt: 'consent', Response: 'code'}
        },

      }),
    ],
}