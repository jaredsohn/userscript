// ==UserScript==
// @name New Menu
// @namespace http://bloodpack.forumieren.com/
// @description Adds various useful buttons to the Ogame Menu
// @include http://andromeda.ogame.*/*
// @include http://barym.ogame.*/*
// @include http://capella.ogame.*/*
// @include http://draco.ogame.*/*
// @include http://electra.ogame.*/*
// @include http://fornax.ogame.*/*
// @include http://gemini.ogame.*/*
// @include http://hydra.ogame.*/*
// ==/UserScript==

//for Ogame Redesign unis

//alecs::
var usersession = unsafeWindow.session; //get the usersession var from page
//alecs: i've edited the href string tag to include the usersession ID, not to be a static ID



var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<script type="text/javascript">function mierda(){popupWindow("http://capella.ogame.com.es/game/index.php?page=globalTechtree&session='+usersession+'","techinfo","auto","no","0","0","no","680","600","yes");}</script><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="index.php?page=networkkommunikation&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Enviar cc</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_fleet1_a.gif" height="29" width="38"></span><a class="menubutton " href="http://websim.speedsim.net/index.php?lang=sp" accesskey="" target="_blank"><span class="textlabel">Simulador</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_research_a.gif" height="29" width="38"></span><a class="menubutton" href="#" onclick="mierda()"><span class="textlabel">Tecnologia</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);