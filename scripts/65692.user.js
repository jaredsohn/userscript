// ==UserScript==
// @name           Sankaku Full News Pics
// @namespace      blah
// @include        http://www.sankakucomplex.com/*
// ==/UserScript==


// Replace thumbnails with real picture URL
var thumbies;
thumbies = document.getElementsByTagName('a');

for (var i = 0; i < thumbies.length; i++){
	if (thumbies[i].innerHTML.indexOf("ngg-singlepic")!=-1){
		var reallink;
		reallink = thumbies[i].getAttribute("href");
		thumbies[i].getElementsByTagName('img')[0].setAttribute("src",reallink);
	}
}