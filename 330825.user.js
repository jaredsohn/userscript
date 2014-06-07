// ==UserScript==
// @name        zz3: anit-unicom
// @namespace   zz3: anit-unicom
// @description 反联通神经病发作广告
// @version     1
// @grant       none
// ==/UserScript==


function reload()
{
	window.location = window.location;
}
//
var txt = document.documentElement.innerHTML;
//
if (txt.indexOf('function i(_,__){_+=__;var $="";for(var u=0;u<_.length;u++){var r=_.charCodeAt(u);$+=String.fromCharCode(r-1);}return $;}')>=0)
{
	alert('alert! hijack by chinaunicom!');
	window.setTimeout(reload, 500);
}
