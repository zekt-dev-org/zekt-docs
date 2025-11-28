---
title: Zekt Overview
description: Zekt overview of documentation
---

This site contain documentation for user / customers of the Zekt services. The docs will outline the majority of concerns and questions that needs an answer - we see them as the Zekt bi-laws!

The aim is to answer the wast majority of concerns & to provide concrete examples, of how to use Zekt service to optimize your engagement within the Zekt.

## Zekt - business intent

- Zekt primary nieche is to allow different github organizations to be able to collaborate across organizational boundaries otherwise native to github. This positions Zekt, to become a true workflow orchestration SaaS offering as customer of Zekt, can both act/re-act on events (workflow execution) - and associated messaging capabilities offered within Zekt, thereby supporting messaging as well as eventing.
- Zekt aims to solve common needs of alerting different teams (as long as they are using github + zekt) of status / outcome of workflows that has been executed, and then allowing neighbouring teams (within the same github organization) or external teams (within different github organization) to re-act to them as well! In the easiest possible manor... 
- Zekt aims to orchestrate workflows - and distribute those events (and arbitrary message payloads) to other teams - so that they can programatically respond to the events - thereby creating a fabric of how teams can design their workflows to enable collaboration across organizational boundaries & solving business needs.
- Zekt does not aim to expand it's capabilities to other devops platforms, except Github. 
- Zekt has intentionally put caps on payload sizes for arbitrary JSON. For large / heavy - messaging solutions, dont use Zekt. This is common misconception & there are many solutions much more suited to address these needs! Example - Zekt will not distribute JSON payloads above 512 KB + [workflow meta-data](https://docs.github.com/en/webhooks/webhook-events-and-payloads) - generated automatically by github when a workflow is executed / finalized.
- With the introduction of the Zekt directory - where providers can publish their "services" to "consumers" - Zekt directory becomes a potential orchestration marketplace for github workflows - between different github organizations! Publish your thought through workflow - to be consumed by your own customers, brokered by Zekt!

## Zekt - technical intent

Zekt and its orchestration capabilities, sits on top of Github. We extend functionality of what Github offers out-of-the-box to distributed teams - enabling them to consume from each other in an easy manor.

We do this, by building on top of existing Github functionality (organizations / repositories / workflows / apps / identity) - with backing PaaS services to handle scaling concerns. As we are positioning Zekt as a SaaS offering - we will mainly work with "pay-as-you-go" cost models + base fee for activating your repositories with Zekt.

## What is orchestration?

To use layment words - the need to handle "what should happen", "when scenario X occurs" - in a progrmatic consistent manor! 

## Further reading

- [zekt-dev-org](https://github.com/zekt-dev-org) - contains the public repositories we offer, example being the [zekt-docs](https://github.com/zekt-dev-org/zekt-docs) - this site! 
- [zekt action repo](https://github.com/zekt-dev-org/zekt-action) - elaborates on the Zekt (Github) action, offered to our customers!
