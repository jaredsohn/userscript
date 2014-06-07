// ==UserScript==
// @name          Facebook ticker remover
// @description	  Removes Facebook ticker
// @run-at        document-start
// @author        Alfonso Mingo
// @include       http://apps.facebook.com/inthemafia/*
// @include       https://apps.facebook.com/*
// @exclude       http://www.facebook.com/pages/*
// @homepage      http://userscripts.org/scripts/show/121390
// @version       1.0.3
// @date          October 16th, 2011
// ==/UserScript==

function killAnnoyance() {
  var rCol = null;
  if (rCol = document.getElementById('rightCol')) {
    rCol.parentNode.removeChild(rCol);
  }
  if (document.addEventListener) {
    document.addEventListener("DOMNodeInserted", killAnnoyance, false);
  }
}
window.onload = killAnnoyance();