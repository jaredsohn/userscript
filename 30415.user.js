// ==UserScript==
// @name           Market Place Refresher
// @namespace      http://userscripts.org/users/60379
// @include        http://*.ikariam.*/*
// ==/UserScript==
if(document.getElementsByName('searchResource').length > 0) {
	my_click_handler = function() {
		this.parentNode.parentNode.parentNode.parentNode.submit();
	}
	document.getElementsByName('searchResource')[0].addEventListener('change', my_click_handler, true);
}
