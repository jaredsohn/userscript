// ==UserScript==
// @author  SUNNY
// @name         srk logo in your profile name
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='http://a.wordpress.com/avatar/srkplace-48.jpg''>";	
}

