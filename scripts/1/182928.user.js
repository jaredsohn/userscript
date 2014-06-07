// ==UserScript==
// @name Foobies Link Redirect Remover
// @namespace http://Xenolith0.net/
// @description Links directly to foobies article
// @include http://foobies.com/*
// @include http://*.foobies.com/
// ==/UserScript==

(function ()
{
a = document.evaluate('//a[contains(@href, \'goto\')]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var j=0; j<a.snapshotLength; j++)
{
link = a.snapshotItem(j);
link.href = unescape(link.href.replace(/http:\/\/(www\.)?foobies\.com\/goto\/([0-9]+)\//gi, ''));
}
})();