// ==UserScript==
// @name          Facebook Wide - Dark Glass FullHD+
// @icon        http://i.imgur.com/MRxmcuS.png
// @version	2013.10.28
// @namespace     http://userstyles.org
// @description	  replaces low res pics with a higher res ones
// @author        BskyB
// @homepage      http://userstyles.org/styles/92524
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @require    http://usocheckup.dune.net/177039.js
// @downloadURL		https://userscripts.org/scripts/source/177039.user.js
// @updateURL		https://userscripts.org/scripts/source/177039.meta.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==
function resize() {

	var items = document.evaluate("//img[contains(@src, 'photos')]", document, null, 6, null),
		regex = /\w\d{2,4}x\d{2,4}\/|\w\d.\d{2,4}.\d{2,4}.\d{2,4}\//;

	for(var i=0, item, s; (item=items.snapshotItem(i)); i++) {
		if(regex.test((s = item.src))) item.setAttribute("src", s.replace(regex, ""));
	}

}

resize();
window.addEventListener("DOMNodeInserted", resize, false);