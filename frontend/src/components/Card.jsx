import React from "react";
import { ChevronRight } from "lucide-react";

const Card = ({ status, handleOpen, data }) => {
  return (
    <div className="rounded bg-gray-200 flex justify-between items-center py-3 px-6">
      <span>{data?.trackingNumber || "trx-coba1"}</span>
      <span>{data?.date || "20/1/2025"}</span>
      <span>{data?.status || "Delivered"}</span>
      <button onClick={handleOpen}>
        <ChevronRight />
      </button>
    </div>
  );
};

export default Card;
