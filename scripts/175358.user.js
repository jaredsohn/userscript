// ==UserScript==
// @name        Wareztuga Automatic Server Skip
// @namespace   http://localhost
// @description Skip Putlocker, Sockshare and Bayfiles in Wareztuga.
// @include     *://www.putlocker.com/*?wareztuga=*&tipo=*
// @include     *://www.sockshare.com/*?wareztuga=*&tipo=*
// @include     *://www.bayfiles.com/*?wareztuga=*&tipo=*
// @version     0.1
// ==/UserScript==

document.addEventListener("DOMNodeInserted",

function() {
    document.getElementById("next").click();
}, false);