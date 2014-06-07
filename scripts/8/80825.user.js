// ==UserScript==
// @name           Fressenbuch
// @namespace      https://www.facebook.com/Sebi.Straub
// @description    Wer sich schon immer an der schlechten Übersetzung von Facebook gestört hat...
// @include        http://www.facebook.com/*
// @version        0.1
// ==/UserScript==

var Logo = document.createElement("a");
	Logo.id="fressenbuch";
	Logo.href="http://www.facebook.com/";
	Logo.innerHTML='<img src="http://www.abload.de/img/fressenbuchlogo2130.png" alt="Fressenbuch" style=\'position:relative; left:0px; top:0px;\'>';
	document.getElementById('pageLogo').replaceChild(Logo, document.getElementById("pageLogo").firstChild);