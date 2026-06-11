import express from "express";
import { createWallet } from "../skills/wallet/createWallet";
import { signMessage } from "../skills/wallet/signMessage";
import { getBalance } from "../skills/wallet/getBalance";
import "./treasury";
import "./security";
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
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght=300;400;500;600;700&family=Space+Grotesk:wght=400;500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #000B26; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .glow-pharos { box-shadow: 0 0 30px rgba(0, 34, 255, 0.25); }
        .glow-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.6)); } 50% { opacity: .5; filter: drop-shadow(0 0 2px rgba(34, 197, 94, 0.2)); } }
        details uppercase::-webkit-details-marker { display:none; }
        summary { list-style: none; }
        summary::-webkit-details-marker { display: none; }
    </style>
</head>
<body class="text-blue-100 min-h-screen selection:bg-blue-500/30 selection:text-white antialiased">

    <!-- Top & Center Pharos Blue Glow Effects -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-[#0022FF]/20 via-[#0055FF]/5 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#0022FF]/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        <!-- Header -->
        <header class="flex justify-between items-center border-b border-blue-900/40 pb-8 mb-16">
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl bg-white flex items-center justify-center font-display font-bold text-[#0022FF] text-xl tracking-tighter shadow-lg shadow-blue-500/20">Ξ</div>
                <div>
                    <h1 class="font-display font-bold text-xl text-white tracking-tight">Pharos <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">SkillVault</span></h1>
                    <p class="text-[10px] text-blue-400 uppercase tracking-widest mt-0.5">AI Agent Core Skill Layer</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-900/50 text-xs font-medium text-blue-300">
                    <span class="h-2 w-2 rounded-full bg-green-500 glow-pulse"></span> Atlantic Testnet
                </span>
                <a href="https://github.com/linnbenton/pharos-skillvault" target="_blank" class="text-sm text-blue-400 hover:text-white transition-colors">GitHub ↗</a>
            </div>
        </header>

        <!-- Hero Section -->
        <main class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
            <div class="lg:col-span-7 space-y-6">
                <div class="inline-block px-3 py-1 rounded-md bg-[#0022FF]/15 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-wider">Phase 1 Submission</div>
                <h2 class="font-display font-bold text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
                    Empowering Autonomous Agents with <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400">On-Chain Capabilities.</span>
                </h2>
                <p class="text-blue-300/80 leading-relaxed max-w-xl">
                    A highly composable, standardized atomic skill protocol built for the Pharos Network ecosystem. SkillVault enables LLM framework instances to securely manage assets, orchestrate macro treasury distribution, and run real-time defensive execution simulations.
                </p>
                <div class="pt-4 flex gap-4">
                    <a href="#matrix" class="px-5 py-3 rounded-xl bg-white text-[#0022FF] font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg shadow-white/10">Explore Skill Matrix</a>
                    <div class="px-5 py-3 rounded-xl bg-blue-950/40 border border-blue-900/60 font-mono text-sm text-blue-300 flex items-center gap-2">
                        <span class="text-blue-400">$</span> cURL active nodes...
                    </div>
                </div>
            </div>

            <!-- Network Stats Card -->
            <div class="lg:col-span-5 bg-blue-950/30 border border-blue-900/60 rounded-2xl p-6 glow-pharos backdrop-blur-md">
                <h3 class="font-display font-bold text-sm text-blue-400 uppercase tracking-wider mb-4 border-b border-blue-900/40 pb-3">Pharos Node Connection</h3>
                <div class="space-y-4 font-mono text-xs">
                    <div class="flex justify-between py-1 border-b border-blue-900/20">
                        <span class="text-blue-400">Chain ID:</span>
                        <span class="text-white font-bold">688689</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-blue-900/20">
                        <span class="text-blue-400">Native Asset:</span>
                        <span class="text-white">PHRS</span>
                    </div>
                    <div class="flex justify-between py-1 border-b border-blue-900/20">
                        <span class="text-blue-400">Latency Simulation:</span>
                        <span class="text-green-400">Active (12ms)</span>
                    </div>
                    <div class="space-y-1">
                        <span class="text-blue-400">RPC Gateway:</span>
                        <div class="p-2.5 rounded bg-blue-950/80 text-[11px] text-blue-300 overflow-x-auto border border-blue-900/40">https://atlantic.dplabs-internal.com</div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Skill Matrix Section -->
        <section id="matrix" class="space-y-6 mb-24">
            <h3 class="font-display font-bold text-2xl text-white">Atomic Skill Blueprint</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Wallet Skills -->
                <div class="bg-gradient-to-b from-blue-950/40 to-blue-950/80 border border-blue-900/40 rounded-xl p-5 hover:border-blue-500/50 transition-colors group">
                    <div class="h-10 w-10 rounded-lg bg-[#0022FF]/20 flex items-center justify-center text-white mb-4 group-hover:bg-[#0022FF]/30 transition-colors">👛</div>
                    <h4 class="font-display font-bold text-base text-white mb-2">Cryptographic Wallets</h4>
                    <p class="text-xs text-blue-300/70 leading-relaxed mb-4">Secures autonomous transaction lifecycles by providing sandboxed cryptographic seed and signature processing nodes.</p>
                    <div class="space-y-1.5 font-mono text-[11px]">
                        <div class="flex items-center gap-2 text-blue-400"><span class="text-white font-medium">POST</span> /wallet/create</div>
                        <div class="flex items-center gap-2 text-blue-400"><span class="text-white font-medium">POST</span> /wallet/sign</div>
                        <div class="flex items-center gap-2 text-blue-400"><span class="text-blue-300">GET</span> /wallet/balance/:address</div>
                    </div>
                </div>

                <!-- Treasury Skills -->
                <div class="bg-gradient-to-b from-blue-950/40 to-blue-950/80 border border-blue-900/40 rounded-xl p-5 hover:border-blue-400/50 transition-colors group">
                    <div class="h-10 w-10 rounded-lg bg-[#0022FF]/20 flex items-center justify-center text-white mb-4 group-hover:bg-[#0022FF]/30 transition-colors">🏛️</div>
                    <h4 class="font-display font-bold text-base text-white mb-2">Treasury Liquidity</h4>
                    <p class="text-xs text-blue-300/70 leading-relaxed mb-4">Empowers multi-agent operations with programmatic billing structures and batch native distribution algorithms.</p>
                    <div class="space-y-1.5 font-mono text-[11px]">
                        <div class="flex items-center gap-2 text-blue-400"><span class="text-white font-medium">POST</span> /treasury/transfer</div>
                        <div class="flex items-center gap-2 text-blue-400"><span class="text-white font-medium">POST</span> /treasury/batch</div>
                        <div class="flex items-center gap-2 text-blue-400"><span class="text-white font-medium">POST</span> /treasury/request</div>
                    </div>
                </div>

                <!-- Guardrail Skills -->
                <div class="bg-gradient-to-b from-blue-950/40 to-blue-950/80 border border-blue-900/40 rounded-xl p-5 hover:border-blue-400/50 transition-colors group">
                    <div class="h-10 w-10 rounded-lg bg-[#0022FF]/20 flex items-center justify-center text-white mb-4 group-hover:bg-[#0022FF]/30 transition-colors">🛡️</div>
                    <h4 class="font-display font-bold text-base text-white mb-2">Security Guardrails</h4>
                    <p class="text-xs text-blue-300/70 leading-relaxed mb-4">Intercepts transactional attack vectors by performing dry-run EVM simulations and address anomalies lookup.</p>
                    <div class="space-y-1.5 font-mono text-[11px]">
                        <div class="flex items-center gap-2 text-blue-400"><span class="text-blue-300">GET</span> /security/risk/:address</div>
                        <div class="flex items-center gap-2 text-blue-400"><span class="text-white font-medium">POST</span> /security/simulate</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section class="space-y-8 mb-24 max-w-4xl">
            <div class="space-y-2">
                <h3 class="font-display font-bold text-2xl text-white">How It Works</h3>
                <p class="text-sm text-blue-400">The workflow standardizing LLM Agent intents into structured, secure on-chain actions.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                <div class="space-y-3 relative">
                    <div class="h-8 w-8 rounded-full bg-[#0022FF] text-white flex items-center justify-center font-display font-bold text-sm shadow-md">1</div>
                    <h4 class="font-display font-semibold text-slate-200 text-base">Intent Parsing</h4>
                    <p class="text-xs text-blue-300/70 leading-relaxed">AI Agent (e.g., via Anvita Flow) receives natural language inputs from users and transforms them into JSON schema payloads.</p>
                </div>
                <div class="space-y-3 relative">
                    <div class="h-8 w-8 rounded-full bg-[#0022FF] text-white flex items-center justify-center font-display font-bold text-sm shadow-md">2</div>
                    <h4 class="font-display font-semibold text-slate-200 text-base">Guardrail Interception</h4>
                    <p class="text-xs text-blue-300/70 leading-relaxed">Before broadcasting, SkillVault simulates gas limits and checks target addresses to defend against malicious exploits or zero-address burning.</p>
                </div>
                <div class="space-y-3 relative">
                    <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 text-slate-900 flex items-center justify-center font-display font-bold text-sm shadow-md">3</div>
                    <h4 class="font-display font-semibold text-slate-200 text-base">On-Chain Execution</h4>
                    <p class="text-xs text-blue-300/70 leading-relaxed">The atomic request is cryptographically signed and broadcasted securely to the Pharos Atlantic Testnet node instantly.</p>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="space-y-6 max-w-4xl">
            <div class="space-y-2">
                <h3 class="font-display font-bold text-2xl text-white">Frequently Asked Questions</h3>
                <p class="text-sm text-blue-400">Technical insights regarding the Pharos SkillVault architectural design.</p>
            </div>
            <div class="space-y-3">
                <details class="group bg-blue-950/20 border border-blue-900/40 rounded-xl p-4 transition-all duration-300 open:border-blue-500/40">
                    <summary class="flex justify-between items-center font-medium text-slate-200 cursor-pointer font-display text-sm select-none">
                        What makes SkillVault fit for Phase 1 of the Hackathon?
                        <span class="text-blue-500 group-open:rotate-180 transition-transform duration-300">▼</span>
                    </summary>
                    <p class="text-xs text-blue-300/70 leading-relaxed mt-3 border-t border-blue-900/30 pt-3">
                        Phase 1 focuses entirely on creating modular and robust "Skills". SkillVault delivers exactly that—a standalone backend service providing modular API nodes that decouple raw blockchain complexities from the AI reasoning engine.
                    </p>
                </details>

                <details class="group bg-blue-950/20 border border-blue-900/40 rounded-xl p-4 transition-all duration-300 open:border-blue-500/40">
                    <summary class="flex justify-between items-center font-medium text-slate-200 cursor-pointer font-display text-sm select-none">
                        Why choose Vercel Serverless over monolithic instances?
                        <span class="text-blue-500 group-open:rotate-180 transition-transform duration-300">▼</span>
                    </summary>
                    <p class="text-xs text-blue-300/70 leading-relaxed mt-3 border-t border-blue-900/30 pt-3">
                        Vercel Serverless Functions execute strictly on-demand. This model guarantees maximum uptime, completely avoids "server idling delays" common in free monolithic containers, and scales up horizontally instantly when polled by parallel AI agent routines.
                    </p>
                </details>

                <details class="group bg-blue-950/20 border border-blue-900/40 rounded-xl p-4 transition-all duration-300 open:border-blue-500/40">
                    <summary class="flex justify-between items-center font-medium text-slate-200 cursor-pointer font-display text-sm select-none">
                        How is security handled for private keys?
                        <span class="text-blue-500 group-open:rotate-180 transition-transform duration-300">▼</span>
                    </summary>
                    <p class="text-xs text-blue-300/70 leading-relaxed mt-3 border-t border-blue-900/30 pt-3">
                        Private keys are completely absent from public codebase trees. They are managed through securely encrypted server-side Environment Variables within Vercel's isolated, compliance-hardened execution layer.
                    </p>
                </details>
            </div>
        </section>

        <!-- Footer -->
        <footer class="mt-24 border-t border-blue-900/40 pt-6 text-center text-xs text-blue-500">
            <p>© 2026 Pharos SkillVault. Powered by Pharos Network & Anvita Flow Infrastructure.</p>
        </footer>
    </div>

</body>
</html>
    `);
});

export default app;
