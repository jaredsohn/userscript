// ==UserScript==
// @name        rapidgator captcha warn
// @namespace   mezb
// @description rapidgator captcha warn
// @include     http://rapidgator.net/download/*
// @version     1
// @grant       none
// ==/UserScript==


if(document.getElementById("captchaform")) {
	
	document.getElementById("adcopy_response").focus();
	alert("rapidgator captcha is waiting");
		
}