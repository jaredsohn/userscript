// ==UserScript==
// @name          Air Deccan Fixes
// @namespace     http://nandz.blogspot.com/
// @description   Fixes the Air Deccan website to work with Firefox - by Saurabh Nanda (http://nandz.blogspot.com)
// @include       *airdeccan.net*
// ==/UserScript==

var t=document.getElementsByName('cmb_originCity');
var extra_select=t[1];
extra_select.parentNode.removeChild(extra_select);

