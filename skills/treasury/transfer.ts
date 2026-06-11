import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

export async function transfer(privateKey: string, to: string, amount: string) {
  const wallet = new ethers.Wallet(privateKey, provider);
  const tx = await wallet.sendTransaction({
    to: to,
    value: ethers.parseEther(amount),
  });
  return await tx.wait();
}
