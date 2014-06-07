// ==UserScript==
// @name           mochio
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        http://d.hatena.ne.jp/umedamochio/about
// @include        http://d.hatena.ne.jp/umedamochio/*
// ==/UserScript==

var size = (document.location.href == 'http://d.hatena.ne.jp/umedamochio/') ? '100' : '500';
Array.filter(
	     document.getElementsByTagName('img'),
	     function (e) {
		 return e.alt == 'umedamochio'
	     }
)[0].src = 'http://data.tumblr.com/3405357_' + size + '.jpg'
