// ==UserScript==
// @id             twitter_nav_bg_remover@phob.net
// @name           Twitter Navigation Background Remover
// @version        0.12
// @namespace      phob.net
// @author         wn
// @description    Remove the Twitter navigation bar's background 
// @include        https://twitter.com/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/282773.meta.js
// ==/UserScript==

var n = document.querySelector("div.global-nav-inner");
if (n) n.style.background = "none";
