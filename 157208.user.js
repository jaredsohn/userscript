// ==UserScript==
// @name        fix
// @namespace   http://blogpagliaccio.wordpress.com
// @description .
// @include     http://*.imperion.*
// @version     1
// ==/UserScript==


setTimeout(function() {
	window.$$('.hideContainer1').toggleClass('hideContainer1','hideContainer');
},5000);