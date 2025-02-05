import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ethers } from "ethers";
import contractABI from "../contract/Tracking.json";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const Navbar = ({ provider, setProvider, setContract, contract }) => {
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Cek koneksi wallet saat komponen dimuat
  useEffect(() => {
    checkWalletConnection();
  }, [setProvider, contract]);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    }
  };

  // const connectWallet = async () => {
  //   try {
  //     if (!window.ethereum) {
  //       alert("Please install MetaMask!");
  //       return;
  //     }

  //     const accounts = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });

  //     if (accounts.length > 0) {
  //       setAccount(accounts[0]);
  //       setIsConnected(true);

  //       // Tambahkan listener untuk perubahan akun
  //       window.ethereum.on("accountsChanged", (newAccounts) => {
  //         setAccount(newAccounts[0] || "");
  //         setIsConnected(!!newAccounts[0]);
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error connecting wallet:", error);
  //   }
  // };

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
    } else {
      alert("MetaMask is required!");
    }
  }, [setProvider]);

  useEffect(() => {
    const savedContract = localStorage.getItem("contract");
    const { address, abi } = JSON.parse(savedContract);
    const connect = async () => {
      if (provider) {
        const signer = await provider.getSigner();
        const Tracking = new ethers.Contract(address, abi, signer);
        // Set kontrak ke state jika perlu
        setContract(Tracking);
      }
    };
    if (savedContract) {
      connect();
    }
  }, [provider, setContract]);

  const connectWallet = async () => {
    if (provider) {
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const Tracking = new ethers.Contract(
        contractAddress,
        contractABI.abi, // Gunakan .abi untuk mendapatkan array ABI
        signer
      );
      console.log("addrss:", contractAddress);
      console.log("contractABI:", contractABI);
      console.log("TrackingABI:", Tracking);

      const contractData = {
        address: contractAddress,
        abi: contractABI.abi,
      };
      localStorage.setItem("contract", JSON.stringify(contractData));
    }
  };

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="navbar justify-between bg-base-100 py-4 max-w-[1000px] mx-auto">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/">
          <img className="w-10" src="/img/logo-uinstore.png" alt="logo-store" />
        </Link>
      </div>

      {/* Links */}
      <div className="flex gap-2">
        <div className="flex items-center gap-4 border-r-2 pr-4 border-slate-500">
          <a href="http://127.0.0.1:8000/">Home</a>
          <a href="http://127.0.0.1:8000/categories">Categories</a>
          <Link to="/" className="text-orange-500">
            Tracking
          </Link>
        </div>

        {/* Wallet Button */}
        <button
          onClick={connectWallet}
          className="rounded bg-[#29A867] text-white py-1 px-3 ml-2"
        >
          {isConnected ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              {truncateAddress(account)}
            </div>
          ) : (
            "Connect Wallet"
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
