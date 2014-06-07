// ==UserScript==
// @name           No Who to Follow
// @namespace      http://userscripts.org/users/67390/
// @description    Hide the Who to Follow section on Twitter
// @include        http://twitter.com/*
// ==/UserScript==


var who = document.getElementById('recommended_users');

if (who) who.parentNode.removeChild(who);