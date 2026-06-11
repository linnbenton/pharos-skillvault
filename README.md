# Pharos SkillVault 🛡️

Pharos SkillVault is a production-ready, TypeScript-based **Ecosystem Skill Module** designed specifically for the Pharos Network. It serves as a composable, low-level foundational layer that equips future AI Agents with secure asset management, automated treasury distribution, and proactive on-chain risk simulation.

Built entirely for **Phase 1 (Skill Hackathon)** of the Pharos Skill-to-Agent Dual Cascade Hackathon, this codebase exposes atomic, reusable blockchain functions via a clean REST API layer, ready to be integrated with LLM function-calling workflows.

---

## 🌐 Network Specifications

SkillVault operates natively on the Pharos infrastructure using the following parameters:

- **Network Name:** Atlantic Testnet
- **Chain ID:** `688689`
- **Currency Symbol:** `PHRS`
- **RPC URL:** `https://atlantic.dplabs-internal.com`
- **Block Explorer:** [https://atlantic.pharosscan.xyz/](https://atlantic.pharosscan.xyz/)

---

## 🤖 Composable Agent Skill Matrix

This repository implements standardized, reusable modules (Skills) that autonomous agents can invoke to interact with the on-chain economy securely:

### 1. Wallet Skills

- `createWallet`: Generates a secure, random cryptographic Externally Owned Account (EOA).
- `signMessage`: Enables agents to sign payloads or verification requests cryptographically.
- `getBalance`: Fetches real-time native token (`PHRS`) gas balances.

### 2. Treasury Skills

- `transfer`: Executes precise, on-chain token value transfers.
- `batchTransfer`: Handles automated, multi-address payroll or reward distributions in a single execution loop.
- `paymentRequest`: Creates standardized, encoded payment request payloads (`pharos://`) for agent-to-user billing.

### 3. Security & Guardrail Skills

- `addressRisk`: Intercepts transactions to verify if a target address is a standard wallet, a Zero Address, or an unverified smart contract.
- `txSimulation`: Runs dry-run gas estimations to simulate execution and catch potential smart contract failures/reverts before risking main asset pools.

---

## ⚙️ Local Development & Quick Start

### 1. Installation

Clone the repository and install the development dependencies:

```bash
npm install
```
