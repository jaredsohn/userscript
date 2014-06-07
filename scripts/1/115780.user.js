// ==UserScript==
// @name          Add Links to Google Bar
// @version       1.0
// @namespace     http://nitinjain.info
// @description	  Adds new links to the Google Bar
// @license       GPL v2
// @grant         none
// @include       https://*.google.com/*
// @include       http://*.google.com/*

// ==/UserScript==

var googlebar = document.getElementById('gbz').getElementsByClassName('gbtc')[0];
var newLinks =[];

// Add your links here..
newLinks.push({name: 'Facebook', href: 'http://www.facebook.com'});
newLinks.push({name: 'Yahoo', href: 'http://www.yahoo.com'});
newLinks.push({name: 'Bing', href: 'http://www.bing.com'});


for (var i = 0; i < newLinks.length; i++) {
	var newli = document.createElement('li');
	newli.setAttribute('class', 'gbt');
	googlebar.appendChild(newli);
	var newlink = document.createElement('a');
	newlink.setAttribute('href', newLinks[i].href);
	newlink.setAttribute('class', 'gbzt');
	newli.appendChild(newlink);
	var span1 = document.createElement('span');
	span1.setAttribute('class', 'gbtb2');
	newlink.appendChild(span1);
	var textlink = document.createElement('span');
	textlink.setAttribute('class', 'gbts');
	textlink.innerHTML = newLinks[i].name;
	newlink.appendChild(textlink);

}