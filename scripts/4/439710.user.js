// ==UserScript==
// @name       Headdit Toolbox fix
// @namespace  http://www.reddit.com/user/LowSociety
// @version    0.2
// @description  Headdit Toolbox fix
// @match      *://*.reddit.com/*
// @copyright  2012+, You
// @grant       none
// ==/UserScript==

window.onload = function() {
if (document.body) {
document.getElementById("headdit-box").style.bottom = "25px";
}
}