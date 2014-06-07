// ==UserScript==
// @name           ug - nae adverts
// @namespace      www.urbanglasgow.co.uk
// @include        http://urbanglasgow.co.uk/*.php
// @include        http://www.urbanglasgow.co.uk/*.php*
// @include        http://urbanglasgow.co.uk/*.htm*
// @include        http://www.urbanglasgow.co.uk/*.htm*
// ==/UserScript==

var _scripts = document.getElementsByTagName('script')
for (var i=0; i < _scripts.length; i++) {
   var el = _scripts[i];
	if (el.src=='http://pagead2.googlesyndication.com/pagead/show_ads.js') {
		var f = _scripts[i].nextSibling;
		if (f.nodeName=='SCRIPT') f = f.nextSibling;
		f.style.display='none';
	}
}


