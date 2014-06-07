/*
*    Author:	Victor Levin
*				viclevin at gmail dot com
*    Date:		October 3, 2007
*
*    Summary:	This script redirects just signed in user to last-viewed ("Return To") page.
*
*    Licence:	Creative Commons Attribution-NonCommercial 2.5
*				http://www.creativecommons.org/licenses/by-nc/2.5/
*/

// ==UserScript==
// @name          	Wikipedia: Instant Redirect After Login
// @description   	This script redirects just signed in user to last-viewed ("Return To") page.
// @include 		http://en.wikipedia.org/w/index.php?title=Special:Userlogin*
// ==/UserScript==

//get span that contains return a-href by ID
var elSpan = document.getElementById("mw-returnto");

//if we got it
if(elSpan){

	//get the first anchor inside
	var elReturnLink = elSpan.getElementsByTagName("a")[0];

	//if we got it
	if(elReturnLink){

		//redirect to its href
		location.href = elReturnLink.href;
	}
}