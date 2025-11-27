---
title: Zekt - Configuration Architecture
description: High level data models
---

This article is for documentation / mapping purposes for internal engineering community. It describes the relation data models used by Zekt internally. It will outline which data models are used / for what purposes and how they relate to each other.


Table:          customer-config
Intent:         controls / governs aspects of customer configuration
isIsolated:     true
Related:        customer-contacts / customer-profiles
Description:    typical customer configuration items would be such as SKU options and so forth

Table:          customer-contacts
Intent:         keeps customer details
isIsolated:     true
Related:        customer-config / customer-profiles
Description:    typical configuration items such as address, phone, country, ..

Table:          customer-profiles
Intent:         
isIsolated:     true
Related:        customer-contacts / customer-config
Description:    

Table:          provider-consumer-mappings
Intent:         relational data between which providers maps to which consumers - 1-to-many
isIsolated:     true
Related:        provider-repositories
Description:    

Table:          provider-directory
Intent:         relational data between which providers have listed their offerings in Zekt directory
isIsolated:     true
Related:        provider-consumer-mappings / provider-repositories - 1-to-many
Description:    controles which provider repositories / workflows - are listed in the Zekt directory

Table:          provider-repositories
Intent:         relational data between which providers enabled Zekt repositories
isIsolated:     true
Related:        provider-consumer-mappings / provider-directory - 1-to-many
Description:    controles which provider repositories that are Zekt enabled

Table:          service-descriptions
Intent:         relational data between which Zekt repository that is mapped to which description (external)
isIsolated:     true
Related:        provider-consumer-mappings / provider-directory / provider-repository - 1-to-many
Description:    controles which provider repositories are having which descriptions

Table:          consent-audit-log
Intent:         future use. not used as of now.
Description:    will contain, who did what, when - log mechanism data model

## - API to data-models

A certain subset of the Zekt backend API's are tied to each data model represented. There are strict declarative models reference tied to the data-models, which are enforced on the API layers. We strive to cookie-cutter API's internally - with no (or minimal) overlapp, of which API is tied to certain functionality & responsibility. 