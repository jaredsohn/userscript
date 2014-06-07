// ==UserScript==
// @name           Ogametools
// @namespace      Ogametools
// @description    Ajoute un lien vers Ogametools
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
LinkDiv.innerHTML +='<li class="menubutton_table"><span class="menu_icon"><img src="http://img73.xooimage.com/files/3/5/d/ogametools-2a02424.gif" height="29" width="38"></span>'
				  +'<a class="menubutton " href="http://www.ogametools.com/index.php"" target="_blank"><span class="textlabel">Ogametools</span></a></li>'
document.getElementById('menuTable').appendChild(LinkDiv);

