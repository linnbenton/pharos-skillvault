import express from "express";
import { createWallet } from "../skills/wallet/createWallet";
import { signMessage } from "../skills/wallet/signMessage";
import { getBalance } from "../skills/wallet/getBalance";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/wallet/create", (req, res) => {
  const wallet = createWallet();
  res.json(wallet);
});

app.post("/wallet/sign", async (req, res) => {
  const { privateKey, message } = req.body;
  try {
    const signature = await signMessage(privateKey, message);
    res.json({ signature });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/wallet/balance/:address", async (req, res) => {
  try {
    const balance = await getBalance(req.params.address);
    res.json({ address: req.params.address, balance: `${balance} PHRS` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`Vault Wallet API active on port ${PORT}`),
  );
}

export default app;
