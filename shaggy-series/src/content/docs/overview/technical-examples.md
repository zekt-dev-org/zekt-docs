---
title: Zekt - Examples & Scenarios
description: Zekt - technical scenarios, where Zekt solved the problem
---


## Scenario 1: Provider notifying retailers about new products

A company in the sneaker manufacturing business (e.g Zekt Sneakers) want to make their retails aware when ever a new sneaker model is being launched shortly! This would allow the consumers of this service, to re-act on the information sent by the service, to further automate their ordering / supply-chain and so on.

For the Zekt Sneakers registry entry, click [here]!(https://www.zekt.dev/zekt-registry.html)
For the Zekt Sneakers workflow service, click [here]!(https://github.com/zekt-dev-org/zekt-provider-example-repo/blob/main/.github/workflows/zekt-provide-sneaker-updates.yml)

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

1. The product pipeline emits an event through the Zekt Service - when new products are added and send meta-data as part of their Zekt action (Github action) payload.
2. Zekt routes the event to approved retailers  (handled by the Zekt Service owner)
3. Each retailer triggers their own workflow upon receiving the event, as the event name / payload can be known to them through Zekt Directory / Registry

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
- Zekt Registry - where service owners can present the JSON schema the service is expecting / sending
- Zekt Directory - marketplace, easen the discovery process of the services offered within Zekt

---

### 🔌 Simpler integrations
Retailers only need to:
- subscribe to the event  
- define a workflow  

No custom API integration required  

---

## 🧠 Key takeaway

> Instead of exposing data through APIs, Zekt allows you to expose **events directly from your pipelines** — enabling faster, simpler, and more secure integrations with external partners as long as they are using Github & Zekt.




## 🧪 Scenario 2: Security scan failed — alert audit team for review

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



## 🧪 Scenario 3: Automating a cross-organization business process

## Context

Multiple companies need to coordinate a shared business process across their systems.

Examples include:
- supply chain coordination  
- compliance and approval workflows  
- multi-party onboarding processes  

Each step in the process is owned by a different team or organization.

---

## ❌ The traditional approach

To connect these steps, organizations typically rely on:

- Manual coordination (email, Slack, tickets)  
- Custom webhook integrations  
- Scripts automating isolated parts of the process  

This leads to several challenges:

- **Delayed execution**  
  Processes depend on humans noticing and acting  

- **Inconsistent quality**  
  Steps may fail, be skipped, or executed out of order  

- **Fragmented workflows**  
  Each part of the process lives in a separate system  

- **Integration overhead**  
  Custom integrations must be built and maintained  

- **Limited traceability**  
  Difficult to track the full process across organizations  

---

## 💡 With Zekt

Instead of stitching systems together manually, companies use Zekt to **orchestrate the process as a chain of events across workflows**.

GitHub Actions acts as the execution engine.  
Zekt acts as the **cross-organization routing and orchestration layer**.

### How it works

1. A workflow emits an event when a step in the process is completed  
2. Zekt routes the event to the next responsible team or organization  
3. A downstream workflow is automatically triggered  

Each step can:
- process the event  
- emit a new event  
- continue the chain  

This creates a **fully automated, event-driven process spanning multiple organizations**.

---

## 🚀 Why this is better

### ⚡ Continuous execution
Processes move forward automatically — no manual coordination required  

---

### 🔗 End-to-end orchestration
All steps are connected into a single, coherent flow — even across organizations  

---

### 🔐 Secure collaboration
No need to share repository access or credentials between organizations  

---

### 📊 Full process visibility
Every step is tracked:
- what happened  
- when it happened  
- which workflow executed  

---

### ⏪ Replay and recovery
Individual steps or entire flows can be replayed:
- to recover from failures  
- to test changes  
- to validate process behavior  

---

### 🧱 Reduced integration complexity
No need for:
- custom APIs  
- webhook infrastructure  
- glue code between systems  

---

## 🧠 Key takeaway

> Zekt transforms fragmented, manual processes into fully automated, event-driven workflows — enabling reliable orchestration across teams and organizations using GitHub Actions as the execution layer.
