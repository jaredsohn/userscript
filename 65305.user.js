// ==UserScript==
// @name           geoip
// @namespace      http://a.net/Ben
// @include        http://geoipweather.com/
// ==/UserScript==

var els = document.getElementById("gormsby-main-content").getElementsByTagName("div");
var L=els.length-1;
for (var i=0; i<L; i++) {
	els[i].style.background="url("+els[i].getElementsByTagName("img")[0].src+")";
	els[i].style.backgroundRepeat="no-repeat";
	els[i].style.backgroundPosition="100% 35%";
}
els =document.getElementsByTagName("img");
L=els.length-1;
for (var i=0; i<L; i++) {
	els[i].src="";
}