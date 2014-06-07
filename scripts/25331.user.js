// ==UserScript==
// @name          Orkut King
// @description   strawberry pic in profile name
// @author        Orkut king
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='/img/i_donut_strawberry.gif''>";	
}