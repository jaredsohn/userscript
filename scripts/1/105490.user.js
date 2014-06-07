// ==UserScript==
// @name           Battleknight
// @namespace      Battleknight
// @description    Ajoute un lien vers Battleknight
// @include http://*uni110.ogame.*/game/index.php?page=*
// @exclude http://*.ogame.*ajax*
// ==/UserScript==

var pseudo = document.getElementById("playerName").getElementsByTagName('span')[0].innerHTML;

var uni = document.getElementsByTagName('head')[0].innerHTML;
uni = uni.split('http://')[1].split('.')[0];

var lang = document.getElementsByTagName('head')[0].innerHTML;
lang = lang.split('.ogame.')[1].split('/game')[0];

var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML +='<li class="menubutton_table"><span class="menu_icon"><img src="http://img74.xooimage.com/files/f/6/0/favicon-bk-2a2ce8a.gif" height="29" width="38"></span>'
				  +'<a class="menubutton " href="http://s2.battleknight.fr/user/"" target="_blank"><span class="textlabel">BattleKnight</span></a></li>'
document.getElementById('menuTable').appendChild(LinkDiv);