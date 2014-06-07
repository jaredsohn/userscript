// ==UserScript==
// @name                Unblackout Wikipedia
// @namespace	        http://en.wikipedia.org/wiki/Main_Page/?unblackout
// @description	        unblockout wikipedia
// @include		http://en.wikipedia.org/wiki/*
// @include		https://en.wikipedia.org/wiki/*
// ==/UserScript== 

var i = 0;
var t = setInterval(unblockout,50);

function unblockout() {
	i++;
	if(document.getElementById('mw-sopaOverlay')){
		document.getElementById('mw-sopaOverlay').style.display = 'none';
		document.getElementById('mw-page-base').style.display = 'inherit';
		document.getElementById('mw-head-base').style.display = 'inherit';
		document.getElementById('content').style.display = 'inherit';
		document.getElementById('mw-head').style.display = 'inherit';
		document.getElementById('mw-panel').style.display = 'inherit';
		document.getElementById('footer').style.display = 'inherit';
		clearInterval(t);
	} else if(i > 302) {
		console.log('timeout');
		clearInterval(t);
	}
}




