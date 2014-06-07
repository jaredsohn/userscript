//
// cleaneriGoogle
// version 0.2
// Srikrishna Kadimisetty
// 23-Sep-07
//
//
// 2nd revision 
// added functionality from "iGoogle Homepage Cleanup" (http://userscripts.org/scripts/show/11855 ) by krog ( http://dec4.org )
//
// ==UserScript==
// @name           cleanerigoogle
// @namespace      http://www.google.com/ig?hl=en
// @description    removes the underline on links and cleans up the whole page getting rid of redundant links
// @include        http://www.google.com/ig*
// ==/UserScript==
//
// use the following if ur using the plain google theme
// #doc3 { padding: 50px 0 0 0 !important; 



(function () {
	//EDIT ME
	var newstyle = "body {} a { text-decoration: none !important; } #addstuff, .addtab, #footerwrap { display: none !important; } ";
	//END EDIT ME

	var ss = document.createElement("style");
	var t = document.createTextNode(newstyle);
	
    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
	ss.appendChild(t);
	root.appendChild(ss);
})();


try
{
	// set display of left logo and right-side links
	var searchFormRow = document.getElementById( 'sfrm' ).firstChild.firstChild.rows[ 0 ];
		searchFormRow.cells[ 0 ].style.display = 'none';
		searchFormRow.cells[ 2 ].style.display = 'none';
		
	// set display of search button and lucky button
	//document.getElementById( 'btnG' ).style.display = 'none';
	document.getElementById( 'btnI' ).style.display = 'none';
	
	// set opacity of search textbox
	document.getElementById('gsea').style.MozOpacity = 0.70;
}
catch( e ) {}