// ==UserScript==
// @name           Skip Linkbucks on IB4F (ImageBoard4Free)
// @description    This script removes linkbucks redirects.
// @namespace      http://ib4f.com/
// @include        http://*ib4f.com/board/*
// @version        1.0
// @date           16/11/2010
// ==/UserScript==

var a = document.links;
var g = /http\:\/\/[^]+?\.linkbucks\.com\/url\/([^]+)/;

for(i = 0; i < a.length; i++){
	if(m = a[i].href.match(g)){
		a[i].href = m[1];
	}
}