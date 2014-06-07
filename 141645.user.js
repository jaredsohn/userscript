// ==UserScript==
// @run-at		document-end
// @nocompat
// @name		Loader
// @namespace	HAARP
// @description	Hockey Arena Analytical Research Program. Юзерскрипт для http://www.hockeyarena.net/ 
// @version		0.3.1
// @updateURL   http://pawelitel.github.com/HAARP/haarp.meta.js
// @downloadURL	http://pawelitel.github.com/HAARP/haarp.user.js
// @author		P4w3133731
// @include		http://*.hockeyarena.net/ru/*
// @include		http://hockeyarena.net/ru/*
// @match		http://*.hockeyarena.net/ru/*
// @match		http://hockeyarena.net/ru/*
// ==/UserScript==

var _timer = setInterval(function(window, undefined )
{
	clearInterval(_timer);
	
	try
	{
		var w;
		if (typeof unsafeWindow != undefined)//для мозиллы
		{
			w = unsafeWindow
		} else
		{
			w = window;  
		}
		if (w.self != w.top)//не запускать во фреймах
		{
			return;
		}

		if (undefined == w.document.getElementsByTagName("head")[0])//для страниц без скриптов
		{
			if (undefined == w.document.getElementsByTagName("html")[0])
			{
				var sc = w.document.createElement("html");
				document.appendChild(sc)
			}
			var sc = w.document.createElement("head"),
				elm = w.document.getElementsByTagName("html")[0];
			elm.appendChild(sc)
		};
		function load (w,href)
		{
			var scriptYN = w.document.createElement("script");
			scriptYN.type = "text/javascript";
			scriptYN.async = false;
			scriptYN.src = href;
			w.document.getElementsByTagName('head')[0].appendChild(scriptYN);
		}

		load(w,'http://pawelitel.github.com/CDN/javascripts/min/breeze.min.js');
		load(w,'http://pawelitel.github.com/CDN/javascripts/min/simpleCookie.min.js');
		load(w,'http://pawelitel.github.com/HAARP/media/js/loader.js');
		
	} catch (e){console.error(e)}
}(window), 20);