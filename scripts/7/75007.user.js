// ==UserScript==
// @name          I don't like it button for Facebook
// @namespace     http://userscripts.org/users/154922
// @description   An "I don't like it" button for Facebook
// @include       http://*.facebook.com/*
// ==/UserScript==

var allHTMLTags = new Array();
var allHTMLTags=document.getElementsByTagName("*");
for (i=0; i<allHTMLTags.length; i++) {
if (allHTMLTags[i].className=="default_message") {
allHTMLTags[i].innerText="Non mi piace";
}
}