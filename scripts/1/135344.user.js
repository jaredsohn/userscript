// ==UserScript==
// @name           Digg Apathizer
// @namespace      http://orenweiss.com
// @description    Digg filter for the apathetic
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// @author         Oren Weiss
// @copyright      Copyright (c) 2012 Oren Weiss
// @license        The MIT License, http://www.opensource.org/licenses/mit-license.html
// @created        2012-06-05
// @revised        2012-06-05
// @version        0.1.0
// ==/UserScript==


(function() {
    var links = document.evaluate("//a[contains(@class, 'newsroom-')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var re = /politics|election|president/gi;
	for (var i = 0; i < links.snapshotLength; i++)
    {
        var link = links.snapshotItem(i);
		if(link.href.match(re)) {
			console.log(link.parentNode.parentNode.parentNode.parentNode.parentNode);
			link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
		}
    }
} (document));