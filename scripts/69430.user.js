// ==UserScript==
// @name           No ad at top of iGoogle Hotmail Gadget
// @namespace      http://lovemygadget.com/hotmail
// @description    Gets rid of ad at top of iGoogle Hotmail Gadget
// @include        http://mobile.live.com/*
// @include        http://*.mail.live.com/*
// @include        http://mpeople.live.com/*
// @include        https://mid.live.com/si/*
// @include        https://maccount.live.com/*
// ==/UserScript==

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// REMOVE HOTMAIL'S AD AT TOP OF INBOX AND FOLDERS

// Turn off display of ad div
try {
	var oDivs = document.getElementsByClassName('CenterAlignedText AdPanel');
	for( var i = 0; i < oDivs.length; i++ ){
		oDivs[i].style.display = "none";
	}
	
	var oDivs2 = document.getElementsByClassName('AdPanel');
	for( var i = 0; i < oDivs2.length; i++ ){
		oDivs2[i].style.display = "none";
	}
	
	var oDivs3		= document.getElementById( "MAP50Ads" );
	oDivs3.style.display = "none";
} catch(e){}

// end of script

