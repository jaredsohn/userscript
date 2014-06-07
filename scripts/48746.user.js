// ==UserScript==
// @name           I am not tumblar
// @namespace      quanganhdo.tumblr.hidetumblarity
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/tumblelog/*
// ==/UserScript==

document.evaluate('//ul[@class="tumblelog_controls"]/li[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.display = 'none';

