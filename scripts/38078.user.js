// ==UserScript==
// @name           StaryDobryGol
// @namespace      http://michal-michalski.pl/downloads/scripts/sdg.js
// @include        http://www.gry-online.pl/*
// @author		Regis
// ==/UserScript==

var elements = document.body.getElementsByTagName("table");
var pattern = new RegExp("(^|\\s)vc.{1} forsiz(\\s|$)");

for( i=0; i<elements.length; i++)
{
    if( pattern.test( elements[i].className ) )
	{
		elements[i].style.height = "24px";		
	}
}