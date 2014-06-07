// ==UserScript==
// @name          Craigslist Email Addition
// @namespace     http://home.earthlink.net/~inky-press
// @include       http://*.craigslist.org/email.friend
// @include       http://*.craigslist.org*/
// @exclude       
// @description	  Enters email address in Craigslist's email page
// ==/UserScript==


(function() {
    document.forms[0].senderAddress.value = "less42@yahoo.com";
    document.forms[0].rcptAddress.value = "inky-press@earthlink.net";
})();
