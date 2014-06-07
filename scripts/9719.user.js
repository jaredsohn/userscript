// ==UserScript==
// @name           Cleaner Amazon 
// @namespace      @debmorrissey.google.com
// @description    Gets the useful parts of the page closer to the top, eliminates some useless sections.
// @include        http://*.amazon.com/*
// @include        http://amazon.com/*
// ==/UserScript==

GM_addStyle(".h1 {display: none ;}")
GM_addStyle(".otherEditions {display: none ;}")
GM_addStyle(".fionaPublishTable {display: none ;}")
GM_addStyle(".simsWrapper {display: none ;}")
GM_addStyle(".EBBdivider {display: none ;}")
GM_addStyle(".bucketDivider {display: none ;}")
GM_addStyle(".moreBuyingChoices {display: none ;}")
GM_addStyle(".flashPlayer {display: none ;}")

GM_addStyle("#nonmemberStripe {display: none ;}")
GM_addStyle("#goKindleStaticPopDiv {display: none ;}")
GM_addStyle("#ftMessage {display: none ;}")
GM_addStyle("#specialOffersDiv {display: none ;}")
GM_addStyle("#primaryUsedAndNew {display: none ;}")
GM_addStyle("#secondaryUsedAndNew {display: none ;}")
GM_addStyle("#view-dpv-rich-media {display: none ;}")
GM_addStyle("#quickPromoBucketContent {display: none ;}")
GM_addStyle("#AutoBuyXGetY {display: none ;}")
GM_addStyle("#ManualBuyXGetY {display: none ;}")
GM_addStyle("#productDescription {display: none ;}")
