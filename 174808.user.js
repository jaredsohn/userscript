// ==UserScript==
// @name        Fix Forever Scrolling Flickr
// @namespace   http://userscripts.org/users/526804
// @description Fixes Flickr from the forever scroll that slows down your computer
// @include     http://www.flickr.com/photos/*
// @include     https://secure.flickr.com/photos/*
// @version     1.03
// @run-at      document-start
// ==/UserScript==

/* stops multiple reloads and adding - checking if exists 
   also a simple check to make sure it doesn't add within the sets
*/

if (window.location.href.toString().indexOf("detail") != -1) return false;
if (window.location.href.toString().indexOf("photostream") != -1) return false;


var oldUrlPath  = window.location.pathname;


/* Removes trailing slash, if it exsists */

oldUrlPath = oldUrlPath.replace(/\/$/, '');


/*--- Test that "?details=1" is at end of URL, excepting any "hashes"
    or searches.
*/

if(!oldUrlPath.match('detail')){

    var newURL  = window.location.protocol + "//"
                + window.location.hostname
                + oldUrlPath + "/\?details=1"
                + window.location.search
		+ window.location.hash
                ;
    /*-- replace() puts the good page in the history instead of the
        bad page.
    */
    window.location.replace (newURL);

}

/*--- sets use detail=1 not details.  Check and changed for sets */


if(oldUrlPath.match('sets')){

    var newURL  = window.location.protocol + "//"
                + window.location.hostname
                + oldUrlPath + "/\?detail=1"
                + window.location.search
		+ window.location.hash
                ;
    /*-- replace() puts the good page in the history instead of the
        bad page.
    */
    window.location.replace (newURL);

}


