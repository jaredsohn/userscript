// ==UserScript==
// @name ČSFD - zobrazit všechny komentáře
// @include http://www.csfd.cz/film/*
// @exclude http://www.csfd.cz/film/*/zajimavosti/*
// @exclude http://www.csfd.cz/film/*/recenze/*
// @exclude http://www.csfd.cz/film/*/galerie/*
// @exclude http://www.csfd.cz/film/*/videa/*
// @exclude http://www.csfd.cz/film/*/bazar/*
// @exclude http://www.csfd.cz/film/*/filmoteka/*
// @exclude http://www.csfd.cz/film/*/diskuze/*
// @exclude http://www.csfd.cz/film/*/strana*
// @exclude http://www.csfd.cz/film/*reminderForm=1*
// @exclude http://www.csfd.cz/film/*all=1*
// ==/UserScript==

currentUrl = document.URL;
if (currentUrl.indexOf('?') == -1) {
	newUrl = currentUrl + '?all=1';
} else {
	newUrl = currentUrl + '&all=1';
}
window.location.replace(newUrl);