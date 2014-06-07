// ==UserScript==
// @name Electra new Menu
// @namespace 
// @description Για την Ελληνική Συμμαχία Spartans Του Αγγλικού Ηλέκτρα!
// @description Adds useful buttons to the Ogame Menu (Speedsim/GameStats/Ally massages/Ally)
// @include http://electra.ogame.org/*
// @include http://uni105.ogame.org/*
// ==/UserScript==


//for Ogame Redesign unis

//alecs::
var usersession = unsafeWindow.session; //get the usersession var from page
//alecs: i've edited the href string tag to include the usersession ID, not to be a static ID

var icon_a = 'http://electra.ogame.org/game/img/navigation/navi_ikon_resources_a.gif';
		var icon_a2 = 'http://electra.ogame.org/game/img/navigation/navi_ikon_resources_b.gif';
var icon_b = 'http://electra.ogame.org/game/img/navigation/navi_ikon_resources_a.gif';
		var icon_b2 = 'http://electra.ogame.org/game/img/navigation/navi_ikon_resources_b.gif';
var icon_c = 'http://electra.ogame.org/game/img/navigation/navi_ikon_resources_a.gif';
		var icon_c2 = 'http://electra.ogame.org/game/img/navigation/navi_ikon_resources_b.gif';
var icon_d = 'http://electra.ogame.org/game/img/navigation/navi_ikon_resources_a.gif';
		var icon_d2 = 'http://electra.ogame.org/game/img/navigation/navi_ikon_resources_b.gif';
			

var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><a href="http://andromeda.hostinginfive.com/" target="blank_" ><img class="mouseSwitch" src="http://electra.ogame.org/game/img/navigation/navi_ikon_trader_a.gif" rel="http://user.xthost.info/andromeda/Icons/navi_ikon_trader_a.gif" height="29" width="38"></span><a class="menubutton " href="http://z7.invisionfree.com/electraspartans" accesskey="" target="_blank"><span class="textlabel">Forum</span></a></li><li class="menubutton_table"><span class="menu_icon"><img class="mouseSwitch" src="img/navigation/navi_ikon_research_a.gif" rel="img/navigation/navi_ikon_research_a.gif" height="29" width="38"></span><a class="menubutton " href="http://en.galaxytool-hosting.eu/mccoolelectra/index.php?language=greek" accesskey="" target="_blank"><span class="textlabel">GalaxyTool</span></a></li><li class="menubutton_table"><span class="menu_icon"><img class="mouseSwitch" src="img/navigation/navi_ikon_research_a.gif" rel="img/navigation/navi_ikon_research_a.gif" height="29" width="38"></span><a class="menubutton " href="http://ogame.gamestats.org/org/105/" accesskey="" target="_blank"><span class="textlabel">GameStats</span></a></li><li class="menubutton_table"><span class="menu_icon"><a href="http://codexr.awardspace.com/converter/" target="blank_" ><img class="mouseSwitch" src="http://electra.ogame.org/game/img/navigation/navi_ikon_fleet1_a.gif" rel="img/navigation/navi_ikon_fleet1_c.gif" height="29" width="38"></span><a class="menubutton " href="http://websim.speedsim.net/index.php?lang=gr" accesskey="" target="_blank"><span class="textlabel">SpeedSim</span></a></li><li class="menubutton_table"><span class="menu_icon"><img class="mouseSwitch" src="img/navigation/navi_ikon_network_a.gif" rel="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="index.php?page=networkkommunikation&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Circular</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);



		
//		var aff_option ='<li><span class="menu_icon"><a href="http://andromeda.hostinginfive.com/" target="blank_" ><img class="mouseSwitch" src="'+icon_a+'" rel="'+icon_a2+'" height="29" width="38"></span><a class="menubutton " href="'index.php?page=alliance&session='+usersession+'" accesskey="" target="_self">';
//			aff_option += '<span class="textlabel">InfoCompte</span></a></li>';