---
title: Zekt apps
description: Zekt - overview of our Github apps
---

For Zekt - to be able to handle and perform the automation & orchestration capabilities on top of your Github, we need the functionality of our own custom Zekt Github Apps.
The Github Apps - allow integration services, such as Zekt - to provide additional capabilities & functionality on-top of the natively provided services of Github. As a customer of (both) Github & Zekt - you are in charge! You must consent to the usage of our custom Zekt apps. They provide the necessary permissions for us, to enable the Zekt services. The customer, can at any given time - go into their repositories that they are in charge of, and remove the access of the Zekt apps. This would effectively remove the capability of Zekt to interact with you repository (or repositories).

There are 3 Zekt custom Github Apps - that will elaborated upon below! These are:

- Zekt OAuth app (Zekt Website Authentication)
- Zekt Provider app (zekt-provider-app)
- Zekt Consumer app (zekt-consumer-app)

## Zekt OAuth app

The Zekt OAuth app, allows Zekt - to obtain the "access_token" of the user who is logging in to Zekt. Zekt need the personal access_token in order to impersonate the user and validate which repositories the user has access to. As such - the user needs to login using our custom OAuth app, in order to proceed! The zekt authentication UI looks as follows:

![Zekt App Logo](../../../assets/zekt-oauth-login.png)

The OAuth app / Zekt supports MFA handling, redirects and callbacks! Zekt strongly recommends its members to activate MFA options inside of Github on their personal profile to protect access to repositories and code - thereby improving security posture dramatically!
