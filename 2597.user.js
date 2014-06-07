/*
 *	Author:			Kovarththanan Rajaratnam
 *				krj at rajaratnam.dk
 *				(c) 2006 
 *				http://www.stormchasers.dk/~gorth/wordpress/
 *	Date:			January 13, 2006
 *
 *	Summary:		Removes both top and sidebar google ads
 *
 */

 // ==UserScript==
// @name	Digg AdRemover
// @namespace	http://www.stormchasers.dk/~gorth/firefox
// @description	Removes ads on all digg.com pages
// @include	http://*digg.com/*
// @exclude       
// ==/UserScript==
	
(function() {
	document.getElementById('google-broad').style.display="none";
	document.getElementById('google-side-long').style.display="none";
})();
