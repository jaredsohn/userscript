// ==UserScript==
// @name           "Write him a message" link
// @namespace      http://userscripts.org/users/26596
// @description    Adds "Write him a message" link to user profiles on leprosorium.ru
// @include        http://leprosorium.ru/users/*
// @include        http://*.leprosorium.ru/users/*
// @author         http://leprosorium.ru/users/19214
// ==/UserScript==


//
// Version history
//
// 0.4 - resolved conflict with Karma Attitude addon
// 0.3 - supports Opera
// 0.2 - ignores deleted users' profiles
// 0.1 - it's alive!!
//


var usernick = document.getElementById('usernick');

if (usernick) {
	var spawnpoint = usernick;
	var uid = window.location.toString().match(/.*\/(\d+)/)[1];
	var inboxme = document.createElement('span');
	inboxme.innerHTML = '<a href="http://leprosorium.ru/my/inbox/write/' + uid + '" style="font-size:11px; font-family:tahoma; background: url(http://img.dirty.ru/lepro/inbox.gif) no-repeat right bottom;padding-right:20px;float:right;margin:1em;color:#999;">Инбоксировать</a>';
	spawnpoint.insertBefore(inboxme, spawnpoint.childNodes[0]);
}
