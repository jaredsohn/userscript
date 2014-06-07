// ==UserScript==
// @name        UniWeb Navigation Bar
// @include     https://uniweb.unipd.it/*
// @version     2.2
// @grant       none
// ==/UserScript==

(function() { // Namespace
    var username = "";
    try { username = document.getElementById("sottotitolo-menu-principale").childNodes[1].childNodes[1].innerHTML;
	} catch(err) {}
	var jsessionid = document.getElementById("menu-generale-listitem-1").href.replace("https://uniweb.unipd.it/Home.do;","");
	//console.log("Username:", username);
	//console.log("JSessionID:", jsessionid);
	
	var nav = document.getElementById("menu-generale");
	var navlist = document.createElement("ul");
	nav.appendChild(navlist);
	
	var menu = document.getElementById("menu-tutti");
	var menulist = document.createElement("ul");
	menu.appendChild(document.createElement("br"));
	menu.appendChild(menulist);
	
	var append_navigation_link = function(text, href, param) {
		param = (typeof param === "undefined") ? "" : "?"+param;
		var link = document.createElement("a");
		var item = document.createElement("li");
		link.setAttribute("href", href+";"+jsessionid+param);
		link.innerHTML = text;
		item.appendChild(link);
		navlist.appendChild(item);
	}
	
	var append_menu_link = function(text, href, param) {
		param = (typeof param === "undefined") ? "" : "?"+param;
		var link = document.createElement("a");
		var item = document.createElement("li");
		link.setAttribute("href", href+";"+jsessionid+param);
		link.innerHTML = text;
		item.appendChild(link);
		menulist.appendChild(item);
	}
	
	if (!username || /^\s*$/.test(username)) {
		append_navigation_link("Login", "/auth/Logon.do");
	} else {
		append_navigation_link("Piano di studi", "/auth/studente/Piani/PianiHome.do");
		append_navigation_link("Libretto on line", "/auth/studente/Libretto/LibrettoHome.do");
		append_navigation_link("Iscrizione esami", "/auth/studente/Appelli/AppelliF.do");
		append_navigation_link("Verifica iscrizione esami", "/auth/studente/Appelli/BachecaPrenotazioni.do");
		append_navigation_link("Esiti esami", "/auth/studente/Appelli/BachecaEsiti.do");
		append_navigation_link("Compitini", "/auth/studente/Appelli/AppelliP.do");
		append_navigation_link("Logout", "/Logout.do");
		
		append_menu_link("Bacheca appelli", "/ListaAppelliOfferta.do");
		append_menu_link("Bacheca esami", "/ListaTurniFacolta.do");
	}
})();