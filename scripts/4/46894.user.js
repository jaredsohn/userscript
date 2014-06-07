// ==UserScript==
// @name           zShare AutoDownloader
// @namespace      #aVg
// @include        http://*zshare.net/download/*
// @include        http://*zshare.net/video/*
// @include        http://*zshare.net/audio/*
// @version        0.1.1
// @description    Auto-starts zShare downloads.
// ==/UserScript==
GM_xmlhttpRequest({
	url : location.href.replace(/\/(?:vide|audi)o\//i,"/download/"),
	method : "POST",
	headers : {
		"Content-type" : "application/x-www-form-urlencoded"
	},
	data : "download=1&imageField=&referer2=",
	onload : function(A) {
		location.href=A.responseText.match(/new Array\(([^)]+)/)[1].replace(/[,']/g,"");
	}
});