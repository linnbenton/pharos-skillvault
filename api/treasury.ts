import express from "express";
import { transfer } from "../skills/treasury/transfer";
import { batchTransfer } from "../skills/treasury/batchTransfer";
import { createPaymentRequest } from "../skills/treasury/paymentRequest";

const app = express();
app.use(express.json());

app.post("/treasury/transfer", async (req, res) => {
  const { privateKey, to, amount } = req.body;
  try {
    const receipt = await transfer(privateKey, to, amount);
    res.json({ status: "Success", txHash: receipt?.hash });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/treasury/batch", async (req, res) => {
  const { privateKey, recipients } = req.body;
  try {
    const report = await batchTransfer(privateKey, recipients);
    res.json({ report });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/treasury/request", (req, res) => {
  const { to, amount, description } = req.body;
  const request = createPaymentRequest(to, amount, description);
  res.json(request);
});

export default app;
