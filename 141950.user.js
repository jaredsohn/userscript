/*
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004
Copyright (C) 2012 Eugeny Babichenko <lohmatiyy@ukr.net>
Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
*/


// ==UserScript==
// @name VK NoSmile
// @namespace Vk Scripts
// @version 0.01 beta
// @description Удаляет стандартные смайлы из ВКонтакте
// @include http://vk.com/*
// ==/UserScript==

document.onload=function (){
	IM.getEmojiHTML=(function(code){
		return IM.cssEmoji[code][1];
	}
)};
