// ==UserScript==
// @name           Open with Google Viewer
// @namespace      http://userscript.org/
// @description    Opens PDF, PPT, and TIFF in Google Viewer.
// @include        *
// @exclude        http://docs.google.com/*
// ==/UserScript==

(function () {
	var link, l=0;
	while(link=document.links[l++]){
		if(link.href.indexOf('.pdf')!=-1||link.href.indexOf('.ppt')!=-1||link.href.indexOf('.tiff')!=-1				||link.href.indexOf('.tif')!=-1&&link.href.indexOf('javascript')==-1&&link.href.indexOf('file:')==-1){
			var newString='http://docs.google.com/viewer?url='+link.href;link.href=newString;
		}
	}
})();