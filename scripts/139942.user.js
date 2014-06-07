// ==UserScript==
// @name C&C TA Rus
// @author Duhaccgzhn
// @description Добавляет русский язык в игру
// @include https://prodgame*.alliances.commandandconquer.com/*
// @include http://prodgame*.alliances.commandandconquer.com/*
// @run_at document-start
// @version 1
// @license BSD3
// ==/UserScript==

(function(){
	function setLangRus(){
		var inject__ = document.createElement("script");
		inject__.setAttribute("type", "text/javascript");
		inject__.innerHTML = 'Language="ru"';
		var s = document.getElementsByTagName('script')[document.scripts.length-1];
		s.parentNode.insertBefore(inject__, s);
	};
	document.addEventListener("DOMContentLoaded", setLangRus, true);
})();