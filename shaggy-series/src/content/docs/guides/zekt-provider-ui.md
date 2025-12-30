---
title: Zekt Provider - Management UI
description: Guide - Provider UI, onboarding your repositories
---

## - Zekt Management console - overview

This section is about getting an overview of the Zekt management console, where you as a customer can manage your repositories, interactions with other customers, check out health issues, tracking connections and so forth. The management console is your one-stop-shop for doing business within Zekt. Below is a video, that shows how to open the console from your browser, once you are registered and logged in.

<div style="margin-top: 2rem; text-align: left;">
  <a href="#" style="display: inline-flex; align-items: left; gap: 0.5rem; color: #00ff88; text-decoration: none; font-size: 1.1rem;">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z"/>
    </svg>
    <span>Watch the management console introduction tutorial video</span>
  </a>
</div>


## Provider - managing repositories in zekt

This guide will showcase the "provider repos" part of the Zekt management console UI as seen below. 
![Zekt Provider Repositories](../../../assets/zekt-provider-repo.png)

In order to be able to choose the "Provider" item on the left hand side of the management console - you need to either be a "Provider" or "Both" (meaning Provider & Consumer) - which is an aossicated property of your profile. This property steers access to the navigation tab, as it only contain functionality relevant if you are a "provider" or "provider and consumer". [Please re-visist Zekt documentation, read Zekt personas in order to make an informed decisions if there are concerns](../../docs/overview/zekt-personas.md).

The first option (functionality) shown, is the "Zekt Repos" tab. This tab - is where you onboard an existing Github repository that you have access to, into the Zekt. Columns Status & Actions - show you clearly if a repository is Enabled or Disabled - from a Zekt perspective (we will never alter Github repository status from Zekt).

NOTE: Besides having the "provider persona" enabled (or "both"), the pre-conditions to be able to enable Zekt on existing Github repositories, are that you need to have enabled permission to enable the Zekt orchestration (Github) app or it will not work.

<div style="margin-top: 2rem; text-align: left;">
  <a href="#" style="display: inline-flex; align-items: left; gap: 0.5rem; color: #00ff88; text-decoration: none; font-size: 1.1rem;">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z"/>
    </svg>
    <span>Watch provider respository management tutorial video</span>
  </a>
</div>


## Provider - managing workflows in zekt

Zekt does not really "manage" workflows - it associates a workflow that is to be allowed to be forwarded or not within the Zekt routing engine. A customer that is having the "provider persona" - distributes their workflow run_id's event to Zekt - captured by a webhook (e.g zekt webhook) that automatically captures all events (native to Github) of a certain type (in Zekt case that is workflow run / workflow job events) and send them to a pre designated endpoint (Zekt backend API). Since a customer, can have "multiple" workflows in any given Zekt repository, perhaps - they do not want customers to become alerted of all workflows within a repository (rather a single workflow). 

To resolve this concern - all workflows (within a Zekt enabled repository) are forwarded to Zekt backend. Once in the Zekt backend, Zekt will check (if there is a "white list" of workflows that have been "cleared" by the provider) who is to recieve this workflow event. Once Zekt detects that the workflow is "white listed" - it will route it to the designated consumers.

The next tab in the management console, of the Provider view, is named "Zekt workflows" - and is where you "whitelist" specific workflows (that generate event + optional messages) to become distributed to consumers in the end. If you dont setup a "white listing" of workflows (default none are white listed) - Zekt will not forward the workflow events. This is an active decision, that has to be handled by each Zekt provider customer - and is both a security pre-caution and flexibility feature.

NOTE: It is strongly recommended, that you keep your provider repositories clean from none "whitelisted" workflows in zekt. While Zekt actively enforces that events (and even messages coming from none whitelisted workflows) are not forwarded to consumers - zekt must "accept the event + optional message" to determine what to do with it. This is generating compute / storage / transfer costs - and as such, you as a provider will be billed for it. Zekt management UI - clearly outlines, which workflows are generating the "cost not desired" / how many messages / events that were blocked as a result and the cost for those events.










