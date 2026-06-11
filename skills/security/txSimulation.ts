import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

export async function simulateTx(from: string, to: string, amount: string) {
  try {
    // Melakukan dry-run estimasi gas untuk melihat apakah transaksi berpotensi revert
    const gasEstimate = await provider.estimateGas({
      from,
      to,
      value: ethers.parseEther(amount),
    });
    return { success: true, estimatedGas: gasEstimate.toString() };
  } catch (error: any) {
    return {
      success: false,
      reason:
        error.message || "Transaction simulation failed (Potential Revert)",
    };
  }
}
