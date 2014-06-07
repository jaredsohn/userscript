// ==UserScript==
// @name           Un-UTM from feedburner
// @namespace      http://google.com
// @description    -
// @include        *
// ==/UserScript==

var loc = window.location.toString();
if(loc.indexOf('utm_source=feedburner')!==-1){
	window.location = loc.replace(/\?utm_source.*/,'');
}
