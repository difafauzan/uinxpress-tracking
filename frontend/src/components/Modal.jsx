import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Modal = ({
  handleClose,
  statusPage,
  contract,
  selectedTrackingNum,
  addShipment,
  updateShipment,
}) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [shipment, setShipment] = useState(null);

  const getShipment = async () => {
    try {
      if (!contract) {
        throw new Error("Contract instance is not initialized.");
      }

      console.log(
        "Fetching shipment for tracking number:",
        selectedTrackingNum
      );

      const data = await contract.getShipment(selectedTrackingNum);

      if (!data || data[0] === "0x") {
        throw new Error(
          "No shipment data found for the given tracking number."
        );
      }

      console.log("Shipment Data:", data);

      setShipment({
        trackingNumber: data[0],
        date: data[1].toString(),
        status: data[2],
        owner: data[3],
      });
    } catch (error) {
      console.error("Error fetching shipment:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    getShipment();
  }, [selectedTrackingNum]);

  return (
    <div className="absolute inset-0 h-[100vh] w-full bg-gray-400/50 flex items-center justify-center">
      <div className="flex flex-col gap-3 bg-white py-10 px-5 rounded shadow min-w-96">
        <div className="flex flex-col gap-1">
          <label htmlFor="resi">No. Resi</label>
          <input
            className="bg-[#F3F3F3] rounded-full py-2 px-5"
            type="text"
            placeholder="No. Resi"
            value={
              statusPage === "UBAH" ? shipment?.trackingNumber : trackingNumber
            }
            disabled={statusPage === "UBAH"}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Tanggal Pengiriman">Tanggal Pengiriman</label>
          <input
            className="bg-[#F3F3F3] rounded-full py-2 px-5"
            type="date"
            value={statusPage === "UBAH" ? shipment?.date : date}
            disabled={statusPage === "UBAH"}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="resi">Status</label>
          {statusPage !== "BARU" ? (
            <select
              className="bg-[#F3F3F3] rounded-full py-2 px-5"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option disabled selected value={shipment?.status}>
                {shipment?.status}
              </option>
              {/* <option value="Pending">Pending</option> */}
              <option value="Shipping">Shipping</option>
              <option value="Delivered">Delivered</option>
            </select>
          ) : (
            <input
              type="text"
              className="bg-[#F3F3F3] rounded-full py-2 px-5"
              disabled
              value={"Pending"}
            />
          )}
        </div>

        <div className="flex gap-4 items-center justify-end mt-5">
          <button
            onClick={handleClose}
            className="bg-gray-600 text-white py-2 px-4 rounded-md"
          >
            Close
          </button>
          <button
            onClick={() => {
              if (statusPage === "BARU") {
                if (!trackingNumber || !date) {
                  // alert("Please fill in all fields.");
                  toast.error("Mohon isi semua field terlebih dahulu!");
                  return;
                }

                addShipment(trackingNumber, date);
              } else {
                updateShipment(shipment?.trackingNumber, status);
              }
            }}
            className="bg-[#29A867] text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
