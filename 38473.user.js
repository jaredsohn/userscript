// ==UserScript==
// @name           Buxxto.com Auto Close Ads
// @description    Auto closes the ad when it's done. 50 minimun ads per day. 
// @description    To register as my referal please falow this site: http://www.buxxto.com/?r=varcolac1000
// @include        http://*.buxxto.com/view.php?ad=*
// @copyright      varcolac1000
// ==/UserScript==

function start()
{
setTimeout("window.close();", 35000);
}

if (document.addEventListener) {
window.addEventListener("load", start, false);
}
else {
window.document.onLoad = start();