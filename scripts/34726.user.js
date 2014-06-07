// ==UserScript==
// @name           News1.co.il Original Links
// @namespace      http://userscripts.org/users/68036
// @description    Changes the 'redirect pages' URLs to the real URLs
// @include        http://www.news1.co.il/*
// ==/UserScript==

links = document.getElementsByTagName("a");
for(i = 0; i < links.length; i++) {
	ref = links[i].href;
	n1 = ref.match(/[0-9]+[0-9]/);
	n2 = ref.match(/[0-9]*$/);
	if(n1 && n2 && ref.match("BringHtmlDoc")) ref = "http://www.news1.co.il/Archive/00" + n2[0] + "-D-" + n1[0] + "-00.html";
	links[i].href = ref;
}