// ==UserScript==
// @name        Wypierdol przekierowywaczkę
// @namespace   *
// @description Usuwa z linków na kurwabin.ork przekierowywanie
// @include     http://www.karachan.org/*
// @include     http://karachan.org/*
// @version     1
// ==/UserScript==

var wpiski = document.getElementsByTagName("blockquote");
for(var i=0;i<wpiski.length;i++){
	wpiski[i].innerHTML = wpiski[i].innerHTML.replace(/http:\/\/href.li\/\?/g, '');
}