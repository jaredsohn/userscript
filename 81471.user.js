// ==UserScript==
// @name ~ S.C ~ Bouton for jyo
// @namespace 
// @description Adds various useful buttons to the Ogame Menu for ~ S.C ~ alliance.
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
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://shinigamicorporation.forums-actifs.com/forum.htm" accesskey="" target="_blank"><span class="textlabel">~ S.C ~</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.takanacity.com/main.php?tag=crconverter" accesskey="" target="_blank"><span class="textlabel">Convertisseur RC</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://i69.servimg.com/u/f69/11/79/16/94/captur45.jpg" accesskey="" target="_blank"><span class="textlabel">Tableau</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);