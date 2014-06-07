// ==UserScript==
// @name        Redirect to compact reddit
// @description Redirects from regular reddit to the compact version
// @namespace   reddit
// @match       https://pay.reddit.com/*
// @run-at      document-start
// ==/UserScript==


//Thanks to people at http://stackoverflow.com/questions/10675049/
//Only works with a secure (HTTPS) connection to Reddit. Download
//HTTPS Everywhere at https://www.eff.org/https-everywhere

var oldUrlPath  = window.location.pathname;

/*--- Test that ".compact" is at end of URL, excepting any "hashes"
    or searches.
*/
if ( ! /\.compact$/.test (oldUrlPath) ) {

    var newURL  = window.location.protocol + "//"
                + window.location.hostname
                + oldUrlPath + ".compact"
                + window.location.search
                + window.location.hash
                ;
    /*-- replace() puts the good page in the history instead of the
        bad page.
    */
    window.location.replace (newURL);
}
