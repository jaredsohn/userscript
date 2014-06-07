// ==UserScript==
// @name           remove picasaweb ads
// @namespace      http://userscripts.org/users/useridnumber
// @description    remove picasaweb ads
// @include        http://* 
// ==/UserScript==

var lhid = document.getElementById('lhid_searchad');

if(lhid) {
	lhid.parentNode.removeChild(lhid);
}