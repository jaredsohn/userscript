// ==UserScript==
// @name Plug.dj Auto-Woot
// @description This script auto woots every 5 seconds on Plug.dj
// @downloadURL https://userscripts.org/scripts/source/182772.user.js
// @include http://www.plug.dj/*
// @include https://www.plug.dj/*
// @version 1.0
// ==/UserScript==//
window.setInterval(function(){ $("#woot").click(); },5000);