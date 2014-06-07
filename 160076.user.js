// ==UserScript==
// @name        VBgood Director
// @namespace   
// @description VB is Good
// @include     http://*vbgood.com/*
// @version     0.28
// ==/UserScript==
var url = document.location.toString();

var pattern='viewthread.php?tid=';
//alert(url.indexOf(pattern));
	if(url.indexOf(pattern)!=-1)
	{
url = url.replace('http://www.','');
url = url.replace('http://','');

document.location = 'http://www.vbgood.com/thread-' +  url.replace('vbgood.com/viewthread.php?tid=', '') +"-1-1.html" ;
               }
//感谢sailingzyf3.0提供bug