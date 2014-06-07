// ==UserScript==
// @name           Winamp logo for Last.fm
// @description	   Shows winamp player icon on the scrobble source area
// @author         Valery Sarkisov
// @include        http://www.last.fm/user/*
// @include        http://www.lastfm.de/user/*
// @include        http://www.lastfm.es/user/*
// @include        http://www.lastfm.fr/user/*
// @include        http://www.lastfm.it/user/*
// @include        http://www.lastfm.pl/user/*
// @include        http://www.lastfm.com.br/user/*
// @include        http://www.lastfm.se/user/*
// @include        http://www.lastfm.com.tr/user/*
// @include        http://www.lastfm.ru/user/*
// @include        http://www.lastfm.jp/user/*
// @include        http://cn.last.fm/user/*
// ==/UserScript==
var cont=document.getElementsByClassName('scrobblesource')[0];
if(cont.innerHTML.indexOf('Winamp')!=-1){
var icon=document.getElementsByClassName('ss_icon')[0];
icon.innerHTML = '<img height="18" width="18" src="http://cdn.last.fm/flatness/icons/scrobblesource/winamp.png" capture="pluginicon"/>';
}