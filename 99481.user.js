// ==UserScript==
// @name          Google Secure Search Force
// @namespace     http://www.kasmura.com/googssl/
// @description   Forces Google Search to use a secure HTTPS/SSL connection
// @author        Kasper M. Rasmussen
// @copyright     kasmura.com
// @version       1.1.00
// @licence       http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include       http://google.com/
// @include       http://www.google.com/
// @include       http://facebook.com/
// @include       http://www.facebook.com/
// ==/UserScript==

var url = window.location.href;

if (url.substring(0,7) == 'http://') { 
window.location.replace(url.replace(url.substring(0,7), 'https://')); 
}

/*
This script is derived from Google Secure Pro (http://userscripts.org/scripts/review/5951), but it had some wrong includes
so I made this script.
*/

/*
Changelog:
1.0.00 - Included only Google Search
1.1.00 - New includes with Facebook
*/