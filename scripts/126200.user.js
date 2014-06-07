// ==UserScript==
// @name           Strip Google Redirect Links
// @namespace      Ian.M
// @description    Greasify script to remove the Google redirect in search result links.
// @include        http://www.google.com/search?*
// @include        http://www.google.co.uk/search?*
// @include        https://www.google.com/search?*
// @include        https://www.google.co.uk/search?*
// @include        https://encrypted.google.com/search?*
// ==/UserScript==


// Should be:
//
// @include        http://www.google.com/search?*
// @include        http://www.google.co.uk/search?*
// @include        https://www.google.com/search?*
// @include        https://www.google.co.uk/search?*
// @include        https://encrypted.google.com/search?*
// @include        http://*.google.*/*q=*
// @include        https://*.google.*/*q=*
//
// for Greasemonkey etc. but Greasify has limitations on wildcard processing 
// so must explicitly specify the first wildcard

var element;
var result;
//var links = document.getElementById('ires').getElementsByTagName( 'a' ); //All links in results div (id='ires')
// Update (April 2012): Google have scrapped the ires div. :-(
var links = document.getElementsByTagName( 'a' ); //All links in page


// This REGEX matches the current (Feb 2012) tracking redirects in search results, extracting the real URL
// Google encode any '&' in the real URL so it now works OK when the target link is to a CGI script.
// It matches: http{s}://www.google.<TLD>/url?q=<REAL_URL>&sa=*
// where <TLD> is 2 to 8 lower case letters and '.' which should cover most google domains

var regurl=/^https?:\/\/www\.google\.[a-z.]{2,8}\/url\?q=(.*?)&sa=/;


// Update (April 2012):  Google have broken the new window handling via the link target attribute so the REGEX
// now checks your Google PREFS cookie so the link target can be patched if you prefer results in a new window.
//
// Update (April 2014): Google cookie format changed exposing bug in REGEXes and their usage.  Now fixed

var regPREF = /(?:;|^)PREF=(.*?)(?:;|$)/; // To extract PREF cookie
var regNW = /(?::|^)NW=(.*?)(?::|$)/; // To test google's New Window preference

// end of black REGEX magic

var sPREF=regPREF.exec(document.cookie)[1];
var NW=regNW.exec(sPREF)[1];  //Get "Open search results in a new browser window" preference

for ( var i = 0; i < links.length; i++ ) {
    element = links[ i ];
    var result=regurl.exec(element.href);  //Try and match it
    if ( result ) {
	
	element.href=decodeURIComponent(result[1]); // Got one so substitute real URL 
						    // which may need decoding if it contained '&'
	element.setAttribute('rel','noreferrer'); // Futureproofing: Block the referrer on HTML5 compliant browsers
	if( NW ) {
		element.setAttribute('target','_blank'); // Fix results in new window preference
	}
    }
}
