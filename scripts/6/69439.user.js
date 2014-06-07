// ==UserScript==
// @name           No Hotmail Logo at top of iGoogle Hotmail Gadget
// @namespace      http://lovemygadget.com/hotmail
// @description    Gets rid of Hotmail logo at top of iGoogle Hotmail Gadget
// @include        http://*.mail.live.com/*
// @include        http://mpeople.live.com/*
// @include        https://mid.live.com/si/*
// @include        https://maccount.live.com/*
// ==/UserScript==

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// REMOVE HOTMAIL'S LOGO AT TOP OF INBOX AND FOLDERS

// Turn off display of Header in Contacts
try {
	var oElemID = document.getElementById('HeaderContainer');
	oElemID.style.display = "none";
} catch(e){}
// Turn off display of Header in Inbox and Folders

try {
	var oElem = document.getElementsByClassName('HeaderContainer');
	oElem[0].style.display = "none";
} catch(e){}
// end of script

