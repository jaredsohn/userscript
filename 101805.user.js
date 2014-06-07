// ==UserScript==
// @name OpenMenu
// @namespace http://vkontakte.ru/people_who_change_vk
// @description Открывает закрытые меню в группах (Opens the menu in groups) Vkontakte
// @include http://vkontakte.ru/*
// @include http://vk.com/*
// @author Infoshoc (Vladymyr Polosukhin)
// @version 0.01
// @date 26.04.2011
// ==/UserScript==
(function (){
function addEvent(el,ev,fun,b){
//By Infoshoc
	if ((window.navigator.userAgent.indexOf('Firefox')>-1)||(window.opera)) el.addEventListener(ev,fun,b)
	else if  (window.navigator.userAgent.indexOf('MSIE')) el.attachEvent(ev,fun);
	return false;
};
	function openMenu(){
		div = document.getElementById('group_wide_topics').previousSibling.childNodes[2];
		if (div) div.style.display = 'block';
	};
	openMenu();
	addEvent(window.opera||window,"mouseover",openMenu,true);
})()