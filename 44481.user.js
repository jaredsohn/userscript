// ==UserScript==
// @name           antonizzatore
// @namespace      http://userscripts.org/users/83987
// @description    antonizza il testo
// @include        *
// ==/UserScript==
for(var _x = 0;_x < document.getElementsByTagName("p").length; _x++){
	document.getElementsByTagName("p")[_x].innerHTML = document.getElementsByTagName("p")[_x].innerHTML.replace(/,/g,"...");
}
for(var _x = 0;_x < document.getElementsByTagName("span").length; _x++){
	document.getElementsByTagName("span")[_x].innerHTML = document.getElementsByTagName("span")[_x].innerHTML.replace(/,/g,"...");
}
