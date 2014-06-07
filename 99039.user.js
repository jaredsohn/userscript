// ==UserScript==
// @name          Nordic-T - Remove Title Prefix
// @description   Replaces the standard "Nordic-T" title with a more helpfull title for easier browsing.
// @version       1.3
// @author        zinen
// @include       http://nordic-t.org/*
// @include       https://nordic-t.org/*
// ==/UserScript==
var url=document.URL.split("/")[3].split("?")[0]
if(url==''||url=='index.php')document.title='Home';
else if(url=='browse.php'){
	var len=document.URL.search("page");
	if(len==-1)page=0; else page=document.URL.substring(len).split("&")[0].substring(5);
	document.title='Browse - Page '+page;
}else if(url=='Minecraft'){
	document.title='MineRaf';
	var topic=document.anchors[0].nextSibling.lastChild.textContent.substring(3);
	document.title='Topic - '+topic;
}else if(url=='details.php'){
	document.title=document.title.replace(/^Nordic-T :: Details for t/,'T');
}else document.title=document.title.replace(/^Nordic-T :: /,'');