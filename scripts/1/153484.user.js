// ==UserScript==
// @name           VK friend remove
// @namespace      VK friend remove
// @include        http://vk.com/*
// @match          http://vk.com/*
// @include        https://vk.com/*
// @match          https://vk.com/*
// ==/UserScript==

var old = document.evaluate('//*[@id="profile_am_subscribed"]', document, null, 9, null).singleNodeValue;
del = document.evaluate('//*[@id="friend_remove"]', document, null, 9, null).singleNodeValue;

var stl = del.getAttribute('style');

if(stl != "display: none")
{
	old.removeAttribute('onmouseover');
	old.removeChild(old.firstChild)
	old.appendChild(del);
}

