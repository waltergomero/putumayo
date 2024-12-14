"use server";

import  Product  from "@/models/product";
import  Images  from "@/models/image";
import connectDB from "@/config/database";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { productSchema } from "@/schemas/validationSchemas";
import fs from 'fs';
import path from 'path';

const ITEM_PER_PAGE = 10;

export const fetchFilteredProducts = async (q, page) => {
 
  const regex = new RegExp(q, "i");
 
  try {
    await connectDB();

    const products = await Product.find({ product_name: { $regex: regex } })
      .sort({ product_name: 1 })

    return products

  } catch (err) {
    return({error: "Failed to fetch parent products!"});
  }
};

export async function fetchProductPages(query) {
  noStore();
  const regex = new RegExp(query, "i");

  try {
    await connectDB();
    const count = await Product.find({ product_name: { $regex: regex } }).count();

    const totalpages = Math.ceil(Number(count) / ITEM_PER_PAGE);

    return totalpages;

  } catch (err) {
    return({error: "Failed to fetch products!"});
  }
}


export const fetchProductById = async (id) => {
  try {
    await connectDB();
    const _product = await Product.findById(id).select('_id product_name slug category_id category_name price cost number_instock number_onorder quantity_per_unit reorder_level isactive description').lean();  
    
    const product = JSON.parse(JSON.stringify(_product));
    return product;

  } catch (err) {
    return({error: "Failed to fetch a product!"});
  }
};

export const fetchProducts = async () => {
  try {
    await connectDB();
    const product = await Product.find().select('_id product_name').lean();
    return product;
  } catch (err) {
    return({error: "Failed to fetch products!"});
  }
};

export async function createProduct(formData) {
console.log("produc Info:", formData)
  try {
    const product_name = formData.get("product_name");    
    const slug = formData.get("slug");
    const category_id = formData.get("category_id");
    const category_name = formData.get("category_name"); 
    const quantity_per_unit = formData.get("quantity_per_unit"); 
    const cost = formData.get("cost");
    const price = formData.get("price");
    const number_instock = formData.get("number_instock");
    const number_onorder = formData.get("number_onorder");
    const reorder_level = formData.get("reorder_level");
    const description = formData.get("description"); 

    const validatedFields = productSchema.safeParse({product_name, slug, category_id,});
                
    if (!validatedFields.success) {
        return {
                error: "validation",
                zodErrors: validatedFields.error.flatten().fieldErrors,
                strapiErrors: null,
                message: "Missing information on key fields.",
              };
            }

    await connectDB();
    const productexists = await Product.findOne({ product_name: product_name });

    if (productexists) {
      return { 
        error: "productexists",
        message: `Product name ${product_name} already exists.` };
    }

    const newProduct = new Product({
      product_name,
      slug,
      category_id,
      category_name,
      quantity_per_unit,
      cost,
      price,
      number_instock,
      number_onorder,
      reorder_level,
      description,
    });

    await newProduct.save();

  } catch (err) {
    return { error: "Failed to insert new product!" };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(formData) {
  try {
    const id = formData.get("id");
    const product_name = formData.get("product_name");    
    const slug = formData.get("slug");
    const category_id = formData.get("category_id");
    const category_name = formData.get("category_name"); 
    const quantity_per_unit = formData.get("quantity_per_unit"); 
    const cost = formData.get("cost");
    const price = formData.get("price");
    const number_instock = formData.get("number_instock");
    const number_onorder = formData.get("number_onorder");
    const reorder_level = formData.get("reorder_level");
    const description = formData.get("description"); 
    const isactive = formData.get("isactive");

    const validatedFields = productSchema.safeParse({product_name, slug, category_id,});
                
    if (!validatedFields.success) {
        return {
                error: "validation",
                zodErrors: validatedFields.error.flatten().fieldErrors,
                strapiErrors: null,
                message: "Missing information on key fields.",
                };
            }

    await connectDB();
    const productexists = await Product.findOne({ product_name: product_name });

    if (productexists) {
      if (productexists._id != id) {
        return  {error: "productexists",
                error: `Product name "${product_name}"  already exists`};
      }
    }


    const query = {
      product_name,
      slug,
      category_id,
      category_name,
      quantity_per_unit,
      cost,
      price,
      number_instock,
      number_onorder,
      reorder_level,
      description,
      isactive,
    };    

    await Product.updateOne({ _id: id}, query);

    }
   catch (err) {
    return { error: err };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);

  } catch (err) {
    throw new Error("Failed to delete product!");
  }
  revalidatePath("/admin/products");
}

export const fetchImageByProductId = async (productid) => {
  try {
    await connectDB();
    const _images = await Images.find({product_id: productid});
    const images = JSON.parse(JSON.stringify(_images));
    return images;
  } catch (err) {
    return({error: "Failed to fetch products!"});
  }
};

export async function deleteImageFromProduct(id, image_path) {
console.log("Image Info:", id, image_path)
  try {
    await connectDB();
    const response = await Images.findByIdAndDelete(id);
    
    if (response) {
      // Delete the image
      const filePath = path.join(process.cwd(), 'public', image_path);
      fs.unlinkSync(filePath);
      return  {error: "success",
                message: "message: 'Image deleted successfully"};
            } 

  } 
  catch (error) {
    return  {error: "success",
                message: "Failed to delete image! " + error};
            } 

}