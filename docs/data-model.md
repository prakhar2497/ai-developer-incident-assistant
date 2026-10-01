# DynamoDB Data Model

## Overview

The application uses DynamoDB as the primary persistence layer for incidents.

The primary entity stored in DynamoDB is an `Incident`.

## Incident Item

Example:

```json
{
  "PK": "INCIDENT#01K...",
  "id": "01K...",
  "source": "github",
  "repository": "my-org/payment-service",
  "issueNumber": 101,
  "issueUrl": "https://github.com/my-org/payment-service/issues/101",
  "author": "developer1",
  "title": "API returning 500 errors",
  "description": "Payment API returns HTTP 500 during checkout.",
  "status": "NEW",
  "severity": "HIGH",
  "aiAnalysis": {
    "summary": "The payment API appears to fail during checkout.",
    "possibleCause": "Database connection failure.",
    "recommendations": [
      "Check database connectivity",
      "Review recent deployment changes"
    ],
    "confidence": 0.82,
    "analyzedAt": "2026-10-01T10:30:00Z"
  },
  "webhookDeliveryId": "github-delivery-abc123",
  "createdAt": "2026-10-01T10:25:00Z",
  "updatedAt": "2026-10-01T10:30:00Z"
}
```
