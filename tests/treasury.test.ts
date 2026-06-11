import { createPaymentRequest } from "../skills/treasury/paymentRequest";
import assert from "assert";

export async function runTreasuryTests() {
  console.log("🏃 Testing: Treasury Skills");

  // 1. Test Payment Request Generation
  try {
    const target = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
    const amount = "10.5";
    const desc = "Invoice #1024";

    const request = createPaymentRequest(target, amount, desc);

    assert.equal(request.target, target, "Target address should match");
    assert.equal(request.amount, amount, "Amount should match");
    assert.equal(request.currency, "PHRS", "Currency must be PHRS");
    assert.ok(
      request.paymentUrl.startsWith("pharos://"),
      "URL protocol must be pharos://",
    );

    console.log("✅ Treasury - Payment Request Test Passed!");
  } catch (error) {
    console.error("❌ Treasury Test Failed:", error);
  }
}
