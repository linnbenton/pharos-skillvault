# Pharos SkillVault Architecture

This system utilizes a modular architecture that cleanly separates low-level blockchain logic (**Skills**) from external interfaces (**API**).

### Workflow

1. **Skills Layer**: Pure TypeScript modules wrapping `ethers.js` transaction logic tailored specifically for the Atlantic Testnet (Chain ID: 688689).
2. **API Layer**: Provides RESTful endpoints allowing the system to be seamlessly consumed by frontend applications or external agents.
