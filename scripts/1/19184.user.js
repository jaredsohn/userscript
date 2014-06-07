// ==UserScript==
// @name          ORKUT bird in ur profile name
// @description   orkut `s new change is tht it inserts a mushroom in orkut admins`s profile name.This script does that 2 ur profile name.
// @author          abhishek
// @include 	http://www.orkut.com/Profile.aspx?uid=4310860236361136136*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='/img/i_donut_mushroom.gif''>";	
}
				
