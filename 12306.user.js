/*
*    Author:	Victor Levin
*			viclevin at gmail dot com
*    Date:		September 16, 2007
*
*    Summary:    University of Minnesota: A Summons to Comradeship - "World War I and II Posters and Postcards"
*			This script changes the poster's link to lead straight to the image, 
*			rather than description page.
*
*    Licence:	Creative Commons Attribution-NonCommercial 2.5
*			http://www.creativecommons.org/licenses/by-nc/2.5/
*/

// ==UserScript==
// @name          	University of Minnesota: A Summons to Comradeship - "World War I and II Posters and Postcards"
// @description   	This script changes the poster's link to lead straight to the image, rather than description page.
// @include 		http://snuffy.lib.umn.edu/image/srch/bin/Dispatcher*
// ==/UserScript==

//get all anchor elements
var links = document.getElementsByTagName('a');

//loop thru them
for (var i = 0; i < links.length; i++) {

	//grab href from anchor
	var href = links[i].href;

	//if the right link (the one that leads to the description page
	if(href.indexOf("Dispatcher?") > 0){
		//rewrite the link to lead straight to the image
		links[i].href = ("http://digital.lib.umn.edu/IMAGES/reference/mswp/" + href.substr(href.lastIndexOf("=")+1, href.length) + ".jpg");
	}
}