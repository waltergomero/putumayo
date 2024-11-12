"use client";
import Breadcrumb from "@/components/breadcrumbs/breadcrumb";
import ChartOne from "@/components/charts/chartOne";
import ChartTwo from "@/components/charts/chartTwo";
import dynamic from "next/dynamic";
import React from "react";

const ChartThree = dynamic(() => import("@/components/charts/chartThree"), {
  ssr: false,
});

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
