// ==UserScript==
// @name           twisted_pin
// @description    Pin Twisted docs to the current version
// @include        http://twistedmatrix.com/documents/*/*
// @exclude        http://twistedmatrix.com/documents/current/*
// ==/UserScript==

(function(){

var p = document.location.pathname.split('/')
	.filter(function(x) { return x != ''; });
p[1] = 'current';
document.location.pathname = p.join('/');

})();