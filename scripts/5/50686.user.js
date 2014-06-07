// ==UserScript==
// @name           GetApp.info Wait time skipper
// @namespace      http://userscripts.org/users/93186/
// @description    Shows captcha on GetApp.info
// @include        http://getapp.info/download/*
// @include        http://*.getapp.info/download/*
// ==/UserScript==

var elm = document.getElementById('showcode');
	elm.style.visibility = "visible";
var timer = document.getElementsByName("redirect2").item(0);
	timer.parentNode.removeChild(timer);