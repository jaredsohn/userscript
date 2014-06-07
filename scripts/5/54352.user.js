// ==UserScript==
// @name          YesWeSPAM!
// @description	  Add direct link to send family message
// @author        Mozzicone[ITA]
// @include       http://s*.vendetta*.*/vendetta/*
// @include       https://s*.vendetta*.*/vendetta/*
// ==/UserScript==
(function() {
	if (location.pathname.search('nav.php') != -1 ) {
		var Circ = document.createElement("div");
		var link = document.location.href;
		var UrlCirc = link.replace("nav.php","allyrecht.php");
		var testo = "*S*P*A*M*";
		var html = "<tr><th height=18><a href='"+UrlCirc+"' class=l1 onclick=\"x('ally.php')\">"+testo+"</a></td></tr>"
		Circ.innerHTML += html;
		var page = document.getElementsByClassName("l1").item(9);
		var parentCirc = page.parentNode;
		parentCirc.appendChild(Circ);
	}

})();

