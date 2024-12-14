import ProductEditForm from "@/components/products/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import {fetchProductById, fetchImageByProductId} from '@/actions/product-actions'
import {fetchCategories} from '@/actions/category-actions'
import notFound from "./not-found";

export default async function ProductEditPage({params}) {

  const {id, index} = await params;
  console.log("id", id);
  console.log("index", index);
  const [product] = await Promise.all([fetchProductById(id)]);
  const categories = await fetchCategories();
  const images = await fetchImageByProductId(id)
 
  if (!product) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Update Product Information",
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <ProductEditForm product={product} categories={categories} images={images}/>
    </main>
  );
}