---
title: Zekt Overview
description: Zekt overview of documentation
---

This site contain documentation for user / customers of the Zekt services. The docs will outline the majority of concerns and questions that needs an answer - we see them as the Zekt bi-laws!

The aim is to answer the wast majority of concerns & to provide concrete examples, of how to use Zekt service to optimize your engagement within the Zekt.

## Zekt - business intent

- Zekt primary nieche was to allow different github organizations to be able to collaborate across organizational boundaries native to github, without exposing sensetive information - such as sharing "data" -or "credentials"
- Zekt aims to solve common needs of alerting different teams (within github) of status / outcome of workflows that has been executed, and then allowing neighbouring teams (within the same github organization) or external teams (within different github organization) to re-act to them as well! In the easiest possible manor... 
- Zekt aims to orchestrate workflows - and distribute those events to other teams - so that they can programatically respond to the events - thereby creating a fabric of how teams can design their workflows to enable collaboration across organizational boundaries & solving business needs.
- Zekt does not aim to "share information" between different github teams. This is common misconception & there are many solutions much more suited to address these needs! Example - Zekt will not distribute full custom JSON payloads between customers of Zekt - it will only distribute the [workflow meta-data](https://docs.github.com/en/webhooks/webhook-events-and-payloads) - generated automatically by github when a workflow is executed / finalized.
- With the introduction of the Zekt directory - where providers can publish their "services" to "consumers" - Zekt directory becomes a potential orchestration marketplace for github workflows - between different github organizations!


## Further reading

- Read [zekt-terminology]
- Read [about how-to guides](https://diataxis.fr/how-to-guides/) in the Diátaxis framework
