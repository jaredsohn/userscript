// ==UserScript==
// @name           Hide Twitter Recommended Users
// @namespace      hk.ignition.gm.twitter.recommended
// @description    Hide recommended users from twitter
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var recommended = document.getElementById("recommended_users")
if (recommended) recommended.style.display = "none";