// ==UserScript==
// @name		video_resize
// @namespase		http://hedgehog.name
// @match		http://vkontakte.ru/*
// @match		https://vkontakte.ru/*
// @match		http://*.vkontakte.ru/*
// @match		https://*.vkontakte.ru/*
// @match		http://vk.com/*
// @match		https://vk.com/*
// @match		http://*.vk.com/*
// @match		https://*.vk.com/*
// @include		http://vkontakte.ru/*
// @include		https://vkontakte.ru/*
// @include		http://*.vkontakte.ru/*
// @include		https://*.vkontakte.ru/*
// @include		http://vk.com/*
// @include		https://vk.com/*
// @include		http://*.vk.com/*
// @include		https://*.vk.com/*
// ==/UserScript==

(function(){
	function vk_check(){
		var vk_video_box_wrap=document.getElementById('video_player');
		vk_video_box_wrap.setAttribute('style','z-index:2;position:absolute;left:-360px;top:-80px;width:1440px;height:820px');
	}

	setInterval(vk_check,1000);
})()
