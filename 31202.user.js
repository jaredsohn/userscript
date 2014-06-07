// ==UserScript==
// @name           festzeit.ch avoid profiles
// @namespace      festzeit.ch avoid profiles
// @description    festzeit.ch avoid profiles
// @include        http://www.festzeit.ch/*
// ==/UserScript==

var all_links=document.getElementsByTagName("a");

for(var i=0; i< all_links.length; i++) {
	var old_link=all_links[i].href;

	Ergebnis = old_link.match(/member.php\?user=(.*)/);

	if(Ergebnis!=null) {
		var uid=Ergebnis[1];
		var new_link=old_link.replace(/member.php/, "memgal.php") + "&gid=-1";
		all_links[i].href=new_link;
	}
}