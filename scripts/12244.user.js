// ==UserScript==
// @name           iGoogle Enhancer
// @namespace      iGoogle
// @description    Script to get more out of iGoogle
// @author         Christian 'Snyke' Decker <http://www.snyke.net>
// @include        http*://www.google.*/ig
// ==/UserScript==

try{
	document.getElementById("guser").style.display = "none";
	document.getElementById("gbarc").style.display = "none";
	document.getElementById("gbarl").style.display = "none";
	document.getElementById("gbar").style.display = "none";
	// set display of left logo and right-side links
	var searchFormRow = document.getElementById( 'sfrm' ).firstChild.firstChild.rows[ 0 ];
	searchFormRow.cells[ 0 ].style.display = 'none';
	searchFormRow.cells[ 2 ].style.display = 'none';
	// set display of search button and lucky button
	document.getElementById( 'btnG' ).style.display = 'none';
	document.getElementById( 'btnI' ).style.display = 'none';
	// set opacity of search textbox
	document.getElementById('gsea').style.MozOpacity = 0.55;
	document.getElementById("footer_promos").innerHTML = "Enhanced by <a href=\"http://www.snyke.net/\">Snyke.net</a>";
}catch(e){}