// ==UserScript==
// @name            Diesel Sweeties Keys
// @description     lets you use the left and right arrows on dieselsweeties.com
// @include         http://dieselsweeties.com/*
// @include         http://www.dieselsweeties.com/*
// ==/UserScript==
// Configured for dieselsweeties.com by Jared Grippe

var keydowngoto = new Object();

document.addEventListener('keypress', function(event) {
 	if (event.keyCode  == 37){
 		if (keydowngoto.last) location.href = keydowngoto.last.href;
 		return false;
 	}else if (event.keyCode  == 39){
		if (keydowngoto.next) location.href = keydowngoto.next.href;
		return false;
 	}
 	return true;
}, false);

window.addEventListener('load', function () {

 	var tags = document.body.getElementsByTagName('a');

 	for(var i=0; i<tags.length; i++) {
 		if (tags[i].title == 'read the next comic') 		{ keydowngoto.next = tags[i];}
 		if (tags[i].title == 'read the previous comic' || tags[i].firstChild.nodeValue == 'Read the previous comic') { keydowngoto.last = tags[i];}
 	}
 }, false);
