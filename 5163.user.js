// ==UserScript==
// @name OgameCN
// @namespace http://ogame.com.cn/
// @author Perberos
// @description  Translate Ogame Chinese
// @version  0.5a
// @include     http://www.ogame.com.cn/
// @include     http://ogame.com.cn/
// @include     http://222.73.247.132/game/*.php*
// @include     http://61.129.86.97/game/*.php*
// ==/UserScript==

// Copyright (C) 2006, Perberos
// http://www.perberos.com.ar/
// E-Mail: perberos@hotmail.com
//
// Version 0.5a [2006.8.24]
// Copyright (c) 2006, Matsurai
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

//Se obtiene el valor
OgameCN_lang = GM_getValue("OgameCN_lang");

//Esta parte es por si se ejecuta por primera vez
if(!OgameCN_lang){
  GM_setValue("OgameCN_lang", "en");
  OgameCN_lang = GM_getValue("OgameCN_lang");
}//menu en ingles
GM_registerMenuCommand("English", function() {
  alert("English Activated!");
  GM_setValue("OgameCN_lang", "en");
});//menu en español
GM_registerMenuCommand("Spanish", function() {
  alert("Spanish Activado!");
  GM_setValue("OgameCN_lang", "es");
})///Italian
/*GM_registerMenuCommand("Italian", function() {
  alert("Italian Attivato!");
  GM_setValue("OgameCN_lang", "it");
});*///Germany
GM_registerMenuCommand("German", function() {
  alert("German Aktiviert!");
  GM_setValue("OgameCN_lang", "de");
});//Portuguese
/*GM_registerMenuCommand("Portuguese", function() {
  alert("Portuguese Ativado!");
  GM_setValue("OgameCN_lang", "de");
});*/

//U can use this to make you owner lenguage
if(OgameCN_lang == "de"){
//--[LeftMenu]---------------------------
Overview = "&Uuml;bersicht";
Imperium = "Imperium";
Buildings = "Geb&auml;ude";
Resources = "Rohstoffe";
Research = "Forschung";
Shipyard = "Schiffswerft";
Fleet = "Flotte";
Technology = "Technik";
Galaxy = "Galaxie";
Defense = "Verteidigung";
Alliance = "Allianzen";
Board = "Forum";
Statistics = "Statistiken";
Search = "Suche";
Help = "Hilfe";
Messages = "Nachrichten";
Notes = "Notizen";
Buddylist = "Buddylist";
Options = "Einstellungen";
Logout = "Logout";
Rules = "Regeln";
Legal_Notice = "Impressum";
//--[Search]-------------------------
playername = "Player name";
planetname = "Planeten name";
allytag = "Allianzen tag";
allyname = "Allianzen name";
//--[Misc]---------------------------
Metal = "Metall";
Crystal = "Kristall";
Deuterium = "Deuterium";
Energy = "Energie";
level = "Stufe";
Version = "Version";
Description = "Description";
Players = 'Players';
Points = 'Punkte';
Requirements = 'Ben&ouml;tigt';
Ships = 'Raumschiffe';
Lunar_Buildings = 'Spezialgeb&auml;ude';
Planet = 'Planet';
Moon = 'Moon';
Debris = 'Debris';
Build = 'Build';
Upgrade = "Upgrade";
Investigate = 'Investigate';
Planet_menu = "Planetenmenu";//ü
No_ships = 'No ships';
All_ships = 'All ships';
maxShip = 'max';
Max_resources = 'Max resources';
Attack = "Attack";
Transport = "Transport";
Move = "Move";
Fleet_Position = "Fleet Position";
Spy = "Spy";
Harvest = "Harvest";
Destroy = "Destroy";
//--[Message]---------------------------
Delete_All = 'Alle Nachrichten l&ouml;schen';
Delete_All_Shown = 'Delete All Shown';
Delete_Non_Marked = 'Delete Non-Marked';
Delete_Marked = 'Markierte Nachrichten l&ouml;schen';
//--[id]---------------------------
gid1 = "Metallmine";
gid2 = "Kristallmine";
gid3 = "Deuteriumsynthetisierer";
gid4 = "Solarkraftwerk";
gid12 = "Fusionskraftwerk";
gid14 = "Roboterfabrik";
gid15 = "Nanitenfabrik";
gid21 = "Raumschiffwerft";
gid22 = "Metallspeicher";
gid23 = "Kristallspeicher";
gid24 = "Deuteriumtank";
gid31 = "Forschungslabor";
gid33 = "Terraformer";
gid34 = "Allianzdepot";
gid41 = "Mondbasis";
gid42 = "Sensorphalanx";
gid43 = "Sprungtor";
gid44 = "Raketensilo";
gid106 = "Spionagetechnik";
gid108 = "Computertechnik";
gid109 = "Waffentechnik";
gid110 = "Schildtechnik";
gid111 = "Raumschiffpanzerung";
gid113 = "Energietechnik";
gid114 = "Hyperraumtechnik";
gid115 = "Verbrennungstriebwerk";
gid117 = "Impulstriebwerk";
gid118 = "Hyperraumantrieb";
gid120 = "Lasertechnik";
gid121 = "Ionentechnik";
gid122 = "Plasmatechnik";
gid123 = "Intergalaktisches Forschungsnetzwerk";
gid199 = "Gravitonforschung";
gid202 = "Kleiner Transporter";
gid203 = "Gro&szlig;er Transporter";
gid204 = "Leichter J&auml;ger";
gid205 = "Schwerer J&auml;ger";
gid206 = "Kreuzer";
gid207 = "Schlachtschiff";
gid208 = "Kolonieschiff";
gid209 = "Recycler";
gid210 = "Spionagesonde";
gid211 = "Bomber";
gid212 = "Solarsatellit";
gid213 = "Zerst&ouml;rer";
gid214 = "Todesstern";
gid401 = "Raketenwerfer";
gid402 = "Raketenwerfer";
gid403 = "Schweres Lasergeschütz";
gid404 = "Gau&szlig;kanone";
gid405 = "Ionengesch&uuml;tz";
gid406 = "Plasmawerfer";
gid407 = "Kleine Schildkuppel";
gid408 = "Gro&szlig;e Schildkuppel";
gid502 = "Abfangrakete";
gid503 = "Interplanetarrakete";

}
else if(OgameCN_lang == "es"){
//--[LeftMenu]---------------------------
Overview = "Visi&oacute;n general";
Imperium = "Imperio";
Buildings = "Edificios";
Resources = "Recursos";
Research = "Investigaci&oacute;n";
Shipyard = "Hangar";
Fleet = "Flota";
Technology = "Tecnologia";
Galaxy = "Galaxia";
Defense = "Defensa";
Alliance = "Alianza";
Board = "Foro";
Statistics = "Estadisticas";
Search = "Buscar";
Help = "Ayuda";
Messages = "Mensajes";
Notes = "Notas";
Buddylist = "Compa&ntilde;eros";
Options = "Opciones";
Logout = "Salir";
Rules = "Reglas";
Legal_Notice = "Contactos";
//--[Search]-------------------------
playername = "Nombre del jugador";
planetname = "Nombre del planeta";
allytag = "Etiqueta de la alianza";
allyname = "Nombre de la alianza";
//--[Misc]---------------------------
Metal = "Metal";
Crystal = "Cristal";
Deuterium = "Deuterio";
Energy = "Energia";
level = "nivel";
Version = "Versi&oacute;n";
Description = "Descripci&oacute;n";
Players = 'Jugadores';
Points = 'Puntos';
Requirements = 'Requisitos';
Ships = 'Naves espaciales';
Lunar_Buildings = 'Construcciones especiales';
Planet = 'Planeta';
Moon = 'Luna';
Debris = 'Escombros';
Build = 'Construir';
Upgrade = "Ampliar al";
Investigate = 'Investigar';
Planet_menu = "Menu del planeta";
No_ships = 'Ninguna nave';
All_ships = 'Todas las naves';
maxShip = 'max';
Max_resources = 'Max recursos';
Attack = "Atacar";
Transport = "Transportar";
Move = "Desplazar";
Fleet_Position = "Mantener posici&oacute;n";
Spy = "Espiar";
Harvest = "Recolectar";
Destroy = "Destruir";
//--[Message]---------------------------
Delete_All = 'Borrar todos los mensajes';
Delete_All_Shown = 'Borrar todos los mensajes mostrados';
Delete_Non_Marked = 'Borrar todos los mensajes sin marcar';
Delete_Marked = 'Borrar mensajes marcados';
//--[id]---------------------------
gid1 = "Mina de Metal";
gid2 = "Mina de Cristal";
gid3 = "Sintetizador de deuterio";
gid4 = "Planta de energ&iacute;a solar";
gid12 = "Fusion Reactor";
gid14 = "F&aacute;brica de Robots";
gid15 = "F&aacute;brica de Nanobots";
gid21 = "Hangar";
gid22 = "Almac&eacute;n de metal";
gid23 = "Almac&eacute;n de cristal";
gid24 = "Contenedor de deuterio";
gid31 = "Laboratorio de investigaci&oacute;n";
gid33 = "Terraformer";
gid34 = "Dep&oacute;sito de la Alianza";
gid41 = "Base lunar";
gid42 = "Sensor Phalanx";
gid43 = "Salto cu&aacute;ntico";
gid44 = "Silo";
gid106 = "Tecnolog&iacute;a de espionaje";
gid108 = "Tecnolog&iacute;a de computaci&oacute;n";
gid109 = "Tecnolog&iacute;a militar";
gid110 = "Tecnolog&iacute;a de defensa";
gid111 = "Tecnolog&iacute;a de blindaje";
gid113 = "Tecnolog&iacute;a de energ&iacute;a";
gid114 = "Tecnolog&iacute;a de hiperespacio";
gid115 = "Motor de combusti&oacute;n";
gid117 = "Motor de impulso";
gid118 = "Propulsor hiperespacial";
gid120 = "Tecnolog&iacute;a l&aacute;ser";
gid121 = "Tecnolog&iacute;a i&oacute;nica";
gid122 = "Tecnolog&iacute;a de plasma";
gid123 = "Red de investigaci&oacute;n intergal&aacute;ctica";
gid199 = "Tecnolog&iacute;a de gravit&oacute;n";
gid202 = "Nave peque&ntilde;a de carga";
gid203 = "Nave grande de carga";
gid204 = "Cazador ligero";
gid205 = "Cazador pesado";
gid206 = "Crucero";
gid207 = "Nave de batalla";
gid208 = "Colonizador";
gid209 = "Reciclador";
gid210 = "Sonda de espionaje";
gid211 = "Bombardero";
gid212 = "Sat&eacute;lite solar";
gid213 = "Destructor";
gid214 = "Estrella de la muerte";
gid401 = "Lanzamisiles";
gid402 = "L&aacute;ser peque&ntilde;o";
gid403 = "L&aacute;ser grande";
gid404 = "Ca&ntilde;&oacute;n Gauss";
gid405 = "Ca&ntilde;&oacute;n i&oacute;nico";
gid406 = "Ca&ntilde;&oacute;n de plasma";
gid407 = "C&uacute;pula peque&ntilde;a de protecci&oacute;n";
gid408 = "C&uacute;pula grande de protecci&oacute;n";
gid502 = "Misil de intercepci&oacute;n";
gid503 = "Misil interplanetario";

}
else if(OgameCN_lang == "en"){
//--[LeftMenu]---------------------------
Overview = "Overview";
Imperium = "Imperium";
Buildings = "Buildings";
Resources = "Resources";
Research = "Research";
Shipyard = "Shipyard";
Fleet = "Fleet";
Technology = "Technology";
Galaxy = "Galaxy";
Defense = "Defense";
Alliance = "Alliance";
Board = "Board";
Statistics = "Statistics";
Search = "Search";
Help = "Help";
Messages = "Messages";
Notes = "Notes";
Buddylist = "Buddylist";
Options = "Options";
Logout = "Logout";
Rules = "Rules";
Legal_Notice = "Legal Notice";
//--[Search]-------------------------
playername = "Player name";
planetname = "Planet name";
allytag = "Alliance tag";
allyname = "Alliance name";
//--[Misc]---------------------------
Metal = "Metal";
Crystal = "Crystal";
Deuterium = "Deuterium";
Energy = "Energy";
level = "level";
Version = "Version";
Description = "Description";
Players = 'Players';
Points = 'Points';
Requirements = 'Requirements';
Ships = 'Ships';
Lunar_Buildings = 'Lunar Buildings';
Planet = 'Planet';
Moon = 'Moon';
Debris = 'Debris';
Build = 'Build';
Upgrade = "Upgrade";
Investigate = 'Investigate';
Planet_menu = "Planet menu";
No_ships = 'No ships';
All_ships = 'All ships';
maxShip = 'max';
Max_resources = 'Max resources';
Attack = "Attack";
Transport = "Transport";
Move = "Move";
Fleet_Position = "Fleet Position";
Spy = "Spy";
Harvest = "Harvest";
Destroy = "Destroy";
//--[Message]---------------------------
Delete_All = 'Delete All';
Delete_All_Shown = 'Delete All Shown';
Delete_Non_Marked = 'Delete Non-Marked';
Delete_Marked = 'Delete Marked';
//--[id]---------------------------
gid1 = "Metal Mine";
gid2 = "Crystal Mine";
gid3 = "Deuterium Synthesizer";
gid4 = "Solar Plant";
gid12 = "Fusion Reactor";
gid14 = "Robotics Factory";
gid15 = "Nanite Factory";
gid21 = "Shipyard";
gid22 = "Metal Storage";
gid23 = "Crystal Storage";
gid24 = "Deuterium Tank";
gid31 = "Research Lab";
gid33 = "Terraformer";
gid34 = "????????";
gid41 = "Lunar Base";
gid42 = "Sensor Phalanx";
gid43 = "Jump Gate";
gid44 = "Missile Silo";
gid106 = "Espionage Technology";
gid108 = "Computer Technology";
gid109 = "Weapons Technology";
gid110 = "Shielding Technology";
gid111 = "Armour Technology";
gid113 = "Energy Technology";
gid114 = "Hyperspace Technology";
gid115 = "Combustion Drive";
gid117 = "Impulse Drive";
gid118 = "Hyperspace Drive";
gid120 = "Laser Technology";
gid121 = "Ion Technology";
gid122 = "Plasma Technology";
gid123 = "Intergalactic Research Network";
gid199 = "Graviton Technology";
gid202 = "Small Cargo";
gid203 = "Large Cargo";
gid204 = "Light Fighter";
gid205 = "Heavy Fighter";
gid206 = "Cruiser";
gid207 = "Battleship";
gid208 = "Colony Ship";
gid209 = "Recycler";
gid210 = "Espionage Probe";
gid211 = "Bomber";
gid212 = "Solar Satellite";
gid213 = "Destroyer";
gid214 = "Deathstar";
gid401 = "Rocket Launcher";
gid402 = "Light Laser";
gid403 = "Heavy Laser";
gid404 = "Gauss Cannon";
gid405 = "Ion Cannon";
gid406 = "Plasma Turret";
gid407 = "Small Shield Dome";
gid408 = "Large Shield Dome";
gid502 = "Anti-Ballistic Missiles";
gid503 = "Interplanetary Missiles";

}

function change_links(a){

	if(a.href.indexOf('gid=106')!=-1){
    a.innerHTML = gid106;
	}else	if(a.href.indexOf('gid=108')!=-1){
    a.innerHTML = gid108;
	}else	if(a.href.indexOf('gid=109')!=-1){
		a.innerHTML = gid109;
	}else	if(a.href.indexOf('gid=110')!=-1){
		a.innerHTML = gid110;
	}else	if(a.href.indexOf('gid=111')!=-1){
		a.innerHTML = gid111;
	}else	if(a.href.indexOf('gid=113')!=-1){
		a.innerHTML = gid113;
	}else	if(a.href.indexOf('gid=114')!=-1){
		a.innerHTML = gid114;
	}else	if(a.href.indexOf('gid=115')!=-1){
		a.innerHTML = gid115;
	}else	if(a.href.indexOf('gid=117')!=-1){
		a.innerHTML = gid117;
	}else	if(a.href.indexOf('gid=118')!=-1){
		a.innerHTML = gid118;
	}else	if(a.href.indexOf('gid=120')!=-1){
		a.innerHTML = gid120;
	}else	if(a.href.indexOf('gid=121')!=-1){
		a.innerHTML = gid121;
	}else	if(a.href.indexOf('gid=122')!=-1){
		a.innerHTML = gid122;
	}else	if(a.href.indexOf('gid=123')!=-1){
		a.innerHTML = gid123;
	}else	if(a.href.indexOf('gid=199')!=-1){
		a.innerHTML = gid199;
	}else if(a.href.indexOf('gid=12')!=-1){
		a.innerHTML = gid12;
	}else	if(a.href.indexOf('gid=14')!=-1){
		a.innerHTML = gid14;
	}else	if(a.href.indexOf('gid=15')!=-1){
		a.innerHTML = gid15;
	}else	if(a.href.indexOf('gid=1')!=-1){
		a.innerHTML = gid1;
	}else	if(a.href.indexOf('gid=202')!=-1){
		a.innerHTML = gid202;
	}else	if(a.href.indexOf('gid=203')!=-1){
		a.innerHTML = gid203;
	}else	if(a.href.indexOf('gid=204')!=-1){
		a.innerHTML = gid204;
	}else	if(a.href.indexOf('gid=205')!=-1){
		a.innerHTML = gid205;
	}else	if(a.href.indexOf('gid=206')!=-1){
		a.innerHTML = gid206;
	}else	if(a.href.indexOf('gid=207')!=-1){
		a.innerHTML = gid207;
	}else	if(a.href.indexOf('gid=208')!=-1){
		a.innerHTML = gid208;
	}else	if(a.href.indexOf('gid=209')!=-1){
		a.innerHTML = gid209;
	}else	if(a.href.indexOf('gid=210')!=-1){
		a.innerHTML = gid210;
	}else	if(a.href.indexOf('gid=211')!=-1){
		a.innerHTML = gid211;
	}else	if(a.href.indexOf('gid=212')!=-1){
		a.innerHTML = gid212;
	}else	if(a.href.indexOf('gid=213')!=-1){
		a.innerHTML = gid213;
	}else	if(a.href.indexOf('gid=214')!=-1){
		a.innerHTML = gid214;
	}else	if(a.href.indexOf('gid=21')!=-1){
		a.innerHTML = gid21;
	}else	if(a.href.indexOf('gid=22')!=-1){
		a.innerHTML = gid22;
	}else	if(a.href.indexOf('gid=23')!=-1){
		a.innerHTML = gid23;
	}else	if(a.href.indexOf('gid=24')!=-1){
		a.innerHTML = gid24;
	}else	if(a.href.indexOf('gid=2')!=-1){
		a.innerHTML = gid2;
	}else	if(a.href.indexOf('gid=31')!=-1){
		a.innerHTML = gid31;
	}else	if(a.href.indexOf('gid=33')!=-1){
		a.innerHTML = gid33;
	}else	if(a.href.indexOf('gid=34')!=-1){
		a.innerHTML = gid34;
	}else	if(a.href.indexOf('gid=3')!=-1){
		a.innerHTML = gid3;
	}else	if(a.href.indexOf('gid=401')!=-1){
		a.innerHTML = gid401;
	}else	if(a.href.indexOf('gid=402')!=-1){
		a.innerHTML = gid402;
	}else	if(a.href.indexOf('gid=403')!=-1){
		a.innerHTML = gid403;
	}else	if(a.href.indexOf('gid=404')!=-1){
		a.innerHTML = gid404;
	}else	if(a.href.indexOf('gid=405')!=-1){
		a.innerHTML = gid405;
	}else	if(a.href.indexOf('gid=406')!=-1){
		a.innerHTML = gid406;
	}else	if(a.href.indexOf('gid=407')!=-1){
		a.innerHTML = gid407;
	}else	if(a.href.indexOf('gid=408')!=-1){
		a.innerHTML = gid408;
	}else	if(a.href.indexOf('gid=41')!=-1){
		a.innerHTML = gid41;
	}else	if(a.href.indexOf('gid=42')!=-1){
		a.innerHTML = gid42;
	}else	if(a.href.indexOf('gid=43')!=-1){
		a.innerHTML = gid43;
	}else	if(a.href.indexOf('gid=44')!=-1){
		a.innerHTML = gid44;
	}else	if(a.href.indexOf('gid=4')!=-1){
		a.innerHTML = gid4;
	}else	if(a.href.indexOf('gid=502')!=-1){
		a.innerHTML = gid502;
	}else	if(a.href.indexOf('gid=503')!=-1){
		a.innerHTML = gid503;
	}
}

function resourse(){

		var tds = document.getElementsByTagName('td');
		
		tds[12].getElementsByTagName('font')[0].innerHTML = Metal;
		tds[13].getElementsByTagName('font')[0].innerHTML = Crystal;
		tds[14].getElementsByTagName('font')[0].innerHTML = Deuterium;
		tds[15].getElementsByTagName('font')[0].innerHTML = Energy;

}

(function(){
  var hrefer = self.location.href;

	//Lets start!
	if(hrefer.indexOf('leftmenu.php')!=-1){
	var a = document.getElementsByTagName('a');
	for (var i = a.length - 1; i >= 0; i--) {
		//UUURRGHHH
		if(a[i].href.indexOf('overview')!=-1) {
			a[i].innerHTML = Overview;
		}else
		if(a[i].href.indexOf('imperium.php')!=-1){
			a[i].innerHTML = Imperium;
		}else
		if(a[i].href.indexOf('b_building.php')!=-1){
			a[i].innerHTML = Buildings;
		}else
		if(a[i].href.indexOf('resources.php')!=-1){
			a[i].innerHTML = Resources;
		}else
		if(a[i].href.indexOf('buildings.php')!=-1&&a[i].href.indexOf('&mode=Forschung')!=-1){
			a[i].innerHTML = Research;
		}else
		if(a[i].href.indexOf('buildings.php')!=-1&&a[i].href.indexOf('&mode=Flotte')!=-1){
			a[i].innerHTML = Shipyard;
		}else
		if(a[i].href.indexOf('flotten1.php')!=-1&&a[i].href.indexOf('&mode=Flotte')!=-1){
			a[i].innerHTML = Fleet;
		}else
		if(a[i].href.indexOf('techtree.php')!=-1){
			a[i].innerHTML = Technology;
		}else
		if(a[i].href.indexOf('galaxy.php')!=-1){
			a[i].innerHTML = Galaxy;
		}else
		if(a[i].href.indexOf('buildings.php')!=-1&&a[i].href.indexOf('&mode=Verteidigung')!=-1){
			a[i].innerHTML = Defense;
		}else
		if(a[i].href.indexOf('allianzen.php')!=-1){
			a[i].innerHTML = Alliance;
		}else
		if(a[i].href.indexOf('http://board.ogame.com.cn/')!=-1){
		  a[i].innerHTML = Board;
			a[i].parentNode.innerHTML += " <a href=\""+a[i].href+"\" target=\"Hauptframe\">&gt;</a>";
		}else
		if(a[i].href.indexOf('stat.php')!=-1){
			a[i].innerHTML = Statistics;
		}else
		if(a[i].href.indexOf('suche.php')!=-1){
			a[i].innerHTML = Search;
		}else
		if(a[i].href.indexOf('tutorial.ogame.de')!=-1){
			a[i].innerHTML = Help;
		}else
		if(a[i].href.indexOf('messages.php')!=-1){
			a[i].innerHTML = Messages;
		}else
		if(a[i].href.indexOf('leftmenu.php')!=-1){
			a[i].innerHTML = Notes;
			//a[i].parentNode.innerHTML += " <a href=\""+a[i].getAttribute('onclick').substring(9,41)+"\" target=\"Hauptframe\">&gt;</a>";
		}else
		if(a[i].href.indexOf('buddy.php')!=-1){
			a[i].innerHTML = Buddylist;
		}else
		if(a[i].href.indexOf('options.php')!=-1){
			a[i].innerHTML = Options;
		}else
		if(a[i].href.indexOf('logout.php')!=-1){
			a[i].innerHTML = '<font color="#ff0000">'+Logout+'</font>';
		}else
		if(a[i].href.indexOf('go=rules&lang=cn')!=-1){
			a[i].innerHTML = Rules;
		}else
		if(a[i].href.indexOf('go=contact&lang=cn')!=-1){
			a[i].innerHTML = Legal_Notice;
		}
	}
	}else
	if(hrefer.indexOf('techtree.php')!=-1){
		resourse();
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf('infos.php')!=-1){
				change_links(a[i]);
			}
		}
		//... Esto es enteramente manual... xP		
		var tdtg = document.getElementsByTagName('td');
		tdtg[23].innerHTML = Buildings;
		tdtg[24].innerHTML = Requirements;
		tdtg[53].innerHTML = Research;
		tdtg[54].innerHTML = Requirements;
		tdtg[85].innerHTML = Ships;
		tdtg[86].innerHTML = Requirements;
		tdtg[113].innerHTML = Defense;
		tdtg[114].innerHTML = Requirements;
		tdtg[135].innerHTML = Lunar_Buildings;
		tdtg[136].innerHTML = Requirements;

		var font = document.getElementsByTagName('font');
		
		//Fusion Reactor	
		font[4].innerHTML = gid3 + " ("+level+" 5)";
		font[5].innerHTML = gid113 + " ("+level+" 3)";
		//Nanite Factory	
		font[6].innerHTML = gid14 + " ("+level+" 10)";
		font[7].innerHTML = gid108 + " ("+level+" 10)";
		//Shipyard	
		font[8].innerHTML = gid14 + " ("+level+" 2)";
		//Terraformer	
		font[9].innerHTML = gid15 + " ("+level+" 1)";
		font[10].innerHTML = gid113 + " ("+level+" 12)";
		//Espionage Technology	
		font[11].innerHTML = gid31 + " ("+level+" 3)";
		//Computer Technology	
		font[12].innerHTML = gid31 + " ("+level+" 1)";
		//Weapons Technology	
		font[13].innerHTML = gid31 + " ("+level+" 4)";
		//Shielding Technology	
		font[14].innerHTML = gid113 + " ("+level+" 3)";
		font[15].innerHTML = gid31 + " ("+level+" 6)";
		//Armour Technology	
		font[16].innerHTML = gid31 + " ("+level+" 2)";
		//Energy Technology	
		font[17].innerHTML = gid31 + " ("+level+" 1)";
		//Hyperspace Technology	
		font[18].innerHTML = gid113 + " ("+level+" 5)";
		font[19].innerHTML = gid110 + " ("+level+" 5)";
		font[20].innerHTML = gid31 + " ("+level+" 7)";
		//Combustion Drive	
		font[21].innerHTML = gid113 + " ("+level+" 1)";
		font[22].innerHTML = gid31 + " ("+level+" 1)";
		//Impulse Drive	
		font[23].innerHTML = gid113 + " ("+level+" 1)";
		font[24].innerHTML = gid31 + " ("+level+" 2)";
		//Hyperspace Drive	
		font[25].innerHTML = gid114 + " ("+level+" 3)";
		font[26].innerHTML = gid31 + " ("+level+" 7)";
		//Laser Technology	
		font[27].innerHTML = gid31 + " ("+level+" 1)";
		font[28].innerHTML = gid113 + " ("+level+" 2)";
		//Ion Technology	
		font[29].innerHTML = gid31 + " ("+level+" 4)";
		font[30].innerHTML = gid120 + " ("+level+" 5)";
		font[31].innerHTML = gid113 + " ("+level+" 4)";
		//Plasma Technology	
		font[32].innerHTML = gid31 + " ("+level+" 4)";
		font[33].innerHTML = gid113 + " ("+level+" 8)";
		font[34].innerHTML = gid120 + " ("+level+" 10)";
		font[35].innerHTML = gid121 + " ("+level+" 5)";
		//Intergalactic Research Network	
		font[36].innerHTML = gid31 + " ("+level+" 10)";
		font[37].innerHTML = gid108 + " ("+level+" 8)";
		font[38].innerHTML = gid114 + " ("+level+" 8)";
		//Graviton Technology	
		font[39].innerHTML = gid31 + " ("+level+" 12)";
		//Ships	Requirements
		//Small Cargo	
		font[40].innerHTML = gid21 + " ("+level+" 2)";
		font[41].innerHTML = gid115 + " ("+level+" 2)";
		//Large Cargo	
		font[42].innerHTML = gid21 + " ("+level+" 4)";
		font[43].innerHTML = gid115 + " ("+level+" 6)";
		//Light Fighter	
		font[44].innerHTML = gid21 + " ("+level+" 1)";
		font[45].innerHTML = gid115 + " ("+level+" 1)";
		//Heavy Fighter	
		font[46].innerHTML = gid21 + " ("+level+" 3)";
		font[47].innerHTML = gid111 + " ("+level+" 2)";
		font[48].innerHTML = gid117 + " ("+level+" 2)";
		//Cruiser	
		font[49].innerHTML = gid21 + " ("+level+" 5)";
		font[50].innerHTML = gid117 + " ("+level+" 4)";
		font[51].innerHTML = gid121 + " ("+level+" 2)";
		//Battleship	
		font[52].innerHTML = gid21 + " ("+level+" 7)";
		font[53].innerHTML = gid118 + " ("+level+" 4)";
		//Colony Ship	
		font[54].innerHTML = gid21 + " ("+level+" 4)";
		font[55].innerHTML = gid117 + " ("+level+" 3)";
		//Recycler	
		font[56].innerHTML = gid21 + " ("+level+" 4)";
		font[57].innerHTML = gid115 + " ("+level+" 6)";
		font[58].innerHTML = gid122 + " ("+level+" 2)";
		//Espionage Probe	
		font[59].innerHTML = gid21 + " ("+level+" 3)";
		font[60].innerHTML = gid115 + " ("+level+" 3)";
		font[61].innerHTML = gid106 + " ("+level+" 2)";
		//Bomber	
		font[62].innerHTML = gid117 + " ("+level+" 6)";
		font[63].innerHTML = gid21 + " ("+level+" 8)";
		font[64].innerHTML = gid122 + " ("+level+" 5)";
		//Solar Satellite	
		font[65].innerHTML = gid21 + " ("+level+" 1)";
		//Destroyer	
		font[66].innerHTML = gid21 + " ("+level+" 9)";
		font[67].innerHTML = gid118 + " ("+level+" 6)";
		font[68].innerHTML = gid114 + " ("+level+" 5)";
		//Deathstar	
		font[69].innerHTML = gid21 + " ("+level+" 12)";
		font[70].innerHTML = gid118 + " ("+level+" 7)";
		font[71].innerHTML = gid114 + " ("+level+" 6)";
		font[72].innerHTML = gid199 + " ("+level+" 1)";
		//Rocket Launcher	
		font[73].innerHTML = gid21 + " ("+level+" 1)";
		//Light Laser	
		font[74].innerHTML = gid113 + " ("+level+" 1)";
		font[75].innerHTML = gid21 + " ("+level+" 2)";
		font[76].innerHTML = gid120 + " ("+level+" 3)";
		//Heavy Laser	
		font[77].innerHTML = gid113 + " ("+level+" 3)";
		font[78].innerHTML = gid21 + " ("+level+" 4)";
		font[79].innerHTML = gid120 + " ("+level+" 6)";
		//Gauss Cannon	
		font[80].innerHTML = gid21 + " ("+level+" 6)";
		font[81].innerHTML = gid113 + " ("+level+" 6)";
		font[82].innerHTML = gid109 + " ("+level+" 3)";
		font[83].innerHTML = gid110 + " ("+level+" 1)";
		//Ion Cannon	
		font[84].innerHTML = gid21 + " ("+level+" 4)";
		font[85].innerHTML = gid121 + " ("+level+" 4)";
		//Plasma Turret	
		font[86].innerHTML = gid21 + " ("+level+" 8)";
		font[87].innerHTML = gid122 + " ("+level+" 7)";
		//Small Shield Dome	
		font[88].innerHTML = gid110 + " ("+level+" 2)";
		font[89].innerHTML = gid21 + " ("+level+" 1)";
		//Large Shield Dome	
		font[90].innerHTML = gid110 + " ("+level+" 6)";
		font[91].innerHTML = gid21 + " ("+level+" 6)";
		//Anti-Ballistic Missiles	
		font[92].innerHTML = gid44 + " ("+level+" 2)";
		//Interplanetary Missiles	
		font[93].innerHTML = gid44 + " ("+level+" 4)";
		//Sensor Phalanx	
		font[94].innerHTML = gid41 + " ("+level+" 1)";
		//Jump Gate	
		font[95].innerHTML = gid41 + " ("+level+" 1)";
		font[96].innerHTML = gid114 + " ("+level+" 7)"; 
	}else
	if(hrefer.indexOf('b_building.php')!=-1||hrefer.indexOf('buildings.php')!=-1){
		resourse();
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf('infos.php')!=-1&&a[i].innerHTML.indexOf('<img')==-1){
				change_links(a[i]);
			}else
			if(a[i].href.indexOf('b_building.php')!=-1&&a[i].href.indexOf('bau')!=-1&&a[i].href.indexOf('unbau')==-1){
			  var font = a[i].getElementsByTagName('font')[0];
			  if(font.innerHTML.length!=4){
				font.innerHTML = Upgrade+"<br>"+level+ font.innerHTML.substr(9);
				}else{font.innerHTML = Build;}
			}else
			if(a[i].href.indexOf('buildings.php')!=-1&&a[i].href.indexOf('bau')!=-1&&a[i].href.indexOf('unbau')==-1){
			  var font = a[i].getElementsByTagName('font')[0];
			  if(font.innerHTML.length!=4){
				font.innerHTML = Upgrade+"<br>"+level+ font.innerHTML.substr(9);
				}else{font.innerHTML = Investigate;}
		  }
		}
	}else
	if(hrefer.indexOf('overview.php')!=-1){
		resourse();
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf('renameplanet.php')!=-1){
				a[i].innerHTML = Planet + a[i].innerHTML.substr(2);
				a[i].title = Planet_menu;
			}
		}
	}else
	if(hrefer.indexOf('renameplanet.php')!=-1){
		resourse();
	}else
	if(hrefer.indexOf('resources.php')!=-1){
		resourse();
	}else
	if(hrefer.indexOf('flotten1.php')!=-1){
		resourse();
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf('noShips();')!=-1){
				a[i].innerHTML = No_ships;
			}else
			if(a[i].href.indexOf('maxShips()')!=-1){
				a[i].innerHTML = All_ships;
			}else
			if(a[i].href.indexOf('maxShip(\'')!=-1){
			  var numb = a[i].href.indexOf('\')');
			  var nShip = a[i].href.substring(numb,numb-3);
				a[i].innerHTML = maxShip;
				var aParent = a[i].parentNode.parentNode.getElementsByTagName('th')[0];
				aParent.getElementsByTagName('a')[0].innerHTML = eval('gid'+nShip);
			}
		}
	}else
	if(hrefer.indexOf('flotten2.php')!=-1){
		resourse();
		var option = document.getElementsByTagName('select')[1].getElementsByTagName('option');
		for (var i = option.length - 1; i >= 0; i--) {
			if(option[i].value==1){
        option[i].innerHTML = Planet;
			}else
			if(option[i].value==2){
				option[i].innerHTML = Moon;
			}else
			if(option[i].value==3){
				option[i].innerHTML = Debris;
			}
		}
	}else
	if(hrefer.indexOf('flotten3.php')!=-1){
		resourse();
  	var input = document.getElementsByTagName('input');
    for (var i = input.length - 1; i >= 0; i--) {
      if(input[i].type=="radio"){
			  var dataNode = input[i].parentNode.childNodes[2];
			  if(input[i].value==1){
          dataNode.data = Attack;
			  }else if(input[i].value==3){
			    dataNode.data = Transport;
			  }else if(input[i].value==4){
			    dataNode.data = Move;
			  }else if(input[i].value==5){
			    dataNode.data = Fleet_Position;
			  }else if(input[i].value==6){
			    dataNode.data = Spy;
			  }else if(input[i].value==8){
			    dataNode.data = Harvest;
        }else if(input[i].value==9){
			    dataNode.data = Destroy;
        }
			}
		}
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf('maxResources()')!=-1){
				a[i].innerHTML = Max_resources;
			}
		}
	}else
	if(hrefer.indexOf('options.php')!=-1){
		resourse();
		
	}else
	if(hrefer.indexOf('buddy.php')!=-1){
		resourse();
	}else
	if(hrefer.indexOf('messages.php')!=-1){
		resourse();
		var option = document.getElementsByTagName('option');
		for (var i = option.length - 1; i >= 0; i--) {
			if(option[i].value=='deleteall'){
				option[i].innerHTML = Delete_All;
			}else if(option[i].value=='deleteallshown'){
				option[i].innerHTML = Delete_All_Shown;
			}else if(option[i].value=='deletenonmarked'){
				option[i].innerHTML = Delete_Non_Marked;
			}else if(option[i].value=='deletemarked'){
				option[i].innerHTML = Delete_Marked;
			}
		}
	}else
	if(hrefer.indexOf('suche.php')!=-1){
		resourse();
		var option = document.getElementsByTagName('option');
		for (var i = option.length - 1; i >= 0; i--) {
			if(option[i].value=='playername'){
				option[i].innerHTML = playername;
			}else if(option[i].value=='planetname'){
				option[i].innerHTML = planetname;
			}else if(option[i].value=='allytag'){
				option[i].innerHTML = allytag;
			}else if(option[i].value=='allyname'){
				option[i].innerHTML = allyname;
			}
		}
	}else
	if(hrefer.indexOf('stat.php')!=-1){
		resourse();
		var option = document.getElementsByTagName('option');
		for (var i = option.length - 1; i >= 0; i--) {
			if(option[i].value=='player'){
				option[i].innerHTML = Players;
			}else if(option[i].value=='ally'){
				option[i].innerHTML = Alliance;
			}else if(option[i].value=='pts'){
				option[i].innerHTML = Points;
			}else if(option[i].value=='flt'){
				option[i].innerHTML = Fleet;
			}else if(option[i].value=='res'){
				option[i].innerHTML = Research;
			}
		}
	}else
	if(hrefer.indexOf('changelog.php')!=-1){
		resourse();
		var td = document.getElementsByTagName('td');
		td[23].innerHTML = Version;
		td[24].innerHTML = Description;

	}
})();//Enjoy! (L¥Ö¥`)

// Created by Perberos. All rights reversed (C) 2006
