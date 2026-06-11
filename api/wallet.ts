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

// Add this route to serve the Premium Minimalist Dashboard
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pharos SkillVault — AI Agent Skill Infrastructure</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #0B0F17; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .glow-cyan { box-shadow: 0 0 20px rgba(6, 182, 212, 0.15); }
        .glow-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.6)); } 50% { opacity: .5; filter: drop-shadow(0 0 2px rgba(34, 197, 94, 0.2)); } }
    </style>
</head>
<body class="text-slate-300 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-400 antialiased selection:bg-cyan-500/20">

    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-gradient-to-b from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        <header class="flex justify-between items-center border-b border-slate-800/60 pb-8 mb-16">
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center font-display font-bold text-slate-900 text-xl tracking-tighter shadow-lg shadow-cyan-500/20">Φ</div>
                <div>
                    <h1 class="font-display font-bold text-xl text-slate-100 tracking-tight">Pharos <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">SkillVault</span></h1>
                    <p class="text-xs text-slate-500 uppercase tracking-widest mt-0.5">AI Agent Core Skill Layer</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-400">
                    <span class="h-2 w-2 rounded-full bg-green-500 glow-pulse"></span> Atlantic Testnet
                </span>
                <a href="https://github.com/linnebenton/pharos-skillvault" target="_blank" class="text-sm text-slate-400 hover:text-cyan-400 transition-colors">GitHub ↗</a>
            </div>
        </header>

        <main class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
            <div class="lg:col-span-7 space-y-6">
                <div class="inline-block px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-wider">Phase 1 Submission</div>
                <h2 class="font-display font-bold text-4xl lg:text-5xl text-slate-100 tracking-tight leading-[1.15]">
                    Empowering Autonomous Agents with <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-200 to-emerald-300">On-Chain Capabilities.</span>
                </h2>
                <p class="text-slate-400 leading-relaxed max-w-xl">
                    A highly composable, standardized atomic skill protocol built for the Pharos Network ecosystem. SkillVault enables LLM framework instances to securely manage assets, orchestrate macro treasury distribution, and run real-time defensive execution simulations.
                </p>
                <div class="pt-4 flex gap-4">
                    <a href="#matrix" class="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/10">Explore Skill Matrix</a>
                    <div class="px-5 py-3 rounded-xl bg-slate-900/60 border border-slate-800/80 font-mono text-sm text-slate-400 flex items-center gap-2">
                        <span class="text-cyan-500">$</span> cURL active nodes...
                    </div>
                </div>
            </div>

            <div class="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 glow-cyan backdrop-blur-md">
                <h3 class="font-display font-bold text-sm text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-3">Pharos Node Connection</h3>
                <div class="space-y-4 font-mono text-xs">
                    <div class="flex justify-between py-1 border-b border-slate-800/40">
                        <span class="text-slate-500">Chain ID:</span>
                        <span class="text-cyan-400 font-bold">688689</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-800/40">
                        <span class="text-slate-500">Native Asset:</span>
                        <span class="text-emerald-400">PHRS</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-slate-800/40">
                        <span class="text-slate-500">Latency Simulation:</span>
                        <span class="text-slate-300">Active (12ms)</span>
                    </div>
                    <div class="space-y-1">
                        <span class="text-slate-500">RPC Gateway:</span>
                        <div class="p-2.5 rounded bg-slate-950 text-[11px] text-slate-400 overflow-x-auto border border-slate-800/40">https://atlantic.dplabs-internal.com</div>
                    </div>
                </div>
            </div>
        </main>

        <section id="matrix" class="space-y-6 pt-6">
            <h3 class="font-display font-bold text-2xl text-slate-100">Atomic Skill Blueprint</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div class="bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/80 rounded-xl p-5 hover:border-cyan-500/30 transition-colors group">
                    <div class="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-cyan-500/20 transition-colors">👛</div>
                    <h4 class="font-display font-bold text-base text-slate-200 mb-2">Cryptographic Wallets</h4>
                    <p class="text-xs text-slate-400 leading-relaxed mb-4">Secures autonomous transaction lifecycles by providing sandboxed cryptographic seed and signature processing nodes.</p>
                    <div class="space-y-1.5 font-mono text-[11px]">
                        <div class="flex items-center gap-2 text-slate-500"><span class="text-cyan-400">POST</span> /wallet/create</div>
                        <div class="flex items-center gap-2 text-slate-500"><span class="text-cyan-400">POST</span> /wallet/sign</div>
                        <div class="flex items-center gap-2 text-slate-500"><span class="text-slate-400">GET</span> /wallet/balance/:address</div>
                    </div>
                </div>

                <div class="bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/80 rounded-xl p-5 hover:border-emerald-500/30 transition-colors group">
                    <div class="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500/20 transition-colors">🏛️</div>
                    <h4 class="font-display font-bold text-base text-slate-200 mb-2">Treasury Liquidity</h4>
                    <p class="text-xs text-slate-400 leading-relaxed mb-4">Empowers multi-agent operations with programmatic billing structures and batch native distribution algorithms.</p>
                    <div class="space-y-1.5 font-mono text-[11px]">
                        <div class="flex items-center gap-2 text-slate-500"><span class="text-emerald-400">POST</span> /treasury/transfer</div>
                        <div class="flex items-center gap-2 text-slate-500"><span class="text-emerald-400">POST</span> /treasury/batch</div>
                        <div class="flex items-center gap-2 text-slate-500"><span class="text-emerald-400">POST</span> /treasury/request</div>
                    </div>
                </div>

                <div class="bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/80 rounded-xl p-5 hover:border-purple-500/30 transition-colors group">
                    <div class="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:bg-purple-500/20 transition-colors">🛡️</div>
                    <h4 class="font-display font-bold text-base text-slate-200 mb-2">Security Guardrails</h4>
                    <p class="text-xs text-slate-400 leading-relaxed mb-4">Intercepts transactional attack vectors by performing dry-run EVM simulations and address anomalies lookup.</p>
                    <div class="space-y-1.5 font-mono text-[11px]">
                        <div class="flex items-center gap-2 text-slate-500"><span class="text-purple-400">GET</span> /security/risk/:address</div>
                        <div class="flex items-center gap-2 text-slate-500"><span class="text-purple-400">POST</span> /security/simulate</div>
                    </div>
                </div>

            </div>
        </section>

        <footer class="mt-24 border-t border-slate-800/60 pt-6 text-center text-xs text-slate-600">
            <p>© 2026 Pharos SkillVault. Powered by Pharos Network & Anvita Flow Infrastructure.</p>
        </footer>
    </div>

</body>
</html>
    `);
});

export default app;
