// ==UserScript==
// @name RecommendsBlock
// @version 1.0
// @description Убирает блок рекомендаций с /feed
// @author Дмитрий Соболев
// @include vk.com/*
// @include http://vk.com/*
// @include https://vk.com/*
// ==/UserScript==

(function(window, undefined) 
{
	var w;
	  
	if (typeof unsafeWindow != undefined) 
	{ 
		w = unsafeWindow;
	} 
	else 
	{ 
		w = window;
	}
  
	if (w.self != w.top)
	{
		return;
	}
	
  
	if (/http:\/\/vk.com/.test(w.location.href) || /https:\/\/vk.com/.test(w.location.href))
	{
		document.getElementById('feed_recommends').style.display = 'none';
	}
})(window);
