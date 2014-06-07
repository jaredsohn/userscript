// ==UserScript==
// @name Remove Who to Follow (Twitter)
// @description Removes the "Who to follow box" on Twitter.
// @copyright Is copyleft by Thomas Pfeiffer http://webevangelisten.de
// @match http://twitter.com/*
// @match http://*.twitter.com/*
// @match https://*.twitter.com/*
// @match https://twitter.com/*
// @include http://twitter.com/*
// ==/UserScript==
var e = document.getElementById("recommended_users");
e.parentNode.removeChild(e);
document.getElementById("primary_nav").style.marginTop="20px";