// ==UserScript==
// @name          Varzesh3 Ad Remover
// @namespace     http://userstyles.org
// @description	  Remove Varzesh3 Ads
// @author        MohammadR
// @include       http://www.varzesh3.com/*
// @include       http://www.varzesh3.com
// @include       http://*.varzesh3.com/*
// @include       http://*.varzesh3.com

// ==/UserScript==

(function() {
	var objects = document.getElementsByTagName('object');
	for (var i=0, n=objects.length;i<n;i++) objects[i].style.display='none';
	var a = document.getElementById ('ads-B3');
	var b = document.getElementById ('ads-C');
	if ( typeof ( a ) != "undefined" && a != null )
		a.parentNode.removeChild(a);
	var c = b.getElementsByTagName ('img');
	for (var i=0;i<c.length;i++) c[i].style.display='none';
	
})();
