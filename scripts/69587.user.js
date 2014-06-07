// ==UserScript==
// @name           Remove Small Nu.nl Ad
// @namespace      http://www.jeanmark.com/robert
// @description    Removes a small ad in the sidebar on nu.nl
// @version        1.0
// @include        *nu.nl*
// ==/UserScript==

var evilBlock=document.getElementById('adblocksmall');
var parent=evilBlock.parentNode;
var removeAd=function(){
  evilBlock.style.display='none';
  evilBlock.style.visibility='hidden';
  parent.removeChild('evilBlock');
}
parent.addEventListener("DOMSubtreeModified", removeAd, true);
removeAd();