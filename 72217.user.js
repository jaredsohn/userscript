// ==UserScript==
// @name Menu é-Koléo
// @namespace http://e-koleo.brulant.net/ 
// @description Ajoute plusieurs boutons menu utile 
// @include http://*.ogame.*/*
// ==/UserScript==

//Pour les univers Ogame 1.0

//alecs::
var usersession = unsafeWindow.session; //get the usersession var from page
//alecs: 



var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<script type="text/javascript">function bonus_boutons(){popupWindow("index.php?page=globalTechtree&session='+usersession+'","techinfo","auto","no","0","0","no","680","600","yes");}</script><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_research_a.gif" height="29" width="38"></span><a class="menubutton" href="#" onclick="bonus_boutons()"><span class="textlabel">Technologie</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_fleet1_a.gif" height="29" width="38"></span><a class="menubutton " href="http://websim.speedsim.net/index.php?lang=fr" accesskey="" target="_blank"><span class="textlabel">Simulateur</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="index.php?page=messages&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Messages</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_premium_a.gif" height="29" width="38"></span><a class="menubutton " href="index.php?page=networkkommunikation&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Communication</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_galaxy_a.gif" height="29" width="38"></span><a class="menubutton " href="http://board.ogame.fr/board95-la-vie-des-univers/board1356-univers-71-80/board1507-leo/board1510-hall-of-fame/?s=b0f7aa812875533b1bc262bfddb870d671def6ac//index.php" target="_blank"><span class="textlabel">é-Koléo</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);