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
    "tenantId": "z93xfd53-rf5343-5665856-h4-3g454r43-5a4K543",
    "subscriptionId": "432232rt-433b2c43623-232g383423-3D3423",
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


## - Zekt Action - description & usage

Below a shallow description of the Zekt Action, which is offered to make it easier to interact with "consumers" from "provider" perspective. It enables providers to not only "event" but also attach "messaging" to the consumer - which they can act upon. Below is some fictive workflow, that is using the Zekt Action:

```YML
name: Zekt Provider Test

on:
  workflow_dispatch:
    inputs:                                   # <-- whatever inputs you desired
      RequestType:
        description: 'type of deployment request'
        required: true
        default: ''
        type: string
      Department:
        description: 'department name requesting deployment'
        required: true
        default: 'finance'
        type: string
      Size:
        description: 't-shirt size of deployment'
        required: false
        default: 'small'
        type: string
      isPublic:
        description: 'is exposed to internet'
        required: true
        default: false
        type: boolean
      costDistributionId:
        description: 'cost distribution identifier'
        required: true
        default: ''
        type: string

jobs:
  send-to-zekt:
    name: Send Event to Zekt
    runs-on: ubuntu-latest
    permissions:
      id-token: write   # Required for OIDC authentication
      contents: read
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Build JSON Payload 
        id: build-payload
        shell: pwsh
        run: |
          # Collect all input parameters into a structured JSON object
          Write-Host "Pre-collecting input parameters..."
          
          # Convert string boolean to PowerShell boolean
          $isPublicBool = "${{ inputs.isPublic }}"
          Write-Host ("CorrelationId: " + "${{ github.run_id }}")

          $payload = @{                                             
              resourceType = "${{ inputs.RequestType }}"
              department = "${{ inputs.Department }}"
              size = "${{ inputs.Size }}"
              isPublic = $isPublicBool
              costDistributionId = "${{ inputs.costDistributionId }}"
              timestamp = (Get-Date -Format "o")
              workflowRunId = "${{ github.run_id }}"
              repository = "${{ github.repository }}"
              sender = "${{ github.actor }}"
          }
          
          Write-Host "Post-collecting input parameters..."
          
          # Convert to JSON string
          $jsonPayload = $payload | ConvertTo-Json -Compress 
          
          # Output for next step
          Write-Host "Payload built:"
          Write-Host $jsonPayload
          
          # Set as output (escape for GitHub Actions)
          "payload=$jsonPayload" | Out-File -FilePath $env:GITHUB_OUTPUT -Append
          
      - name: Display Payload (Debug)
        run: |
          echo "🔍 Payload to be sent to Zekt:"
          echo '${{ steps.build-payload.outputs.payload }}'

      - name: Send Event to Zekt                                #<-- Optional step for messaging capabilities
        id: zekt
        uses: zekt-dev-org/zekt-action@v2.0.1                   #<-- Use the latest version of zekt-action
        with:
          event-type: 'provider-test-event'                     #<-- Arbitrary event_type. zekt will just route whatever event you are sending
          payload: ${{ steps.build-payload.outputs.payload }}   #<-- Arbitrary JSON payload, caped in size

```
NOTE: Important to highlight - the 'uses' statement - is pointing out the [zekt-action](https://github.com/zekt-dev-org/zekt-action) repository in the zekt-dev-org (organization level). Further, it's support release tagging. When multiple versions of the action is launched, customer can move up/down changing the @vX.Y.Z version tags.
Zekt automatically takes care of run_id (workflow mapping to event / message). Customer has possibility to implement messaging (by using zekt-action) - and providing both arbitrary JSON payloads (caped in size) with arbitrary event-type(s) sent to consumers. Consumers, would have to have a single workflow, re-acting on the specific event-type(s) emitted by the provider - as zekt supports "repository_dispatch" events as delivery. 
Github has a limitation - where as a single repository, can only have a single workflow file, re-acting to a specific event type. Meaning - if provider send two types of events (A and B) - the corresponding consumer, would have to implement two workflow files, each listening to the separate icoming event type and acting upon it.