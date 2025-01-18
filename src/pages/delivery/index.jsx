import React, { useState } from "react";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
// import Web3 from "web3";
// import Navbar from "../../includes/Navbar";

const mockData = [
  {
    id: 1,
    resi: 'trx-000001',
    date: '12/2/2023',
    status: 'Pending'
  },
  {
    id: 2,
    resi: 'trx-000002',
    date: '12/2/2023',
    status: 'Pending'
  },
  {
    id: 3,
    resi: 'trx-000003',
    date: '12/2/2023',
    status: 'Shipping'
  },
  {
    id: 4,
    resi: 'trx-000004',
    date: '12/2/2023',
    status: 'Shipping'
  },
  {
    id: 5,
    resi: 'trx-000005',
    date: '12/2/2023',
    status: 'Shipping'
  },
]

const DeliveryPage = () => {
  const [tabs, setTabs] = useState("Pending");
  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState(null);

  const filteredPendingData = mockData.filter(item => item.status === 'Pending')
  const filteredShippingData = mockData.filter(item => item.status === 'Shipping')

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Fungsi Connect Ke Metamask

  // const connectWallet = async () => {
  //   if (window.ethereum) {
  //     const web3 = new Web3(window.ethereum);
  //     try {
  //       await window.ethereum.request({ method: "eth_requestAccounts" });
  //       const accounts = await web3.eth.getAccounts();
  //       setAccount(accounts[0]);
  //     } catch (error) {
  //       console.error("User rejected the request");
  //     }
  //   } else {
  //     alert("Please Connect to Metamask");
  //   }
  // };

  return (
    <div className="">
      <div className="">
        <div className="flex items-center justify-center mt-9 w-[1000px]">
          <div className="flex flex-col gap-3 w-full">
            <h1 className="text-[28px]">Check Delivery</h1>
            <p className="text-[18px] opacity-60">
              Get the latest updates on your shipment&apos;s progress.
            </p>
          </div>

          <button
            className="bg-[#29A867] text-white py-2 px-4 rounded-md min-w-[200px]"
            onClick={() => setShowModal(true)}
          >
            Add New Shipping
          </button>
        </div>
        <div className="flex space-x-5 mt-7 w-full">
          <button
            className={`${tabs === "Pending" ? "border-b-2 border-black" : ""}`}
            onClick={() => setTabs("Pending")}
          >
            Pending
          </button>
          <button
            className={`${
              tabs === "Shipping" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setTabs("Shipping")}
          >
            Shipping
          </button>
          <button
            className={`${
              tabs === "Delivered" ? "border-b-2 border-black" : ""
            }`}
            onClick={() => setTabs("Delivered")}
          >
            Delivered
          </button>
        </div>

        {tabs === "Pending" && (
          <div
            className={
              "max-w-[1015px] mx-auto mt-8 flex flex-col gap-5 cursor-pointer"
            }
          >
            {filteredPendingData.map(data => (
              <Card key={data.id} status="Pending" data={data} handleOpen={handleOpenModal} />
            ))}
          </div>
        )}
        {tabs === "Shipping" && (
          <div
            className={
              "max-w-[1015px] mx-auto mt-8 flex flex-col gap-5 cursor-pointer"
            }
          >
            {filteredShippingData.map(data => (
              <Card key={data.id} status="Pending" data={data} handleOpen={handleOpenModal} />
            ))}
          </div>
        )}
        {tabs === "Delivered" && (
          <div
            className={
              "max-w-[1015px] mx-auto mt-8 flex flex-col gap-5 cursor-pointer"
            }
          >
            <Card status="Delivered" handleOpen={handleOpenModal} />
          </div>
        )}
        {showModal && <Modal handleClose={handleCloseModal} />}
        {/* <Modal /> */}
      </div>
    </div>
  );
};

export default DeliveryPage;
