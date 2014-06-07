// ==UserScript==
// @name ADK Bouton
// @namespace 
// @description Adds various useful buttons to the Ogame Menu for A.D.K. alliance.
// @include http://uni50.ogame.*/game/*
// @include http://uni60.ogame.*/game/*
// ==/UserScript==

//for Ogame Redesign unis

//alecs::
var usersession = unsafeWindow.session; //get the usersession var from page
//alecs: i've edited the href string tag to include the usersession ID, not to be a static ID



var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://alliance-l.p.u.v.xooit.com/index.php" accesskey="" target="_blank"><span class="textlabel">~A.D.K.~</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_fleet1_b.gif" height="29" width="38"></span><a class="menubutton " href="http://websim.speedsim.net/index.php?lang=fr" accesskey="" target="_blank"><span class="textlabel">Simulateur</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_premium_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.ogame-winner.com/convertisseur-rc-rapports-combat.html" accesskey="" target="_blank"><span class="textlabel">Convertisseur RC</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_shipyard_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.ogame-winner.com/convertisseur-re-rapports-espionnage.html" accesskey="" target="_blank"><span class="textlabel">Convertisseur RE</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_galaxy_a.gif" height="29" width="38"></span><a class="menubutton " href="http://board.ogame.fr/index.php?page=Board&boardID=892" accesskey="" target="_blank"><span class="textlabel">Uni 50</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_research_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.war-riders.de/fr/50/details/ally/A.D.K" accesskey="" target="_blank"><span class="textlabel">War-Riders</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_trader_a.gif" height="29" width="38"></span><a class="menubutton " href="http://alliance-du-kaos.galaxy-spy.net/index.php" accesskey="" target="_blank"><span class="textlabel">OGSpy</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);
