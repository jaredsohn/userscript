// ==UserScript==
// @name           Who is Online
// @namespace      www.bungie.net
// @description    Shows whos browsing the forums
// @include        http://www.bungie.net/Forums/*
// ==/UserScript==

var usersOnline = document.createElement('div');
usersOnline.className="stupid";
GM_addStyle(".stupid{background:#0D0D0D; padding-left:150px;padding-top:20px;padding-bottom:20px;}");
usersOnline.innerHTML = '<h3>Who is online</h3><p>In total there are <strong>Over 9000</strong> users online(based on users active over the past 5 minutes)<br>Most users ever online was <strong>Over 9000</strong>.<br><em>Legend: <a style="color:#FFD224;" href="javascript:void(0);">Administrators</a>, <a style="color:#FF9966;" href="javascript:void(0);">Forum Ninjas</a>, <a style="color:#103349;" href="javascript:void(0);">Mythic Members</a>, <a style="color:#4C4C4C;" href="javascript:void(0);">Legendary Members</a>, <a style="color:#323A3D;" href="javascript:void(0);">Heroic</a>, <a style="color:#27282C;" href="javascript:void(0);">Member</a>';

document.getElementsByClassName('footer').item(0).parentNode.parentNode.insertBefore(usersOnline, document.getElementsByClassName('footer').item(0).parentNode);