---
title: Zekt - Integration Architecture
description: High level integration architecture
---

This document the main integrations that are vital to the zekt.dev solution offering. It provides a high level descriptive picture of the WHY/HOW type of questions. This article can be of interest to external customers, but primarily for internal engineering & architects.

## - Identity integration

As of now - we only support (intend to support) a single external identity provider (IDP) - in this case Github identities. This fact puts clearly points out a couple of things:

1. Existing github identity required. A potential Zekt.dev customer, is required to have their own github identity. Since the zekt orchestration capability (SaaS offering) is dependent on tying a customer identity (github username / e-mail) to a Zekt SKU offering - a pre-existing github identity is required in order to progress.
2. Permissions. In order for Zekt orchestration to accomplish its task of orchestrating (event + message) workflow between different entities (github organizations / repositories / workflows) - the customer not only needs an existing identity - they must also have the permission to install the [zekt apps](../overview/zekt-apps.md) and provide access to the different entities (github organizations / repositories / workflows) for where they want to enable the Zekt services.

While Zekt.dev requires its customers to submit contact information - they are not used for anything else then billing / support - and so on. The integration to the core business value - the orchestrator, is still dependent on the github identity.
Important in terms of identity to point out - is the Zekt OAuth (github) app. This app enables Zekt to obtain the "access_token" of the user that logged in. Once Zekt has the customers "access_token" - we can impersonate the user, for querying Github REST API's for different settings / properties that form & shape the overall solution of the Zekt orchestrator.

## - Infrastructure integration

Single infrastructure provider - Azure as of now! We are using PaaS services to layer / package our SaaS offering. For greater details of principals around infrastructure & system design concerns, please visist [this article](../architecture/system-architecture.md)!

## - De-coupled techniques

As a true "modern" web based solution - the intention is to never coupled or sticky session based technologies. As such, there are always abstraction layers (REST API's primarily) with explicit authorization and authentication demands. Direct point-to-point is disqualified from a principal perspective.

We want / aim to always store messages / events - in an intermediate persistent layer - while that is not always possible! As an example: webhooks from github - support the REST verb POST. Suiteable / cheap persistent solutions such as storage queues in Azure, dont support REST verb POST. We would like to avoid calling compute HTTP(s) endpoints directly, however, sometime - reality strikes! 

Having intermediate persistent layer would cater for greater "replay" capabilities / "ensure delivery" / "retry functionality" - and it would not "force" solution into becoming so dependent on "hot compute" directly (by increase de-coupling from persistency and processing layers).

