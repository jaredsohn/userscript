// ==UserScript==
// @name            hitlike.com downloader
// @include http://*hitlike.com/*
// ==/UserScript==
(function(){
	var link=document.getElementsByName("movie");
	var tr=document.getElementsByTagName('tr');
	var l="";
	if(link.length>0){
		l=link[0].value.slice(20).split('&');
	}
	if(l.length>0 && tr.length>4){
		tr[4].innerHTML='<td><a href="'+l[0]+'" target="_blank">下载这个声音</a></td>'
	}
})();