// ==UserScript==
// @name           Magyar Rádió letöltés
// @namespace      tgr
// @description    csak hallgatható linkek cseréje letölthetQre az MR-archívumban
// @include        http://real1.radio.hu/*/MP3/*
// ==/UserScript==

var urlre = /\/\w{3}-[PBK]\d{2}\.m3u$/;

var links = document.getElementsByTagName("a");
for(var i=0; i < links.length; i++) {
    if(!links[i].href.match(urlre)) continue;
    links[i].href = links[i].href.replace(/m3u$/, "mp3");
}
