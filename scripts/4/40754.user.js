// ==UserScript==
// @name           Marquee to DIV
// @namespace      http://jobson.us/
// @description    Converts marquee tags to div tags.
// @include        *
// ==/UserScript==

var m = document.getElementsByTagName('marquee');
while (m.length>0) {
	var p = document.createElement('div');
	p.innerHTML = m[0].innerHTML;
	p.setAttribute('style', 'width: 100%; clear: both;');
	m[0].parentNode.insertBefore(p,m[0]);
	m[0].parentNode.removeChild(m[0]);
}
