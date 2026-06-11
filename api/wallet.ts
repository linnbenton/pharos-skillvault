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
    <title>Pharos SkillVault — Interactive AI Agent Skill Console</title>
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
    </style>
</head>
<body class="text-blue-100 min-h-screen selection:bg-blue-500/30 selection:text-white antialiased pb-24 relative">

    <div id="login-wall" class="fixed inset-0 z-50 bg-[#000B26]/95 backdrop-blur-xl flex items-center justify-center p-4">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0022FF]/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div class="w-full max-w-md bg-blue-950/40 border border-blue-900/60 rounded-2xl p-8 glow-pharos relative z-10 text-center space-y-6">
            <div class="inline-flex h-14 w-14 rounded-2xl bg-white items-center justify-center font-display font-bold text-[#0022FF] text-2xl tracking-tighter shadow-xl shadow-blue-500/20 mx-auto">Ξ</div>
            
            <div class="space-y-2">
                <h2 class="font-display font-bold text-xl text-white">Authentication Gateway</h2>
                <p class="text-xs text-blue-300/70">Sign in to unlock the Pharos SkillVault testing ecosystem.</p>
            </div>

            <div id="login-methods" class="space-y-3 pt-2">
                <button onclick="showEmailOtpForm()" class="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-50 text-[#000B26] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md">
                    <span>📧</span> Continue with Gmail Account
                </button>
                
                <div class="flex items-center my-4 text-[10px] uppercase font-mono tracking-widest text-blue-500/60">
                    <div class="flex-1 border-t border-blue-900/30"></div>
                    <span class="px-3">or alternative access</span>
                    <div class="flex-1 border-t border-blue-900/30"></div>
                </div>

                <button onclick="simulateAlternativeLogin('X / Twitter')" class="w-full py-2.5 px-4 rounded-xl bg-blue-950/80 border border-blue-900/50 hover:border-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
                    <span>𝕏</span> Sign in with X / Twitter
                </button>
                <button onclick="simulateAlternativeLogin('Web3 Wallet / MetaMask')" class="w-full py-2.5 px-4 rounded-xl bg-blue-950/80 border border-blue-900/50 hover:border-blue-400 text-blue-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer">
                    <span>🦊</span> Connect MetaMask / Web3 Wallet
                </button>
            </div>

            <div id="otp-form" class="hidden space-y-4 pt-2 text-left">
                <div class="space-y-1">
                    <label class="block font-mono text-[10px] text-blue-400 uppercase tracking-wider">Enter Gmail Address</label>
                    <input type="email" id="login-email" placeholder="name@gmail.com" class="w-full px-3 py-2 rounded-lg bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-white focus:outline-none focus:border-blue-500" />
                </div>
                <button onclick="sendSimulatedOtp()" id="btn-send-otp" class="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer">Request OTP Secure Code</button>
                
                <div id="otp-input-area" class="hidden space-y-3 pt-3 border-t border-blue-900/30">
                    <div class="space-y-1">
                        <div class="flex justify-between items-center">
                            <label class="block font-mono text-[10px] text-green-400 uppercase tracking-wider">Verification OTP Code</label>
                            <span class="text-[10px] text-yellow-400 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20 animate-pulse">Code Sent! Check Inbox</span>
                        </div>
                        <input type="text" id="login-otp" placeholder="Enter 6-Digit Code" class="w-full px-3 py-2 rounded-lg bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-center tracking-widest text-white focus:outline-none focus:border-blue-500" />
                    </div>
                    <button onclick="verifyEmailOtp()" class="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs transition-colors cursor-pointer">Confirm Verification & Unlock</button>
                </div>

                <button onclick="backToLoginMethods()" class="w-full text-center text-[10px] text-blue-500 hover:text-blue-300 transition-colors uppercase tracking-wider block pt-2">← Back to Methods</button>
            </div>

            <p class="text-[10px] text-blue-600 font-mono pt-4">Pharos cryptographic infrastructure cluster protection v1.0.4</p>
        </div>
    </div>


    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-[#0022FF]/20 via-[#0055FF]/5 to-transparent rounded-full blur-[140px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        <header class="flex justify-between items-center border-b border-blue-900/40 pb-8 mb-16">
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl bg-white flex items-center justify-center font-display font-bold text-[#0022FF] text-xl tracking-tighter shadow-lg shadow-blue-500/20">Ξ</div>
                <div>
                    <h1 class="font-display font-bold text-xl text-white tracking-tight">Pharos <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">SkillVault</span></h1>
                    <p class="text-[10px] text-blue-400 uppercase tracking-widest mt-0.5">Interactive AI Agent Skill Console</p>
                </div>
            </div>

            <nav class="hidden md:flex items-center gap-8 font-display text-xs font-semibold tracking-wide">
                <a href="#how-it-works" class="text-blue-300 hover:text-white transition-colors bg-blue-950/40 px-3 py-1.5 rounded-md border border-blue-900/40 hover:border-blue-500/40 flex items-center gap-1.5">
                    <span>📖</span> How It Works
                </a>
                <a href="#faq" class="text-blue-300 hover:text-white transition-colors bg-blue-950/40 px-3 py-1.5 rounded-md border border-blue-900/40 hover:border-blue-500/40 flex items-center gap-1.5">
                    <span>❓</span> FAQ Section
                </a>
            </nav>

            <div class="flex items-center gap-4">
                <span id="user-badge" class="hidden text-[11px] font-mono bg-blue-500/10 text-blue-300 px-2.5 py-1 rounded border border-blue-500/20"></span>
                <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-900/50 text-xs font-medium text-blue-300">
                    <span class="h-2 w-2 rounded-full bg-green-500 glow-pulse"></span> Atlantic Testnet
                </span>
                <a href="https://github.com/linnbenton/pharos-skillvault" target="_blank" class="text-sm text-blue-400 hover:text-white transition-colors">GitHub ↗</a>
            </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
            
            <div class="lg:col-span-7 space-y-6">
                <h2 class="font-display font-bold text-2xl text-white tracking-tight">🧪 Live Skill Testing Laboratory</h2>
                <p class="text-xs text-blue-300/80 -mt-4">Juri dan developer dapat mengeksekusi fungsi on-chain Pharos secara real-time dari panel di bawah ini.</p>

                <div class="bg-blue-950/20 border border-blue-900/50 rounded-xl p-5 space-y-4">
                    <div class="flex justify-between items-center border-b border-blue-900/30 pb-2">
                        <h3 class="font-display font-semibold text-sm text-white flex items-center gap-2">👛 Wallet Generation Skill</h3>
                        <span class="font-mono text-[10px] text-blue-400">POST /wallet/create</span>
                    </div>
                    <button onclick="executeCreateWallet()" id="btn-create" class="w-full py-2.5 rounded-lg bg-white text-[#0022FF] font-bold text-xs hover:bg-blue-50 transition-colors cursor-pointer shadow-md">Generate Cryptographic EOA Wallet</button>
                    <div id="wallet-result" class="hidden p-3 rounded bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-blue-300 space-y-1 overflow-x-auto"></div>
                </div>

                <div class="bg-blue-950/20 border border-blue-900/50 rounded-xl p-5 space-y-4">
                    <div class="flex justify-between items-center border-b border-blue-900/30 pb-2">
                        <h3 class="font-display font-semibold text-sm text-white flex items-center gap-2">🔍 Check Balance Skill</h3>
                        <span class="font-mono text-[10px] text-blue-400">GET /wallet/balance/:address</span>
                    </div>
                    <div class="flex gap-2">
                        <input type="text" id="balance-address" placeholder="Enter Pharos Address (0x...)" class="flex-1 px-3 py-2 rounded-lg bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-white focus:outline-none focus:border-blue-500" />
                        <button onclick="executeCheckBalance()" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer">Check</button>
                    </div>
                    <div id="balance-result" class="hidden p-3 rounded bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-emerald-400"></div>
                </div>

                <div class="bg-blue-950/20 border border-blue-900/50 rounded-xl p-5 space-y-4">
                    <div class="flex justify-between items-center border-b border-blue-900/30 pb-2">
                        <h3 class="font-display font-semibold text-sm text-white flex items-center gap-2">🏛️ Treasury Native Transfer Skill</h3>
                        <span class="font-mono text-[10px] text-blue-400">POST /treasury/transfer</span>
                    </div>
                    <div class="space-y-3">
                        <div>
                            <label class="block font-mono text-[10px] text-blue-400 mb-1">TARGET RECEIVER ADDRESS</label>
                            <input type="text" id="transfer-to" placeholder="0x..." class="w-full px-3 py-2 rounded-lg bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-white focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label class="block font-mono text-[10px] text-blue-400 mb-1">AMOUNT (PHRS)</label>
                            <input type="number" step="0.001" id="transfer-amount" placeholder="0.1" class="w-full px-3 py-2 rounded-lg bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-white focus:outline-none focus:border-blue-500" />
                        </div>
                        <button onclick="executeTransfer()" class="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer">Execute On-Chain Transfer</button>
                    </div>
                    <div id="transfer-result" class="hidden p-3 rounded bg-blue-950/80 border border-blue-900/60 font-mono text-xs overflow-x-auto"></div>
                </div>

            </div>

            <div class="lg:col-span-5 space-y-6">
                <div class="bg-blue-950/30 border border-blue-900/60 rounded-2xl p-6 glow-pharos backdrop-blur-md">
                    <h3 class="font-display font-bold text-sm text-blue-400 uppercase tracking-wider mb-4 border-b border-blue-900/40 pb-3">Pharos Node Connection</h3>
                    <div class="space-y-4 font-mono text-xs">
                        <div class="flex justify-between py-1 border-b border-blue-900/20"><span class="text-blue-400">Chain ID:</span><span class="text-white font-bold">688689</span></div>
                        <div class="flex justify-between py-1 border-b border-blue-900/20"><span class="text-blue-400">Native Asset:</span><span class="text-white">PHRS</span></div>
                        <div class="flex justify-between py-1 border-b border-blue-900/20"><span class="text-blue-400">Latency:</span><span class="text-green-400">Connected</span></div>
                        <div class="space-y-1">
                            <span class="text-blue-400">RPC Gateway:</span>
                            <div class="p-2.5 rounded bg-blue-950/80 text-[11px] text-blue-300 overflow-x-auto border border-blue-900/40">https://atlantic.dplabs-internal.com</div>
                        </div>
                    </div>
                </div>

                <div class="bg-blue-950/10 border border-blue-900/30 rounded-2xl p-6 space-y-3">
                    <h4 class="font-display font-semibold text-sm text-white">💡 Competition Notes (Phase 1)</h4>
                    <p class="text-xs text-blue-300/70 leading-relaxed">
                        The adjacent testing laboratory console interacts directly with your serverless edge backend asynchronously. In Phase 2, autonomous AI Agents will independently trigger these specific endpoints utilizing LLM function calling modules.
                    </p>
                </div>
            </div>
        </div>

        <section id="how-it-works" class="space-y-8 mb-24 max-w-4xl mx-auto pt-16 border-t border-blue-900/30 text-center">
            <div class="space-y-2 flex flex-col items-center">
                <h3 class="font-display font-bold text-xl text-white flex items-center gap-2 justify-center">
                    <span>📖</span> Operational Workflow (How It Works)
                </h3>
                <p class="text-xs text-blue-400 max-w-xl">
                    The architecture for standardizing AI Agent instructions into fully verified on-chain transactions on the Pharos Chain.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-center">
                <div class="p-5 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-3 flex flex-col items-center">
                    <div class="text-xs font-bold text-[#0022FF] bg-white h-7 w-7 rounded-full flex items-center justify-center font-display shadow-md">1</div>
                    <h4 class="text-sm font-semibold text-white">Intent Extraction</h4>
                    <p class="text-xs text-blue-300/60 leading-relaxed">
                        The LLM parses natural human language, transforming financial action targets into structured JSON object data schemas.
                    </p>
                </div>
                <div class="p-5 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-3 flex flex-col items-center">
                    <div class="text-xs font-bold text-white bg-blue-600 h-7 w-7 rounded-full flex items-center justify-center font-display shadow-md">2</div>
                    <h4 class="text-sm font-semibold text-white">Simulation Guardrails</h4>
                    <p class="text-xs text-blue-300/60 leading-relaxed">
                        SkillVault validates transactions using internal EVM dry-run simulations to filter out exploit anomalies or wasted gas fees.
                    </p>
                </div>
                <div class="p-5 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-3 flex flex-col items-center">
                    <div class="text-xs font-bold text-slate-950 bg-gradient-to-r from-blue-400 to-emerald-400 h-7 w-7 rounded-full flex items-center justify-center font-display shadow-md">3</div>
                    <h4 class="text-sm font-semibold text-white">On-Chain Settlement</h4>
                    <p class="text-xs text-blue-300/60 leading-relaxed">
                        Asynchronous nodes cryptographically sign payloads and broadcast them to the Atlantic Testnet RPC within milliseconds.
                    </p>
                </div>
            </div>
        </section>

        <section id="faq" class="space-y-8 max-w-3xl mx-auto pt-16 border-t border-blue-900/30 text-center">
            <div class="space-y-2 flex flex-col items-center">
                <h3 class="font-display font-bold text-xl text-white flex items-center gap-2 justify-center">
                    <span>❓</span> Frequently Asked Questions
                </h3>
                <p class="text-xs text-blue-400 max-w-xl">
                    Answers to fundamental technical questions regarding the Pharos SkillVault system.
                </p>
            </div>
            
            <div class="space-y-4 text-xs text-center max-w-2xl mx-auto">
                <div class="p-5 rounded-xl bg-blue-950/10 border border-blue-900/30 space-y-2 flex flex-col items-center">
                    <h4 class="font-semibold text-white font-display">Are private keys secure within this serverless edge gateway?</h4>
                    <p class="text-blue-300/70 leading-relaxed max-w-xl">
                        Highly secure. All private keys are never stored or exposed to public repositories. All confidential processing is strictly locked inside the fully isolated Vercel Core Security Environment Variables.
                    </p>
                </div>
                <div class="p-5 rounded-xl bg-blue-950/10 border border-blue-900/30 space-y-2 flex flex-col items-center">
                    <h4 class="font-semibold text-white font-display">How will AI Agents call this skill blueprint in Phase 2?</h4>
                    <p class="text-blue-300/70 leading-relaxed max-w-xl">
                        Through Function Calling schema integration (OpenAI SDK or Anvita Flow Framework). The artificial intelligence model simply invokes these asynchronous SkillVault REST API endpoints to delegate on-chain execution rights.
                    </p>
                </div>
            </div>
        </section>

        <footer class="mt-24 border-t border-blue-900/40 pt-8 text-center text-xs text-blue-500">
            <p>© 2026 Pharos SkillVault. Powered by Pharos Network & Anvita Flow Infrastructure.</p>
        </footer>
    </div>


    <script>
        // --- 1. LOGIN INTERACTION LOGIC ---
        function showEmailOtpForm() {
            document.getElementById('login-methods').classList.add('hidden');
            document.getElementById('otp-form').classList.remove('hidden');
        }

        function backToLoginMethods() {
            document.getElementById('otp-form').classList.add('hidden');
            document.getElementById('login-methods').classList.remove('hidden');
        }

        function sendSimulatedOtp() {
            const email = document.getElementById('login-email').value;
            if(!email || !email.includes('@')) return alert('Masukkan alamat Gmail yang valid!');
            
            const btn = document.getElementById('btn-send-otp');
            btn.innerText = "Broadcasting OTP Vector...";
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = "Request OTP Secure Code";
                btn.disabled = false;
                document.getElementById('otp-input-area').classList.remove('hidden');
                alert("Simulasi: Kode verifikasi OTP aman Anda adalah '688689' (Terinspirasi dari Pharos Chain ID).");
            }, 1200);
        }

        function verifyEmailOtp() {
            const code = document.getElementById('login-otp').value;
            const email = document.getElementById('login-email').value;
            if(code !== '688689') return alert('Kode OTP salah! Gunakan kode "688689"');
            
            // Unlock Website Content
            document.getElementById('login-wall').classList.add('hidden');
            const badge = document.getElementById('user-badge');
            badge.classList.remove('hidden');
            badge.innerText = "📧 " + email;
        }

        function simulateAlternativeLogin(providerName) {
            alert("Menghubungkan API autentikasi ke gerbang " + providerName + "...");
            document.getElementById('login-wall').classList.add('hidden');
            const badge = document.getElementById('user-badge');
            badge.classList.remove('hidden');
            badge.innerText = "🔑 " + providerName + " Connected";
        }


        // --- 2. CORE BACKEND API CORE INTERACTION LOGIC ---
        async function executeCreateWallet() {
            const resultBox = document.getElementById('wallet-result');
            const btn = document.getElementById('btn-create');
            btn.innerText = "Generating Wallet Nodes...";
            resultBox.classList.add('hidden');

            try {
                const response = await fetch('/wallet/create', { method: 'POST' });
                const data = await response.json();
                
                resultBox.classList.remove('hidden');
                resultBox.innerHTML = \`
                    <p class="text-green-400 font-bold">✓ Success Generate</p>
                    <p class="mt-1"><span class="text-blue-400">Address:</span> \${data.address || data.data?.address || JSON.stringify(data)}</p>
                    <p><span class="text-yellow-400">Mnemonic:</span> \${data.mnemonic || data.data?.mnemonic || 'Encrypted Securely'}</p>
                \`;
            } catch (err) {
                resultBox.classList.remove('hidden');
                resultBox.innerHTML = \`<p class="text-red-400">Error: \${err.message}</p>\`;
            } finally {
                btn.innerText = "Generate Cryptographic EOA Wallet";
            }
        }

        async function executeCheckBalance() {
            const address = document.getElementById('balance-address').value;
            const resultBox = document.getElementById('balance-result');
            if(!address) return alert('Please enter an address first');
            
            resultBox.classList.remove('hidden');
            resultBox.className = "p-3 rounded bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-blue-400";
            resultBox.innerText = "Querying balance loop...";

            try {
                const response = await fetch(\`/wallet/balance/\${address}\`);
                const data = await response.json();
                
                resultBox.className = "p-3 rounded bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-green-400";
                resultBox.innerText = \`Balance: \${data.balance || data.data?.balance || '0'} PHRS\`;
            } catch (err) {
                resultBox.className = "p-3 rounded bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-red-400";
                resultBox.innerText = \`Error querying: \${err.message}\`;
            }
        }

        async function executeTransfer() {
            const to = document.getElementById('transfer-to').value;
            const amount = document.getElementById('transfer-amount').value;
            const resultBox = document.getElementById('transfer-result');
            
            if(!to || !amount) return alert('Please fill target address and amount');
            
            resultBox.classList.remove('hidden');
            resultBox.className = "p-3 rounded bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-blue-400";
            resultBox.innerText = "Broadcasting cryptographic transaction to Atlantic Testnet...";

            try {
                const response = await fetch('/treasury/transfer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ to, amount })
                });
                const data = await response.json();
                
                if(response.ok) {
                    resultBox.className = "p-3 rounded bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-green-400";
                    resultBox.innerHTML = \`
                        <p class="font-bold">✓ Transaction Broadcasted Successfully!</p>
                        <p class="text-[11px] mt-1 text-blue-300">TX Hash: \${data.hash || data.txHash || data.data?.hash || JSON.stringify(data)}</p>
                    \`;
                } else {
                    throw new Error(data.message || JSON.stringify(data));
                }
            } catch (err) {
                resultBox.className = "p-3 rounded bg-blue-950/80 border border-blue-900/60 font-mono text-xs text-red-400";
                resultBox.innerText = \`Execution Failed: \${err.message}\`;
            }
        }
    </script>
</body>
</html>
    `);
});

export default app;
