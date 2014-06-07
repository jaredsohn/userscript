// ==UserScript==
// @name           PC INpact - Barre de navigation "re-stylee"
// @namespace      *
// @description    Barre de navigation de PC INpact sans italic avec soulignement
// @include        http://www.pcinpact.com/*
// ==/UserScript==

// Bar navigation
var navbar = document.getElementById('breadcrumb');
var items = navbar.getElementsByTagName('a');
for (i=0; i< items.length; i++) 
{
	items[i].style.cssText = 'font-style:normal;text-decoration:underline ;';
}