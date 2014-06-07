// ==UserScript==
// @name           Vkontakte native player
// @namespace      http://dmitriy.geels.googlepages.com/
// @description    Watch flash videos from VKontakte.ru with MPlayer/Xine/VLC
// @include        http://vkontakte.ru/video*
// ==/UserScript==

var content_type = 'video/flv';
// embed height adjust value for totem plugin
var controls_height = 27;

if ((/video(\d+)/.exec(window.location))||(/video(.*)\&id=(\d+)/.exec(window.location)))
{
	var allText = document.getElementById('bigResult').innerHTML;
	var vtag=/vtag:\s*['"]([\w-]+)["']/.exec(allText)[1];
	var vkid=/vkid:\s*['"]([\w-]+)["']/.exec(allText)[1];
	var host=/host:\s*['"]([\w-\.]+)["']/.exec(allText)[1];
	var player=/['"]player["'][\s,]+['"](\d+)["'][\s,]+['"](\d+)["'][\s,]+['"]\d+["']/.exec(allText);

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
	new_embed.setAttribute('data', 'http://'+ host +'/assets/videos/' + vtag + vkid + '.vk.flv');

	placeholder.appendChild(new_embed);
}
