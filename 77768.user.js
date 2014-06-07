// ==UserScript==
// @name           MENU DBK 1.1
// @namespace      http://dbk-barym.forumsactifs.com/forum.htm
// @description    Ajout de bouton by toshiro
// @include        http://barym.ogame.fr/*
// ==/UserScript==

var joueur=143941;

var usersession = unsafeWindow.session;

var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<script type="text/javascript">function bonus_boutons(){popupWindow("index.php?page=globalTechtree&session='+usersession+'","techinfo","auto","no","0","0","no","680","600","yes");}</script>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_research_a.gif" height="29" width="38"></span><a class="menubutton" href="#" onclick="bonus_boutons()"><span class="textlabel">Technologie</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_fleet1_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.ogame-winner.com/simulateur-de-combat.html" accesskey="" target="_blank"><span class="textlabel">Simulateur</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="index.php?page=messages&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Messages</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_premium_a.gif" height="29" width="38"></span><a class="menubutton " href="index.php?page=networkkommunikation&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Communication</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_galaxy_a.gif" height="29" width="38"></span><a class="menubutton " href="http://dbk-barym.forumsactifs.com/forum.htm" target="_blank"><span class="textlabel">Forum DBK</span></a></li><li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_galaxy_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.ogame-winner.com/convertisseur-rc-rapports-combat.html" target="_blank"><span class="textlabel">Convertisseur RC</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_fleet1_a.gif" height="29" width="38"></span><a class="menubutton " href="http://n-y-x.team-forum.net/forum.htm" accesskey="" target="_blank"><span class="textlabel">Forum nYx</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.war-riders.de/?lang=fr" accesskey="" target="_self"><span class="textlabel">WarRiders</span></a></li>';
		
document.getElementById('menuTable').appendChild(LinkDiv);


var LinkDiv2 = document.createElement('div');
LinkDiv2.id = 'LinkDiv2';
LinkDiv2.innerHTML += '<div class="planet"><a href="http://ogame.gamestats.org/open-flash-chart.swf?width=650&height=325&data=/data/playerstats_fr_102_'+joueur+' " accesskey="" target="_blank" "title="Ouvre le graphique de la progression"class="planetlink  tips reloadTips"><img class="planetPic" src="img/planets/normal_6_1.gif"/><span class="planet-koords"></span></a></div>';
document.getElementById('bar').appendChild(LinkDiv2);


var LinkDiv3 = document.createElement('div');
LinkDiv3.id = 'LinkDiv3';
var alliance="de l'Alliance";
LinkDiv3.innerHTML += '<div class="contentz"><table class="members bborder"><tr class="alt"><td class="desc">Liste des liens:</td><td class="value"></span></a></span></td></tr><tr class="alt"><td class="desc"></td><td class="value"><span><a href="http://board.ogame.fr" target="_blank"><span style="color:#FFFF00;">Forum Ogame</span></a></span></td></tr><tr class="alt"><td class="desc"></td><td class="value"><span><a href="http://drago-sim.com/index.php?lang=french" target="_blank"><span style="color:#FF0000;">Simulateur de Combat</span></a></span></td></tr><tr class="alt"><td class="desc"></td><td class="value"><span><a href="http://www.ogame-winner.com/convertisseur-rc-rapports-combat.html" target="_blank"><span style="color:#22FF00;">Convertisseur RC</span></a></span></td></tr><tr class="alt"><td class="desc"></td><td class="value"><span><a href="http://ogame.gamestats.org/fr/barym/" target="_blank"><span style="color:#FF00FF;">Statistiques joueurs</span></a></span></td></tr><tr class="alt"><td class="desc"></td><td class="value"><span><a href="http://www.aideogame.fr" target="_blank"><span style="color:#FF8800;">Aide Ogame</span></a></span></td></tr></table></div>';
// LinkDiv3.innerHTML += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="500" height="225" id="graph-2" align="middle"><param name="allowScriptAccess" value="sameDomain" /><param name="movie" value="http://ogame.gamestats.org/open-flash-chart.swf?width=650 &height=500 &data=/data/allystatsfr_102_U.N.S.C"  /><param name="quality" value="high" /><param name="bgcolor" value="#FFFFFF" /><embed                src="http://ogame.gamestats.org/open-flash-chart.swf?width=650&height=500&data=http://ogame.gamestats.org/data/allystatsfr_102_U.N.S.C" quality="high" bgcolor="#FFFFFF" width="650" height="500" name="open-flash-chart" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
document.getElementById('inhalt').appendChild(LinkDiv3);