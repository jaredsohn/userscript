// ==UserScript==
// @name           No More Experts Exchange
// @namespace      http://moblog.bradleyit.com
// @description    Removes Experts Exchange links from Google search results
// @include        http*://*google.*/search?*
// ==/UserScript==

function yeargh() { // yeargh matey! prepare to be boarded by my javascript!!!
 var cites = document.getElementsByTagName("CITE");
 for (var c in cites) {
  if (cites[c].innerHTML.match(/experts-exchange/)) {
   var hideMe = '<div style="display:none;">'+cites[c].parentNode.parentNode.innerHTML+'</div>';
   var showMe = '<span style="background:gray;font-size:1.5em;font-family:monospace;">EXPERT\'S EXCHANGE BLOCKED!</span>';
   cites[c].parentNode.parentNode.innerHTML = hideMe+showMe;
  }
 } 
}

window.addEventListener('load',yeargh,true);