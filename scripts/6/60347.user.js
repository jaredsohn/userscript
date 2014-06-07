// ==UserScript==
// @name           Google Penis
// @namespace      janza
// @description    bla
// @include        http://www.google.*/search?*q=*
// @include        http://www.google.*/*
// @date           2009-03-02
// @version        1.0
// @GM_version     0.8.20080609.0
// ==/UserScript==

var titl, newElement;
titl = document.getElementById("logo");




if (titl.getAttribute("title") == "Google") 
{
titl.style.backgroundImage = "url(http://imgur.com/ojGbY.png)";

var datum = new Date();
hihi(titl);

}

function hihi(titl2)
{
	newElement = document.createElement('img');

	var god = datum.getFullYear();
	var mjes = datum.getMonth()+1;
	var dan = datum.getDate();

	newElement.src = 'http://zs1.smbc-comics.com/comics/' + god + mjes + dan + '.gif';
	titl2.parentNode.insertBefore(newElement, titl2.nextSibling);
	
}