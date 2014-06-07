/*
*    Author:	freebullets
*    Date:		April 1, 2011
*
*    Summary:	This script instantly skips "Thank you for logging in" pages.
*
*    Licence:	Creative Commons Attribution-NonCommercial 2.5
*				http://www.creativecommons.org/licenses/by-nc/2.5/
*/

// ==UserScript==
// @name          	Instant Redirect After Login
// @description   	This script instantly skips "Thank you for logging in" pages.
// @include 		*
// ==/UserScript==

//get id that contains return a-href
var elSpan = document.getElementById("redirect_button");

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