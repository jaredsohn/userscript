// ==UserScript==
// @name           facebook lhs chat
// @description    facebook lhs chat
// @namespace      http://ims123.blogspot.com
// @include        http://facebook.com/*
// @include		   http://facebook.com
// @include        http://www.facebook.com/*
// @include		   http://www.facebook.com
// ==/UserScript==


function callFBChatShifter()
{
	(document.getElementsByClassName('fbChatSidebar')[0]).style.right = "1082px";
	(document.getElementsByClassName('fbChatSidebar')[0]).style.borderRight = "1px solid #B3B3B3";
	document.getElementById("globalContainer").style.left = "92px";
	document.getElementById("globalContainer").style.width = "1076px";
}
setTimeout(callFBChatShifter, 3000);