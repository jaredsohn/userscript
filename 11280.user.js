// ==UserScript==
// @name			Page Navigator
// @namespace	userscripts.org
// @description	Displays the page numbers at the top of the Digg page too.
// @include			http://www.digg.com/*
// @include			http://digg.com/*
// ==/UserScript==

var adDivElement = document.getElementById( "wrapper" );
var adPages = adDivElement.childNodes[adDivElement.childNodes.length-1];
var adUpperPages = document.createElement('div');
adUpperPages.innerHTML = adPages.innerHTML;
adUpperPages.className = "pages";
var subMenuDiv = adDivElement.childNodes[3];
if ( subMenuDiv )
{
	subMenuDiv.parentNode.insertBefore( adUpperPages, subMenuDiv.nextSibling );
}
