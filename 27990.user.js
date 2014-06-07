// ==UserScript==
// @author   asif
// @name         I am asif logo in your profile name
// @include 	http://www.orkut.co.in/Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='http://
bp3.blogger.com/.../S220/iamasif+logo+copy.gif
''>";	
}

