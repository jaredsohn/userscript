// ==UserScript==
// @name	Demotywatory.pl antycenzor
// @namespace	korn36
// @description	Umożliwia oglądanie ocenzurowanych demotywatorów bez logowania na stronie demotywatory.pl
// @updateURL	https://userscripts.org/scripts/source/133781.meta.js
// @include	*://demotywatory.pl/*
// @include	*://demotywatory.pl
// @version	0.3
// @author	korn36
// ==/UserScript==

var dvv = document.getElementsByClassName('shadmsg');
for(var i=0; i < dvv.length; i++) { 
  dvv[i].innerHTML = 'Demot Odblokowany przez Demotywatory.pl antycenzor <br> <a href=\"#\" class=\"show_button\">Zobacz</a>';
}