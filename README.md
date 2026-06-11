# Pharos SkillVault 🛡️

**Pharos SkillVault** is a production-ready, TypeScript-based Ecosystem Skill Module built specifically for the Pharos Network.

It provides a composable financial infrastructure layer that enables AI Agents to securely manage assets, execute treasury operations, and perform proactive transaction risk checks before interacting with on-chain systems.

<span style="color: gray;">Designed for the **[Pharos Skill-to-Agent Dual Cascade Hackathon (Phase 1)](https://dorahacks.io/hackathon/pharos-phase1/buidl)**, SkillVault exposes standardized and reusable blockchain capabilities through a clean REST API interface, making integration with AI Agents, LLM function-calling systems, and autonomous workflows straightforward and scalable.</span>

---

## 🎯 Purpose

AI Agents require secure and reliable primitives to participate in the on-chain economy.

SkillVault serves as a reusable skill layer that allows agents to:

- Create and manage wallets
- Verify balances and account status
- Execute treasury operations
- Distribute rewards and payroll
- Simulate transactions before execution
- Detect risky or invalid destination addresses

Rather than building another standalone application, SkillVault focuses on providing modular capabilities that can be reused by many future Pharos AI Agents.

---

## 🌐 Pharos Network Configuration

SkillVault is configured to operate natively on the Pharos Atlantic Testnet.

| Parameter    | Value                                  |
| ------------ | -------------------------------------- |
| Network      | Atlantic Testnet                       |
| Chain ID     | `688689`                               |
| Currency     | `PHRS`                                 |
| RPC Endpoint | `https://atlantic.dplabs-internal.com` |
| Explorer     | https://atlantic.pharosscan.xyz        |

---

## 🤖 Composable Agent Skill Matrix

### Wallet Skills

Core identity and account-management primitives for AI Agents.

| Skill          | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| `createWallet` | Generate a new cryptographically secure EOA wallet          |
| `signMessage`  | Sign arbitrary messages for verification and authentication |
| `getBalance`   | Retrieve real-time PHRS balances from the network           |

---

### Treasury Skills

Financial execution capabilities for autonomous agents.

| Skill            | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| `transfer`       | Execute on-chain token transfers                           |
| `batchTransfer`  | Send funds to multiple recipients in a single workflow     |
| `paymentRequest` | Generate standardized `pharos://` payment request payloads |

---

### Security & Guardrail Skills

Safety mechanisms that reduce execution risk for autonomous systems.

| Skill          | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| `addressRisk`  | Detect EOAs, smart contracts, and invalid destination addresses |
| `txSimulation` | Simulate transactions and estimate gas before execution         |

---

## 🏗️ Example Agent Workflow

SkillVault is designed to be consumed by autonomous agents.

Example treasury execution flow:

```text
User Request
      │
      ▼
AI Agent
      │
      ▼
getBalance()
      │
      ▼
addressRisk()
      │
      ▼
txSimulation()
      │
      ▼
transfer()
      │
      ▼
Transaction Confirmed
```

This workflow helps agents reduce execution failures and avoid sending funds to unsafe destinations.

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start development mode:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

---

## 🔌 AI Agent Integration

SkillVault is intentionally designed as a reusable middleware layer.

The exposed API endpoints can be consumed by:

- LLM Function Calling
- Autonomous AI Agents
- Agentic Workflows
- Treasury Automation Systems
- DAO Operations
- Payment Coordinators
- Multi-Agent Frameworks

Because each capability is exposed as an independent skill, developers can compose custom agents without modifying the underlying infrastructure.

---

## 🔒 Security Philosophy

Autonomous financial execution requires safeguards.

SkillVault follows a security-first approach by introducing validation and simulation layers before transactions are executed on-chain.

Key protections include:

- Destination address verification
- Smart contract detection
- Gas estimation
- Transaction simulation
- Invalid address prevention

These guardrails help reduce operational risk for AI-powered financial systems.

---

## 🚀 Future Expansion (Phase 2)

SkillVault is designed to become the foundational infrastructure layer for future Pharos Agents.

Planned extensions include:

- Treasury Policy Engine
- Spending Limits
- Allowlist Management
- Scheduled Payments
- Risk Scoring Engine
- Multi-Signature Workflows
- Agent Governance Controls

---

## 🏆 Hackathon Submission

**Track:** Skill Hackathon (Phase 1)

**Project:** Pharos SkillVault

**Category:** AI Agent Infrastructure / Financial Skill Layer

**Goal:** Provide reusable wallet, treasury, and security primitives that enable AI Agents to safely participate in the Pharos on-chain economy.

---

Built for the next generation of autonomous on-chain agents powered by Pharos.
