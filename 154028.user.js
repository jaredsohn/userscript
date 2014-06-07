// ==UserScript==
// @name        Usprawnienie wykopu
// @namespace   OK
// @include     http://www.wykop.pl/*
// @updateURL   http://userscripts.org/scripts/source/154028.user.js
// @downloadURL http://userscripts.org/scripts/source/154028.user.js
// @version     1.05
// ==/UserScript==

var s, o = document.getElementsByTagName('time'), count = o.length;
for(var i=0;i<count;i++){
	o.item(i).innerHTML = o.item(i).innerHTML + " | dodany " + o.item(i).title;
}