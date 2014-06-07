// ==UserScript==
// @name GSer
// @namespace shoecream, King Bill, ThaGamer2
// @description Adds the (gs) suffix to NUEsers usernames.
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
if (uid > 22722) {
addAfter(ii, ' (gs)\u2077');
}
else if (uid > 22682) {
addAfter(ii, ' (gs)\u2076');
}
else if (uid > 21289) {
addAfter(ii, ' (gs)\u2075');
}
else if (uid > 20176) {
addAfter(ii, ' (gs)\u2074');
}
else if (uid > 15258) {
addAfter(ii, ' (gs)\u00B3');
}
else if (uid > 13498) {
addAfter(ii, ' (gs)\u00B2');
}
else if (uid > 10088) {
addAfter(ii, ' (gs)');
}
});