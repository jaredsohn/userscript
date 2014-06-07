// ==UserScript==
// @name           Remove ClubHabbo Big Brother
// @namespace      http://userscripts.org/users/56601
// @description    Removes ClubHabbo Big Brother from "New Posts"
// @include        http://clubhabbo.net/*
// @include        http://www.clubhabbo.net/*
// ==/UserScript==
var links = document.getElementsByTagName('a');
for (var i = 0, ii; ii = links[i]; i++) {
	ii.href = ii.href.replace('search.php?do=getnew','search.php?do=getnew&exclude=754,757');		
}