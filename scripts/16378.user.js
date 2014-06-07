/*	gentoo.ru comment width fix
	
	This script automatically fixes BBCode [code] blocks in the forum comments to fit browser window width.

	

	(c) Yevgen Gorshkov

	GPL.

*/
// ==UserScript==
// @name           gentoo.ru comment width fix
// @namespace      http://ye.gorshkov.googlepages.com/
// @include        http://gentoo.ru/node/*
// @include        http://*.gentoo.ru/node/*
// ==/UserScript==

function $x(p, context){
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
};

function getPosition(el){
	var curleft = curtop = 0;
	if (el.offsetParent){
		curleft = el.offsetLeft
		curtop = el.offsetTop
		while (el = el.offsetParent){
			curleft += el.offsetLeft
			curtop += el.offsetTop
		}
	}
	return {x:curleft, y:curtop};
}


var bb_code_blocks = $x("//pre[@class='bb-code-block']");
function fixComments(){
	var client_width = document.documentElement.clientWidth;
	bb_code_blocks.forEach(function(el){
		el.style.overflowX = (getPosition(el).x + el.offsetWidth > client_width) ? 'scroll' : 'auto';
	}, window);
}

fixComments();
window.addEventListener('resize', fixComments, false);
