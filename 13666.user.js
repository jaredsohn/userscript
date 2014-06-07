// ==UserScript==
// @namespace    http://david.stinemetze.net
// @name         Facebook Home Refresh
// @description  Auto refreshes the home page every minute.  Works great in combination with Auto Poke
// @include      http://*.facebook.com/home.php*
// ==/UserScript==

/*
This script actually will easily apply to any site, not just facebook.   I needed it for facebook so that's why I 

wrote it that way.

*/



setTimeout('window.location.reload()',60000);