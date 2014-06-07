// ==UserScript==
// @name           Open with Google JS PDF Viewer
// @namespace      http://userscript.org/
// @description    Looks for PDF links in the page and sets them to open in Google's Javascript PDF reader.
// @include        *
// @exclude        http://docs.google.com/*
// ==/UserScript==

(function () {
	dl=document.links;
	for(i=0;i<dl.length;++i){
		if(dl[i].href.substr(-4)==".pdf" || dl[i].href.substr(-4)==".ppt" || dl[i].href.substr(-4)==".doc"){
			dl[i].href="http://docs.google.com/gview?&url="+dl[i].href;
		}
	}
})();