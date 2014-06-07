// ==UserScript==
// @name           Bing Images direct links
// @version        1.0
// @include        http://www.bing.com/images/*
// ==/UserScript==

var dlink = document.evaluate('//a[@id="m_fsi"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
window.location.replace(dlink.href);