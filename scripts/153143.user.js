// ==UserScript==
// @name        Facebook: Hide mobile and inactive users in chat sidebar
// @namespace   http://userscripts.org/users/115601
// @description   Hides the random selection of inactive and mobile users that Facebook for some reason thinks you want to see in the chat sidebar, and just shows the people that are actually available to chat.
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @version     1.0.2
// ==/UserScript==

function userScript_hideInactiveChatUsers()
{
	var cssCode = ".fbChatOrderedList li { display:none; }";
	cssCode = cssCode + "\n.fbChatOrderedList li.active { display:block; }";
	
	var style = document.getElementById('userScript_hideInactiveChatUsers_element');
	
	if (!style)
	{
		style = document.createElement('style');
		style.id = 'userScript_hideInactiveChatUsers_element';
		document.head.appendChild(style);
	}
	
	style.innerHTML = cssCode;

}

userScript_hideInactiveChatUsers();
window.addEventListener("load", userScript_hideInactiveChatUsers, false);