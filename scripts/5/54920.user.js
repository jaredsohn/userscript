// ==UserScript==
// @name          Keine Kommentare
// @namespace      http://www.einfach-uebel.com
// @description    Eliminiert unnoetige Leserkommentare von verschiedenen oesterreichischen online Portalen
// @include        http://derstandard.at/*
// @include        http://www.oe24.at/*
// @include        http://diepresse.com/*
// @include        http://www.nachrichten.at/*
// ==/UserScript==

function rem(element)
{
if (element)
	element.parentNode.removeChild(element);
}

var comments = document.getElementsByClassName('communityCanvas');
for(var i = 0; i < comments.length; i++)
{
	rem(comments[i]);	
}

function rem(element)
{
if (element)
	element.parentNode.removeChild(element);
}

var comments = document.getElementsByClassName('deck');
for(var i = 0; i < comments.length; i++)
{
	rem(comments[i]);	
}

function rem(element)
{
if (element)
	element.parentNode.removeChild(element);
}

var comments = document.getElementsByClassName('commentbox');
for(var i = 0; i < comments.length; i++)
{
	rem(comments[i]);	
}

function rem(element)
{
if (element)
	element.parentNode.removeChild(element);
}

var comments = document.getElementsByClassName('artikeldiskussion-anzeigen');
for(var i = 0; i < comments.length; i++)
{
	rem(comments[i]);	
}