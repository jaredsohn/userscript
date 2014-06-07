// ==UserScript==
// @name        162368
// @include     http://sms.ultoo.com/*
// @namespace   162368
// @description 162368
// @version     1.1
// ==/UserScript==

var path = window.location.pathname;

var url=window.location.href;

pattern=/^http:\/\/sms.ultoo.com\/login.php/g;

if(url.search(pattern)==0)
{
	document.getElementById('refererCode').value=3421693+"S";
}