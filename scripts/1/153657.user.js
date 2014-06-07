// ==UserScript==
// @name           YouTube Center Shit
// @namespace      youtube.com
// @include 	   *youtube.com*
// @description    Center align youtube
// @version        1.0
// ==/UserScript==

var els = [].slice.apply(document.getElementsByClassName('site-left-aligned'));
for (var i = 0; i < els.length; i++) {
    els[i].className = els[i].className.replace(/ *\bsite-left-aligned\b/g, " ");
}