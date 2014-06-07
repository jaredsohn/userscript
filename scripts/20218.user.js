// Twitter Translate
// version 1
// 2008-1-14
// Copyright (c) 2008, Justin Duewel-Zahniser
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Twitter Translate
// @namespace      http://www.justindz.org
// @description    Includes links for each Twitter web entry to translate using Google Translate.
// @include        https://twitter.com/*
// ==/UserScript==

var message;
var allElements = document.evaluate('//span[@class="entry-title entry-content"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var pairs = ["ja|en", "es|en"];

for (var i = 0; i < allElements.snapshotLength; i++)
{
	message = allElements.snapshotItem(i);
	for (var j = 0; j < pairs.length; j++)
	{
		var link = document.createElement("a");
		link.setAttribute("href", "http://translate.google.com/translate_t?hl=en&ie=UTF8&text=" + message.textContent + "&langpair=" + pairs[j]);
		link.setAttribute("target", "new");
		link.textContent = pairs[j];
		message.parentNode.appendChild(link);
		var spacer = document.createElement("span");
		spacer.textContent = ", ";
		if (j < pairs.length - 1)
		{
			message.parentNode.appendChild(spacer);
		}
	}
}