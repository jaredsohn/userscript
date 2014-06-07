// ==UserScript==
// @name           Odsiebie Downloader by BartekJot :-)
// @description    Open all links in separated tabs and wait for "Download complete" :-)
// @include        http://odsiebie.com/pokaz*
// @include        http://odsiebie.com/pobierz*
// @exclude        http://odsiebie.com/upload*
// ==/UserScript==

var _LINK = location.href;
var _GO;

if(_LINK.indexOf("pobierz")>0) {
_GO = _LINK.replace(/pobierz/g,"download");
}

else if(_LINK.indexOf("pokaz")>0) {
_GO = _LINK.replace(/pokaz/g,"pobierz");
}

location.href = _GO;