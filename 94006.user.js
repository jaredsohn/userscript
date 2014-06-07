// ==UserScript==
// @name Buttons mit Links by RamR0D V.1.1a
// @description Erweitert Buttons in Ogameansicht für Firefox
// @include http://*.ogame.*/game/*

// ==/UserScript==

//für RD - Unis



var usersession = unsafeWindow.session; 






var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="index.php?page=networkkommunikation&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Rundmail</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="pranger.php" accesskey="" target="_blank"><span class="textlabel">Pranger</span></a></li>';
LinkDiv.innerHTML += '<script type="text/javascript">function bonus_boutons(){popupWindow("index.php?page=globalTechtree&session='+usersession+'","techinfo","auto","no","0","0","no","680","600","yes");}</script><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_research_a.gif" height="29" width="38"></span><a class="menubutton" href="#" onclick="bonus_boutons()"><span class="textlabel">Techtree</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.oraiders.com/calculators.php" accesskey="" target="_blank"><span class="textlabel">oRaiders</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://owiki.de/Hauptseite" accesskey="" target="_blank"><span class="textlabel">oWiki</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.savekb.de/" accesskey="" target="_blank"><span class="textlabel">SaveKB</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://ogame.gamestats.org/" accesskey="" target="_blank"><span class="textlabel">War-Riders</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);