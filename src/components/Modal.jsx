import React from "react";

const Modal = ({ handleClose }) => {
  return (
    <div
      className="absolute inset-0 h-[100vh] w-full bg-gray-400/50 flex items-center justify-center"
    >
      {/* Modal */}
      <div className="flex flex-col gap-3 bg-white py-10 px-5 rounded shadow min-w-96">
        {/* No. Resi */}
        <div className="flex flex-col gap-1">
          <label htmlFor="resi">No. Resi</label>
          <input
            className="bg-[#F3F3F3] rounded-full py-2 px-5"
            type="text"
            placeholder="No. Resi"
          />
        </div>
        {/* Tanggal */}
        <div className="flex flex-col gap-1">
          <label htmlFor="Tanggal Pengiriman">Tanggal Pengiriman</label>
          <input className="bg-[#F3F3F3] rounded-full py-2 px-5" type="date" />
        </div>
        {/* Status */}
        <div className="flex flex-col gap-1  ">
          <label htmlFor="resi">Status</label>
          <select className="bg-[#F3F3F3] rounded-full py-2 px-5">
            <option value="pending" disabled>
              Pending
            </option>
            <option value="shipping">Shipping</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 items-center justify-end mt-5">
          <button
            onClick={handleClose}
            className="bg-gray-600 text-white py-2 px-4 rounded-md"
          >
            Close
          </button>
          <button className="bg-[#29A867] text-white py-2 px-4 rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
