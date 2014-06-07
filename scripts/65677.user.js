// ==UserScript==
// @name           Vkontakte Video without Flash
// @namespace      khades
// @description    based on Dmitriy geels "Vkontakte Native player" and Vkontakte VideoDownloader v1.1 by GigaByte. plainly a dirty hack
// @include        http://vkontakte.ru/video*
// @include        http://vk.com/video*
// @match          http://vkontakte.ru/*
// ==/UserScript==

var content_type = 'video/flv';
// embed height adjust value for totem plugin
var controls_height = 27;

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


	var player=/['"]player["'][\s,]+['"](\d+)["'][\s,]+['"](\d+)["'][\s,]+['"]\d+["']/.exec(text);
	if (!host[1].match(/[^\d+]/)) {
		        var url = "http://cs"+host[1]+".vkontakte.ru/u"+uid[1]+"/video/"+vtag[1]+".flv";
			        }
	else
	{
		        var url = "http://"+host[1]+"/assets/videos/"+vtag[1]+vkid[1]+".vk.flv";
	}

	var placeholder = document.getElementById('flash_player_container_outer');
	placeholder.style.height=parseInt(player[2]) + controls_height + 'px';
	placeholder = document.getElementById('flash_player_container');
	while(placeholder.firstChild) placeholder.removeChild(placeholder.firstChild);

	var new_embed = document.createElement('object');
	new_embed.setAttribute('width', player[1]);
	new_embed.setAttribute('height', parseInt(player[2]) + controls_height);
	new_embed.setAttribute('loop', 'no');
	new_embed.setAttribute('autoplay', 'no');
	new_embed.setAttribute('type', content_type);
	new_embed.setAttribute('data', url);

	placeholder.appendChild(new_embed);

	var cont = document.createElement("div");
	cont.setAttribute("style", "float:right");
	var addon=document.createElement("a");

	addon.setAttribute("href",url);
	addon.innerHTML="Download";
	cont.appendChild(addon);
	document.getElementById("bigSummary").appendChild(cont);

}
