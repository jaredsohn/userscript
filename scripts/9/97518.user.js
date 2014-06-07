// ==UserScript==
// @name E.A Bouton lite
// @namespace 
// @description Adds various useful buttons to the Ogame Menu for E.A alliance.
// @include http://uni109.ogame.fr/
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
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://empirealteran.forum-pro.fr/forum" accesskey="" target="_blank"><span class="textlabel">E.A</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_fleet1_b.gif" height="29" width="38"></span><a class="menubutton " href="http://websim.speedsim.net/index.php?lang=fr" accesskey="" target="_blank"><span class="textlabel">Simulateur</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_shipyard_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.war-riders.de/fr/Hydra/" accesskey="" target="_blank"><span class="textlabel">War-Riders</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);