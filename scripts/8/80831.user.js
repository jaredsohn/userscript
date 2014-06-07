// ==UserScript==
// @name OGame Montorbuttons
// @description Spezielle buttons bei Ogame
// @include http://*.ogame.*/game/*

// ==/UserScript==

//für RD - Unis



var usersession = unsafeWindow.session; 






var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://uni21.ogame.de/game/img/navigation/navi_ikon_trader_a.gif" height="29" width="38"></span><a class="menubutton " href="index.php?page=networkkommunikation&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Ally - Rundmail</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://uni21.ogame.de/game/img/navigation/navi_ikon_defense_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.war-riders.de/" accesskey="" target="_blank"><span class="textlabel">Rechner</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://uni21.ogame.de/game/img/navigation/navi_ikon_overview_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.dragosim.de.vu/" accesskey="" target="_blank"><span class="textlabel">DragoSim</span></a></li>';
LinkDiv.innerHTML += '<script type="text/javascript">function bonus_boutons(){popupWindow("index.php?page=globalTechtree&session='+usersession+'","techinfo","auto","no","0","0","no","680","600","yes");}</script><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_research_a.gif" height="29" width="38"></span><a class="menubutton" href="#" onclick="bonus_boutons()"><span class="textlabel">Techtree</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="pranger.php" accesskey="" target="_blank"><span class="textlabel">Pranger</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon" height="45"><img src="http://uni21.ogame.de/game/img/navigation/navi_ikon_station_a.gif" height="29" width="38"></span><a class="menubutton " href="http://de.ikariam.com/" accesskey="" target="_blank"><span class="textlabel"><b>Ikariam</b></span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon" height="45"><img src="http://uni21.ogame.de/game/img/navigation/navi_ikon_station_a.gif" height="29" width="38"></span><a class="menubutton " href="http://uni21.ogame.de/game/ainfo.php?allyid=19798" accesskey="" target="_blank"><span class="textlabel"><b>Externe Allypage</b></span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);

var color_classIkariam = 'style="color: #FFFFFF;"';