// ==UserScript==
// @name          ORKUT New Medal in ur profile name
// @description   orkut `s new change is tht it inserts a New Medal in orkut s profile name. This script does that 2 ur profile name.
// @author          mad hacker
// @include 	http://www.orkut.com/Profile.aspx?uid=9902305295694267815*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='/img/i_donut_medal.gif''>";	
}