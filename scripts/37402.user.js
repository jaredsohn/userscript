// ==UserScript==
// @name           Auto-Login | mes-skripte.de (Behrend)
// @namespace      http://www.mes-dippel.de
// @description    Auto-Login für mes-skripte.de (Behrends Unterlagen)
// @include        http:/*mes-dippel.de/wobe/behrend/unterlagen/*
// ==/UserScript==

if(!document.location.href.match('http://schule:schule@') && !document.title.match('Index of'))
{
	document.location.href = document.location.href.replace(/mes-dippel.de/g,"schule:schule@mes-dippel.de");
}