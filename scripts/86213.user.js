// ==UserScript==
// @name           Remove Roseindia from Google results
// @namespace      alanms00
// @description    Roseindia is garbage and provides no useful information.
//                 This script was copied and modified from JRice's "No Experts Exchange"
//                 script.
// @include        http://www.google.com/*
// ==/UserScript==

var count = 0;
list = document.getElementsByTagName('a');
for (i=0; i<list.length; i++) {
  if (list[i].href.match(/roseindia/)) {
    if (list[i].className == "l") {
      list[i].parentNode.parentNode.style.display = 'none';
    }
  }
}
