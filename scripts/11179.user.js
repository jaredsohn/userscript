// ==UserScript==
// @name           Google Disinformation Remover
// @namespace      http://www.userscripts.org
// @description    Removes wiciapedia disinformation from google search results.
// @include        http://*.google.com/*
// @include        http://google.com/*
// ==/UserScript==

var a = document.getElementsByTagName("a");
for (b=0;b<a.length;b++){
  if (a[b].className.match(/l/i)){
	if (a[b].href.search("wikipedia.org")!=-1){
	  if (a[b].parentNode.parentNode.className.match(/g/i)){
		a[b].parentNode.parentNode.setAttribute("style", "display:none!important;visibility:hidden!important;");
		}
	  }
	}
  }
