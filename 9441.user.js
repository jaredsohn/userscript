// ==UserScript==
// @name           Digg Nagger Removal
// @namespace      http://userstyles.org
// @include        http://*digg.com/*
// ==/UserScript==

// footer and copyright
GM_addStyle("#footer { display: none !important; }");
GM_addStyle("div[class^=copyright] { display: none !important; }");

// invitation nagger
GM_addStyle("#announce-invite { display: none !important; }");

// add friends nagger
GM_addStyle("p[class^=first], p[class^=join] { display: none !important; }");

// nagger headers
GM_addStyle("h2 { display: none !important; }");

// featured video
GM_addStyle(".feature-link { display: none !important; }");

// sponsors
GM_addStyle("#wss_PhotobucketPlacement_Logo { display: none !important; }");