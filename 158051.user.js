// ==UserScript==
// @name        Torrentz.eu - Links In Same Window
// @namespace   http://userscripts.org/users/23652
// @description Makes torrent links open in same tab
// @include     http://torrentz.eu/*
// @include     https://torrentz.eu/*
// @copyright   JoeSimmons
// @version     1.0.0
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     http://usocheckup.redirectme.net/158051.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

window.addEventListener("load", function(e) {

	var links = document.evaluate("//a[@target]", document, null, 6, null);

	for(var i=0; i < links.snapshotLength; i++) {
		links.snapshotItem(i).removeAttribute("target");
	}

}, false);