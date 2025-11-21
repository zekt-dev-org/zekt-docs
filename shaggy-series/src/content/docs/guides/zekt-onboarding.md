---
title: Zekt Onboarding
description: Guide - onboard & become zekt member
---

This guid illustrates how to onboard & become a valued Zekt member. It will outline the conceptual steps and logical path - from initial (sign-up for new users) process to being able to sing-in (existing users). The onboarding process - is where the Zekt will collect personal information, such as:

- 📇 Contact information: E-mail, phone details, name and address. We will save your personal information to our persistent backend - so that we can reference it & reach out to you in case of any problems - or when verifying support cases to topics related to Zekt services. Zekt will not share it customer information with third party companies. Upon leaving the Zekt - your personal information (as listed in here) will be removed instantely!

Zekt support both "individuals" & "corporations" - we just want the customer to inform us, what they are identifying as for future user-cases. Technically - there is no difference between the types from a Zekt or Github perspecticve when interacting with the "owning entity" of the repositories that we interact with from a Zekt perspective.

- ⚙️ SKU & Persona options: You will have to decide on which Zekt SKU - you wish to make use of (SKU is connected to the cost and generally refers to how many repositories you wish to enable within Zekt). Zekt clearly outlines, what different SKU alternatives we support at a given time & what the associated cost of each SKU is but also how many repositories that can be enabled for the different sizes (SKU). At onboarding - you also have to "choose" - which [persona](../overview/zekt-personas) - you want the account to simulate!

- 💵 Subscription fee / monthly cost. As part of the onboarding (becoming a Zekt member) - you will have to provide the payment information which will be handled by [our payment provider](https://stripe.com/) intergration. Zekt.dev do not store any transactional information or references to payment methods in our backend. We only track "which zekt member choose which SKU" - and send information to payment provider at a monthly basis. For detailed requirements & technical aspects of the payment provider (Stripe) - read their technical specification on how your credit card information is handled.

NOTE: When the initial onboarding has been conducted - and we have verified that all requirements have been successfully handled - you will be routed back to launch-pad - where your only option is to launch the Zekt management tool.

## Personal vs corporate accounts (github related)

- From a Zekt perspective - there is no difference if a repository is "owned" (placed) below a Github organization, or if it is placed below a personal account. When logging into Zekt - we will make use of your "personal access" already associated with your account - and gain access to onboard repositories as the next step.

- Zekt is associating the billable e-mail address (customer) with specific github repositories that they chose to enable. As such - the SKU counting - will match that of individual accounts. Nothing is restricting "serveral differnt" users from within a company, to each have their own Zekt SKU (repositories) associated with them. 

## Zekt OAuth github app

- When performing your initial onboarding (sign-up) or logging in as existing Zekt (sign-in) - Zekt will use your "github identity". Zekt does not offer its own identity services, rather make use of the federated github identity through our custom OAuth app. This allows us to make use of your personal "access_token" - which is needed when we onboard repoistories to Zekt. Consenting and logging in through the custom Zekt OAuth app is a requirement for the solution to work.
Zekt front-end / backend - support logging in as github accounts - providing support for MFA procedures to increase the security of your identity. Zekt strongly recommend to enable MFA on your Github account.
