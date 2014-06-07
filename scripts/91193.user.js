// ==UserScript==
// @name           klavogonki: tag "hide"
// @namespace      klavogonki
// @include        http://klavogonki.ru/profile/*
// @include        http://klavogonki.ru/forum/*
// @author         Fenex
// @version	   2.1
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
var divs = document.getElementsByClassName("hidemain");
for (i=0;i<divs.length;i++) {
	var pos1 = divs[i].getElementsByTagName('div')[2].innerHTML.indexOf('>=');
	if(pos1 != -1)
	{
		var pos2 = divs[i].getElementsByTagName('div')[2].innerHTML.indexOf('=', pos1+2);
	if(pos1 != -1) {
	var str = divs[i].getElementsByTagName('div')[2].innerHTML.substr(pos1+2, pos2-pos1-2);
	divs[i].getElementsByTagName('div')[2].innerHTML = divs[i].getElementsByTagName('div')[2].innerHTML.substring(0,pos1+1)+divs[i].getElementsByTagName('div')[2].innerHTML.substring(pos2+1);
	divs[i].getElementsByTagName('div')[0].innerHTML = str;
}}}