import ECommerce from "@/components/dashboard/ecommerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/layout/defaultLayout";

export const metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function DashboardPage() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
