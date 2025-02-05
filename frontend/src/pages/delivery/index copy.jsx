import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import { BrowserProvider, Contract } from "ethers";
import contractABI from "../../contract/Tracking.json";
import { ethers } from "ethers";

const DeliveryPage = ({contract}) => {
  // const [provider, setProvider] = useState(null);
  // const [contract, setContract] = useState(null);
  // const [trackingNumber, setTrackingNumber] = useState("");
  // const [date, setDate] = useState("");
  // const [newStatus, setNewStatus] = useState("");
  const [tabs, setTabs] = useState("Pending");
  const [showModal, setShowModal] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [statusPage, setStatusPage] = useState("");

  const addShipment = async (trackingNumber, date) => {
    alert(contract);
    if (contract) {
      const tx = await contract.addShipment(trackingNumber, date);
      await tx.wait();
      alert("Shipment added!");
      setTimeout(() => {
        setShowModal(false);
      }, 1500);
    }
  };

  const updateStatus = async (trackingNumber, newStatus) => {
    if (contract) {
      const tx = await contract.updateStatus(trackingNumber, newStatus);
      await tx.wait();
      alert("Status updated!");
    }
  };

  const filteredData = shipments.filter((item) => item.status === tabs);

  return (
    <div>
      <div className="flex items-center justify-center mt-9 w-[1000px]">
        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-[28px]">Check Delivery</h1>
          <p className="text-[18px] opacity-60">
            Get the latest updates on your shipment&apos;s progress.
          </p>
        </div>

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
          filteredData.map((data) => (
            <Card
              key={data.id}
              status={data.status}
              data={data}
              handleOpen={() => {}}
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
        />
      )}
    </div>
  );
};

export default DeliveryPage;
