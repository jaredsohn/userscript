// ==UserScript==
// @name           Viigo Bar Remover
// @namespace      troynt+viigobar@gmail.com
// @description    Remove Viigo Bar
// @include        http://viigo.im/*
// ==/UserScript==
var iframe = document.getElementsByTagName('iframe');
if( iframe.length == 1 )
	window.location.href = iframe[0].src;