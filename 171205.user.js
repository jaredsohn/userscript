// ==UserScript==
// @name       Disable p2p101 ADs
// @namespace  http://use.i.E.your.homepage/
// @version    0.4
// @downloadURL	https://userscripts.org/scripts/source/171205.user.js
// @updateURL	https://userscripts.org/scripts/source/171205.meta.js
// @description  enter something useful
// @match      http://*.p2p101.com/*
// @copyright  2012+, You
// ==/UserScript==
var adSidebar1 = document.getElementById('ysmAD678_1');
var adSidebar2 = document.getElementById('ysmAD678_2');
var adSidebar3 = document.getElementById('framece5iJ5_left');
var adSidebar4 = document.getElementById('frameQdx6Ip_left');
var adSidebar5 = document.getElementsByClassName("wp a_f")[0];
var adSidebar6 = document.getElementsByClassName("a_pt")[0];

if (adSidebar1) {
	adSidebar1.parentNode.removeChild(adSidebar1);
}
if (adSidebar2) {
	adSidebar2.parentNode.removeChild(adSidebar2);
}
if (adSidebar3) {
	adSidebar3.parentNode.removeChild(adSidebar3);
}
if (adSidebar4) {
	adSidebar4.parentNode.removeChild(adSidebar4);
}
if (adSidebar5) {
	adSidebar5.parentNode.removeChild(adSidebar5);
}
if (adSidebar6) {
	adSidebar6.parentNode.removeChild(adSidebar6);
}