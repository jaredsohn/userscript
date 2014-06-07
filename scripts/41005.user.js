// ==UserScript==
// @author  Nithin
// @name          India Flag on ur profile name
// @include 	http://www.orkut.*/Profile.aspx*
// @include                  http://www.orkut.*/home.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='/img/i_donut_india.gif'>";	
}

