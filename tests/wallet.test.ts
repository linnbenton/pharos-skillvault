import { createWallet } from "../skills/wallet/createWallet";
import assert from "assert";

export async function runWalletTests() {
  // 👈 Changed name here
  console.log("🏃 Testing: Wallet Creation");
  try {
    const wallet = createWallet();
    assert.ok(wallet.address.startsWith("0x"), "Address must start with 0x");
    assert.equal(
      wallet.privateKey.length,
      66,
      "Private key hex length must be 66 characters",
    );
    console.log("✅ Wallet Creation Test Passed!");
  } catch (error) {
    console.error("❌ Test Failed:", error);
  }
}
