// ==UserScript==
// @name          Youtube Logo Subscriptions
// @namespace     http://nmgod.com
// @description   Changes youtube logo link to subscriptions feed
// @include       *.youtube.com*
// @copyright     NMGod
// ==/UserScript==

document.getElementById("logo-container").href = "/feed/subscriptions";