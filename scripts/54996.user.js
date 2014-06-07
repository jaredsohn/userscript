// ==UserScript==
// @name           BasilMenu
// @namespace      http://userscripts.org/users/102357
// @description    Adds a delay to the basilmarket menu
// @include        http://www.basilmarket.com/*
// ==/UserScript==

(function() {
	var wait = 250; //how long to wait, in milliseconds (1000 milliseconds = 1 second)
	for(var i=1; i<=7; i++) {
		ele = document.getElementById('m'+i);
		ele.setAttribute('onmouseover', 'timer'+i+' = setTimeout("mtog('+i+')", '+wait+');');
		ele.setAttribute('onmouseout', 'clearTimeout(timer'+i+');');
	}
})();