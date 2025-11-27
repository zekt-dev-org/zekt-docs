---
title: Zekt actions
description: Zekt - overview of our Github action
---


The Zekt (Github) action - is the action that allows providers to optionally (up to the individual customer) send a custom arbitrary JSON payload, to their approved consumers using Zekt backend services.

As Zekt positions itself as a workflow orchestrator - the combination of eventing (webhook meta-data) & (optional messaging) is a powerfull feature for Zekt customers. Many times, the event itself is enough to make decisions, if a counter-act / step-in-process should be executed by just knowing "workflow x from provider x just finished". However, by combining this "event" with enriching information to the customers, it makes automation easier and information rich enough to act upon for many provider - consumer patterns!

Example #1: (two Zekt customers - both acting as consumers & providers)

- A customer request their infrastructure provider to deploy a webserver. Assuming the two (2) customers have onboarded their respective repositories to Zekt and provided the necessary approvals of interction between them - the logical flow would be:

1. Requesting infrastructure customer, execute their workflow (order-new-infrastructure.yaml) - which make use of the Zekt (Github) action to send a custom JSON payload over to infrastructure deployment team (organization). The custom JSON payload could look as follows:

```
{
    "resourceType": "webServer",
    "tenantId": "z93dfd33-rf3343-5665656-54-33454343-5443543",
    "subscriptionId": "43223234-43342243423-2324323423-323423",
    "runtime": "node",
    "runtimeVersion": "20",
    "size": "large",
    "region": "northeurope"
}
```

A separate step in requestors workflow, will invoke the Zekt (Github) action - providing the custom arbitrary JSON payload as POST message (to the Zekt backend API's). The Zekt API's will persist the payload (with a referencing marker so we can map WHO SENT WHAT).

2. Once the requestors workflow finishes (assume that it succeded) it will automatically trigger the Zekt webhook to issue an event payload, stating "workflow: order-new-infrastructure.yaml" successfully ran - sending it over to the Zekt backend API's. At this stage - the backend API's can "map" the "event" to the "message" - aggregate them into one payload.

3. The aggregated payload, is then shipped from Zekt persistent layers through API's to the designated consumer(s) - (1 or many). We submit the payload, as repository_dispatch events - which the consumer (in this case the infrastructure team) - will re-act on the incoming event, process the JSON payload, and handle it accordingly.

4. Once the deployment is done (in this case the webServer with a runtime in a specific Azure region) - they can then in response, have a separate step in their workflow, generate a JSON payload containing resource details (like resourceId / name / monthly cost /..) back to the requestor, which can trigger another thing - think you got the picture!

## - Official repository - Zekt action 

Go to the public repositories:

- [zekt action](https://github.com/zekt-dev-org/zekt-action) - the code repo for the "zekt action"
- [zekt provider repo](https://github.com/zekt-dev-org/zekt-provider-example-repo) - is where we show case provider workflows (action)