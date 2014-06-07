// ==UserScript==
// @name           ReloadCss
// @author         Smukkekim
// @license        MIT License
// @version        1.0.0.0
// @description    Reload stylesheets on Ctrl+e. Adapted from the ReCss Bookmarklet by David Schontzler (http://david.dojotoolkit.org/recss.html)
// @include        http://*
// @include        https://*
// ==/UserScript==

function reCss(e) {
	var i,
		a,
		s;
	var e 
	var unicode=e.charCode ? e.charCode : e.keyCode
	var actualkey=String.fromCharCode(unicode)
	if ( e.ctrlKey && actualkey=="e" ) {
		a = document.getElementsByTagName('link');
		for (i=0;i<a.length;i++) {
			s = a[i];
			if (s.rel.toLowerCase().indexOf('stylesheet')>=0&&s.href) {
				var h = s.href.replace(/(&|%5C?)forceReload=\d+/,'');
				s.href = h+(h.indexOf('?')>=0?'&':'?')+'forceReload='+(new Date().valueOf());
			}
		}
	}
}

window.addEventListener('keypress', reCss, true);
