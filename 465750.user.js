// ==UserScript==
// @name       Free Paid WiFi
// @namespace  www.twitter.com/Phille97
// @version    0.1
// @description  This will bypass the paid wifi pages on certain hotspots.
// @match      *
// @copyright  2014+, Philip Johansson
// ==/UserScript==

var oldUrlPath  = window.location.pathname;

if ( ! /\?.jpg$/.test (oldUrlPath) ) {

    var newURL  = window.location.protocol + "//"
                + window.location.host
                + oldUrlPath + "?.jpg"
                + window.location.search
                + window.location.hash
                ;
    
    window.location.replace (newURL);
}