// ==UserScript==
// @name           Auto-Login | mes-skripte.de (John)
// @namespace      mes-skripte.de
// @description    Auto-Login für mes-skripte.de (Unterlagen John)
// @include        http://*mes-skripte.de/john/unterlagen/*
// ==/UserScript==

if(!document.location.href.match('http://schueler:schueler@') && !document.title.match('Index of'))
{
	document.location.href = document.location.href.replace(/mes-skripte.de/g,"schueler:schueler@mes-skripte.de");
}