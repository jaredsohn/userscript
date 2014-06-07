// YandexClckKiller v0.1beta3
// 2010-06-09
// Copyright (c) 2009 Nikita Kovaliov
// http://dev.maizy.ru
// Released under the GPLv3 license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           YandexClckKiller
// @namespace      http://userscripts.org/users/62694
// @description    Yandex search (yandex.ru) by default add link to http://clck.yandex.ru/* instead of straight link. That's script fix it.
// @include        http://yandex.ru/*
// @include        http://www.yandex.ru/*
// ==/UserScript==

(function () {
	var doc = document.wrappedJSObject || document;
	var xpathRes = doc.evaluate("//a[@class='agp']",
								 doc, 
								 null, 
								 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
								 null, 
								 null);
	//unsafeWindow.console.debug(xpathRes);
	if (xpathRes && xpathRes.snapshotLength > 0) {
		var el;
		var dummy = function() { return false; };
		
		for (var i=0; i<xpathRes.snapshotLength; i++ )
		{
			el = xpathRes.snapshotItem(i);
			//unsafeWindow.console.debug(el);
			el.onmousedown = dummy;
		}
	}
})();