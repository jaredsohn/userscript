// ==UserScript==
// @name           StudiVZ / schuelervz Logout in linker Navi
// @description    Erstellt ein Logout-Link in der linken Navigation, damit man nicht wieder hochscrollen muss, benötigt  SVZ Sidebar
// @include        http://www.studivz.net/*
// @include        http://www.schuelervz.net/*
// ==/UserScript==
//
// ChangeLog
// v0.1 first release
//

(function() {
	var li_tag = document.createElement("li");
	var a_tag = document.createElement("a");
	a_tag.setAttribute('href', '/Logout');
	var logout_text = document.createTextNode("Raus hier");
	a_tag.appendChild(logout_text);
	li_tag.appendChild(a_tag);
	document.getElementsByTagName('li')[7].parentNode.appendChild(li_tag);
}
)();