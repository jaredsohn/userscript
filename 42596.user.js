// ==UserScript==
// @name           Destructoid.com Back/Next fix
// @namespace      http://userscripts.org/scripts/show/42596
// @description    Swaps Next and Back text at the bottom of the page
// @include        http://www.destructoid.com/*
// @include        http://*.destructoid.com/*
// ==/UserScript==

var Spans;
Spans = document.getElementsByTagName('span');
for (var i = 0; i < Spans.length; i++) {
	//Spans[i].text also works?
if(Spans[i].firstChild==null) {GM_log("null");} else {
	if(Spans[i].firstChild.data=="« NEXT") {
		Spans[i].firstChild.data="« BACK";
		GM_log(Spans[i].firstChild.data);
	}
	if(Spans[i].firstChild.data=="BACK »") {
		Spans[i].firstChild.data="NEXT »";
		GM_log(Spans[i].firstChild.data);
	}
	if(Spans[i].firstChild.data=="« next - compact view") {
		Spans[i].firstChild.data="« back - compact view";
		GM_log(Spans[i].firstChild.data);
	}
	if(Spans[i].firstChild.data=="back » - compact view") {
		Spans[i].firstChild.data="next » - compact view";
		GM_log(Spans[i].firstChild.data);
	}
}
}