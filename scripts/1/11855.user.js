// ==UserScript==
// @name           iGoogle Transparency
// @namespace      CRD
// @description    Simple iGoogle Page Cleanup
// @author         crd
// @include        http://www.google.com/ig*
// ==/UserScript==

try
{
	// set display of left logo and right-side links
	var searchFormRow = document.getElementById( 'sfrm' ).firstChild.firstChild.rows[ 0 ];
		searchFormRow.cells[ 0 ].style.display = 'none';
		searchFormRow.cells[ 2 ].style.display = 'none';
		
	// set display of search button and lucky button
	document.getElementById( 'btnG' ).style.display = 'none';
	document.getElementById( 'btnI' ).style.display = 'none';
	
	// set opacity of search textbox
	document.getElementById('gsea').style.MozOpacity = 0.55;
}
catch( e ) {}