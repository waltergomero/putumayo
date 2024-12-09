"use server";

import  Product  from "@/models/product";
import  Gallery  from "@/models/gallery";
import connectDB from "@/config/database";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

const ITEM_PER_PAGE = 10;

export const fetchImages = async () => {
 
  try {
    await connectDB();

    const images = await Gallery.find() 
    return images

  } catch (err) {
    return({error: "Failed to fetch gallery images!"});
  }
};