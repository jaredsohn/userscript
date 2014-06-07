// ==UserScript==
// @name           Shush The Monkey
// @namespace      http://userscripts.org/Shush_The_Monkey
// @description    Please, stop helping me
// @include        https://*.mailchimp.com/*
// @include        http://*.mailchimp.com/*
// ==/UserScript==

function Shush_The_Monkey() {

	var classToRemove="field-help";

	var xp=document.evaluate("//*[contains(@class, '"+classToRemove+"')]",document,null,6,null);
	for(var i=xp.snapshotLength-1;i>=0;--i) {
		var cur=xp.snapshotItem(i);
		cur.parentNode.removeChild(cur);
	}
}

document.addEventListener("DOMNodeInserted", Shush_The_Monkey, true);


