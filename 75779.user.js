// ==UserScript==
// @name           Scratchworxx strip-down
// @namespace      http://tos.network.in.rs/greasemonkey/scratchworxx
// @include        http://www.skratchworx.com/*
// ==/UserScript==

function removeElement(divNum) {
  var olddiv = (typeof(divNum)!='string')?divnum:document.getElementById(divNum);
  olddiv.parentNode.removeChild(olddiv);
}

removeElement('apDiv1'); // top top banner
removeElement('apDiv2'); // content top banner
removeElement('apDiv3'); // right crap
removeElement('apDiv5'); // top title logo
removeElement('apDiv6'); // left menu and flickr
var removeme = document.getElementById('apDiv4').firstChild.nextSibling; // top content menu
removeme.parentNode.removeChild(removeme);
document.getElementById('apDiv4').style.top = '10px';