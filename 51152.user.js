// ==UserScript==
// @author  Mohit
// @name           Star in ur orkut profile 
// @include 	http://www.orkut.*/Profile.aspx*
// @include                  http://www.orkut.*/home.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='/img/i_donut_medal.gif'>";	
}