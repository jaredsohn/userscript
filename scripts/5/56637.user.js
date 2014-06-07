// ==UserScript==
// @name			Clean URL Link for Delicious Save Page
// @author			Erik Vold
// @namespace		deliciousCleanNewURL
// @include			http*://delicious.com/save
// @include			http*://delicious.com/save#*
// @include			http*://delicious.com/save?*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-29
// @lastupdated		2009-08-29
// @description		This userscript will add a 'clean url' link to the 'Save a new bookmark' page of Delicious which will remove any url parameters from the url you are about to bookmark.
// ==/UserScript==

var deliciousCleanNewURL = {}
deliciousCleanNewURL.click = function() {
	var urlInput = document.getElementById( 'url' );
	urlInput.value = urlInput.value.match( /^[^\?]*/i );

	return true;
};
deliciousCleanNewURL.setup = function() {
	var urlInput = document.getElementById( 'url' );
	var newLink = document.createElement( 'a' );
	newLink.href = "#";
	newLink.innerHTML = "clean url";
	newLink.addEventListener( "click", deliciousCleanNewURL.click, false );

	urlInput.parentNode.insertBefore( newLink, urlInput.nextSibling );
	return true;
};
deliciousCleanNewURL.setup();
