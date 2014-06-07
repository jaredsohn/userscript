// ==UserScript==
// @name           fix page links at domaintools.com
// @namespace      muzik
// @description    fix page links at domaintools.com
// @include        http://domain-search.domaintools.com/*
// ==/UserScript==
nav=document.getElementsByClassName('pageLinks')
for (i in nav){
	links=nav[i].getElementsByTagName('a')
	for (j in links){
		links[j].href= links[j].href.replace(/\&time\=[\d\-]+/,'')
	}
}

