// ==UserScript==
// @name           TVCatchup Improvements
// @namespace      http://userscript.org/user/citricsquid
// @description    Fullscreens the Flash player for multi screen support, because Flash fullscreen doesn't work with multiple monitors.
// @include        http://*tvcatchup.com/*
// @include        https://*tvcatchup.com/*
// ==/UserScript==

var header = document.getElementById('header');
var player = document.getElementById('TVCatchupWebPlayer');
player.width = window.innerWidth;
player.height = window.innerWidth / 16 * 9;
var playerInfo = player.parentNode.innerHTML;
var footer = document.getElementById('footer').innerHTML = '';

var tvc = document.getElementById('tvcatchup');
tvc.innerHTML = playerInfo;