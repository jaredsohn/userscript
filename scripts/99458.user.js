// ==UserScript==
// @name           Shacknews Auto Focus Disabler
// @namespace      http://www.shacknews.com
// @description    Temporarily disables the search box to prevent later scripts from snapping focus to it
// @include        http://*.shacknews.com/*
// ==/UserScript==

var sb = document.getElementById("searchbox");
sb.disabled = true;

setTimeout(function() { sb.disabled = false; }, 2000);
