// ==UserScript==
// @name          Google Search Un-highlight
// @namespace     n/a
// @description   Un-highlight the keywords in Google search
// @include       http://*.google.*/search?*
// ==/UserScript==

var strReplaceAll = document.getElementById('res').innerHTML;
var indice = strReplaceAll.indexOf( "<em>" );


while (indice != -1){
	// Relace out the current instance.
	strReplaceAll = strReplaceAll.replace( "<em>", "" )
	
	// Get the index of any next matching substring.
	indice = strReplaceAll.indexOf( "<em>" );
}


while (indice != -1){
	// Relace out the current instance.
	strReplaceAll = strReplaceAll.replace( "</em>", "" )
	
	// Get the index of any next matching substring.
	indice = strReplaceAll.indexOf( "</em>" );
}
 
document.getElementById('res').innerHTML = strReplaceAll;