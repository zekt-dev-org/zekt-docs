---
title: Zekt Onboarding
description: Guide - onboard & become zekt member
---

This guide illustrates how to onboard & become a valued Zekt member. It will outline the conceptual steps and logical path - from initial (sign-up for new users) process to being able to sing-in (existing users). The onboarding process - is where the Zekt will collect personal information, such as:

- 📇 Contact information: E-mail, phone details, name and address. We will save your personal information to our persistent backend - so that we can reference it & reach out to you in case of any problems - or when verifying support cases to topics related to Zekt services. Zekt will not share it customer information with third party companies. Upon leaving the Zekt - your personal information (as listed in here) will be removed instantely!

Zekt support both "individuals" & "corporations" - we just want the customer to inform us, what they are identifying as for future user-cases. Technically - there is no difference between the types from a Zekt or Github perspecticve when interacting with the "owning entity" of the repositories that we interact with from a Zekt perspective.

- ⚙️ Cost & fee options: Zekt cost model is easy! There are 3 types of costs in Zekt:

Static costs:

1. Zekt Core. This is the base Zekt service, 10 USD / repo / month (+ usage costs). Minimum, you need a single repository enabled in Zekt for any business value (configured either as provider or consumer).
2. Zekt Add-On services:

A. Zekt Analytics: Optional / free to choose. You can optionally enable one or several repositories for Zekt Analytics at 3 USD / repo / month (+ usage costs). Primary reason for Analytics would be "Time Travel" and "Webhook Replay" capabilities - which are included in this add-on. An Analytics enabled repository would then be 13 USD (Core + Analytics) / repo / month (+usage costs).
B. Zekt Shield: Optional / free to choose. You can optionally enable one or several repositories for Zekt Shield at 4 USD / repo / month (+ usage costs). Primary reason for Shield is protection of message payloads being encrypted not only while in transit, but also from Zekt itself - only available between the provider & consumer. Shield also includes Redaction Guard. A Shield enabled repository would then be 14 USD (Core + Shield) / repo / month (+ usage costs).
C. Zekt Chainlink: Optional / free to choose. You can optionally enable one or several respositories for Zekt Chainlink at 22 USD / repo / month (+ usage costs). Primary reason for Chainlink from a value proposition - is that you as a customer can form / shape / make use of Zekt - to shape long chains of events (automation) to address complex business processes across traditional Github boundaries in an easier way. A Chainlinked repository can act as both Provider & Consumer at the same time - enabling them to both recieve and send events & messages, forming closed loops if so desired!

Dynamic costs:

3. Usage cost. Above offerings are static costs; per repo / month! Usage costs is basically the attributed cost of processing the events, the message payloads and routing them to their destination endpoints! For customers only using Zekt to a small extent, the cost will obviously be much smaller. For customers, that build their pipeline logic to be shared with high volume & frequency - the associated dynamic cost will be much higher! Zekt attributes costs of "usage" to the customer. Provider attributed costs are assigned to the provider and likewise to consumers for their dispatching & processing!


- 💵 Subscription fee / monthly cost. As part of the onboarding (becoming a Zekt member) - you will have to provide the payment information which will be handled by [our payment provider](https://stripe.com/) intergration. Zekt.dev do not store any transactional information or references to payment methods in our backend. We only track "which zekt member consume how much" - and send information to payment provider at a monthly basis. For detailed requirements & technical aspects of the payment provider (Stripe) - read their technical specification on how your credit card information is handled.

NOTE: When the initial onboarding has been conducted - and we have verified that all requirements have been successfully handled - you will be routed back to launch-pad - where your only option is to launch the Zekt management tool.

## Personal vs corporate accounts (github related)

- From a Zekt perspective - there is no difference if a repository is "owned" (placed) below a Github organization, or if it is placed below a personal account. When logging into Zekt - we will make use of your "personal access" already associated with your account - and gain access to onboard repositories as the next step.

- Zekt is associating the billable e-mail address (customer) with specific github repositories that they chose to enable. As such - the SKU counting - will match that of individual accounts. Nothing is restricting "serveral differnt" users from within a company, to each have their own Zekt SKU (repositories) associated with them. 

## Zekt OAuth github app

- When performing your initial onboarding (sign-up) or logging in as existing Zekt (sign-in) - Zekt will use your "github identity". Zekt does not offer its own identity services, rather make use of the federated github identity through our custom OAuth app. This allows us to make use of your personal "access_token" - which is needed when we onboard repoistories to Zekt. Consenting and logging in through the custom Zekt OAuth app is a requirement for the solution to work.
Zekt front-end / backend - support logging in as github accounts - providing support for MFA procedures to increase the security of your identity. Zekt strongly recommend to enable MFA on your Github account.

## Sign-up process

- the sign-up process - is handled within the same logical path inside of the Zekt offering. Once you have authenticated through your Github identity, we will sense if you are an existing or new customer to Zekt. In case you are not a registered Zekt customer, we will guide you to the onboarding path, described previously - where you will have to submit personal contact information, your SKU choice, your persona alternative & billing information. Once you are cleared - ✅ - you will be routed to the launch pad where you can access the Zekt management tool.

<div style="margin-top: 2rem; text-align: left;">
  <a href="#" style="display: inline-flex; align-items: left; gap: 0.5rem; color: #00ff88; text-decoration: none; font-size: 1.1rem;">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z"/>
    </svg>
    <span>Watch the sign-up tutorial video</span>
  </a>
</div>

## Sign-in process

- the sign-in process - Zekt will automatically detect that you are an existing customer, thereby routing you to the management console launch pad - where you move on to perform your duties of setting up Zekt configuration!


<div style="margin-top: 2rem; text-align: left;">
  <a href="#" style="display: inline-flex; align-items: left; gap: 0.5rem; color: #00ff88; text-decoration: none; font-size: 1.1rem;">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z"/>
    </svg>
    <span>Watch the sign-in tutorial video</span>
  </a>
</div>
