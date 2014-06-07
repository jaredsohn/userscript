// ==UserScript==
// @name           AutoCaptcha
// @namespace      GratisWallieCard
// @description    Adds the Captcha to the textbox
// @include        http://*gratiswalliecard.nl/login.php
// @include	   http://*gratiswalliecard.nl/registreren.php
// ==/UserScript==

var textbox = document.getElementsByName("captcha")[0];
if(textbox != null)
{
	var contentCode = document.getElementById("content").innerHTML;
	document.getElementById("content").innerHTML = contentCode + "<br><h5>Captcha patched by MHDev!</h5>";
	textbox = document.getElementsByName("captcha")[0];	
	var captcha = contentCode.split("Captcha: ")[1].split("<")[0];
	var patching = document.createAttribute("value");
	patching.nodeValue = captcha;
	textbox.setAttributeNode(patching);
}