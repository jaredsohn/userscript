// ==UserScript==
// @name           Vkontakte VideoDownloader v1.2 [by GigaByte]
// @namespace      http://vkontakte.ru/*
// @description    Добавляет возможность скачивать видео с сайта Vkontakte.ru / VK.com
// @author         _GigaByte_
// @version        1.2
// @copyright      2010 (C) GigaByte
// @license        Freeware
// @include        http://vkontakte.ru/video*
// @include        http://vk.com/video*
// @match          http://vkontakte.ru/*
// ==/UserScript==

		  
if ((/video-(\d+)_(\d+)/.exec(window.location))||(/video(\d+)_(\d+)/.exec(window.location)))
{
    var allText = document.documentElement.innerHTML;

	var url='';
	var vtag=/"vtag":.(.*?).,/.exec(allText);
	var vkid=/"vkid":.(.*?).,/.exec(allText);
	var uid=/"uid":.(.*?).,/.exec(allText);
	var host=/"host":.(.*?).,/.exec(allText);
	var noflv=/"no_flv":(.*?),/.exec(allText);

	if (/-$/.exec(vtag[1]))
	{
			url="http://"+host[1]+"/assets/videos/"+vtag[1]+vkid[1]+".vk.flv";
	}
	else
	{
		host[1]=host[1].replace(/\\/g,"");
		if (/0/.exec(noflv[1]))
		{
			url=host[1]+"u"+uid[1]+"/video/"+vtag[1]+".flv";
		}
		else
		{
			url=host[1]+"u"+uid[1]+"/video/"+vtag[1]+".240.mp4";
		}
	}
	
	var cont = document.createElement("div");
	cont.setAttribute("style", "float:right");
   	var addon=document.createElement("a");
   	addon.setAttribute("href",url);
   	addon.innerHTML="<b><font color=blue>\u0421\u043A\u0430\u0447\u0430\u0442\u044C</font> / <font color=red>Download</font></b>"; 
   	cont.appendChild(addon);
    	document.getElementById("bigSummary").appendChild(cont);
	
}