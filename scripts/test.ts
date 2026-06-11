import { runWalletTests } from "../tests/wallet.test";
import { runTreasuryTests } from "../tests/treasury.test";
import { runSecurityTests } from "../tests/security.test";

async function executeTestSuite() {
  console.log("🚀 Starting Pharos SkillVault Integration Test Suite...\n");

  await runWalletTests();
  console.log("-----------------------------------------");
  await runTreasuryTests();
  console.log("-----------------------------------------");
  await runSecurityTests();

  console.log("\n🏁 All completed tests executed successfully!");
}

executeTestSuite();
