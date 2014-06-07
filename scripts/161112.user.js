// ==UserScript==
// @name           JEDI
// @namespace      JEDI
// @description    Ajoute un lien vers le forum de l'alliance JEDI
// @include http://*uni120.ogame.*/game/index.php?page=*
// @exclude http://*.ogame.*ajax*
// ==/UserScript==

var pseudo = document.getElementById("playerName").getElementsByTagName('span')[0].innerHTML;

var uni = document.getElementsByTagName('head')[0].innerHTML;
uni = uni.split('http://')[1].split('.')[0];

var lang = document.getElementsByTagName('head')[0].innerHTML;
lang = lang.split('.ogame.')[1].split('/game')[0];

var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML +='<li class="menubutton_table"><span class="menu_icon"><img src="http://image.noelshack.com/fichiers/2013/10/1362578864-jedi.gif" height="29" width="38"></span>'
				  +'<a class="menubutton " href="http://jedi-taurus.ogameteam.com/index.php"" target="_blank"><span class="textlabel">JEDI</span></a></li>'
document.getElementById('menuTable').appendChild(LinkDiv);





