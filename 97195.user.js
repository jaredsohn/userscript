// ==UserScript==
// @name           YellowPost alizar
// @namespace      http://userscripts.org/users/
// @description    Make yellow title of alizar's topic and background in news feed view
// @description    Based on http://userscripts.org/scripts/show/84587 By vanishsevsk
// @include        http://*habrahabr.ru/*
// ==/UserScript==

(function(){
    var hentry = document.querySelectorAll('div.hentry');
	for (var i=0; i<hentry.length; i++){
		if (hentry[i].querySelector("div.vcard span").innerHTML == "alizar") {
			hentry[i].querySelector("a.topic").style.backgroundColor = "#FFFFB2";
			hentry[i].querySelector("a.topic").style.color = "#666633";
			hentry[i].querySelector("div.content").style.backgroundColor = "#FFFFB2";
		}
	}
})();