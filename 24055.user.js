// ==UserScript==
// @name          ORKUT New Medal in ur profile name
// @description   orkut `s new change is tht it inserts a New Medal in orkut s profile name. This script does that 2 ur profile name.
// @author          Jithesh
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='/img/i_donut_medal.gif''>";	
}