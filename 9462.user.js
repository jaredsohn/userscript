// ==UserScript==
// @name           No Experts Exchange
// @namespace      JRice
// @description    We HATES them, Exchange, dirty Expertsses!
// @include        http://www.google.com/*
// ==/UserScript==

var count = 0;
list = document.getElementsByTagName('a');
for (i=0; i<list.length; i++) {
  if (list[i].href.match(/experts-exchange/)) {
    if (list[i].className == "l") {
      list[i].parentNode.parentNode.style.display = 'none';
    }
  }
}
