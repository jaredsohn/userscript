// ==UserScript==
// @name           Hackaday Plus
// @namespace      http://userscripts.org/users/111056
// @description    Disables the hackaday comment system.
// @include        http://hackaday.com/*
// ==/UserScript==

var elements = document.getElementsByTagName('*');
for (i = 0; i < elements.length; i++) {
	var tmp = elements.item(i);
	if (tmp.className == "commentlinks" || tmp.className == "commentslink" || tmp.id == "comments" || tmp.id == "respond" || tmp.id == "commentform") {
		tmp.parentNode.removeChild(tmp);
		i--;
	}
}
