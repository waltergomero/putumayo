
import React from 'react';
import LoginForm from  '@/components/auth/login-form';
import Link from 'next/link';
import SocialButtons  from '@/components/auth/socialButtons';


const LoginPage = async () => {

  return (
    <main className="w-full flex items-center justify-center min-h-screen">
        <div className="w-125 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4  ">
              <h3 className="mb-1.5 mt-4  text-center text-2xl font-semibold text-black dark:text-white">
                Sign in to your account
              </h3>
              <div className="mb-2 mt-2 flex justify-center">
            <Link href="/auth/register" className="text-md text-blue-500 hover:underline">
              You don't have an account?
            </Link>
          </div>
         <LoginForm/>
         <SocialButtons/>
        </div>
    </div>
    </main>
    
  )
}

export default LoginPage