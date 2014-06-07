// ==UserScript==
// @name           php.manual.lite
// @namespace      http://userscripts.org/users/109263
// @description    allow hide PHP logo in manual page
// @include        http://*php.com/* 
// @include        *php.net/manual/*
// ==/UserScript==
const ID_NAV = 'headnav';

var fn = function(ev){
	var el;
	el = window.document.getElementById(ID_NAV);
	if (el) {
		el.style.display = 'none';
	}
};

window.addEventListener('load', fn, false);
