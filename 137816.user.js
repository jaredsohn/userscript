// ==UserScript==
// @name VK Developers URL
// @version 3.0
// @description Выводит ссылку «Разработчикам» в левом блоке сайта ВКонтакте
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
		var devurl = document.createElement("li");
		// разделение на русскую и английскую версию
		if (document.getElementById("l_ap").innerHTML.indexOf('Приложения') > 0)
		{
			devurl.innerHTML = '<a class="left_row" href="http://vk.com/dev"><span class="left_label inl_bl">Разработчикам</span></a>';
		}
		else
		{
			devurl.innerHTML = '<a class="left_row" href="http://vk.com/dev"><span class="left_label inl_bl">Developers</span></a>';
		}
		document.getElementById("myprofile_table").parentNode.parentNode.appendChild(devurl);
	}
})(window);
