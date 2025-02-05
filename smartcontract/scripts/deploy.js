const hre = require("hardhat");

async function main() {
  // Ambil factory untuk kontrak "Tracking"
  const Tracking = await hre.ethers.getContractFactory("Tracking");

  // Deploy kontrak
  const trackingcontract = await Tracking.deploy();

  // Tunggu hingga deployment selesai
  await trackingcontract.waitForDeployment();

  // Dapatkan alamat kontrak yang telah dideploy
  const contractAddress = await trackingcontract.getAddress();
  console.log("Contract deployed to:", contractAddress);
}

// Jalankan fungsi main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
