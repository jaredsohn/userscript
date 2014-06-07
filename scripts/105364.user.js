// ==UserScript==
// @name           Yellow Topic Alizar
// @description    Make yellow title of alizar's topic
// @include        http://*habrahabr.ru/*
// ==/UserScript==

(function(){
    var hentry = document.querySelectorAll('div.hentry');
	for (var i=0; i<hentry.length; i++){
		if (hentry[i].querySelector("div.vcard span").innerHTML == "alizar") {
			hentry[i].querySelector("a.topic").style.color = "#000000";
			hentry[i].querySelector("a.topic").style.background = "#FFFF00";
		}
	}
})();