// ==UserScript==
// @name           Gmail Switch Not Spam and Delete Forever Buttons
// @namespace      none
// @description    Switch the "Not Spam" and "Delete Forever" buttons in Gmail's Spam Folder and Spam View pages
// @include        http*://mail.google.com/*
// ==/UserScript==

if (window.document.location.href.match(/search=(spam)/)) {

var newbuttons = document.createElement("div");
newbuttons.innerHTML = '<div id="tbcb"><button id="ac_us" class="ab" type="button">Not Spam</button><button id="ac_dl" class="ab" type="button">Delete Forever</button></div>';

var divs = document.getElementsByTagName("div");
for (i=0; i < divs.length; i++) {
 if (divs[i].className.indexOf("tbcb") == 0 ) {
  divs[i].innerHTML = newbuttons.innerHTML;
 }
}
}
