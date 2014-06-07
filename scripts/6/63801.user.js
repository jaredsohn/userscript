// ==UserScript==
// @name           Linux Today Direct Article
// @description    Redirects news items featured on Linux Today to the original article automatically
// @author         Andrew Martin
// @namespace      http://www.andrewm.info
// @match          http://*.linuxtoday.com/*
// @version        1.0
// ==/UserScript==

(function() {		var l = document.getElementsByTagName("a");
		var i = 0;
		for (i = 0; i < l.length; i++) {
		        if (l[i].innerHTML == "Complete Story") {
		                document.location.href = l[i].href;
		        }
		}})();
