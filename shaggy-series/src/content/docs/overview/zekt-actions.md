---
title: Zekt Action
description: Zekt - overview of our Github action
---


The Zekt (Github) Action - is the action that allows providers to optionally (up to the individual customer) send a custom arbitrary JSON payload, to their approved consumers using Zekt backend services.

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

2. Once the requestors workflow finishes (assume that it succeded) it will automatically trigger the Zekt webhook to issue an event payload, stating "workflow: order-new-infrastructure.yaml" successfully ran - sending it over to the Zekt backend API's. At this stage - the backend API's can "map" (correlate) the "event" to the "message" - aggregate them into one payload.

3. The aggregated payload, is then shipped from Zekt persistent layers through API's to the designated consumer(s) - (1-to-1 or 1-to-many for fan-out scenarios). We submit the payload, as repository_dispatch events - which the consumer (in this case the infrastructure team) - will re-act on the incoming event, process the JSON payload, and handle it accordingly.

4. Once the deployment is done (in this case the webServer with a runtime in a specific Azure region) - they can then in response, have a separate step in their workflow, generate a JSON payload containing resource details (like resourceId / name / monthly cost /..) back to the requestor, which can trigger another thing - think you get the picture!

## - Official repository - Zekt action 

Go to the public repositories:

- [zekt action](https://github.com/zekt-dev-org/zekt-action) - the code repo for the "zekt action"
- [zekt provider repo](https://github.com/zekt-dev-org/zekt-provider-example-repo) - is where we show case provider workflows (action) & orchestration examples


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
        uses: actions/checkout@v6

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
        uses: zekt-dev-org/zekt-action@vx.y.z                   #<-- Use the latest version of zekt-action
        with:
          event-type: 'provider-test-event'                     #<-- Arbitrary event_type. zekt will just route whatever event you are sending
          payload: ${{ steps.build-payload.outputs.payload }}   #<-- Arbitrary JSON payload, caped in size

```
NOTE: Important to highlight - the 'uses' statement - is pointing out the [zekt-action](https://github.com/zekt-dev-org/zekt-action) repository in the zekt-dev-org (organization level). Further, it's support release tagging. When multiple versions of the action is launched, customer can move up/down changing the @vX.Y.Z version tags. Commonly, to stay on latest & greatest use @main.
Zekt automatically takes care of run_id (workflow mapping to event / message). Customer has possibility to implement messaging (by using zekt-action) - and providing both arbitrary JSON payloads (caped in size) with arbitrary event-type(s) sent to consumers. Consumers, would have to have a single workflow, re-acting on the specific event-type(s) emitted by the provider - as zekt supports "repository_dispatch" events as delivery. 
Github has a limitation - where as a single repository, can only have a single workflow file, re-acting to a specific event type. Meaning - if provider send two types of events (A and B) - the corresponding consumer, would have to implement two workflow files, each listening to the separate icoming event type and acting upon it.
Zekt Action - is supporting single "event payaloads" as described above - where the service is sending a payload, and recievering is re-acting to it. However - Zekt Action also supports orchestration from the requestors perspective, as-in example:

```YML

name: Orchestrate Infrastructure Sequence - from requestor to consumer service in Zekt

on:
  workflow_dispatch:
    inputs:
      tenantId:
        description: "Tenant ID for the sequence"
        required: true
        default: "932312-323213231-32132132-13213221"
        type: string
      name:
        description: "Name of the infrastructure instance"
        required: true
        default: "myfakeinstance"
        type: string
      environment:
        description: "Environment for the infrastructure instance"
        required: true
        default: "dev"
        type: string
      region:
        description: "Region for the infrastructure instance"
        required: true
        default: "westeurope"
        type: string
      tag_department:
        description: "Department tag for the infrastructure instance"
        required: true
        default: "finance"
        type: string
      tag_contact:
        description: "Contact phone number for the infrastructure instance"
        required: true
        default: "+4640203949494"
        type: string
      tag_contact_email:
        description: "Contact email for the infrastructure instance"
        required: true
        default: "user@example.com"
        type: string


jobs:
  request-infra-orchestration-through-zekt:
    name: Request New Infrastructure Sequence through Zekt
    runs-on: ubuntu-latest
    permissions:
      id-token: write   # Required for OIDC authentication
      contents: read
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Submit and wait
        id: orch
        uses: zekt-dev-org/zekt-action@main
        with:
          orchestrate: true
          wait: true                      # Block until completed | failed | timed_out
          payload: |
            {
              "default_service_owner": "zekt-dev-org",
              "services": [
                {
                  "step_id": "create-sub",
                  "service_slug": "new-az-subscription",
                  "input": {
                    "tenantId": "${{ inputs.tenantId }}",
                    "name": "${{ inputs.name }}",
                    "environment": "${{ inputs.environment }}",
                    "tags": {
                      "department": "${{ inputs.tag_department }}",
                      "contact": "${{ inputs.tag_contact }}",
                      "contact_email": "${{ inputs.tag_contact_email }}"
                    }
                  }
                },
                {
                  "step_id": "create-resourcegroup",
                  "service_slug": "new-az-resource-group",
                  "depends_on": ["create-sub"],
                  "input": {
                    "region": "${{ inputs.region }}",
                    "name": "${{ inputs.name }}",
                    "subscriptionId": "${{ steps.create-sub.outputs.subscription_id }}",
                    "tags": {
                      "department": "${{ inputs.tag_department }}",
                      "contact": "${{ inputs.tag_contact }}",
                      "contact_email": "${{ inputs.tag_contact_email }}"
                    }
                  }
                },
                {
                  "step_id": "create-keyvault",
                  "service_slug": "new-az-keyvault",
                  "depends_on": ["create-resourcegroup"],
                  "input": {
                    "tenantId": "${{ steps.create-sub.outputs.tenant_id }}",
                    "subscriptionId": "${{ steps.create-sub.outputs.subscription_id }}",
                    "region": "${{ inputs.region }}",
                    "name": "${{ inputs.name }}",
                    "environment": "${{ inputs.environment }}",
                    "resourceGroupName": "${{ steps.create-resourcegroup.outputs.resource_group_name }}",
                    "tags": {
                      "department": "${{ inputs.tag_department }}",
                      "contact": "${{ inputs.tag_contact }}",
                      "contact_email": "${{ inputs.tag_contact_email }}"
                    }
                  }
                }
              ]
            }

      - name: Process outputs from orchestrated services
        shell: pwsh
        run: |
          # Pattern: steps.<orch-step-id>.outputs.step_<payload-step_id>_outputs_<field>

          # --- Outputs from create-sub ---
          $subscriptionId = '${{ steps.orch.outputs.step_create-sub_outputs_subscription_id }}'
          $tenantId       = '${{ steps.orch.outputs.step_create-sub_outputs_tenant_id }}'

          # --- Outputs from create-resourcegroup ---
          $resourceGroup  = '${{ steps.orch.outputs.step_create-resourcegroup_outputs_resourcegroup_name }}'

          # --- Outputs from create-keyvault ---
          $keyvaultName   = '${{ steps.orch.outputs.step_create-keyvault_outputs_keyvault_name }}'

          # --- Outputs from re-usable workflow example:
          $reusableWorkflowOutput = '${{ steps.orch.outputs.step_create-keyvault_outputs_reusable_output }}'

          Write-Host "Subscription    : $subscriptionId"
          Write-Host "Tenant          : $tenantId"
          Write-Host "Resource Group  : $resourceGroup"
          Write-Host "Key Vault       : $keyvaultName"
          Write-Host "Reusable Output : $reusableWorkflowOutput"
          
          # Forward any value downstream via GITHUB_OUTPUT
          # "subscription_id=$subscriptionId" >> $env:GITHUB_OUTPUT
          # "resource_group=$resourceGroup"   >> $env:GITHUB_OUTPUT


      - name: Confirmation
        run: |
          echo "✅ Event sent to Zekt successfully!"
          echo ""
          echo "📋 Summary:"
          echo "  - Event Type: service-new-infrastructure-sequence-request"
          echo "  - Event ID: ${{ steps.orch.outputs.execution_id }}"
          echo "  - Status: ${{ steps.orch.outputs.execution_status }}"
          echo "  - Workflow Run: ${{ github.run_id }}"
          echo "  - Repository: ${{ github.repository }}"
          echo "  - Triggered by: ${{ github.actor }}"
          echo "  - Infrastructure Instance Name: ${{ inputs.name }}"
          echo ""

```

In this "orchestration" example - the requestor (always a provider repository) is calling a Zekt "consumer service". The payload sent through the Zekt Action using the keyword(s):

          orchestrate: true
          wait: true

will indicate to the Zekt backend - that the payload, contains a set of service calls to be processed in a certain order! The backend then breaks the steps down into a state machine, validates that requestor is allowed to interact (assuming it is an approved connection & service brokering), then invokes the first deployment (in this example a new Azure subscription to be generated). Once conclusion & outcome is cleared, mening first step completed and ran successfully from a Github perspective - the orchestrating layer will trigger the second step - and so on! Zekt orchestration "trust" Github error handling! This means:

- for Zekt to "fail" a step in an orchestration chain sequence, the underlying workflow must be deemed as unsuccessful by Github. At this point it comes down to writing stable / error handled code, that is not "swallowing errors"!
- for Zekt to proceed with the next requested step - Zekt trust Github outcomes. If workflow initially called succeeds - we proceed to step 2 and so on!

## Zekt Action outputs & meta-data

The Zekt Action handles output of meta-data from the service execution side, to the requestor! This is super powerfull stuff, because:

- a requestor could just state "generate a new Azure subscription". However, the requestor would need to "know/obtain" the details of the subscription, in order to use it further down their automation pipeline! As such - the Zekt Action, allows a service owner, to populate their arbitrary meta-data as Github workflow outputs, which are persisted across to the requestor!

In the previous example, pay attention to:

```YML
      - name: Process outputs from orchestrated services
        shell: pwsh
        run: |
          # Pattern: steps.<orch-step-id>.outputs.step_<payload-step_id>_outputs_<field>

          # --- Outputs from create-sub ---
          $subscriptionId = '${{ steps.orch.outputs.step_create-sub_outputs_subscription_id }}'
          $tenantId       = '${{ steps.orch.outputs.step_create-sub_outputs_tenant_id }}'

```

The Zekt Service hiding behind the service-slug: new-az-subscription chose to populate two output meta-data fields, those being:
- subscription_id: make sense to send back the subscription id, that was generated - to the requstor
- tenant_id: make sense to send back, in which tenant the subscription was created - to the requestor

Also pay close attention to the allowed pattern:
steps.<orch-step-id>.outputs.step_<payload-step_id>_outputs_<field>

Zekt backend state machine (orchestrator) uses a strict naming convention for being able to handle outputs passed from requestor, through statemachine to the executing side and back!