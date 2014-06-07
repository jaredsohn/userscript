// ==UserScript==
// @name	VkMini (GroupStats)
// @version	0.1
// @author	http://vkontakte.ru/helixx
// @description	Hides all profile info except your music list and groups you own | Скрывает всю инфу кроме музыки и списка групп которыми вы владеете
// @include	http://*.vkontakte.ru/*
// @include	http://*.vk.com/*
// @include	http://vkontakte.ru/*
// @include	http://vk.com/*
// ==/UserScript==


//
document.getElementsByClassName('narrow_column fl_l')[0].setAttribute('style', 'display:none;width:0');
document.getElementsByClassName('wide_column fl_r')[0].setAttribute('style', 'width:100%');
document.getElementById('profile_full_info').setAttribute('style', 'display:none;');
document.getElementById('profile_info').setAttribute('style', 'display:none;');


function get(url, handle) {
	GM_xmlhttpRequest({
		method : "GET",
		url : url,
		onload : function(o) {
			handle(o.responseText);
		}
	});
}

function pars1(text) {

var data = text.match(/<div class=\"groupslist\"[\s\S]*?>([\s\S]*?) <\/div>[\s\S]*?<div class=\"clearFix\">/)[1];
 

var gids = data.match(/<a id=\"groupName[\s\S]*?управление группой[\s\S]*?<\/table>/g);
var e = document.createElement("div");
e.innerHTML += '<b>Ваши группы:</b><p></p>';
for(var j=0;j<gids.length;j++) {
	var g_data = gids[j];
	var current = g_data.match(/<a id=\"groupName[\s\S]*?>[\s\S]{1,60}/)[0];
	var users   = g_data.match(/&c\[group\]=\d+\">([\s\S]*?)<\/a>/)[1];	
	e.innerHTML += (j+1)+'. '+current+'...</a> ('+users+')<p></p>';
}

document.getElementById('profile_audios').appendChild(e);

}

get('http://vkontakte.ru/groups.php', pars1);


wall = document.getElementById('profile_wall');
wall.setAttribute('style', 'display:none;');



