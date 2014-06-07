// ==UserScript==
// @name           Public Address In Reply To
// @namespace      ensmartle.me
// @description    Doesn't reload page for in-reply-to links on same page
// @include        http://publicaddress.net/*
// @version 0.1
// ==/UserScript==

var w3c = document.addEventListener;

function handleClick(e) {
  var hash,
    target = e.target || e.srcElement;
  if (target && target.tagName === 'A' && target.className.match(/reply-to/)) {
    hash = (target.attributes['href'].value || '').split('#')[1];
    if (hash && document.getElementById(hash)) {
      window.location.hash = hash;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    }
  }
}


document[w3c ? 'addEventListener' : 'attachEvent'](w3c ? 'click' : 'onclick', handleClick, false);
