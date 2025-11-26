---
title: Zekt Security
description: Zekt Security overview
---

We emphasize & actively work on improving our security posture as we progress all the time. We will always try to raise security boundaries - where possible without sacrificing business functionality! This documentation acts as a disclosure to our customers & but also internal documentation on the attack vectors that we aim to decrease / address within our solution.

## Attack vectors & considerations

- Github Apps. Since our customers, entrust to install our Zekt apps - we need to commit, that we are not over exposing us in terms of permissions - thereby being able to extract sensetive information from the customers github repositories. With Github Apps - we are trying to have "as minimal permissions" needed (to fullfill the business objective of Zekt) in order not to over expose us and have more permissions then needed.
Transparency - we want to be transparent of the permissions associated with each app, we are exposing to our customers - so that they can make an informed decision - to if they want to consent to permission delegated to Zekt - weighing in the business use that Zekt provides. Github Apps - are under the control of the customer, and can be removed by themselves at any time (not in control by Zekt)

- Customer data must be separated into compartments. Even though we try to defend ourselves from being actively exploited - we also acknowledge that we must assume breach. One of the core principals within Zekt, is to segragate each customer information from the next customers! The main idea, is that if we loose one customer's data - it would not automatically mean, all customers data has been exploitet.

- Zekt administrators - are all subject to harsh security restrictions in order to ensure that we are working on clean endpoints and not injecting dirty or malicious code into our repos. 

- Drifting & misconfigurations of infrastructure. We use bicep pipelines to configure infrastructure in Azure - ensuring that potential drifting and misconfiguration would atleast be handled at next deployment run. All endpoints are encrypted over HTTPS (supporting encryption while in transit). All endpoints are contexted to use user assigned managed identities, making breach harder, since they are none interactive accounts.  

- No "token" residing / shown / surfaced within frontend. We are working actively to scan for "tokens" appearing in the frontend layers, which are exposed to end-consumers. Token exposure is a common way for attackers to gain access to the websites - where the attacker can then laterally move inwards to next tier. Token exposures are also common vector of loosing "customer data" - since the attacker can once they have obtained the token impose as the real user (especially if no MFA is activated). Zekt strongly recommend all of its customers to enable MFA on their Github accounts (if not already done).

- Code integrity. We dont want click administration from the backend. Code & pipeline builds a consistency. Consistently correct - or wrong, but atleast consistent!

- Protect credentials. All credentials needs to be saved in either KeyVaults (Azure) or Github secrets - to ensure, encryption at rest.

- Messaging. While "workflow events" (meta-data) can be considered realtivly "safe" and not that "sensitive" information, the messaging capability of the "zekt github action", allows for arbitrary JSON payloads to be sent between provider --> Zekt backend API's --> consumer, opens up for several security concerns:

A. Sensitive information stored and sent over JSON payload. Customers can intentionally send sensitive information (since it is arbitrary, customers has a decision to make), such as "tokens" / "passwords" / "endpoints" / payment card information / ... - within the JSON payload. Zekt - strongly recommends customers NOT to send sensitive information in the JSON. The messaging service of Zekt, supports encryption while in transit, E2E - JSON blobs are encrypted while stored (encryption at rest) during their TTL!
B. Exposure / potential attack vectors of "man in the middle" - while in transit (https endpoints used) and authentication required on all exposed services. Further - "spoofing" will have to be considered. Domain takeovers and certificate handling are key principals - to ensure trust can be maintained between Zekt and its customers.