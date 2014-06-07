// ==UserScript==
// @name          Wykop.pl - "Normal" right menu
// @namespace     http://www.KKKas.info/wykop-rmenu.user.js
// @author        Kacper 'KKKas' Kwapisz http://www.KKKas.info
// @description   *Very simple* script that allows to show always the same menu on right side.
// @description   2006-04-18, 00:36:52
// @include       http://www.wykop.pl/*
// ==/UserScript==

function do_it() {
	var sidebar = document.getElementById("sidebar");

	if (sidebar.innerHTML.indexOf('./szukaj') < 0) {
		sidebar.innerHTML = sidebar.innerHTML + '<form action="./szukaj" method="get"><fieldset><input type="text" name="phrase" /><input type="submit" id="searchButton" value="szukaj &raquo;" /></fieldset></form>';
	}

	if (sidebar.innerHTML.indexOf('mainmenu') < 0) {
		sidebar.innerHTML = sidebar.innerHTML + '<ul id="mainmenu"><li id="submitLink"><a href="./dodaj">Dodaj swoj link</a></li><li id="wykopaliskoLink"><p><a href="./wykopalisko">Wykopalisko</a></p></li><li id="wysypiskoLink"><p><a href="./wysypisko">Wysypisko</a></p></li></ul>';
	} else {
		var mainmenu = document.getElementById("mainmenu");
		mainmenu.innerHTML = '<li id="submitLink"><a href="./dodaj">Dodaj swoj link</a></li><li id="wykopaliskoLink"><p><a href="./wykopalisko">Wykopalisko</a></p></li><li id="wysypiskoLink"><p><a href="./wysypisko">Wysypisko</a></p></li>';
	}

	if (sidebar.innerHTML.indexOf('taglist') < 0) {
		sidebar.innerHTML = sidebar.innerHTML + '<div id="taglist"><h2><a href="./tagi">Tagi</a></h2><div><p>...</p></div></div>';
	}

	if (sidebar.innerHTML.indexOf('Hity Wykopu') < 0) {
		sidebar.innerHTML = sidebar.innerHTML + '<ul id="menu"><li><a href="./hity">Hity Wykopu</a></li><li><a href="./users">Uzytkownicy</a></li><li><a href="./szukaj">Wyszukaj</a></li></ul>';
	}
}

window.addEventListener("load", do_it(), false);
