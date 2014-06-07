// ==UserScript==
// @name No new Twitter banner
// @description just remove the top banner which tell you new Twitter available.
// @author ayanamist
// @include https://twitter.com/*
// @include http://twitter.com/*
// @match https://twitter.com/*
// @match http://twitter.com/*
// ==/UserScript==
try {
	var node = document.getElementsByClassName('fixed-banners')[0];
	node.parentNode.removeChild(node);
	node = null;
} catch(err){}
var bodyNode = document.getElementsByTagName('body')[0];
bodyNode.className = bodyNode.className.replace('phoenix-skybar', '');
bodyNode = null;
