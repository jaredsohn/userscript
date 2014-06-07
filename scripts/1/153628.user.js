// ==UserScript==
// @name		YouTube Subscription Shortcut
// @namespace	www.rsbnet.eu
// @description	Changes the YouTube logo to go to the subscriptions feed.
// @include		http://*.youtube.com/*
// @include		https://*.youtube.com/*
// @version		1.0
// ==/UserScript==

document.getElementById("logo-container").setAttribute("href","/feed/subscriptions/u")