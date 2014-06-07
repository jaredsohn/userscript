// ==UserScript==
// @name           Ujas!
// @namespace      ru.dirty
// @description    Ujas!
// @include        http://dirty.ru/*
// @include        http://*.dirty.ru/*
// ==/UserScript==
var theA = document.querySelector('.header_tagline_inner a');
var theUser = 'jovan';
if (theA) {
	theUser = theA.childNodes[0].nodeValue
}
var as = document.getElementsByTagName('a');
var votes = document.querySelectorAll('strong.vote_result');
var bodies = document.querySelectorAll('div.c_body');
function skrewIt() {
	for (i=0; i<as.length; i++) {
		if(as[i] && !as[i].skrewed && (as[i].href.indexOf('dirty.ru/user')>0 || as[i].href.indexOf('/user')==0) && as[i].childNodes[0].nodeValue!=theUser) {
			as[i].href='/user/jovan';
			as[i].textContent = 'jovan';
		}
		as[i].skrewed = true;
	}
	for (i=0; i<votes.length; i++) {
		if(votes[i] && !votes[i].skrewed) {
			votes[i].setAttribute('onclick', '');
			votes[i].textContent = '42';
		}
		votes[i].skrewed = true;
	}
	for (i=0; i<bodies.length; i++) {
		if(bodies[i] && !bodies[i].skrewed) {
			var txt = bodies[i].childNodes[0].nodeValue;
			if (txt && (m = txt.match(/^(\w+)\:/)) && m[1]!=theUser) {
				bodies[i].childNodes[0].nodeValue = 'jovan'+txt.substr(m[1].length);
			}
		}
		bodies[i].skrewed = true;
	}
	
}

skrewIt();
