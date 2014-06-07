// ==UserScript==
// @name           TSR confirm unsubscribe
// @namespace      
// @include        http://www.thestudentroom.co.uk/*
// @include        http://static.thestudentroom.co.uk/*
// ==/UserScript==
// Made by secretmessages

var links=document.getElementsByTagName('div');
var links2=document.getElementsByTagName('span');

for(var x=0;x<links.length;x++){
	if(links[x].getAttribute('class')=='smallfont forumunsubscribe'){
		links[x].setAttribute('onclick','return confirm(\'Are you sure you want to unsubscribe from this forum?\')')
	}
}

for(var y=0;y<links2.length;y++){
	if(links2[y].getAttribute('class')=='widgetfont11'){
		links2[y].setAttribute('onclick','return confirm(\'Are you sure you want to unsubscribe from this thread?\')')
	}
}