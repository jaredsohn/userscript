// ==UserScript==
// @name        Wyświetla liczbę powiadomień do ciebie oraz z obserwowanych tagów na tytule karty.
// @include     http://www.wykop.pl/*
// @author      Wiceps
// @version     1.01
// ==/UserScript==

var d = document.title;
function c(){
	var wiad = $('#notificationsBtn span:eq(2):not(.dnone)').html();
	var tagi = $('#hashNotificationsBtn span:eq(2):not(.dnone)').html();
	if(wiad==undefined ) wiad=0;
	if(tagi==undefined) tagi=0;
	document.title = "("+wiad+") [#"+tagi+"] "+d;
}
window.setInterval(c, 1000);