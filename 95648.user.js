// ==UserScript==
// @name           Add titles for My Uploads page on iStockPhoto
// @namespace      Krzysztof Paluchowski
// @include        http://www.istockphoto.com/my_uploads.php*
// @ver            1.1
// ==/UserScript==

function setaudiotitles() {
var links = document.getElementsByTagName("a");
var patternMatch = /btn__fcu/gi;
for(i=0;i<links.length;i++) {
if (links[i].id.match(patternMatch)) { 
links[i].innerHTML = links[i].innerHTML+" "+links[i].title.substring(0,30);
if (links[i].title.length>30) {links[i].innerHTML=links[i].innerHTML+"..."};
}
}

}

setaudiotitles();