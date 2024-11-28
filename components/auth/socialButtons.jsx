"use client"

import React from 'react';
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import { toast } from 'react-toastify';
import { doProviderLogin } from '@/actions/user-actions';

const SocialButtons = () => {

  const handleClick = async (event, provider) => {

    console.log(`Button ${provider} was clicked`);
    event.preventDefault();
    try {
        const response = await doProviderLogin(provider);
        if (response.error) {
            toast.error(response.error);
        } else {
            router.push("/admin");
        }
    } catch (e) {
      toast.error("Check your Credentials");
    }
  };

  return (
    
    <div className='flex items-center w-full p-2 gap-x-2 pb-4'>
      <button type='submit' className='flex w-full justify-center rounded p-3 font-medium text-black border' onClick={(event) => handleClick(event, 'google')}>
        <FcGoogle className='w-6 h-6 mr-2'/>Sign in with Google
      </button>
      <button  type='submit' className='flex w-full justify-center rounded  p-3 font-medium text-black border' onClick={(event) => handleClick(event, 'github')}>
        <FaGithub className='w-6 h-6 mr-2'/>Sign in with  Github
      </button>
    </div>
  )
}

export default SocialButtons;

// "use client"

// import React from 'react';
// import {FcGoogle} from "react-icons/fc";
// import {FaGithub} from "react-icons/fa";
// import { signIn } from 'next-auth/react';

// const SocialButtons = () => {


//   return (
//     <div className='flex items-center w-full p-2 gap-x-2 pb-4'>
//       <button className='flex w-full justify-center rounded p-3 font-medium text-black border' onClick={() => signIn("google")}>
//         <FcGoogle className='w-6 h-6 mr-2'/>Sign in with Google
//       </button>
//       <button className='flex w-full justify-center rounded  p-3 font-medium text-black border' onClick={() => signIn("github")}>
//         <FaGithub className='w-6 h-6 mr-2'/>Sign in with  Github
//       </button>
//     </div>
//   )
// }

// export default SocialButtons