// ==UserScript==
// @name           Ika-Core EPXS
// @version 	9
// @namespace 	Gboz
// @author	Gboz
// @description	Ika-core.org utilities for Ikariam.
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js  
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched. Your not allowed to edit or copy ika-core.js, read license inside the file.
// You can create a copy of Ika-core-SearchTools.user.js and host it anywhere, when a new version of ika-core.js comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=9;
var scriptlocation="http://userscripts.org/scripts/source/35976.user.js";



// Mis modificaciones
function talkbubble(){}
function lang() {
	//used to check if a lang is working
	//country='de';
	//default chat provided by ika-core.org
	if 	(chaturl=='.') chaturl='http://www.ika-core.org/chat/';	
	switch (country) {
            default:
		CheckVersionBubbleNegative= "Busqué una nueva versión, ninguna por ahora.";
		NewCoreVersion="Nueva Versión Core";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Oprime y Arrastra para mover este Menú";
		SideBar_Search="Buscar";
		SideBar_SearchT="Buscar jugador/alianza";
		SideBar_ToolsT="Enlaces de la Alianza";
		SideBar_Notes="Notas";
		SideBar_NotesT="Anotaciones";
		SideBar_Allies="Aliados";
		SideBar_AlliesT="Lista de Aliados";
		SideBar_Enemies="Enemigos";
		SideBar_EnemiesT="Lista de Enemigos";
		SideBar_Friends="Amigos";
		SideBar_FriendsT="Lista de Amigos";
		SideBar_Games="Juegos";
		SideBar_GamesT="Menú de Juegos";
		SideBar_Indexing="Indexando";
		SideBar_IndexingT="Progreso del Indexado del Mundo";
		SideBar_Settings="Configuraciones";
		SideBar_SettingsT="Configuraciones Generales ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat Global";
		SideBar_Search_Add="Agregar";
		SideBar_Search_Save="Guardar";
		SideBar_Search_QuickSearch="Búsqueda Rápida";
		SideBar_Search_Player="Jugador";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Estado";
		SideBar_Search_PlayerAll="Todos";
		SideBar_Search_PlayerUnknown="Desconocido";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactivo";
		SideBar_Search_PlayerVacation="Vacaciones";
		SideBar_Search_Alliance="Alianza";
		SideBar_Search_Radius="Radio";
		SideBar_Search_Search="Buscar";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Búsqueda Avanzada";
		SideBar_Search_EnemyAlliances="Alianzas Enemigas";	
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Mensaje a la<br> Alianza","Enviar mensaje a todos los aliados"],
		["Foro "+alliancefullnm,"Al Foro de la Alianza "],
		["Foro " + alliancefullnm +"	mensajes no leídos","A los mensajes no leídos del Foro de la Alianza "],
		["Chatbox(Nueva Ventana)","Chat de la Alianza, abre en nueva ventana"],
		["Chatbox(Frame)","Chat de la Alianza, muestra en chat en frames sin recargarse"],
		["Calculadora de Batallas","Calcula una batalla ... "],
		[" Actualizar Herramientas"+alliancefullnm,"Obtener el último script"]];
		IslandLegendAllies="· Aliados";
		IslandLegendNoAlliance="· No Aliados";
		IslandLegendEnemies="· Enemigos";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Tú tienes actualmente un tratado cultural con este jugador";
		TreatyNo="No tienes tratados culturales con este jugador.";
		updatenotification="Existe una nueva versión de las Herramientas "+alliancefullnm+" .\n Oprime OK si deseas ir a www.ika-core.org y actualizarlas ahora.";
		txtplswait="Espere por favor";
		txtrefresh="Refrescar";
		txtpagedata="- Obteniendo Página";
		txtinfodata="- Obteniendo Información";
		txtchkplayer="- Verificando Jugador";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancelar Tratados Culturales";
		CultureTreatiesRequest=" Solicitar Tratados Culturales";
		break; 
	}
}


function checkcoreupdate(text){}
function version_update(){}
function checkupdate(text){}



function sidetabs(){
	sidemenu();
	sidetab("","", SideBar_Drag, 0,0 ,null,"mover");
	if (GM_getValue("SideBarSearch",1)==1)  sidetab("Search", SideBar_Search, SideBar_SearchT, "500", "100%;",search);
	//if (GM_getValue("SideBarTools",1)==1) 	sidetab("Tools", ''+alliancenm+'â„¢', SideBar_ToolsT, 200, "100%",tools,"menu");
	if (GM_getValue("SideBarNotes",1)==1) 	sidetab("Notes",SideBar_Notes, SideBar_NotesT, 400, 400,notesinit);
	if (GM_getValue("SideBarAllies",1)==1) 	sidetab("Allies",SideBar_Allies, SideBar_AlliesT, 100, "100%", alliancelist,"menu");
	if (GM_getValue("SideBarEnemies",1)==1) sidetab("Enemies",SideBar_Enemies, SideBar_EnemiesT, 150, 340, enemies);
	if (GM_getValue("SideBarFriends",1)==1) sidetab("Friends",SideBar_Friends, SideBar_FriendsT, 150, 270,friends);
	//if (GM_getValue("SideBarGames",1)==1) 	sidetab("Games",SideBar_Games, SideBar_GamesT, 100, 160, gameslist,"menu");
	//if (GM_getValue("SideBarIndexing",1)==1) sidetab("Indexing",SideBar_Indexing, SideBar_IndexingT, 350, 0,indexing,"menu");
	//if (GM_getValue("SideBarIndexing",1)==1) sidetab("News",SideBar_News, 'v'+core_vers+'   '+SideBar_NewsT, 300,200,news);
	sidetab("Settings",SideBar_Settings, SideBar_SettingsT, 350, 310,settings);	
	//if (chaturl!='.'&&GM_getValue("SideBarChat",1)==1) sidetab("Chat",SideBar_Chat, SideBar_ChatT, GM_getValue("ChatWidth",1000), GM_getValue("ChatHeight",300),chat);	
}
function settingscont(){
	var settingsnode = $fork("ikacoresettings");
	if (!settingsnode) {
		var masternode = $fork("Settingsmain");
		masternode.innerHTML = '\
<div id="ikacoresettings" style="height:280px;cursor:default;overflow: -moz-scrollbars-vertical; overflow-x: none; overflow-y: auto;border-bottom:1px solid #ffffff;">\
<table id="settingstable" class="table01">\
<thead><tr><td colspan=4><h3><b><u>Side Bar Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow(SideBar_Search, 'SideBarSearch') +
		iscrow(SideBar_Notes, 'SideBarNotes', 1) +
		iscrow(SideBar_Allies, 'SideBarAllies') +
		iscrow(SideBar_Enemies, 'SideBarEnemies', 1) +
		iscrow(SideBar_Friends, 'SideBarFriends') +
		//iscrow(SideBar_Games, 'SideBarGames', 1) +
		//iscrow(alliancefullnm, 'SideBarTools') +
		iscrow(SideBar_Indexing, 'SideBarIndexing', 1) +
		//iscrow(SideBar_Chat, 'SideBarChat') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Buildings Upgrade hint</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +		
		'<td colspan=4>If you have already discovered the upgrades below, please enable them so the building upgrade hint works correctly.</td></tr><tr style="border-bottom:1px dotted #E4B873">'+
		iscrow("Show Goods Needed for Upgrade", location.host+'.CityBuildingUpGoods') +
		iscrow("Pulley", location.host+'.pulley',1) +
		iscrow('Geometry', location.host+'.geometry') +
		iscrow("Spiritual Level", location.host+'.spiritlevel',1) +				
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Spy Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrow('Spy wave Delay (in milisec, 1000 ms=1 sec)', 4, 'BashDelay', 2000) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Transporter</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Transporter', 'TransporterShow') +
		iscrow('Extended View', 'TransporterViewExtended',1) +
		iscrow('Production info and bars in current city', 'TransporterProductionBars') +		
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>City View Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Toggle buttons', 'CityToggleButtons') +
		iscrow('Building Levels', 'CityBuildingLevels',1) +
		iscrow('Building Names', 'CityBuildingNames') +
		iscrow('Show City Troops', 'ShowCityTroops') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Island View Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">\
<td colspan=4>Colors can be defined as strings like: red, lightyellow <br>\
or as hexadecimal like #rrggbb <br>\
for example #800000 (darkred).<td></tr>' +
		istrow('Alliance Color ', 4, 'AllianceColor', 'blue') +
		istrow('No Alliance Color ', 4, 'NoAllianceColor', 'purple', 1) +
		istrow('Allies Color ', 4, 'AlliesColor', 'cyan') +
		istrow('Enemies Color ', 4, 'EnemiesColor', 'red', 1) +
		iscrow('City/Resource Levels', 'IslandLevels', 1) +
		iscrow('Toggle Buttons', 'IslandToggleButtons') +
		iscrow('City/Resource Levels', 'IslandLevels', 1) +
		iscrow('Player Names under Cities', 'IslandPlayerNames') +
		iscrow('Text Effects for Inactives<br> and Players on Vacation', 'IslandInVac', 1) +
		iscrow('Make Inactives text blink', 'IslandInactiveBlink') +
		iscrow('Show Highlight Legend', 'IslandLegend', 0) +
		iscrow('Highlight Cities based<br> on Alliance', 'IslandHighlight') +
		iscrow('Heart next to<br> Friends Cities', 'IslandFriends', 1) +
		iscrow('Icon next to<br> Enemies Cities', 'IslandEnemies') +
		iscrow('Icon next to Cities <br> with Spies', 'IslandSpies', 1) +
		iscrow('Icon next to Cities <br> with signed Cultural Treaty.', 'IslandCultTreaties') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Messsages View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Check treaty buttons', 'MessageCheckTreaties') +
		iscrow('Find player Cities button', 'MessagePlayerSearch') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Embassy View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Check treaty buttons', 'EmbassyCheckTreaties') +
		iscrow('Find player Cities button', 'EmbassyPlayerSearch', 1) +
		iscrow('Get Military scores from ika-core', 'EmbassyGetMilitary') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Highscore View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Find Alliance Cities Button', 'HighscoreAllianceSearch') +
		iscrow('Find Player Cities Button', 'HighscorePlayerSearch', 1) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Chat Sidebar</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrow('Width', 3, 'ChatWidth', 1009) +
		istrow('Height', 3, 'ChatHeight', 400, 1) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Alliance Message Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrowttx('Signature(write #br# to change row)', 20, 'Signature', '', 1) +
		iscrow('Ika-core links transformation', 'FormatHyperLinks') +
		iscrow('Parse Smilies', 'FormatSmilies') +
		'</tr></tbody></table></div>\
<div style="width:100%;height:1px;padding:1px 0px 0px 0px;background:#C9A584"/>\
<div style="width:100%;height:1px;padding:1px 0px 0px 0px;background:#5D4C2F"/>\
<div style="width:100%;height:5px;padding:5px 5px 5px 5px;"/>\
<a id="savesettings" class="savesettings" title="Click to save settings" style="display: inline;width:40px;height:10px;cursor:pointer;margin:0px 3px 0px 3px;padding:0px 1px 1px 0px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;-moz-outline:none;">' +
		SideBar_Search_Save +
		'</a>';
	}
}



switch (location.host) {	
	default:
		alliancefullnm='Elite Phalanxes';
		alliancenm='EPXS';		
		alliance=[	['Νo alliance'	, NoAlliance],
				[ alliancenm	, Alliance	],
				['EPXS2'	, Allies	],
				['EPXS3'	, Allies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://www.yourforum.com/chat';
		forumurl='.';
		//forumurl='http://www.yourforum.com/forum/new';
		forumurlnew='.' ;
		//forumurlnew='http://www.yourforum.com/forum/';
		break;
}