// ==UserScript==
// @name           Adult Friend Finder chat resize
// @namespace      tag:thorarin@gmail.com,2010:Greasemonkey
// @description    Resizes the chat windows on Adult Friend Finder / Passion.com
// @include        http://chat.adultfriendfinder.com/p/chat/makeroom.cgi?*
// @include        http://chat.adultfriendfinder.com/p/flashchat/flash_chat.cgi?*
// @include        http://passion.com/p/chat/makeroom.cgi?*
// @include        http://passion.com/p/flashchat/flash_chat.cgi?*
// ==/UserScript==

function onload()
{
	var success = resizeHtmlChat() || resizeFlashChat();
	//alert("done");
}

function resizeHtmlChat()
{
	var content = document.getElementById("content");
	if (content == undefined)
		return false;

	var sidebar = document.getElementById("chat_sidebar");
	if (sidebar == undefined)
		return false;

	var chatContent = document.getElementById("chat_maincon");
	if (chatContent == undefined)
		return false;
		
	content.style.width = "100%";	
	sidebar.style.width = "200px";	
	chatContent.style.marginLeft = "200px";
	chatContent.style.cssFloat = "none";
	chatContent.style.width = "inherit";
	
	return true;
}

function resizeFlashChat()
{
	var content = document.getElementById("content");
	if (content == undefined)
		return false;

	var flash = document.getElementById("flash_object");
	if (flash == undefined)
		return false;

	var viewer = document.getElementById("viewer_obj");
	if (viewer == undefined)
		return false;

	content.style.width = "100%";	
	flash.style.width = "100% !important";	
	viewer.style.width = "100% !important";	
	flash.width = "100%";
	viewer.width = "100%";
	
	return true;
}


window.addEventListener('load', onload, true);
