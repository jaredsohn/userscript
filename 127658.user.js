// ==UserScript==
// @name           Digg Betterizer
// @namespace      http://orenweiss.com
// @description    Betterizes Digg to be as it should
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// @author         Oren Weiss
// @copyright      Copyright (c) 2012 Oren Weiss
// @license        The MIT License, http://www.opensource.org/licenses/mit-license.html
// @created        2012-03-05
// @revised        2012-06-05
// @version        0.1.7
// ==/UserScript==


(function() {
    var match = /(news|newsbar)\/(topnews|business|entertainment|gaming|lifestyle|offbeat|politics|science|sports|technology|world_news)\/(?!media)/i;
	document.addEventListener('DOMNodeInserted', function() {setTimeout(searchAndReplace, 225)}, false);
	
	function searchAndReplace() {
		var links = document.evaluate("//a[contains(@href, 'news')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i = 0; i < links.snapshotLength; i++)
		{
			var thisLink = links.snapshotItem(i);
			if (thisLink.href.match(match) && !thisLink.innerHTML.match(/(\scomments?)|(digg\sit)|(>\d+<)/i)) {
				thisLink.href = thisLink.href.replace(match, 'story/r/');
				thisLink.target = '_blank'
			}
			thisLink.removeAttribute('rel');
		}
	}
} (document));