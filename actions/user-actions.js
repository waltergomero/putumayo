"use server";

import  User  from "@/models/User";
import bcryptjs from "bcryptjs";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { unstable_noStore as noStore } from 'next/cache';
import connectDB from "@/config/database";

const ITEM_PER_PAGE = 10;

export const fetchFilteredUsers = async (q, page) => {
 
  const regex = new RegExp(q, "i");
 
  try {
    await connectDB();

    const users = await User.find({ email: { $regex: regex } })
      .sort({ last_name: 1, first_name: 1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

   // await db.disconnect();

    return users

  } catch (err) {
    return({error: "Failed to fetch users!"});
  }
};

export async function fetchUserPages(query) {
  noStore();
  const regex = new RegExp(query, "i");

  try {
    await connectDB();
    const count = await User.find({ email: { $regex: regex } }).count();

    const totalpages = Math.ceil(Number(count) / ITEM_PER_PAGE);

    return totalpages;

  } catch (err) {
    return({error: "Failed to fetch users!"});
  }
}


export const fetchUserById = async (id) => {
  try {
    await connectDB();
    const _user = await User.findById(id);

    const user = JSON.parse(JSON.stringify(_user));
    return user
  } catch (err) {
    return({error: err + "Failed to fetch user!"});
  }
};

export async function createUser(formData) {
  try {
    const _isAdmin = formData.get("isadmin");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const name = formData.get("first_name") + ' ' + formData.get("last_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const isadmin = _isAdmin ? true : false;
    const provider = "credentials";
    const type = "credentials";


    await connectDB();
    const userexists = await User.findOne({ email: email });

    if (userexists) {
      //throw new Error("User with this email account already exists.");
      return { error: `User with this email account ${email} already exists.` };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      first_name,
      last_name,
      name,
      email,
      password: hashedPassword,
      isadmin,
      provider,
      type,
    });

    await newUser.save();

  } catch (err) {
    return { error: "Failed to insert new user!" };
  }

  revalidatePath("/auth/login");
  redirect("/auth/login");
}

export async function updateUser(formData) {

  try {
    const id = formData.get("id");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const isadmin = formData.get("isadmin");
    const isactive = formData.get("isactive");

    await connectDB();
    const userexists = await User.findOne({ email: email });

    if (userexists) {
      if (userexists._id != id) {
        return  {error: `User with this email "${email}" already exists`};
      }
    }

    let query = "";

    if(password){
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt); 

       query = {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: hashedPassword,
          isadmin: isadmin,
          isactive: isactive,
        };
     }
     else{
       
       query = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        isadmin: isadmin,
        isactive: isactive,
        };
     }
      await User.updateOne({ _id: id}, query);
  
  } catch (err) {
    return { error: err };
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function deleteUser(id) {
  try {
    await connectDB();
    await User.findByIdAndDelete(id);
    
  } catch (err) {
    throw new Error("Failed to delete user!");
  }
  revalidatePath("/dashboard/users");
}

export async function fetchUserByEmail(email) {
  try {
    await connectDB();
    return await User.findOne({email: email});
    //return user;
  } catch (error) {

    throw new Error('Failed to fetch user.');
  }
}

export async function doCredentialLogin(formData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return { success: true };
  } 
  catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
 
}

export async function doSocialLogin(provider) {

 await signIn(provider, { redirectTo: "/admin" });

  // try {
  //   await signIn(provider);
    
  // } 
  // catch (error) {
  //   if (error instanceof AuthError) {
  //     return { error: error.cause?.err?.message };
  //   }
  //   return { error: `error 500 ${error}` };
  // }
  // redirect("/admin");
}