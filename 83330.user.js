// ==UserScript==
// @name Remove Who to Follow-Similar-Recommended Out (Twitter)
// @description Removes the "Who to follow,Similar follows and Recommended similar users all in One" on Twitter.
// @copyright Is copyleft by Ricardo Neira http://reneira.com
// @match http://twitter.com/*
// @match http://*.twitter.com/*
// @match https://*.twitter.com/*
// @match https://twitter.com/*
// @include http://twitter.com/*
// ==/UserScript==
var e = document.getElementById("recommended_users");
e.parentNode.removeChild(e);
var x = document.getElementById("recommended-similar-users");
x.parentNode.removeChild(x);
var y = document.getElementById("similar_to_followed");
y.parentNode.removeChild(y);

document.getElementById("primary_nav").style.marginTop="20px";