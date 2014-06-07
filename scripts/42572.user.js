// ==UserScript==
// @name          ORKUT star in ur profile name
// @description   usd 4 gettin a star in ur prof name like this one http://www.orkut.com/Main#Profile.aspx?uid=8007036851361604965
// @author          Shaz3e
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='http://www.orkut.com/img/i_donut_badge.gif''>";	
}