// ==UserScript==
// @name        Grepolis TTool
// @namespace   TTool
// @description Grepolis TTool
// @include     http://de*.grepolis.com/game/index?login=1&p=*&ts=*
// @version     1.3
// @grant       none
// ==/UserScript==

void(function(){
	var t=document.createElement('script');
	t.type='text/javascript';
	t.innerHTML = 	"   var t=document.createElement('script');\n" +
					"   t.type='text/javascript';\n" +
					"   t.src='http://itc-may.de/tools/grepo/js/ttool.js';\n" +
					"   document.body.appendChild(t);\n";
	document.body.appendChild(t);
})();