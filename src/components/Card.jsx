import React from "react";
import { ChevronRight } from "lucide-react";

const Card = ({ status, handleOpen, data }) => {
  return (
    <div className="rounded bg-gray-200 flex justify-between items-center py-3 px-6">
      {/* Title */}
      <span>{data ? data.resi : 'trx-test'}</span>
      {/* User */}
      <span>{data ? data.date : 'dd/mm/yyyy'}</span>
      {/* Status */}
      <span>{data ? data.status : 'Mock Status'}</span>
      {/* Action Button */}
      <button onClick={handleOpen}>
        <ChevronRight />
      </button>
    </div>
  );
};

export default Card;
