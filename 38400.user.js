// ==UserScript==
// @name           Max-ptc Auto Close Ads
// @description    Auto closes the ad when it's done.
// @include        http://*.max-ptc.com/view.php?ad=*
// @copyright      varcolac1000
// ==/UserScript==

function start()
{
setTimeout("window.close();", 30000);
}

if (document.addEventListener) {
window.addEventListener("load", start, false);
}
else {
window.document.onLoad = start();
}