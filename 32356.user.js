// ==UserScript==
// @name          ORKUT star in ur profile name
// @description   usd 4 gettin a star in ur prof name like this one 
// @author          Shrenik
// @include 	http://www.orkut.co.in/Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='/img/i_donut_badge.gif''>";	
}