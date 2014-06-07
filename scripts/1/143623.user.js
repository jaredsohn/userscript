// ==UserScript==
// @name   	add /azn/ to board list
// @namespace  	4chon.net
// @description	adds /azn/ to the 4chon board list
// @include	http://4chon.net/*
// @exclude	http://4chon.net/mod.php?/*
// @icon	http://static.4chon.net/favicon.gif
// ==/UserScript==

var boards = document.getElementsByClassName('boardlist');

var newHTML = '[ <a href="/r9k/index.html">r9k</a> / <a href="/azn/index.html">azn</a> / <a href="/new/index.html">new</a> / <a href="/v/index.html">v</a> / <a href="/edu/index.html">edu</a> / <a href="/meta/index.html">meta</a> ]  [ <a href="/">home</a> / <a href="/banners.html">banners</a> / <a href="/search.html">search</a> / <a href="http://wiki.4chon.net/">wiki</a> / <a href="http://archive.4chon.net/">archive</a> ]  [ <a href="/faq.html">FAQ</a> / <a href="/rules.html">rules</a> ]  [ <a href="http://status.4chon.net/">status</a> / <a href="/stats.html">statistics</a> / <a href="http://status.4chon.net/map.html">map</a> ]  [ <a href="/irc.html">irc</a> / <a href="/donate.html">donate</a> / <a href="/h/index.html">h</a> ]'

boards[0].innerHTML = newHTML;

var bottomlist = document.getElementsByClassName('boardlist bottom');

bottomlist[0].innerHTML = newHTML;