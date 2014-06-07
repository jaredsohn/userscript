// ==UserScript==
// @name           Cleaner YouTube Homepage
// @namespace      http://userstyles.org
// @description    removes the featured video on right and the ads bellow it
// @include        http://www.youtube.com
// @include        http://*.youtube.*
// @include        http://youtube.*
// ==/UserScript==
// by blez

function removeElement(el) {
	var ad = document.getElementById(el);
	if (ad) ad.parentNode.removeChild(ad);
}

var elements = ['ppv-placeholder', 'fyf_container', 'ad_creative_3']; // the ads.
for (var i in elements) removeElement(elements[i]); 

