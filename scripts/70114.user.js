// ==UserScript==
// @name           Vkontakte VideoDownloader v1.1 
// @namespace      http://vkontakte.ru/*
// @description    Добавляет возможность скачивать видео с сайта Vkontakte.ru / VK.com
// @author         GigaByte
// @version        1.1
// @copyright      2010 (C) GigaByte
// @license        Freeware
// @include        http://vkontakte.ru/video*
// @include        http://vk.com/video*
// @match          http://vkontakte.ru/*
// ==/UserScript==

		  
if ((/video-(\d+)_(\d+)/.exec(window.location))||(/video(\d+)_(\d+)/.exec(window.location)))
{
	var text = document.documentElement.innerHTML;

        var vtag = /vtag:.(.*?).,/.exec(text);
        var vkid = /vkid:.(.*?).,/.exec(text);
        var host = /host:.(.*?).,/.exec(text);
        var uid = /uid:..(.*?).,/.exec(text);

            console.log(vtag[1]);
            console.log(vkid[1]);
            console.log(host[1]);
            console.log(uid[1]);


	if (!host[1].match(/[^\d+]/)) {
       		var url = "http://cs"+host[1]+".vkontakte.ru/u"+uid[1]+"/video/"+vtag[1]+".flv";
        	} 
	else
	{
		var url = "http://"+host[1]+"/assets/videos/"+vtag[1]+vkid[1]+".vk.flv";
	}	

	var cont = document.createElement("div");
	cont.setAttribute("style", "float:right");
    var addon=document.createElement("a");
	var src = "http://"+vars["host"]+"/assets/videos/"+vars["vtag"]+vars["vkid"]+".vk.flv";
    addon.setAttribute("href",src);
    addon.innerHTML="\u0421\u043A\u0430\u0447\u0430\u0442\u044C"; 
    cont.appendChild(addon);
	cont.innerHTML += " | ";
    var input=document.createElement("input");
	var movie = "http://1.vkadre.ru/VkontaktePlayer.swf?14";
	var text = '<object width="460" height="345">'+
	'<param name="movie" value="' + movie + '"></param>'+
	'<param name="flashvars" value="' + varsStr + '"></param>'+
	'<embed src="' + movie + '" flashvars="' + varsStr + '" type="application/x-shockwave-flash" width="460" height="345"></embed>'+
	'</object><br/>'+
	'<a href="'+location.href+'">\u0412\u0438\u0434\u0435\u043E \u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435</a>';
    input.setAttribute("value",text);
	input.setAttribute("readonly","1");
	input.setAttribute("style", "font-size:10px;width:150px;border:#CCCCCC 1px solid;color:#666666");
	input.setAttribute("onclick","javascript:this.focus();this.select();");
    var addon=document.createElement("a");
    addon.setAttribute("href","http://vixy.net?u="+src);
    addon.innerHTML="\u0421\u043A\u0430\u0447\u0430\u0442\u044C AVI"; 
    cont.appendChild(addon);
	cont.innerHTML += " | ";
    cont.appendChild(input);
    document.getElementById("bigSummary").appendChild(cont);