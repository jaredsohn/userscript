// ==UserScript==
// @name           Google Vancouver Olympics logo fix
// @namespace      Google Vancouver Olympics logo fix
// @description    Google Vancouver Olympics logo fix
// @include        http://www.google.com*
// ==/UserScript==

var allHTMLTags = new Array();

var allHTMLTags=document.getElementsByTagName("div");
for (i=0; i<allHTMLTags.length; i++) {
if (allHTMLTags[i].style.background='url("/logos/olympics10-bg.jpg")') {
allHTMLTags[i].style.background='none';
}
}