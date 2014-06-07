// ==UserScript==
// @name           Revision3 Mobile High Quality
// @namespace      http://www.darrellenns.com
// @description    Provide high quality links on m.revision3.com
// @include        http://m.revision3.com/*
// ==/UserScript==
orig=document.getElementsByClassName("watch_disclosure")[0];
if(orig) { 
	small_link=document.createElement('a');
	small_link.href=orig.href;
	small_link.appendChild(document.createTextNode('Low Quality'));

	orig.href=orig.href.replace("small.h264","large.h264");

	content_div=document.getElementsByClassName("content")[0];
	content_div.insertBefore(small_link,content_div.childNodes[8]);
}

