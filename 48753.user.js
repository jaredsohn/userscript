// ==UserScript==
// @name           ls SITEINFO
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @description    console.log(SITEINFO)
// @include        http://*
// @include        https://*
// ==/UserScript==

function init() {
	var ls = function(doc, url, info){
		for(var i in info) {
			console.log(i + ":'" + info[i] + "',");
		}
	}
	window.AutoPagerize.addDocumentFilter(ls);
}
if(window.AutoPagerize) {
	init();
} else {
	window.addEventListener('GM_AutoPagerizeLoaded', init, false);
}