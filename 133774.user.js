// ==UserScript==
// @name	Komixxy.pl Antycenzor
// @namespace	korn36
// @description	Umożliwia oglądanie ocenzurowanych komixxów bez logowania na stronie komixxy.pl.
// @updateURL	https://userscripts.org/scripts/source/133774.meta.js
// @include	*://komixxy.pl/*
// @include	*://komixxy.pl
// @version	0.3
// @author	korn36
// ==/UserScript==


var dvv = document.getElementsByClassName('shadmsg');
for(var i=0; i < dvv.length; i++) { 
  dvv[i].innerHTML = 'Komixx Odblokowany przez Komixxy.pl antycenzor <br> <a href=\"#\" class=\"show_button\">Zobacz</a>';
}