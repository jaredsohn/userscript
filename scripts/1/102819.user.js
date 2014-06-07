// ==UserScript==
// @name           filesonic
// @namespace      +++
// @description    filesonic link
// @include        http://jav24h.com/*
// ==/UserScript==


ancs = document.getElementsByTagName("a");
for(i=0;i<=ancs.length;i++){
 if(ancs[i].href.toLowerCase().indexOf('http://www.filesonic.com/file/') != -1) {
	ancs[i].innerHTML = ancs[i].href;
 }	
    
}