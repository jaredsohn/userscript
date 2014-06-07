// ==UserScript==
// @name           HTML Grabber
// @namespace      PimpNation
// @description    Allows eaiser access to the HTML
// @version			1.2
// @include        http://*
// ==/UserScript==

function hgDeleteData (){
	var keys = GM_listValues();
	for (var i=0, k = keys.length; i < k ; ++i) GM_deleteValue(keys[i]);		
}

function hgPromptReset() {
	if ( confirm("Delete copied HTML?") ) hgDeleteData();
}

function hgCopyToClipboard() {
	if (window.prompt ("Copy to clipboard: Ctrl+C, Enter (or cancel to not delete saved data)", GM_getValue("html","<!-- FAILED -->")))	hgDeleteData();
}

function hgUnload() {
	var tHTML = GM_getValue("html", "");
	var tSplit = tHTML.split(pageLoadTag);
	if (tSplit.length > 1 ) {
		var tRest = tSplit[1].split("</html>")[0];
		GM_setValue ("html", tHTML.replace(pageLoadTag+""+tRest+"</html>",""));
	}
}

var loadID = Math.floor(Math.random()*1000000000000000);
var pageLoadTag = "<!-- Page Load - ID:"+loadID+" - "+location+" -->";
GM_setValue("html", GM_getValue("html","") +""+ pageLoadTag+"<html><head>"+document.head.innerHTML+"</head><body>"+document.body.innerHTML+"</body></html>");

GM_registerMenuCommand("[HTML-Grabber] - Copy HTML",hgCopyToClipboard);
GM_registerMenuCommand("[HTML-Grabber] - Reset",hgPromptReset);
window.addEventListener("unload",hgUnload, false);