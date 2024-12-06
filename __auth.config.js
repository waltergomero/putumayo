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
            authorize: async (credentials) => { 
              console.log("credentials: ", credentials)
            const { email, password } = credentials;
              
            await connectDB();
            const user = await User.findOne({email: email});
            console.log("user from db: ", user)

            if (!user) {
              throw new Error("User's email was not found")
            }
           
            if (user) {
                const isMatch =  await bcryptjs.compare(password, user.password); 
                if (isMatch) {
                    
                    return user;
                } 
                else {
                    throw new Error("Password provided was not correct");
                }
             }
         }
        })
      // , Google({
      //     clientId: process.env.GOOGLE_ID,
      //     clientSecret: process.env.GOOGLE_SECRET,
      //     authorization:{
      //       params: { access_type: 'offline', prompt: 'consent', Response: 'code'}
      //     },


      // })
      , 
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB,
        authorization:{
          params: { access_type: 'offline', prompt: 'consent', Response: 'code'}
        },

      }),
      ],
}