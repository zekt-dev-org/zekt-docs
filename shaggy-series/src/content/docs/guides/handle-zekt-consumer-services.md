---
title: Zekt Consumer Services
description: Guide - Handle your consumer services
---

## - Zekt Consumer Services

There are 2 distinct service types in Zekt - Provider services (which serves as a push type of events) & Consumer Services - which is the recieving service type (serving as service being requested)!

Below is a simple table for the different Zekt service artifact types:

Type:              Intent:	    Technique:	
------------------------------------------
Provider service   Push		    Send event to dispatcher
Consumer service   Requested    Obtain event from requestor (being dispatched)

While pushing an event to subscribers makes sense in some circumstances, services being requested makes sense in other scenarios! One of the commonly adopted scenarios for "consumer services" are in platform engineering scenarios! This can be summarized as follows:

- a developer tema control one or more repositories. They control the workflows, within their repositories for CICD handling - but have decided, that instead of them spending time on building complex infrastructure - they are requesting those services from an infrastructure team(s). As such - the team decides - each time the check in a new version of their API code - it will be spun up into a new container (-having version number as part of its name to track it) for testing!
- the developer team does not control the container environment, rather the infrastructure team does! The design can the logically be described as (example):

A. Application team commit their code to repository, which kicks of their local pipeline.
B. They upload a Docker container to an Azure Container Registry - which both them & infrastructure team has access to
C. Once uploaded, the application team will send a zekt-action notification + event to the "consumer service" - requesting service!
D. The Zekt Service (e.g spin-up-new-container-in-azure) owned by the infrastructure, has declared a JSON that would look something like below:

```JSON
{
    "containerName": "dev-team1-api-code-ver-0.2.2.5",
    "registryName": "acr-central-deposit-registry-eu",
    "sha": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "subscriptionId": "fdsf332-4523fh4-30848fdl34-433343dxd-3223243",
    "tenantId": "fdsf332-4523fh4-30848fdl34-433343dxd-324df2f43",
    "scanWithDefender": true,
    "alertIfBlocked": true
}
```
E. The application team is subscribing / have been approved to the exposed "consumer service"
F. As part of their CICD workflow - they send a Zekt Action event - to the "consumer service" requesting service based on the JSON payload above.
G. Infrastructure team re-acts to event dispatched to their service workflow through Zekt - start processing request!


Above example serves as a logical step-by-step - of how to think of "consumer services" being requested by "application teams" in a platform engineering scenario! Remember: the infrastructure team can return output meta-data as part of their service workflows when run in orchestration mode - see [here](https://zekt-dev-org.github.io/zekt-docs/overview/zekt-actions/#zekt-action-outputs--meta-data)! Combining long chains of "steps" in orchestration together with "meta-data" being passed between requestor and service owner - provide an extenssible solution!

## - Consumer Service - handled within 'Service Descriptions'

In the UI path of: provider/service descriptions - you handle the "consumer services" as well as the "provider services"! Click on the "provider/service descriptions" - subtab "Consumer Services"! Either list existing "consumer services" or create a new "consumer service". For this exmaple we will outline the steps associated with creating a new consumer service:

- Choose a repository, which will holster the workflow that serves as the "consumer service". The repository type is: Consumer
- Set a friendly, human easy to read service name (e.g "Create new KeyVault for company X")
- Set a description - as-in: "This service is creating a keyVault on your behalf, within company X tenant"
- Set 'event-direction' - choose from:

Subscribers fire events to me (default)      <--- which we are going to use for this example
I fire events to subscribers                 <--- will become removed / discontinued

- Set the dispatch event_type, as-in: new-azure-keyvault-org-x
- Set the service_slug, as-in: new-azure-keyvault-org-x 

NOTE: Service slug does not have to be the same as event_type - but made sense this time! Also - service slug is a unique identifier for this service within your organization. Used for workflow orchestration to reference services by (owner, slug) tuple.

- Tag the consumer service as wished
- Optionally - select if you want to publish the "consumer service" in the Zekt Directory
- Once you press the "Create Consumer Service" button - you will have the option to associate a custom logo with the service to be shown in the Zekt Directory.

