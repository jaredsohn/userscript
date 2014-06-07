// ==UserScript==
// @name           Remove Digg Bar
// @namespace      troynt+digg-bar-remover@gmail.com
// @description    Removes Digg Bar
// @include        http://digg.com/*
// ==/UserScript==
var iframe = document.getElementsByTagName('iframe');
if( iframe.length == 1 && iframe[0].name == 'diggiFrame' )
	window.location.href = iframe[0].src;