import { ethers } from "ethers";

export async function signMessage(
  privateKey: string,
  message: string,
): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  return await wallet.signMessage(message);
}
