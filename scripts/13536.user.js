// ==UserScript==
// @name          Bope No nome :D
// @description   Bope No nome :D ² > .. <
// @author          Mini WhiteBlack
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==
 if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='http://hildersantos.com/wp-content/uploads/2007/09/bope-1154978123.jpg''>";	
}