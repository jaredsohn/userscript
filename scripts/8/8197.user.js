// ==UserScript==
// @name           Mark Links to New Window
// @namespace	   http://userscripts.org/users/24385/
// @description    Marks links that open in a new window with a small plus sign.
// @include        http://*
// @include	   https://*
// ==/UserScript==

var links=document.getElementsByTagName('a');

for (var i=0; i < links.length; i++) {

    if (links[i].target=="_blank") {

	var linkText=links[i].innerHTML.toLowerCase();

	var img =linkText.match("<img");

	if (img==null) {

	    links[i].innerHTML = links[i].innerHTML + "<sup><small>+</small></sup>";

	}

    }

}