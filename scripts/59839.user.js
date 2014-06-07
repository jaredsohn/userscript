// ==UserScript==
// @name           Xinet Return Login
// @namespace      http://userscripts.org/users/104953
// @description    Enables you to press enter and successfully submit the login form
// @include        http://portal.xinet.com/*
// ==/UserScript==

function bootstrap() {
	var oldHTML = document.forms[0].innerHTML;
	document.forms[0].innerHTML = oldHTML + '<input type="submit" name="submit" style="display: none" />';
}

//Hook into Page Load
window.addEventListener("load", bootstrap, false);
