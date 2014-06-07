// ==UserScript==
// @name           Fix news threads on Facepunch
// @namespace      Killerkid
// @description    Removes the spinning thing to fix news threads on Facepunch
// @include        http://www.facepunch.com/threads/*
// @include        http://facepunch.com/threads/*
// ==/UserScript==

var spinningthing = document.getElementsByClassName('td img')[0]

if(spinningthing)
{
	document.getElementById('whos_reading').removeChild(spinningthing)
}