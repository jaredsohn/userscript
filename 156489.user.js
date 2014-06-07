// ==UserScript==
// @name        GSBK
// @namespace   Grepolis
// @description 
// @include     http://*.grepolis.*/game/index*
// @version     1.0
// ==/UserScript==

//-SUPPRESSION BOUTON PREMIUM-//

var $ = unsafeWindow.jQuery;

$ (function () {
	window.setTimeout (function () {
		var Breite = $ ("div#main_menu div.options_container div.border_middle").css ("width");
		Breite = /(\d+)((?:.+)?)/.exec (Breite);
		$ ("div#main_menu div.options_container div.border_middle").remove ();
		$ ("div#main_menu").css ("width", "-=" + Breite [1] + Breite [2]);
		$ ("div#main_menu").css ("margin-left", "+=" + (Breite [1] / 2) + Breite [2]);
	}, 2000);
});


//-Barre d'acces rapide sites externes-//
(function () {
$('<div id="Buttonleiste" style="padding-top:2px;z-index:2;position:absolute;width:169px;height:91px;left:-2px;"></div>\
<div id="Troops_Info_leiste" style="margin-left:80px;z-index:1;position:absolute;width:82px;top:68px;height:40px;"></div>\
<a id="BTN_GS_Ally" style="z-index:2;position:absolute;width:24px;height:20px;top:80px;left:5px;" href="http://www.'+SpracheID+'.grepostats.com/world/'+WeltID+'/alliance/'+AllianzID+'" target="_blank"><img src="http://s7.directupload.net/images/120326/6na88lya.png" style="border-width: 0px" /></a>\
<a id="BTN_Grepomaps" style="z-index:2;position:absolute;width:24px;height:20px;top:46px;left:71px;" href="http://'+WeltID+'.grepolismaps.org/" target="_blank"><img src="http://s14.directupload.net/images/120326/tltq4m5b.png" style="border-width: 0px" /></a>\
<a id="BTN_Max_Forum" style="z-index:2;position:absolute;width:24px;height:20px;top:46px;left:137px;" href="http://'+WeltID+'.grepolis.com/forum" target="_blank"><img src="http://s14.directupload.net/images/120326/z7cuj6bi.png" style="border-width: 0px" /></a>\
<a id="BTN_GS_Player" style="z-index:2;position:absolute;width:24px;height:20px;top:46px;left:5px;" href="http://www.'+SpracheID+'.grepostats.com/world/'+WeltID+'/player/'+SpielerID+'" target="_blank"><img src="http://s1.directupload.net/images/120326/hm7fewtb.png" style="border-width: 0px" /></a>\
<a id="BTN_Troops_Info" style="z-index:2;position:absolute;width:24px;height:20px;top:80px;left:137px;" href="#"><img src="http://s1.directupload.net/images/120326/2uqhptno.png" style="border-width: 0px" /></a>\
').appendTo('#server_time_wrapper');

$('<a id="BTN_HK" style="z-index:5;position:absolute;top:0px;left:466px;" href="#"><img src="http://s1.directupload.net/images/120629/6a9xx5bw.png" style="border-width: 0px" /></a>').appendTo('body');
$("#Buttonleiste").css("background-image","url(http://s7.directupload.net/images/120326/9blwjtom.png)");
$("#Troops_Info_leiste").css("background-image","url(http://s14.directupload.net/images/120407/7xmz4xu6.png)");

$('<img id="qmenu_bush_top" style="display: block;z-index:-1;position:absolute;bottom:86px;left:370px;" src="http://s1.directupload.net/images/121220/cdkml836.png"></img>').appendTo('.options_container');
$('<a href="#city_index" class="town_control" id="city_index" style="z-index:1;top:-50px;left:402px;"></a>').appendTo('.options_container');
$('<a id="prev_city" class="town_control" href="#prev_city" style="z-index:1;top:-50px;left:378px;"></a>').appendTo('.options_container');
$('<a id="next_city" class="town_control" href="#next_city" style="z-index:1;top:-50px;left:426px;"></a>').appendTo('.options_container');

$("#quest_overview").css({"top":"325px"});


var uw=unsafeWindow;
switch(SpracheID){
	case 'fr':
var mo_GS_Ally = "Résumé Grepostats Alliance";
var mo_Grepomaps = "Grepomaps";
var mo_Townsearch = "Recherche de ville";
var mo_Max_Forum = "Reduire le forum d'alliance dans une nouvelle fenêtre";
var mo_GS_Player = "Résumé grepostats joueur";
var mo_Troops_Info = "Convertir les unité de la ville en BBCode";
var mo_Fullscreen = "Plein ecran";
var mo_Grepobash = "Résumé Grepostats alliance bashpoints";
var mo_intown = "Troupes de la ville (avec les supports)";
var mo_fromtown = "Troupes de la ville (Seulement vos propres troupes)";
var mo_HK = "<b>Raccourci:</b> <p> <u>Sélection ville:</u> <br> Flèche gauche – Ville précédente<br>Flèche droite – Ville suivante <br> Enter - Attendre la ville actuelle <p> <u>Administrateur:</u> <br>1 – Commerces<br>2 – Ordres<br>3 – Recrutements<br>4 – Aperçu des Troupes<br>5 – Troupes en dehors<br>6 – Aperçu batiments<br>7 – Cultures<br>8 – Divinités<br>9 – Grottes<br>0 – Groupes de villes<br>– – Listes des villes  <br>´ - Planificateur <br> Z - Villages de paysans <p> <u>Menu:</u> <br>S - Aperçu de la ville<br> N - Messages <br> B - Rapports <br> A - Alliance <br> F - Forum d'alliance <br> E - Réglages <br> P - Profil <br> R - Rang <br> M - Notes<p> <u>Autre:</u> <br>H – Recherche Grepo Wiki <br>W - Cacher ou afficher le WWRanks button  <br>X - Sommaire des statistiques et des scripts pour Grepolis <p> <font size = 1>Traduction by Loulebe</font>";
$('<a id="BTN_Troops_intown" style="z-index:1;position:absolute;width:24px;height:20px;top:71px;left:99px;" href="#" onclick="bbunit(1)"><img src="http://s14.directupload.net/images/120407/7f4totua.png" style="border-width: 0px" /></a>').appendTo('#server_time_wrapper');
$('<a id="BTN_Troops_fromtown" style="z-index:1;position:absolute;width:24px;height:20px;top:88px;left:99px;" href="#" onclick="bbunit(0)"><img src="http://s1.directupload.net/images/120407/h3qbc6an.png" style="border-width: 0px" /></a>').appendTo('#server_time_wrapper');
$('<a id="BTN_Townsearch" style="z-index:2;position:absolute;width:24px;height:20px;top:46px;left:104px;" href="http://www.drolez.com/grepofinder/'+WeltID+'" target="_blank"><img src="http://s14.directupload.net/images/120326/6kb4efti.png" style="border-width: 0px" /></a>').appendTo('#server_time_wrapper');
$('<a id="BTN_Grepobash" style="z-index:2;position:absolute;width:24px;height:20px;top:46px;left:38px;" href="http://www.'+SpracheID+'.grepostats.com/world/'+WeltID+'/alliance/'+AllianzID+'/members?compare=kill" target="_blank"><img src="http://s1.directupload.net/images/120327/4p2zqrs2.png" style="border-width: 0px" /></a>').appendTo('#server_time_wrapper');
$('<a id="BTN_Fullscreen" style="z-index:2;position:absolute;width:24px;height:20px;top:79px;left:36px;" href="#"><img src="http://s14.directupload.net/images/120327/5ucfm7cl.png" style="border-width: 0px" /></a>').appendTo('#server_time_wrapper');break;
};


//-Survole sourris-//
uw.$('#BTN_Troops_fromtown').mousePopup(new uw.MousePopup(mo_fromtown));
uw.$('#BTN_Troops_intown').mousePopup(new uw.MousePopup(mo_intown));
uw.$('#BTN_GS_Ally').mousePopup(new uw.MousePopup(mo_GS_Ally));	
uw.$('#BTN_Grepomaps').mousePopup(new uw.MousePopup(mo_Grepomaps));	
uw.$('#BTN_Townsearch').mousePopup(new uw.MousePopup(mo_Townsearch));	
uw.$('#BTN_Max_Forum').mousePopup(new uw.MousePopup(mo_Max_Forum));	
uw.$('#BTN_GS_Player').mousePopup(new uw.MousePopup(mo_GS_Player));	
uw.$('#BTN_Troops_Info').mousePopup(new uw.MousePopup(mo_Troops_Info));	
uw.$('#BTN_Fullscreen').mousePopup(new uw.MousePopup(mo_Fullscreen));	
uw.$('#BTN_Grepobash').mousePopup(new uw.MousePopup(mo_Grepobash));
uw.$('#BTN_HK').mousePopup(new uw.MousePopup(mo_HK));
});