// ==UserScript==
// @name           VKontakte menu extender
// @namespace      http://vkontakte.net.ru
// @description    VKontakte menu extender
// @include        http://vkontakte.ru/*
// ==/UserScript==

function AddFriendsOnlineMenu()
{
	var listItem = document.getElementById('myfriends');
	
	var lnk = document.createElement('a');
		lnk.setAttribute('href','/friends.php#online');
		lnk.innerHTML = 'online';
	
	listItem.appendChild(lnk);
		
	itemLinks = listItem.getElementsByTagName('a')
	itemLinks[0].style.cssText = 'float:left;';
	itemLinks[1].style.cssText = 'text-align:right;color:gray;';
}

function  ExtendMenu() {
	AddFriendsOnlineMenu();
}

ExtendMenu();