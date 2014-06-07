// ==UserScript==
// @name           Job Ready Title
// @namespace      Seifer - http://userscripts.org/users/33118
// @include        https://*.jobready.com.au/*
// ==/UserScript==

if(document.getElementById('breadcrumb')) {
	string = document.getElementById('breadcrumb').textContent;
	string = string.replace('Party','');
	string = string.replace('>','');
	document.title = string ;
}