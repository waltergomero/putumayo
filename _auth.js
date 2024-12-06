import NextAuth from "next-auth";
import authConfig from "./auth.config";
import connectDB from "@/config/database";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
...authConfig,
session: { strategy: "jwt"},
callbacks: {
  async signIn({profile, account}) {
    console.log("profile account: ", profile, account)
    // await connectDB();
    // let message="";
    // const user = await User.findOne({email: profile.email});

    // console.log("user info: ", user);
    // if(!user){
    //   await User.create({
    //     firs_name: profile.login || profile.name,
    //     last_name: profile.login || profile.name,
    //     username: profile.login || profile.name,
    //     Image: profile.picture,
    //     provider: profile.url,
    //     email: profile.email,
    //     password: "password",
    //     provider: account.provider,
    //     type: account.type,
    //     isadmin: false,
    //     isactive: true,
    //   });
    // }
    // if(user.provider === "credentials")
    // {
    //   message = "your email address and password"
    // }
    // else{
    //   message = `${user.provider} provider`
    // }

    // const providerMatch = user.provider === account.provider;
    // console.log("providerMatch: ", providerMatch);

    // if (user && providerMatch) {
    //   return true;
    // }
    // else{
    //    throw new Error(`Please use ${message} to sign in`);
    //   }
    },

    jwt({ token, user, account}) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
})