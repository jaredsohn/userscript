
// ==UserScript==
// @name Bring back the Septagon - CSS
// @description Changes the community forum banner
// @include http://*www.bungie.net*
// @include http://*halo3.org*
// ==/UserScript==

(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); div.block-a img.HeaderTheSeptagonForumId {background-image: url(http://i442.photobucket.com/albums/qq144/Wolverfrog/Septa gontest.jpg) !important ; background-repeat: no-repeat !important ;margin: 0 !important ; padding: 0 !important ; }";
if (typeof GM_addStyle != "undefined") {
GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
addStyle(css);
} else {
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
var node = document.createElement("style");
node.type = "text/css";
node.appendChild(document.createTextNode(css));
heads[0].appendChild(node);
}
}
})();