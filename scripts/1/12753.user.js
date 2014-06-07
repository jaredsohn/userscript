/*
*    Author:	Victor Levin
*				viclevin at gmail dot com
*    Date:		October 3, 2007
*
*    Summary:	This script checks the Wikipedia page 
*				and if user found to be logged out, the script redirects to Sign In page.
*
*    Licence:	Creative Commons Attribution-NonCommercial 2.5
*				http://www.creativecommons.org/licenses/by-nc/2.5/
*/

// ==UserScript==
// @name 			Wikipedia: Signed-In Check
// @description 	This script checks the Wikipedia pages and if user found to be logged out, the script redirects to Sign In page.
// @include 		http://en.wikipedia.org/*
// @exclude 		http://en.wikipedia.org/w/index.php?title=Special:Userlogin*
// @exclude 		http://en.wikipedia.org/w/index.php?title=Special:Userlogout*
// ==/UserScript==

//get 'Sign In' container element
var isLoggedOutEl = document.getElementById("pt-login");

//if element is there then it means that user is not logged in
if(isLoggedOutEl){

	//grab a 'Sign In' link from the container
	var a = isLoggedOutEl.getElementsByTagName("a");

	if(a){
		//redirect to 'Sign In' link
		window.location.href = a[0].href;
	}
}