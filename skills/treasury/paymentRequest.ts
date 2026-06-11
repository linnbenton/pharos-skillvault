import { ethers } from "ethers";

export function createPaymentRequest(
  to: string,
  amount: string,
  description: string,
) {
  // Membuat standard URL/Payload untuk request pembayaran di Atlantic Testnet
  const encodedData = Buffer.from(
    JSON.stringify({ to, amount, description, chainId: 688689 }),
  ).toString("base64");
  return {
    target: to,
    amount: amount,
    currency: "PHRS",
    paymentUrl: `pharos://pay?data=${encodedData}`,
    createdAt: new Date().toISOString(),
  };
}
