import express from "express";
import { analyzeAddressRisk } from "../skills/security/addressRisk";
import { simulateTx } from "../skills/security/txSimulation";

const app = express();
app.use(express.json());

app.get("/security/risk/:address", async (req, res) => {
  try {
    const analysis = await analyzeAddressRisk(req.params.address);
    res.json(analysis);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/security/simulate", async (req, res) => {
  const { from, to, amount } = req.body;
  try {
    const simResult = await simulateTx(from, to, amount);
    res.json(simResult);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
