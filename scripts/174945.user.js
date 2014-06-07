// ==UserScript==
// @name        Google search modifier
// @namespace   http://localhost:9314
// @include     https://www.google.co.in/search?*
// @version     1
// ==/UserScript==


var allLink  = document.querySelectorAll(".g .rc .r a");
var len = allLink.length,link;
for(var i=0;i<len;i++){
    link = allLink[i];
    link.target="_blank";
    link.removeAttribute("onmousedown")
}