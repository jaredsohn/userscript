// ==UserScript==
// @name           Expand Google search results url
// @namespace      http://userscripts.org/users/666f6f
// @include        http://www.google.com/*
// ==/UserScript==

(function() {
	var elms = document.getElementsByClassName('g'); for (var i=0;i<elms.length;i++) elms[i].getElementsByTagName('cite')[0].innerHTML = elms[i].getElementsByTagName('a')[0].href;
})()