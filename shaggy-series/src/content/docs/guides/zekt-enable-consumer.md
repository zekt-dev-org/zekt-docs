---
title: Consumer - onboarding
description: How to enable a consumer service
---

This guide aims to describe the logical steps that a customer will have to perform in order to enable a consumer service - thereby being able to serve requestors! The section will also outline the reasoning (and considerations that one should be aware of).

The logical sequence of enabling a consumer capability in Zekt can be broken down to: 

1. Consumer persona - see details by clicking [here](/zekt-docs/overview/zekt-personas/).      
2. Enable consumer repo - see details by clicking [here](/zekt-docs/guides/handle-zekt-consumer-repo).
3. Create "service description" & "service alias name" - see details by clicking [here](/zekt-docs/guides/handle-zekt-directory/)
4. List service in directory
5. (handle connection requests)


## - Conceptual overview

- If you are intending to only obtain events from provider service, choose "consumer" only persona.
- If you are intending to publish "consumer services" which can be requested by others - you must choose persona "isBoth" (provider and consumer)
- A consumer will eventually, expose their service(s) through the directory - where requestors (provider repos) can discover their service(s) and request access to them which needs to be approved by the service owner in order for Zekt to "connect them" and be able to orchestrate service(s) across the different github accounts (personal account or organizational accounts). To expose a service, a consumer needs to be perform these logical steps / sequence:

### Persona: Consumer (-or "both")

Again: choose Consumer - if you only intend to obtain events from others! If you intend to host your own consumer services, which can be requested by others - you must choose persona "isBoth" (provider and consumer).

Access to the Zekt management console, is governed depending on the selection you made during enrollment, if you chose to be "provider" or "consumer" or "both". If you are not a "provider" or "both" - you will not have access to the "Provider" navigation item in the management console. Since "consumer services" are handled through the "Provider" section of the UI (backwards, but that is the way it is) - you need to have both personas.

### Enable consumer repository

Once you select the "Consumer" navigation item - you will end up by default on the "Zekt Repos" tab. From this view, you can enable a consumer repository in Zekt. Toggle the "enable bar" to enable a repo, a modal wizard start - where you will have to install the "Zekt Orchestration App" (Github App) - which will provide the permissions needed for Zekt to perform its orchestration services. Once you have assigned the installation to the repository intended - you will be redirected to the Zekt management console again. 

In depth document with screenshots and step-by-step guide - [click here](/zekt-docs/guides/handle-zekt-consumer-repo/)!
