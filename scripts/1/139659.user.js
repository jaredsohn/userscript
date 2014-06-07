// ==UserScript==
// @name        Emuparadise Direct External Links
// @namespace   somini
// @description Replaces the external link's text area with a link
// @include     http://www.emuparadise.me/*/*/*
// @version     1.1
// ==/UserScript==

//Comment the next 4 lines to disable redirection.
var l = new RegExp(".*_ROMs/.*/[0-9]*$");
if (l.test(window.location.href)) {
	window.location.replace(window.location.href+"-download");
}

var txtareas = document.getElementsByClassName("mu-ml");
while (txtareas.length) {
	a = txtareas[0];
	a.outerHTML = '<a href="'+a.innerHTML+'"><font style="font-size: 16px;color:orange;text-decoration:underline;" face="Verdana">'+a.innerHTML+'</font></a>';
}