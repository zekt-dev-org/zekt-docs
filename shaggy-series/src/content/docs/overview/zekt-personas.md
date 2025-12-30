---
title: Zekt Personas
description: Zekt overview of personas
---

Within Zekt, we are refering to different personas, throughout our solution and within the documentation. As such, we will clarify, what we mean with the personas and what makes them stand out - from a business perspective, technical architectural perspective & how to use the different personas to fit your needs when using the Zekt services. All Zekt members are different personas - get to know them...

## Zekt persona: Provider

A provider persona can be characterized and summarized with the following statements:

- A provider persona "share their workflow status/outcome" to others + optionally can send arbitrary JSON payloads (max 512 KB size) that will reach their designated address
- A provider persona "has a need / desire" for others to become aware of it / re-act on their status/outcome event (and or arbitrary JSON payload)
- A provider persona "is a uni-directional persona" - they distribute events and messages to others
- A customer of Zekt - should pick "provider persona" - when onboarded - if they are sure that they "only need to inform others" and that they "dont have a need to get informed" by others
- To become a provider in Zekt - the provider needs to consent to install the "zekt-orchestration-app" which will provide Zekt with the required permissions (on selected repositories) to fetch workflow run information.

Most providers - are exactly that, providers of services... they want to offer some service, that can be consumed by their customers!

## Zekt persona: Consumer

A consumer persona can be characterized and summarized with the following statements:

- A consumer persona "consume / ingest" events from provider personas
- A consumer persona "has a need / desire" to get informed / become aware of an event / message so that they can re-act on the event provided to them
- A consumer persona "is a uni-directional persona" - they ingest events from providers
- A customer of Zekt - should pick "consumer persona" - when onboarded - if they are sure that they "only need re-act to events originating from others" and that they "dont have to inform others"
- To become a consumer in Zekt - the consumer needs to consent to install the "zekt-orchestrator-app" which will provide Zekt with the required permissions (on selected repositories) to distribute events to them.

## Zekt persona: Both (provider & consumer)

By far the most common persona - of Zekt services! This persona, which can by definition - both send events to others & obtain events from others, has the greatest flexibility when shaping their business needs based on the Zekt fabric. 

In comparsion - this persona is bi-directional - allowing sending & recieving - creating a flexible pattern for many corporations and organization solving their business needs & handling complex processes, without entangelment!

- To become both a provider & consumer in Zekt - the customer needs to consent to install the "zekt-orchestrator-app" which will provide Zekt with the required permissions to distribute and to ingest workflow events.

Customers that are having both capabilities (provide & consume) - are in the majority of the implementations, using both events & messaging as it provides a richer toolbox for automation capabilities. Think of eventing as the "when", messaging address the "what" type of questions that normally arise from orchestration needs. At Zekt - while we normally recommend customers to enable themselves as "both" (due to not limiting themselves unless there are legit reasons) - we strongly recommend not to have a single repository being both "consumer repo" and "provider repo" at the same time. Rather, try to separate provider repos & consumer repos - this provide clarity, intent and ease of administration.

NOTE: While you initially sign up as one of the mentioned personas, there is a possibility to upgrde (free of charge) you personas to "both" from within the zekt management UI. However, we do not allow, downgrade - meaning a consumer or provider, can always become "both" - but a "both" persona cannot downgrade to become consumer or provider only.