// ==UserScript==
// @author  azhar
// @name         antargni logo in your profile name
// @include 	http://www.orkut.co.in/Main#Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='http://www.nenonline.org/jsp/images/IITK_logo.gif'>";	
}
