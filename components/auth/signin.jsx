"use client"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
 
export default function SignIn() {
    const { data: session } = useSession();

    if(!session){     
        return (
                <button onClick={() => signIn()}>Sign In</button>)
                }
    
        return (
                <button onClick={() => signOut()}>Sign Out</button>)

}