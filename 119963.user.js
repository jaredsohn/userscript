// ==UserScript==
// @name           Facebook Header Unfloat
// @namespace      happinessiseasy
// @description    Makes the FB Header scroll away when scrolling down the page
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

document.getElementById("blueBar").style.setProperty("position", "absolute", "important");