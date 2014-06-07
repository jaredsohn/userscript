// ==UserScript==
// @name          JS libraries
// @namespace     http://zhumingvictor.com/greasemonkey/
// @description   Inject JavaScript Libraries
// @include       *
// ==/UserScript==
// inject prototype
if(typeof Prototype != 'object'){
	var script = document.createElement('script');
	script.src = 'http://prototypejs.org/assets/2009/8/31/prototype.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}