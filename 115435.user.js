// ==UserScript==
// @name          Facebook ticker remover
// @namespace     http://bellesugararts.com/userScripts
// @description	  Removes Facebook ticker
// @author        Alfonso Mingo
// @homepage      http://userscripts.org/scripts/115435
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @match         http*://*.facebook.com/*
// @exclude       http://www.facebook.com/pages/*
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