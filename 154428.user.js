// ==UserScript==
// @name        	Youtube - Lost Feature Recovery
// @namespace   	http://example.org
// @description		Youtube's new layout doesn't show other videos from the same channel any more by default. This adds it back.
// @match       	*://*.youtube.com/watch?v=*
// @run-at      	document-start
// ==/UserScript==

var oldUrlPath  = window.location.href;

/*--- Test that "&list=UL" is at end of URL, excepting any "hashes"
    or searches.
*/
var patt = /&list=UL/g;
if ( ! patt.test (oldUrlPath) ) {

    var newURL  = window.location.href + "&list=UL";
	
    /*-- replace() puts the good page in the history instead of the
        bad page.
    */
    window.location.replace (newURL);
}