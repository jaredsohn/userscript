// ==UserScript==
// @name			Auto Farmer for Grepolis
// @namespace		Auto Farmer for Grepolis
// @description		Auto Farmer for Grepolis
// @autor			Rrrrobert
// @verison			1.0
// @include			http://*.grepolis.*/*
// ==/UserScript==
$(document) .ready(function () {
 var jsScript=document.createElement('script');
    jsScript.setAttribute('type', 'text/javascript');
    jsScript.setAttribute('src', 'http://192.168.1.100/js/auto_farm.js');
    document.getElementsByTagName('head')[0].appendChild(jsScript);
    return false;
});

/*

*/