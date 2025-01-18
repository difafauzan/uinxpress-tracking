import React from "react";
import { Link } from "react-router";

const TrackingPage = () => {
  return (
    <div className="flex items-center justify-center mt-9 w-screen">
      <div className="flex flex-col gap-5 w-[700px]">
        <h1 className="text-[28px]">Track Shipment</h1>
        <p className="text-[18px] opacity-60">
          Delivery is safer and more transparent with blockchain.
        </p>
        <input
          className="bg-[#F3F3F3] rounded-full py-2 px-5"
          type="text"
          placeholder="Input Resi"
        />
        <div className="flex flex-col gap-2 text-white text-center w-96  mx-auto">
          <a className="bg-[#29A867] rounded-full py-2" href="o">
            Track Order
          </a>
          <Link to={"/delivery"} className="bg-[#BBBBBB] rounded-full py-2">
            View All Deliveries
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
