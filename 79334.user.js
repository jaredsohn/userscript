// ==UserScript==
// @name           timestamp
// @namespace      127.0.0.1
// @include        http://boards.adultswim.com/t5/*
// ==/UserScript==


var timestamp = document.getElementsByClassName("lia-message-posted-on");
var timestamppos = document.getElementsByClassName("lia-message-statistics");
for (i=0;i<timestamp.length;i++){
	if(window.location.href.indexOf('m-p') != -1 || window.location.href.indexOf('td-p') != -1){
	var timestampcont = timestamp[i].innerHTML;
	timestamp[i].style.display = "none";
	
	timestamppos[i].innerHTML ='<br>'+ timestamppos[i].innerHTML +'<br>'+ timestampcont;
}
}
	
