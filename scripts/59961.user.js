// ==UserScript==
// Mangafox Background Ad Hider
// version 1.0
// 16-10-2009
// Copyright (c) 2009, AlmightyJu
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// @name           Mangafox Background Ad Hider
// @namespace      adremove_mangafox
// @description    Removes the background ad
// @version        1.0
// @include        http://www.mangafox.com/*
// ==/UserScript==
///////////////////////////////////////////////////
var r = document.body.childNodes;
var table;
for(var c=0; c < r.length; c++) {
	if(r[c].nodeName == "TABLE") {r[c].style.background="transparent";table=r[c];}
}
table.childNodes[1].childNodes[0].childNodes[1].removeAttribute("onclick")
table.childNodes[1].childNodes[0].childNodes[5].removeAttribute("onclick")
table.childNodes[1].childNodes[0].childNodes[1].style.cursor="";
table.childNodes[1].childNodes[0].childNodes[5].style.cursor="";