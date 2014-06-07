// ==UserScript==
// @name           I am so tumblar
// @namespace      quanganhdo.tumblr.tumblarity
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/tumblelog/*
// ==/UserScript==

document.evaluate('//ul[@class="tumblelog_controls"]/li[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML = '<a href="/activity">Tumblarity</a>: &#8734;';
