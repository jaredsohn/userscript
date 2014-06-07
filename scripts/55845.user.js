// ==UserScript==
// @name VKontakte "not real" mark removal
// @namespace vkontakte
// @source vkontakte.ru
// @description Removes VKontakte's "User is not real" mark and uses the browser's title to notify if someone has it.
// @include http://vkontakte.ru/id*
// @include http://vkontakte.ru/profile.php?id=*
// @include http://vkontakte.ru/profile.php
// @include http://vk.com/profile.php?id=*
// @include http://vk.com/profile.php
// @include http://vk.com/id*
// ==/UserScript==
'use strict';
//my own crappy fadeout function. works
function removeFade(node)
{
	if (typeof(node) !== 'object'){
	return;
	}
	node.fadeOut=function()
	{
		node.style.opacity=(node.style.opacity)?node.style.opacity:1.0;
		if(node.style.opacity>=0){
		node.style.opacity-=0.045;

		if (!node.style.height){ node.style.height=node.offsetHeight+'px';
		node.style.padding=0;
		node.style.lineHeight=node.offsetHeight;
		}
		node.style.height=node.offsetHeight-3+'px';
		setTimeout(node.fadeOut, 30);
		}
		else {
		node.parentNode.removeChild(node);
		}	
	};
	node.fadeOut();
}
elems = document.getElementsByClassName('profile_warning');
if (elems.length>0){
	document.title=document.title+' -||*not real mark*||-';
	removeFade(elems[0]);
}