import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar justify-between bg-base-100 py-4 max-w-[1000px] mx-auto">
      {/* Logo */}
      <div className="flex-1">
        <Link>
          <img className="w-10" src="/img/logo-uinstore.png" alt="logo-store" />
        </Link>
      </div>
      {/* Links */}
      <div className="flex gap-2">
        {/* Link */}
        <div className="flex items-center gap-4 border-r-2 pr-4 border-slate-500">
          <a href="http://127.0.0.1:8000/">Home</a>
          <a href="http://127.0.0.1:8000/categories">Categories</a>
          <Link to="/" className="text-orange-500">
            Tracking
          </Link>
        </div>

        {/* Action Button */}
        <button className="rounded bg-[#29A867] text-white py-1 px-3 ml-2">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Navbar;
