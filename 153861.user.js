// ==UserScript==
// @name        Google Logo Retinizer
// @namespace   http://userscripts.org/scripts/show/153861
// @version     1.0.1
// @description Makes the Google logo look nice on the Macbook Pro with Retina Display. Made by Kobi Tate
// @match       http*://*google.com*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var pagetitle = $(document).attr('title');
var logoAlt = $('img#hplogo').attr("alt");

if (pagetitle == "Google" && logoAlt == "Google") {
    $('img#hplogo').attr("src", "http://k0bi.tk/scripts/google.png");
}
else if (pagetitle == "Google Images") {
    $('img#hplogo').attr("src", "http://k0bi.tk/scripts/googleimg.png");
}