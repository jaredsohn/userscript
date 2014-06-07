// ==UserScript==
// @name TICKET
// @namespace http://bloodpack.forumieren.com/
// @description Adds various useful buttons to the Ogame Menu
// @include http://*.ogame.*/game/*
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
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://support.ogame.fr/index.php?page=support&m=1" accesskey="" target="_blank"><span class="textlabel">Ticket</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://board.ogame.fr/" accesskey="" target="_blank"><span class="textlabel">Forum</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);