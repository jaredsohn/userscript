// ==UserScript==
// @name ocfn
// @namespace ocfn
// @description ocfn
// @include http://*.endoftheinter.net*
// @include http://endoftheinter.net*
// @include https://*.endoftheinter.net*
// @include https://endoftheinter.net*
// ==/UserScript==

function addAfter (anchor, text) {
var node = document.createTextNode(text);
anchor.parentNode.insertBefore(node, anchor.nextSibling);
}

[].forEach.call(document.getElementsByTagName('a'), function(ii) {
var uid = (/profile\.php.*?user=(\d+)/.exec(ii.href) || []).pop();
if (uid > 20176) {
addAfter(ii, ' (ocfgn)');
}
else if (uid > 15258) {
addAfter(ii, ' (ocfun)');
}
else if (uid > 13498) {
addAfter(ii, ' (ocftn)');
}
else if (uid > 10088) {
addAfter(ii, ' (ocfn)');
}
});