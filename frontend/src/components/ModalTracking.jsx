import React from "react";

const ModalTracking = ({ handleClose, data }) => {
  return (
    <div className="absolute inset-0 h-[100vh] w-full bg-gray-400/50 flex items-center justify-center">
      <div className="flex flex-col gap-3 bg-white py-10 px-5 rounded shadow min-w-96">
        {/* Tampilkan data shipment */}
        <span>No. Resi: {data?.trackingNumber || "N/A"}</span>
        <span>Tanggal: {data?.date || "N/A"}</span>
        <span>Status: {data?.status || "N/A"}</span>
        <span>Owner: {data?.owner || "N/A"}</span>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-gray-600 text-white py-2 px-4 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTracking;
