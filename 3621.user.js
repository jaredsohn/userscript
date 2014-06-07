// ==UserScript==
// @name          Bypass Oneplace.com Player Windows
// @namespace     http://www.traviscarden.com/software
// @description	  Replaces sermon player JavaScript with direct media download links, bypassing annoying popups
// @include       http://www.oneplace.com/ministries/*/*
// @include       http://oneplace.com/ministries/*/*
// ==/UserScript==
// Notes:
//   

var a = document.getElementsByTagName("A");
for (i = 0; i < a.length; i++) {
    if (a[i].href.search('CustomPlayer.asp') >= 0) {
        a[i].href = a[i].href.replace(a[i].href.slice(0, a[i].href.search('http://boss.streamos.com/')), '');
        a[i].href = a[i].href.replace(a[i].href.slice(a[i].href.search('(&video=|&mediaID=|&MinTitle=)'), a[i].href.length), '');
    }
}