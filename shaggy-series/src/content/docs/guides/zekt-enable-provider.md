---
title: Provider - onboarding
description: How to enable a provider service
---

This guide aims to describe the logical steps that a customer will have to perform in order to enable a provider service - thereby being able to serve consumers! The section will also outline the reasoning (and considerations that one should be aware of).

The logical sequence of enabling a provider capability in Zekt can be broken down to: 

1. Provider persona - see details by clicking [here](/zekt-docs/overview/zekt-personas/).      
2. Enable provider repo - see details by clicking [here](/zekt-docs/guides/handle-zekt-provider-repo).
3. Whitelist workflows
4. Create "service description" & "service alias name"
5. List service in directory
6. (handle connection requests)

## - Conceptual overview

- A provider will eventually, expose their service(s) through the directory - where consumers can discover their service(s) and request access to them which needs to be approved by the provider in order for Zekt to "connect them" and be able to orchestrate service(s) across the different github accounts (personal account or organizational accounts). To expose a service, a provider needs to be perform these logical steps / sequence:

### Persona: Provider (-or "both")

Access to the Zekt management console, is governed depending on the selection you made during enrollment, if you chose to be "provider" or "consumer" or "both". If you are not a "provider" or "both" - you will not have access to the "Provider" navigation item in the management console.

### Enable provider repository

Once you select the "Provider" navigation item - you will end up by default on the "Zekt Repos" tab. From this view, you can enable a provider repository in Zekt. Toggle the "enable bar" to enable a repo, a modal wizard start - where you will have to install the "Zekt Orchestration App" (Github App) - which will provide the permissions needed for Zekt to perform its orchestration services. Once you have assigned the installation to the repository intended - you will be redirected to the Zekt management console again.

A key part of a Github repository - is the ability to have one, or several workflows (located in the ./github/workflows folder). As the aim of Zekt, is to present a service - it needs a mapping between a specific workflow in this folder - linking a chain - all the way up to the service.

In depth document with screenshots and step-by-step guide - [click here](/zekt-docs/guides/handle-zekt-provider-repo/)!

### - Whitelisted workflows

A github workflow can have one or many workflows in a repository. As such - you need to whitelist which workflow(s) you want to whitelist. You can enable one, two, or many in a single repository within Zekt.

This design - is intended so that providers, can have multiple workflows in a single repo - but only a single workflow - which they want to expose to the consumers! The rest of the workflows - will not be able to expose events or messages across Zekt to recieving parties.

On the other hand, a provider might want to expose multiple services, each service connected to a different whitelisted workflow in a single repository. This is flexible from a cost perspective - where Zekt charges you per repository enabled (base fee) + consumption fees. Being able to publish multiple services to consumers, from a smaller amount of repositories is a way to cut down on expenses.

In depth document with screenshots and step-by-step guide - [click here](/zekt-docs/guides/handle-zekt-provider-workflows/)!

### - Create service description

The intention is that the "provider" - should not have to expose technical details to end consumers - rather would place the trust with Zekt - to abstract away the technical details and enable Zekt to act as broker.

For these scenarios to work (without Zekt) - the provider would have to expose things such as: owner details (personal or organizational), repository names, workflow names and so forth. None of them really play significant roles to the consumer, they want to consume the "event" and the "payload". As such, Zekt allows a "whitelisted workflow" to be connected to a Zekt construct, known as a "service description".

A Service Description consists of the following properties:

- description: present your service that you are trying to offer
- service alias name: you present your service behind a cool name, that is seen by consumers
- list in directory. To be able to abstract away the details of your service - you need to publish your service in the Zekt directory. The directory acts as the marketplace of orchestrations, within the Zekt solution.

### - Zekt Directory

Publishing your service to the Zekt Directory is optional. However, we cannot abstract away potential sensetive information unless you do. It will also become clunky and cumbersome to present your service to consumers, as the underlying contracts needed to handle interaction is complex.

Zekt highly recommends its customers to use the directory service. This way, both customers and Zekt will save headache and time, resources - to get the show on the road. Independently - both providers and consumers will need to trust Zekt with permissions and sharing their information. Providers still have the option to deny / approve / handle - to which consumer they want their service to be exposed to.























