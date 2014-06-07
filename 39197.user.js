           // ==UserScript==
// @name           Bux.to auto close ad
// @namespace      http://www.klamm-mailer.de/login.php
// @description    Auto closes the ad when it's done
// @include        http://www.klamm-mailer.de/members/unbestaetigt.php?sessionid=//
// ==/UserScript==

function start()
{
setTimeout("window.close();", 80000);
}

if (document.addEventListener) {
window.addEventListener("load", start, false);
}
else {
window.document.onLoad = start();