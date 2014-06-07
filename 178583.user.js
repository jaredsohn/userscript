// ==UserScript==
// @name           ASB Fastnet Fixer
// @include        https://fnc.asbbank.co.nz/*
// @version        0.1
// ==/UserScript==

var doc = window.top.document;

// Remove (adjust limit) link next to credit card accounts
var adjustLimitElement = doc.querySelectorAll('a[urchinname="AdjustLimitBalancesLink"]')[0];
adjustLimitElement.parentNode.removeChild(adjustLimitElement);

// Remove distracting banner above balances
var bannerElement = doc.querySelectorAll('div[id*="Balances_top_right"]')[0];
bannerElement.parentNode.removeChild(bannerElement);