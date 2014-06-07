// ==UserScript==
// @name           UserScripts.org Redirect
// @namespace      http://www.latinsud.com
// @include        http://userscripts.org/login#gohomescripts
// @match          http://userscripts.org/login
// @version        1.0.1
// ==/UserScript==


if (location.href=="http://userscripts.org/login#gohomescripts") {
	for (i=0; i<document.forms.length; i++) {
		f=document.forms[i];
		if (f.action=="http://userscripts.org/sessions" && f.method=="post") {
			f.action="http://userscripts.org/sessions?redirect=/home/scripts";
		}
	}
}
