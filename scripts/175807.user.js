// ==UserScript==
// @name        anti-namefag (stackoverflow edition)
// @namespace   stackoverflow
// @description Anonymizer for stackoverflow
// @include     http://stackoverflow.com/*
// @include     http://www.stackoverflow.com/*
// @version     0.01
// @grant       none
// ==/UserScript==
var i,a;

// for /question/*
a = document.getElementsByClassName('user-details');
for(i=0;i<a.length;i++) a[i].innerHTML = '';
a = document.getElementsByClassName('user-gravatar32');
for(i=0;i<a.length;i++) a[i].innerHTML = '';
a = document.getElementsByClassName('reputation-score');
for(i=0;i<a.length;i++) a[i].innerHTML = '';

// for front page:
a = document.getElementsByTagName('a');
for(i=0;i<a.length;i++) {
	if(a[i].href.indexOf('http://stackoverflow.com/users/')==0) {
		a[i].innerHTML = '';
	}
}
