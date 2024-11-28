'use client';
import {
  AtSymbolIcon,
  KeyIcon, EyeIcon, EyeSlashIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from '@/actions/user-actions';


const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("")

  async function onSubmit(event) {
    event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget);
        const response = await createUser(formData);

        if (!!response.error) {
            console.log("error 1: ", response.error);
            setError(response.error.message);
        } else {
            router.push("/dashboard");
        }
    } catch (e) {
       console.log("error 2: ", e);
        setError("Check your Credentials");
    }
}

  return (
  
    <form onSubmit={onSubmit}>
    <div className="p-2">
    <div className="mb-4">
            <label className="block text-sm font-medium text-black dark:text-white">First Name:</label>
            <div className="relative">
            <input
                 id="first_name"
                 type="text"
                 name="first_name"
                 placeholder="Enter your first name"
                 required
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-black dark:text-white">Last Name:</label>
            <div className="relative">
            <input
                 id="last_name"
                 type="text"
                 name="last_name"
                 placeholder="Enter your last name"
                 required
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-black dark:text-white">Email:</label>
            <div className="relative">
            <input
                 id="email"
                 type="email"
                 name="email"
                 placeholder="Enter your email address"
                 required
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-black dark:text-white">Password:</label>
            <div className="relative">
            <input
                id="password"
                value={password}
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border-[1.5px] pl-10  border-stroke bg-transparent px-5 py-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"/>
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <span onClick={() => setVisible(!visible)} className="cursor-pointer absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
             {!visible ? <EyeSlashIcon /> : <EyeIcon />} 
            </span>
        </div>
        </div>
    <div className='mt-4'>
    <button type="submit" className="flex w-full justify-center rounded bg-blue-500 p-3 font-medium text-gray hover:bg-opacity-90">
      Register
    </button>
    </div>
    <div className="flex h-8 items-end space-x-1 mt-2" aria-live="polite" aria-atomic="true" >
          {error && (
            <>
              <ExclamationCircleIcon className="h-6 w-6 text-danger" />
              <p className="text-md text-danger">{error}</p>
            </>
          )}
        </div>
        </div>
    </form>

  )
}

export default RegisterForm;