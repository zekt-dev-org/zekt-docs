---
title: Zekt - Examples & Scenarios
description: Zekt - technical scenarios, where Zekt solved the problem
---


## Scenario 1: Notifying retailers about new products

A company in the retail industry (e.g. footwear) continuously updates its product catalog through an internal pipeline.

When new products are introduced (e.g. upcoming seasonal releases), the company needs to **notify retailers and resellers as quickly as possible** so they can:

- prepare listings  
- update inventory systems  
- align marketing efforts  

## ❌ The traditional approach

To support this, the company typically:

1. Publishes product data to a database  
2. Exposes the data via an API  
3. Provides retailers with credentials and integration documentation  

This leads to several challenges:

- **Delayed availability**  
  Retailers must poll or wait for data to propagate through multiple layers  

- **Infrastructure overhead**  
  Databases, APIs, authentication, and hosting must be maintained  

- **Integration complexity**  
  Each retailer must build and maintain API integrations  

- **Security concerns**  
  Credentials must be distributed and managed across organizations  

---

## 💡 With Zekt

Instead of exposing product data via APIs, the company uses Zekt to **publish product updates directly from their pipeline**.

### How it works

1. The product pipeline emits an event when new products are added  
2. Zekt routes the event to approved retailers  
3. Each retailer triggers their own workflow upon receiving the event  

Retailers can then:
- ingest product data  
- update internal systems  
- trigger downstream processes  

---

## 🚀 Why this is better

### ⚡ Real-time distribution
Retailers receive updates immediately when products are created — no polling or delays  

---

### 🔐 No shared credentials
No API keys or tokens need to be distributed or managed  

---

### 🧱 Reduced infrastructure
No need to maintain:
- public APIs  
- database access layers  
- authentication systems  

---

### 🔄 Built-in reliability
Zekt provides:
- durable event delivery  
- replay capabilities (“time travel”)  
- consistent event handling  

---

### 🔌 Simpler integrations
Retailers only need to:
- subscribe to the event  


- define a workflow  

No custom API integration required  

---

## 🧠 Key takeaway

> Instead of exposing data through APIs, Zekt allows you to expose **events directly from your pipelines** — enabling faster, simpler, and more secure integrations with external partners.




# 🧪 Scenario 2: Security scan failed — alert audit team for review

## Context

A company runs automated security scans as part of their CI/CD pipelines.

When a scan fails (e.g. due to vulnerabilities, misconfigurations, or policy violations), the issue must be **reviewed by a separate audit or security team** — often operating in a different repository or organization.

---

## ❌ The traditional approach

To handle this, organizations typically rely on:

- Manual notifications (e.g. email, Slack, tickets)  
- Custom webhook integrations  
- Shared dashboards or reporting systems  

This creates several challenges:

- **Delayed response times**  
  Issues depend on humans noticing and reacting  

- **Fragmented workflows**  
  Security and audit processes live outside the pipeline  

- **Custom integration overhead**  
  Webhooks and notification systems must be built and maintained  

- **Lack of traceability**  
  Difficult to track what triggered a review and what actions were taken  

---

## 💡 With Zekt

Instead of relying on manual or external systems, the company uses Zekt to **connect the security scan directly to the audit workflow**.
With Zekt Shield (add-on) you can even encrypt the message payload - ensuring security of payload integrity even for the Zekt backend in highly regulated industries.

### How it works

1. A pipeline emits an event when a security scan fails  
2. Zekt routes the event to the audit team’s repository  
3. The audit team’s workflow is automatically triggered  

The audit team can then:
- analyze the failure  
- enforce policies  
- trigger remediation workflows  

---

## 🚀 Why this is better

### ⚡ Immediate response
Audit workflows are triggered instantly when a failure occurs — no manual intervention required  

---

### 🔐 No shared access
No need to grant the audit team access to the original repository or pipeline  

---

### 🔄 End-to-end automation
Security and audit processes become part of a single, connected workflow  

---

### 📊 Full traceability
Every event is tracked:
- what failed  
- when it happened  
- what actions were triggered  

---

### ⏪ Replay and validation
Failures can be replayed:
- for testing audit workflows  
- for compliance validation  
- for incident analysis  

---

## 🧠 Key takeaway

> Zekt connects security signals directly to enforcement workflows — enabling immediate, automated, and traceable responses without manual coordination or custom integrations.



