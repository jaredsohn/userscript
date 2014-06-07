// ==UserScript==
// @name shereno selection enabler
// @description enables text selection on shereno
// @include http://www.shereno.com/*
// ==/UserScript==
var all = document.getElementsByTagName('*');
for each(var e in all) {
 e.style.MozUserSelect="text";
  e.style.cursor = "text";
}