// ==UserScript==
// @name        serienjunkies
// @require     http://code.jquery.com/jquery-1.7.2.min.js
// @namespace   sbm
// @include     http://serienjunkies.org/*
// @version     1.0
// ==/UserScript==

$("#rap .streams").remove();
$("#sidebar .feeds").remove();
var srch = $("#sidebar form");
var next = srch.next();
while(!next.text().match('Serien') && !next.text().match('Staffel')){
	next.remove();
	next = srch.next();
}
