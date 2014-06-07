// ==UserScript==
// @name           Digg Betterizer (by Oren Weiss)
// @namespace      http://orenweiss.com
// @description    Betterizes Digg to be as it should
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// @author         Oren Weiss
// @copyright      Copyright (c) 2012 Oren Weiss
// @license        The MIT License, http://www.opensource.org/licenses/mit-license.html
// @created        2012-03-05
// @revised        2012-04-05 by Harry Groover
// @version        0.1.8.2
// ==/UserScript==


(function() {
    var match = /(news|newsbar)\/(topnews|business|entertainment|gaming|lifestyle|offbeat|offthebeat|politics|science|sports|technology|world_news|worldnews|facebook|pictures)\/(?!media)/i;
    var links = document.evaluate("//a[contains(@href, 'news')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < links.snapshotLength; i++)
    {
        var thisLink = links.snapshotItem(i);
        if (thisLink.href.match(match) && !thisLink.innerHTML.match(/(\scomments?)|(digg\sit)|(>\d+<)/i)) {
            thisLink.href = thisLink.href.replace(match, 'story/r/');
            thisLink.target = '_self';
        }
        thisLink.removeAttribute('rel');
    }
    document.addEventListener('DOMSubtreeModified', setTimeout(arguments.callee, 225), false);
} (document));