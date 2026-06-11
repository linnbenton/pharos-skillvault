# Skill Documentation Summary

### 1. Wallet Skill

- `createWallet`: Generates a brand new Externally Owned Account (EOA) at random.
- `getBalance`: Checks the native gas token (`PHRS`) balance of a given address.

### 2. Treasury Skill

- `transfer`: Sends native PHRS tokens to a target recipient address.
- `batchTransfer`: Automates multi-address token distribution within a single iteration cycle.

### 3. Security Skill

- `addressRisk`: Performs early validation to determine if a target address is safe, a Zero Address, or a Smart Contract.
