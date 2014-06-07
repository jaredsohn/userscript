// ==UserScript==
// @name Botón LA.MAFIA 
// @namespace http://hellegion.blogspot.com/
// @description Añade botón del foro de LA.MAFIA
// @include http://*.ogame.*/game/*
// @include http://electra.ogame.*/*
// ==/UserScript==

//for Ogame Redesign unis

//alecs::
var usersession = unsafeWindow.session; //get the usersession var from page
//alecs: i've edited the href string tag to include the usersession ID, not to be a static ID



var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://nsjpovac.boardonly.com/" accesskey="" target="_blank"><span class="textlabel">LA.MAFIA</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_fleet1_b.gif" height="29" width="38"></span><a class="menubutton " href="http://websim.speedsim.net/index.php?lang=fr" accesskey="" target="_blank"><span class="textlabel">Simulateur</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_shipyard_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.war-riders.de/fr/Hydra/" accesskey="" target="_blank"><span class="textlabel">War-Riders</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);