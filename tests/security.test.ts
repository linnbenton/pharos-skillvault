import { analyzeAddressRisk } from "../skills/security/addressRisk";
import { ethers } from "ethers";
import assert from "assert";

export async function runSecurityTests() {
  console.log("🏃 Testing: Security Engine");

  // 1. Test Zero Address Risk Handling
  try {
    const zeroAddrAnalysis = await analyzeAddressRisk(ethers.ZeroAddress);

    assert.equal(
      zeroAddrAnalysis.riskScore,
      100,
      "Zero Address score must be 100",
    );
    assert.equal(
      zeroAddrAnalysis.riskLevel,
      "HIGH",
      "Zero Address level must be HIGH",
    );
    assert.ok(
      zeroAddrAnalysis.reasons.includes("Burn/Zero Address detected."),
      "Reason array missing expected warning",
    );

    console.log("✅ Security - Zero Address Risk Test Passed!");
  } catch (error) {
    console.error("❌ Security Test Failed:", error);
  }
}
