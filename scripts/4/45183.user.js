// ==UserScript==
// @name           FINN.no - removebanners
// @namespace      http://www.rodland.no
// @description    remove banners from finn.no
// @include        http://www.finn.no/
// ==/UserScript==

document.getElementById("topbanner").style.display = 'none';
document.getElementById("tower").style.display = 'none';
var iframes = document.getElementsByTagName("iframe");
for (var i = 0; i <  iframes.length; i++) {  
	iframes[i].style.display = 'none';
}
