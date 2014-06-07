// ==UserScript==
// @name           rebutt
// @namespace      http://butts
// @include        http://www.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

function go() {
	window.location='http://en.wikipedia.org/wiki/Special:Random';
}

document.body.innerHTML='<html><head><title>Hello Monkey Butter</title></head><body><h1>Thou shalt not waste time on this website.</h1></body></html>';

setTimeout(go, 6000);