// ==UserScript==
// @name           removePoll
// @namespace      removePoll
// @description    Remove poll
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @author      Ryo HAYASHI
// ==/UserScript==

function removePoll(){
	if(document.getElementById('home_stream') === null){
		return;
	}
	var li = document.getElementById('home_stream').childNodes;
	for(var i = 0; i < li.length; i++){
		if(li[i].tagName !== 'LI' || (li[i].attributes[1] && !li[i].attributes[1].nodeValue.match(/qa_poll/)) ||  (li[i].attributes['data-ft'] && !li[i].attributes['data-ft'].firstChild.data.match(/qa_poll/))){
			continue;
		}
		document.getElementById('home_stream').removeChild(li[i]);
	}
}
var t = setInterval(removePoll, 5000);
removePoll();