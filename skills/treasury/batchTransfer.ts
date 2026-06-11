import { transfer } from "./transfer";

interface Recipient {
  to: string;
  amount: string;
}

export async function batchTransfer(
  privateKey: string,
  recipients: Recipient[],
) {
  const results = [];
  for (const recipient of recipients) {
    try {
      const receipt = await transfer(
        privateKey,
        recipient.to,
        recipient.amount,
      );
      results.push({
        to: recipient.to,
        status: "success",
        txHash: receipt?.hash,
      });
    } catch (error: any) {
      results.push({
        to: recipient.to,
        status: "failed",
        error: error.message,
      });
    }
  }
  return results;
}
