// ==UserScript==
// @name			Feedly HTTPS
// @namespace		http://cloud.feedly.com/
// @description		Switch to HTTPS version feedly.
// @updateURL		https://userscripts.org/scripts/source/179845.meta.js
// @downloadURL		https://userscripts.org/scripts/source/179845.user.js
// @author			me
// @include        http://cloud.feedly.com/*
// @version			2013.10.13
// ==/UserScript==

location.href="https" + location.href.substr(4)