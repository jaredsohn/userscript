// ==UserScript==
// @name        FacebookFontFixerFarsi
// @namespace   Facebook
// @description Just a small script to fix Facebook font type for persian users.
// @include     https://www.facebook.com/
// @include     http://www.facebook.com/
// @include     http://facebook.com/*
// @include     https://*.facebook.com/
// @include     https://www.facebook.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function() {
	var doc = document;
	var stl = doc.createElement('style');
	stl.type = 'text/css';
	stl.appendChild(doc.createTextNode('* { font-family: "Droid Serif", "Droid Arabic Naskh",Tahoma; } textarea, .textInput, .UFIAddCommentInput, .UFIAddCommentInput *, .tickerFeedMessage { font-family: Tahoma !important; }'));
	doc.body.appendChild(stl);
})();
