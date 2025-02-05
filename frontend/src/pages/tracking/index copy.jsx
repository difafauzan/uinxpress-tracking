import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalTracking from "../../components/ModalTracking";

const TrackingPage = ({ contract }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModalTracking, setShowModalTracking] = useState(false);

  // const getShipment = async () => {
  //   if (contract) {
  //     const data = await contract.getShipment(trackingNumber);
  //     console.log(data);

  //     setShipment({
  //       trackingNumber: data[0],
  //       date: data[1],
  //       status: data[2],
  //       owner: data[3],
  //     });
  //   }
  // };

  const getShipment = async () => {
    try {
      if (!contract) {
        throw new Error("Contract instance is not initialized.");
      }

      console.log("Fetching shipment for tracking number:", trackingNumber);

      // Panggil fungsi getShipment dari kontrak
      const data = await contract.getShipment(trackingNumber);

      if (!data || data[0] === "0x") {
        throw new Error(
          "No shipment data found for the given tracking number."
        );
      }

      console.log("Shipment Data:", data);

      // Simpan data ke state
      setShipment({
        trackingNumber: data[0],
        date: data[1].toString(), // Konversi BigNumber ke string jika perlu
        status: data[2],
        owner: data[3],
      });
    } catch (error) {
      console.error("Error fetching shipment:", error.message);
      throw error; // Lanjutkan kesalahan ke handleSearch
    }
  };

  // const handleSearch = () => {
  //   if (!trackingNumber || trackingNumber === "") {
  //     alert("Please input tracking number");
  //     return;
  //   }
  //   getShipment();
  //   setShowModalTracking(true);
  // };

  const handleSearch = async () => {
    if (!trackingNumber || trackingNumber === "") {
      alert("Please input tracking number");
      return;
    }

    try {
      setIsLoading(true); // Aktifkan loading
      await getShipment(); // Panggil fungsi untuk mendapatkan data shipment
      setShowModalTracking(true); // Tampilkan modal setelah data diperoleh
    } catch (error) {
      console.error("Error fetching shipment:", error.message);
      alert("Failed to fetch shipment data. Please try again.");
    } finally {
      setIsLoading(false); // Matikan loading
    }
  };

  const handleClose = () => {
    setShowModalTracking(false);
  };

  return (
    <div className="flex items-center justify-center mt-9 w-[1000px]">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-[28px]">Track Shipment</h1>
        <p className="text-[18px] opacity-60">
          Delivery is safer and more transparent with blockchain.
        </p>

        <input
          className="bg-[#F3F3F3] rounded-full py-2 px-5"
          type="text"
          placeholder="Input Resi"
          onChange={(e) => setTrackingNumber(e.target.value)}
          // onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />

        <div className="flex flex-col gap-2 text-white text-center w-96 mx-auto">
          <button
            className="bg-[#29A867] rounded-full py-2 hover:bg-[#1f7a4d] transition-colors"
            onClick={getShipment}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Track Order"}
          </button>

          <Link
            to="/delivery"
            className="bg-[#BBBBBB] rounded-full py-2 hover:bg-[#999999] transition-colors"
          >
            View All Deliveries
          </Link>
        </div>
      </div>

      {showModalTracking && (
        <ModalTracking handleClose={handleClose} data={shipment} />
      )}
    </div>
  );
};

export default TrackingPage;
