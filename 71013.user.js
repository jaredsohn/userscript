// ==UserScript==
// @name Tracking Pixel Finder
// @namespace http://apps.kitnmedia.com/superrewards/offersdirect.php?h=hzobft.384177729496&amp;uid=134807440&amp;xhd=1233728278&amp;lwh=31228009
// @description Finds tracking pixels in a webpage and highlights them.
// @author Demonlord
// @homepage www.myspace.com/demonlord666000



// ==/UserScript==
(function() {
var css ="@namespace url(http://www.w3.org/1999/xhtml); img[width="1"], img[height="1"] { border:solid 25px green !important; }";
if (typeof GM_addStyle != "undefined") {
GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
addStyle(css);
} else {
var heads = document.getElementsByTagName"head");
if (heads.length &gt; 0) {
var node = document.createElement("style");
node.type = "text/css";

node.appendChild(document.createTextNode(css));
heads[0].appendChild(node);
}
}
})();
