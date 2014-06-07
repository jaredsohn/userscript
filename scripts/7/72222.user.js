// ==UserScript==
// @name           HideMyAss less header
// @author         Timendum
// @description    Shrink the oversized Hide my ass header
// @namespace      timendum-hidemh-header
// @include        http://*.hidemyass.com/index.php?q=*
// @version        0.99
// ==/UserScript==

var header = document.getElementById('outercontainer');
if (header) {
	header.style.height = '40px';
	header.style.overflow = 'hidden';
	var urlbar = document.getElementById('hmaurlbar2');
	if (urlbar) {
		header.scrollTop = urlbar.offsetTop;
	}
}