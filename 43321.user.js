// ==UserScript==
// @name           Blink to SPAN
// @namespace      http://jobson.us/
// @description    Converts BLINK tags to SPAN tags.
// @include        *
// ==/UserScript==

var m = document.getElementsByTagName('blink');
while (m.length>0) {
	var p = document.createElement('span');
	p.innerHTML = m[0].innerHTML;
	p.setAttribute('style', 'width: 100%; clear: both;');
	m[0].parentNode.insertBefore(p,m[0]);
	m[0].parentNode.removeChild(m[0]);
}
