// ==UserScript==
// @name           movePoll
// @namespace      movePoll
// @description    Move poll
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @author      Ryo HAYASHI
// ==/UserScript==

function movedPoll(){
	if(document.getElementById('home_stream') === null){
		return;
	}
	var d, li = document.getElementById('home_stream').childNodes;
	if(document.getElementById('movedPoll') === null){
		var r = document.getElementById('rightCol');
		var ul = document.createElement('ul');
		ul.id = 'movedPoll';
		r.appendChild(ul);
	}
	for(var i = 0; i < li.length; i++){
		if(li[i].tagName !== 'LI' || (li[i].attributes[1] && !li[i].attributes[1].nodeValue.match(/qa_poll/)) ||  (li[i].attributes['data-ft'] && !li[i].attributes['data-ft'].firstChild.data.match(/qa_poll/))){
			continue;
		}
		document.getElementById('movedPoll').appendChild(li[i]);
	}
}
var t = setInterval(movedPoll, 5000);
movedPoll();
