# API Documentation

## Base URL

```text
http://localhost:3000
```

---

## Wallet API

### Create Wallet

```http
POST /wallet/create
```

Response:

```json
{
  "success": true,
  "address": "0x123...",
  "privateKey": "0xabc..."
}
```

---

### Get Balance

```http
GET /wallet/balance/:address
```

Response:

```json
{
  "success": true,
  "address": "0x123...",
  "balance": "10.5",
  "symbol": "PHRS"
}
```

---

## Treasury API

### Transfer

```http
POST /treasury/transfer
```

Response:

```json
{
  "success": true,
  "txHash": "0x..."
}
```

---

### Batch Transfer

```http
POST /treasury/batch-transfer
```

Response:

```json
{
  "success": true,
  "processed": 5,
  "totalAmount": "100"
}
```

---

## Security API

### Address Risk Analysis

```http
POST /security/address-risk
```

Response:

```json
{
  "success": true,
  "isEOA": true,
  "isContract": false,
  "riskScore": 2
}
```

---

### Transaction Simulation

```http
POST /security/simulate
```

Response:

```json
{
  "success": true,
  "estimatedGas": "42000",
  "expectedResult": "SUCCESS"
}
```

---

## Health Check

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```
