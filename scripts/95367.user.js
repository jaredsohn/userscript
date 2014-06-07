// ==UserScript==
// @name           zhuaguiketchup
// @namespace      chelsear
// @description    CAPTCHA Bypasser to be used with the original AutoHuntScript. Fully functional with chrome without any additional extensions.
// @include        http://www.ghost-trappers.com/fb/*
// ==/UserScript==

/*********** MAIN SCRIPT (DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING!) ***********/


	


if(document.getElementsByName("captcha_id")[0])
	{
var x=document.images
var xx = document.getElementsByName("captcha_id");
var xxx = document.getElementsByClassName("inputtext");

document.title = "Captcha - Bypassing";

x[16].src="http://www.ghost-trappers.com/fb/captcha_image.php?id=1000000";
xx[0].value="1000000";
xxx[0].value="";


setTimeout(function() {document.getElementsByName("captcha_id")[0].parentNode.submit();}, 5000)


	}
