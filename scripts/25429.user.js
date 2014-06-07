// ==UserScript==
// @name 	Facebook - People You May Know Hider
// @namespace	http://userscripts.org/scripts/show/25429
// @description	Removes People You May Know Segment on the Right
// @include	http://www.facebook.com/*
// @author	Marlon Walcott (Modified orignal from Gustav Eklundh)
// @version	1.0
// ==/UserScript==

function hidediv(id) 
{
    document.getElementById(id).style.display = 'none';
}
hidediv("pymk");
hidediv("ssponsor");
hidediv("adcolumn_advertise");
hidediv("adcolumn_advertise");