// ==UserScript==
// @name           Minpact
// @namespace      Minpact
// @description    Ajoute un lien vers Minpact
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
LinkDiv.innerHTML +='<li class="menubutton_table"><span class="menu_icon"><img src="http://img68.xooimage.com/files/c/a/a/100223055504518387-283e34e-29fb517.gif" height="29" width="38"></span>'
				  +'<a class="menubutton " href="http://mines.webinpact.com/"" target="_blank"><span class="textlabel">Minpact</span></a></li>'
document.getElementById('menuTable').appendChild(LinkDiv);

