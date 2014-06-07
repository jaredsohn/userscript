// ==UserScript==
// @name gs
// @namespace idk
// @include *endoftheinter.net*
// ==/UserScript==
[].forEach.call(document.getElementsByTagName('a'), function(ii) {
var uid = (/profile\.php.*?user=([0-9]*)/.exec(ii.href) || []).pop();
if (uid > 20176)
ii.innerHTML += ' (gs))\u2074';
else if (uid > 15258)
ii.innerHTML += ' (gs)³';
else if (uid > 13498)
ii.innerHTML += ' (gs)²';
else if (uid > 10088)
ii.innerHTML += ' (gs)';
});