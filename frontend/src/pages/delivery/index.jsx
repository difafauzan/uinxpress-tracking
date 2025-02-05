import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import { BrowserProvider, Contract } from "ethers";
import contractABI from "../../contract/Tracking.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const DeliveryPage = ({ contract }) => {
  // const [provider, setProvider] = useState(null);
  // const [contract, setContract] = useState(null);
  // const [trackingNumber, setTrackingNumber] = useState("");
  // const [date, setDate] = useState("");
  // const [newStatus, setNewStatus] = useState("");
  const [tabs, setTabs] = useState("Pending");
  const [showModal, setShowModal] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [statusPage, setStatusPage] = useState("");
  const [selectedTrackingNum, setSelectedTrackingNum] = useState("");

  const getAllShipment = async () => {
    try {
      if (!contract) {
        throw new Error("Contract instance is not initialized.");
      }

      const data = await contract.getAllShipments();

      if (!data) {
        throw new Error("No shipment data found.");
      }

      // console.log("Data all shipment: ", data);
      const modifiedData = data.map((item) => ({
        trackingNumber: item[0],
        date: item[1].toString(),
        status: item[2],
        owner: item[3],
      }));
      setShipments(modifiedData);
    } catch (error) {
      console.error("Error fetching all data shipments: ", error);
    }
  };

  const addShipment = async (trackingNumber, date) => {
    // alert(contract);
    if (contract) {
      const tx = await contract.addShipment(trackingNumber, date);
      await tx.wait();
      // alert("Shipment added!");
      toast.success("Pengiriman Berhasil ditambahkan!");
      getAllShipment();
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
  };

  const updateStatus = async (trackingNumber, newStatus) => {
    if (contract) {
      const tx = await contract.updateShipmentStatus(trackingNumber, newStatus);
      await tx.wait();
      // alert("Status updated!");
      toast.success("Pengiriman Berhasil di update!");
      getAllShipment();
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
  };

  const handleOpenEdit = (trackingNumber) => {
    setStatusPage("UBAH");
    setSelectedTrackingNum(trackingNumber);
    setShowModal(true);
  };

  const filteredData = shipments.filter((data) => data.status === tabs);

  useEffect(() => {
    if (contract) {
      getAllShipment();
    }
  }, [contract]);

  return (
    <div>
      <div className="flex items-center justify-center mt-9 w-[1000px]">
        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-[28px]">Check Delivery</h1>
          <p className="text-[18px] opacity-60">
            Get the latest updates on your shipment&apos;s progress.
          </p>
        </div>

        {/* <button
          onClick={() => {
            getAllShipment();
            console.log("Data: ", shipments);
          }}
        >
          Fetch Data All Shipments
        </button> */}
        <button
          className="bg-[#29A867] text-white py-2 px-4 rounded-md min-w-[200px]"
          onClick={() => {
            setShowModal(true);
            setStatusPage("BARU");
          }}
        >
          Add New Shipping
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-5 mt-7 w-full">
        {["Pending", "Shipping", "Delivered"].map((status) => (
          <button
            key={status}
            className={tabs === status ? "border-b-2 border-black" : ""}
            onClick={() => setTabs(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* List Data */}
      <div className="max-w-[1015px] mx-auto mt-8 flex flex-col gap-5 cursor-pointer">
        {filteredData.length > 0 ? (
          filteredData.map((data, index) => (
            <Card
              key={data.trackingNumber}
              status={data.status}
              data={data}
              handleOpen={() => handleOpenEdit(data.trackingNumber)}
            />
          ))
        ) : (
          <p>Tidak ada data</p>
        )}
      </div>

      {showModal && (
        <Modal
          handleClose={() => setShowModal(false)}
          addShipment={addShipment}
          statusPage={statusPage}
          contract={contract}
          selectedTrackingNum={selectedTrackingNum}
          updateShipment={updateStatus}
        />
      )}
    </div>
  );
};

export default DeliveryPage;
