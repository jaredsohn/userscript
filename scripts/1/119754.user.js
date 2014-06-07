// ==UserScript==
// @name			Facepunch Snow Remover 2011
// @description		        Makes snow go away
// @include			http://*.facepunch*.com/*
//
// ==/UserScript==


var x = document.body.getElementsByTagName("canvas")[0];document.body.removeChild(x);
for(var i = 0; i < 400; i++) { clearInterval(i); }
