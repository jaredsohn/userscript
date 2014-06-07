// ==UserScript==
// @name           TSR confirm rate post
// @namespace      
// @include        http://www.thestudentroom.co.uk/*
// @include        http://*www.thestudentroom.co.uk/*
// @include        http://tsrdev2.thestudentroom.co.uk/*
// ==/UserScript==
// Made by secretmessages

var links=document.getElementsByTagName('img');

for(var x=0;x<links.length;x++){
        if(links[x].getAttribute('src')=='http://static.thestudentroom.co.uk/images/buttons/ha_thumbsup_gray.gif'){
		links[x].setAttribute('onclick','return confirm("Are you sure you want to rate this post positively?")')
	}
}

for(var x=0;x<links.length;x++){
        if(links[x].getAttribute('src')=='http://static.thestudentroom.co.uk/images/buttons/ha_thumbsdn_gray.gif'){
		links[x].setAttribute('onclick','return confirm("Are you sure you want to rate this post negatively?")')
	}
}