// ==UserScript==
// @name           Yellow Alizar
// @namespace      http://userscripts.org/users/vanishsevsk
// @description    Make yellow title of alizar's topic
// @include        http://*habrahabr.ru/*
// ==/UserScript==

(function(){
    var hentry = document.querySelectorAll('div.hentry');
	for (var i=0; i<hentry.length; i++){
		if (hentry[i].querySelector("div.vcard span").innerHTML == "alizar") {
			hentry[i].querySelector("a.topic").style.color = "#808000";
		}
	}
})();