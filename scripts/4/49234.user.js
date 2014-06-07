// ==UserScript==
// @name           _blank Must Die For Google Apps
// @namespace      http://clement.beffa.org/labs/projects/greasemonkey/
// @description    Removes the target attribute from hyperlinks that open a new browser window in GMail/Docs/Calendar! So you only use one window for all the google apps. Hack from "_blank Must Die"
// @version        1.3b
// @author         Clement Beffa (adapted from Max Kueng)
// @homepage       http://clement.beffa.org/labs/
// @include        *://*.google.com/*
// ==/UserScript==

function kill_blank() {
  var killed = 0;
	var a = window.document.getElementsByTagName("a");
	var regTarget = /^(_blank|blank|_new|new|_neu|neu|_newwin|newwin)$/i;
	for (i=0;i<a.length;i++) {
		if (a[i].target.match(regTarget)) {
      killed++;
			a[i].removeAttribute("target"); 
		}
	}
	if (!killed)
    setTimeout (kill_blank, 2000); 
}
  
(function (){
	kill_blank();
}());
