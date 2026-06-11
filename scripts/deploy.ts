import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log("=== Memulai Pengecekan Sistem Atlantic Testnet ===");
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const network = await provider.getNetwork();

  console.log(`Terhubung ke Network: ${network.name}`);
  console.log(`Chain ID: ${network.chainId.toString()}`);

  if (process.env.PRIVATE_KEY) {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log(`Deployer / Admin Address: ${wallet.address}`);
    const balance = await provider.getBalance(wallet.address);
    console.log(`Saldo Operasional: ${ethers.formatEther(balance)} PHRS`);
  } else {
    console.log("Peringatan: PRIVATE_KEY belum diset di .env");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
