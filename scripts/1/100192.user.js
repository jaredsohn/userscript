// ==UserScript==
// @name Service Desk fixer
// @description Service Desk fixer
// @namespace servicedeskfixer
// @include http*://service.qc.cuny.edu/*
// ==/UserScript==

var yourbases = document.getElementsByTagName("base");

for (var i = 0; i < yourbases.length; i++) {
	var yourbase = yourbases[i];
	yourbase.parentNode.removeChild(yourbase);
}
