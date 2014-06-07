// ==UserScript==
// @name           _blank Must Die
// @namespace      http://maxkueng.com/gmscripts
// @description    Removes the target attribute from hyperlinks that open a new browser window
// @version        1.3
// @author         Max Kueng
// @homepage       http://maxkueng.com/
// @include        *
// ==/UserScript==

(function (){
	
	var a = window.document.getElementsByTagName("a");
	var regTarget = /^(_blank|blank|_new|new|_neu|neu|_newwin|newwin)$/i;
	for (i=0;i<a.length;i++) {
		if (a[i].target.match(regTarget)) {
			a[i].removeAttribute("target"); 
		}
	}

}());
