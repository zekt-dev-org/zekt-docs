---
title: Zekt Directory
description: Guide - Handle your published services in the directory
---

## - Zekt Directory - one stop shop for published services

Once a provider persona has enabled a repository in Zekt, whitelisted a workflow - associated it with service description and choosen to publish it to the Zekt directory - it is instantly discoverable to the broader consumers of Zekt. The directory is where you / your customers go to find your service (if you are a provider) and then easily have zekt connect you by brokering the events & messages. For a high level description of the Zekt Directory - [click here](/zekt-docs/overview/zekt-directory/) 

This documentation section - will outline the Directory - and how a newly created service is looking once it is published. Open the Zekt management console - find the navigation item named "Directory", then select "Browse Directory". A picture is shown below how it looks in our environment:

![Zekt Browse Directory](../../../assets/zekt-directory-browse.png)

1. The "Provider" column, shows you "who" is providing the service listed in the directory. There is also a "trust badge" shown - to be able to have some confidence in provider.
2. The "Service Description" column, shows you "what" the service provides in terms of value.
3. Associated service tags - which can be used in the filtering option above by the consumers.
4. The "Action" column icon - can be used, if you as a consumer decides that you want to consume the published service - from the directory view! Once you click on the "action icon" - you will have to submit a request (from consumer) to provider (to approve request) in order for Zekt to broker the connection. This "approval flow" is outlined in greater detail - by clicking here!


## - Zekt brokering visualization

If you are a provider using Zekt - to broker events and messages to designated consumers - you need a way of visualizing "who is consuming from me, how are they connected" and so forth - especially at scale - with loads of consumers connected to a single "service" (1-to-many brokering scenario). Zekt uses the management console tabs:

Zekt Brokering & My Connections - to accomedate the visualization of how service to consumers mappings are done from different perspectives. We will start with the tab "Zekt Brokering" tab which supports 3 different views: Physical / Logical / Consumer

We will start to outline the physical view first, as shown below (example):

![Zekt Brokering - Physcial](../../../assets/zekt-brokering-physical.png)

This view tries to illustrate - how the "physical" connectivity is looking creating the brokering mesh of Zekt and your services. In the above example:

- We can see 3 (green bubbles) provider repositories under the zekt accounts control. Select the individual repo - and get details on the right hand side
- Each provider repo is having its own webhook. Select the webhook - and get details on the right hand side
- Servicing 2 consumers (not consumer repos, but recievers / consumers) illustrated by orange bubbles. Click on them individually - and get details on the right hand side
- Workflow(s) - are indicated between as the Zekt router and the consumer - which is not entirely true - but serves as a good example of understand how the workflows are logically conntected to individual consumer accounts.


The logical view - is very much geared towards the provider persona. It tries to illustrate how the provider components are all connected from their perspective to the Zekt router capability. An example is shown below (same example as within the physical view):

![Zekt Brokering - Logical](../../../assets/zekt-brokering-logical.png)

From this picture we can determine the following:

- Individual providing repos, under the control of the zekt account logged in. In this view represented by "green bubbles". Select each, to get details displayed on the right hand side of the management console - relating to the repository.
- Individual whitelisted workflows within each providing repository. The whitelisted workflows are the "blue bubbles". Select each, to get details displayed on the right hand side of the management console - relating to the workflows.
- The "orange bubbles" are the "service publisher alias name" - under which the provider published their service (towards consumers). 
- The zekt directory (singular) is listed as the provider directory - and acts as the center for the published services. Finally - the directory is always connected to the Zekt routing capability.

The consumer view - is obviously geared to visulizing the connections needed from a consumer perspective. In this view - you will see the providing "entity" (provider repos) that feeding your consumer repos with "events" through the zekt brokering mechanism. An example picture of same setup we have used to describe physical and logical but from a consumer perspective is shown below:

![Zekt Brokering - Consumer](../../../assets/zekt-brokering-consumer.png)


## - Zekt - My Connections (on-going / not finalized)

This is another visualization effort (simplified) that is aiming to describe relationship between providing entities such (provider repos / workflows / webhooks / services) - mainly of interest to "provider personas" - but also address the concerns and needs of the "consumer personas" - with a dedicated view of how consuming repos are tied and connected to "providing entities".

Event chains and event dependencies - can become complex over time - and at scale - where a 1-to-many scenarios become a reality - visualization & tracking setups are evermore important! You will find the "My Connections" tab - by opening the Zekt management console and in there is a tab named "My Connections".

### - Provider view: Provider(My Services --> Consumers)

Select the provider view. It will "list" each providing service you are publishing (if you are a provider persona / both). It then places consuming repositories below - pulsing arrows indicate in which direction events (message) are flowing within zekt between the logical components.

![Zekt connections - provider](../../../assets/myconnection-provider.png)

From this picture we can gather - we have a providing workflow named (zekt-provider-test.yml) that is providing services to 3 consumers (indicated by the right hand side number). Below you can see the "consumer" repos and their "owners". Please note - already from this example we can determine: zekt supports cross-org routing - personal repos/workflows can send to organizational repos / workflow and vice versa, github org repos can send to other github org repos as long as they are all zekt enabled. Further - repos dont have to be public (zekt handles private repos) in order to have events & messages to become routeable through zekt.

### - Consumer view: Consumer(My Repos --> Services)

Select the consumer view. It will "list" each consumer repo you are having enabled (assuming you are consumer persona or both). It then shows the providing repo / owner organizations that are feeding you consumer repos with events (as indicated by the direction of the pulsing arrows) as shown below:

![Zekt connections - consumer](../../../assets/myconnection-consumer.png)



