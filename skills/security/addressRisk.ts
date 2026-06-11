import { ethers } from "ethers"; // 👈 Added this missing import
import { isSmartContract } from "./contractCheck";

export async function analyzeAddressRisk(address: string) {
  const isContract = await isSmartContract(address);
  let riskScore = 0; // 0 = Low, 100 = Critical
  const reasons: string[] = [];

  // Static risk detection rules
  if (address === ethers.ZeroAddress) {
    riskScore = 100;
    reasons.push("Burn/Zero Address detected.");
  } else if (isContract) {
    riskScore = 30;
    reasons.push(
      "Target is a contract address, risk of unhandled execution logic.",
    );
  } else {
    reasons.push("Address is an EOA (Standard Wallet). Low inherent risk.");
  }

  return {
    address,
    riskScore,
    riskLevel: riskScore > 70 ? "HIGH" : riskScore > 20 ? "MEDIUM" : "LOW",
    reasons,
  };
}
