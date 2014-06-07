// ==UserScript==
// @name           Remove Maximum Length, Enable All Buttons and More
// @namespace      http://userscripts.org/scripts/show/32261
// @include        *
// @version        0.2
// ==/UserScript==
var $=document.getElementsByTagName("*"), $_;
for(var _=$.length-1 ; _>=0; --_) {
	$_=$[_];
	$_.removeAttribute("maxlength");
	$_.removeAttribute("disabled");
	$_.removeAttribute("readonly");
}