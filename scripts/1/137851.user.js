// ==UserScript==
// @name Simple getting access token
// @version 1.0
// @description Более упрощенное получение токена
// @author Дмитрий Соболев
// @include http://oauth.vk.com/blank.html*
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
  
	if (/http:\/\/oauth.vk.com/.test(w.location.href))
	{
		var get = w.location.href;
		var token = get.substring (get.indexOf("=") + 1, get.indexOf("&"));
		document.write ('<input type="text" value="' + token + '" size="128" autofocus />');
	}
	
})(window);
