// ==UserScript==
// @name          Custom Gmail logo
// @description   change gmail logo to any url.
// @author        rgogada
// @version       1.0
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

///// custom logo
if(window.parent!=null && window.parent.parent!=null && window.parent.parent.document.getElementById("canvas_frame")!=null)
{
	frmDocument= window.parent.parent.document.getElementById("canvas_frame").contentDocument;
	var gLogo=frmDocument.getElementById("1fbl");	
	if(gLogo!=null)
		gLogo.style.setProperty("background-image","url(https://mail.google.com/mail/help/images/logo.gif)","important");		
}