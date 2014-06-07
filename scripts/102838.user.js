// ==UserScript==
// @name			Grepolis Collection
// @namespace		.
// @description		Grepolis Collection special version (español)
// @icon			http://www.imgbox.de/users/Peety/grepolis/IconGrepoCollection.png
// @resource		icongrepocoll		http://www.imgbox.de/users/Peety/grepolis/icongrepocoll.png
// @resource		iconAtt				http://www.imgbox.de/users/Peety/grepolis/iconAtt.png
// @resource		iconDef				http://www.imgbox.de/users/Peety/grepolis/iconDef.png
// @resource		iconWd				http://www.imgbox.de/users/Peety/grepolis/iconWood.png
// @resource		iconStn				http://www.imgbox.de/users/Peety/grepolis/iconStone.png
// @resource		iconSil				http://www.imgbox.de/users/Peety/grepolis/iconSilver.png
// @resource		iconFavor			http://www.imgbox.de/users/Peety/grepolis/iconFavor.png
// @resource		menubg2				http://www.imgbox.de/users/Peety/grepolis/menubg2.png
// @resource		town_list_top2		http://www.imgbox.de/users/Peety/grepolis/town_list_top2.png
// @resource		town_list_middle2	http://www.imgbox.de/users/Peety/grepolis/town_list_middle2.png
// @resource		town_list_bottom2	http://www.imgbox.de/users/Peety/grepolis/town_list_bottom2.png
// @resource		pbar_hide			http://www.imgbox.de/users/Peety/grepolis/progressbar_hide.png
// @resource		pbar_red			http://www.imgbox.de/users/Peety/grepolis/progressbar_red.png
// @resource		pbar_orange			http://www.imgbox.de/users/Peety/grepolis/progressbar_orange.png
// @resource		pbar_yellow			http://www.imgbox.de/users/Peety/grepolis/progressbar_yellow.png
// @resource		pbar_green			http://www.imgbox.de/users/Peety/grepolis/progressbar_green.png
// @resource		pbar_bgII			http://www.imgbox.de/users/Peety/grepolis/progressbar_bgII.png
// @resource		crButtonL			http://www.imgbox.de/users/Peety/grepolis/crButtonL.png
// @resource		crButtonR			http://www.imgbox.de/users/Peety/grepolis/crButtonR.png
// @resource		bMsg 				http://www.imgbox.de/users/Peety/grepolis/bMsg.png
// @resource		uLink		 		http://www.imgbox.de/users/Peety/grepolis/uLink.png
// @resource		booty				http://www.imgbox.de/users/Peety/grepolis/booty.png
// @resource		mood_drop			http://www.imgbox.de/users/Peety/grepolis/mood_drop.png
// @resource		strength			http://www.imgbox.de/users/Peety/grepolis/strength.png
// @resource		strength_drop		http://www.imgbox.de/users/Peety/grepolis/strength_drop.png
// @resource		strength_prev		http://www.imgbox.de/users/Peety/grepolis/strength_prev.png
// @resource		strength_now		http://www.imgbox.de/users/Peety/grepolis/strength_now.png
// @resource		strength_total		http://www.imgbox.de/users/Peety/grepolis/strength_total.png
// @resource		ge_button			http://www.imgbox.de/users/Peety/grepolis/ge_button.png
// @resource		ge_button2			http://www.imgbox.de/users/Peety/grepolis/ge_button2.png
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include			http://*.grepolis.*/*
// @exclude			http://forum.*.grepolis.*
// @exclude			http://zz3.grepolis.*
// @exclude			http://de16.grepolis.*
// @exclude			http://de17.grepolis.*
// @exclude			http://de18.grepolis.*
// @exclude			http://de19.grepolis.*
// @exclude			http://de2*.grepolis.*
// @version			0.9.23
// ==/UserScript==


var scriptId = 102838;
var scriptName = "GrepoCollection";
var scriptVersion = "0.9.23";
var scriptWright = "wBw, Peety, Tilx, GTeauDFAdGTio, PhasmaExMachina, nano u.a.";
var scriptforum = "http://forum.de.grepolis.com/showthread.php?t=12648";

	// START of JSON
	(function() {
		if (!this.JSON) {this.JSON = {};}
		(function() {function f(n) {return n < 10 ? '0'+ n : n;}
		if (typeof Date.prototype.toJSON !== 'function') {Date.prototype.toJSON = function(key) {return isFinite(this.valueOf()) ? this.getUTCFullYear() +'-'+
		f(this.getUTCMonth() + 1) +'-'+ f(this.getUTCDate()) +'T'+ f(this.getUTCHours() ) +':'+ f(this.getUTCMinutes()) +':'+
		f(this.getUTCSeconds()) +'Z' : null;}; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {return this.valueOf();};}
		var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
		function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if (value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
		if (typeof rep==='function') {value=rep.call(holder,key,value);}
		switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
		gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
		v=partial.length===0?'[]':gap?'[\n'+gap+
		partial.join(',\n'+gap)+'\n'+
		mind+']':'['+partial.join(',')+']';gap=mind;return v;}
		if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
		v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
		mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
		if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space) {var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
		rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
		return str('',{'':value});};}
		if(typeof JSON.parse!=='function') {JSON.parse=function(text,reviver) {var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
		return reviver.call(holder,key,value);}
		cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
		('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
		if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
		throw new SyntaxError('JSON.parse');};}}());
	})();
	// END of JSON

	// console log function
	var error_log = function (msg) {
		try {
			if (typeof GM_log !== 'undefined') {
				GM_log (msg);
			} else {
				if (typeof opera.postError !== 'undefined') {
					opera.postError(msg);
				}
				else {
					uW.console.log(msg);
				}
			}
		} catch (e) {;}
	}


	// START of FUNCTIONS & VARIABLES

	// Variables
	var GE = {};
	GE.location = window.location.href;
	GE.counters = [];
	if (typeof unsafeWindow === 'object') {
		var uW = unsafeWindow;
	} else {
		var uW = window;
	}
	var $ = uW.jQuery;
	var jsVoid = 'javaScript:void(0);';
	if (document.body == undefined) return; 	//  not ready?
	if (document.body == null) return;			//  not ready?
	GE.Server = /http\:\/\/(\w+)\.grepolis\..*/.exec( uW.document.URL );
	if (GE.Server == undefined) return;
	if (uW.GameData == undefined) return;
	if (uW.Game == undefined) return;
	GE.GameData = uW.GameData;
	GE.Game	= uW.Game;
	if (GE.Game.townId == undefined) { return; }
	GE.Controller = GE.Game.controller;
	if (GE.Game.action == undefined) { GE.Action = ""; } else { GE.Action = GE.Game.action; }
	GE.Alliance_id = GE.Game.alliance_id;
	GE.Alliance_name = [];
	GE.Alliance_name[0] = GM_getValue("optAlliance", "0");
	GE.Alliance_name[1] = GM_getValue("Alliance_name_"+ GE.Server[1], "");
	GE.Layout = uW.Layout;
	GE.time = Number(GE.Game.server_time) + 1;
	GE.Buildings = [];
	GE.Builds = [];
	GE.Positions = [];
	GE.Debug = false;
	GE.L = [];
	GE.Lang = [];
	GE.Units = [];
	GE.Server[2] = GE.Server[1].substr(0,2);
	GE.Server[3] = GE.Server[1].substr(2,5);

	var pr_bar = 0;
	var hideMinIron = 10000;
	var Res_Pass = GM_getValue("ResPass_"+ GE.Server[1], "");
	var Res_Key = GM_getValue("ResKey_"+ GE.Server[1], "");
	var Polis_Search = GM_getValue("PolisSearch_"+ GE.Server[1], "");
	var Map_Key = GM_getValue("MapKey_"+ GE.Server[1], "");
	var Link1_Name = GM_getValue("Link1Name_"+ GE.Server[1], "");
	var Own_Link1 = GM_getValue("OwnLink1_"+ GE.Server[1], "");
	var Link2_Name = GM_getValue("Link2Name_"+ GE.Server[1], "");
	var Own_Link2 = GM_getValue("OwnLink2_"+ GE.Server[1], "");

	var pImage = {
		'icongrepocoll'		: GM_getResourceURL('icongrepocoll'),
		'iconWd'			: GM_getResourceURL('iconWd'),
		'iconStn'			: GM_getResourceURL('iconStn'),
		'iconSil'			: GM_getResourceURL('iconSil'),
		'iconFavor'			: GM_getResourceURL('iconFavor'),
		'iconAtt'			: GM_getResourceURL('iconAtt'),
		'iconDef'			: GM_getResourceURL('iconDef'),
		'menubg2'			: GM_getResourceURL('menubg2'),
		'town_list_top2' 	: GM_getResourceURL('town_list_top2'),
		'town_list_middle2' : GM_getResourceURL('town_list_middle2'),
		'town_list_bottom2' : GM_getResourceURL('town_list_bottom2'),
		'pbar_hide'			: GM_getResourceURL('pbar_hide'),
		'pbar_red'			: GM_getResourceURL('pbar_red'),
		'pbar_orange'		: GM_getResourceURL('pbar_orange'),
		'pbar_yellow'		: GM_getResourceURL('pbar_yellow'),
		'pbar_green'		: GM_getResourceURL('pbar_green'),
		'pbar_bgII'			: GM_getResourceURL('pbar_bgII'),
		'crButtonL'			: GM_getResourceURL('crButtonL'),
		'crButtonR'			: GM_getResourceURL('crButtonR'),
		'bMsg'				: GM_getResourceURL('bMsg'),
		'uLink'				: GM_getResourceURL('uLink'),
		'booty'				: GM_getResourceURL('booty'),
		'mood_drop'			: GM_getResourceURL('mood_drop'),
		'strength'			: GM_getResourceURL('strength'),
		'strength_drop'		: GM_getResourceURL('strength_drop'),
		'strength_prev'		: GM_getResourceURL('strength_prev'),
		'strength_now'		: GM_getResourceURL('strength_now'),
		'strength_total'	: GM_getResourceURL('strength_total'),
		'ge_button'			: GM_getResourceURL('ge_button'),
		'ge_button2'		: GM_getResourceURL('ge_button2'),
		'desire'			: ['http://www.imgbox.de/users/Peety/grepolis/desire.png'],
		'fair_wind'			: ['http://www.imgbox.de/users/Peety/grepolis/fair_wind.png'],
		'strength_of_heroes': ['http://www.imgbox.de/users/Peety/grepolis/strength_of_heroes.png'],
		'iconWood'			: ['http://www.imgbox.de/users/Peety/grepolis/iconWood.png'],
		'iconStone'			: ['http://www.imgbox.de/users/Peety/grepolis/iconStone.png'],
		'iconSilver'		: ['http://www.imgbox.de/users/Peety/grepolis/iconSilver.png']
	};

//---------------------------------------------------------------------------------------
//   ESPAÑOL
//---------------------------------------------------------------------------------------
	function L_de() {
		var t = [];
		t["SCRIPTNAME"] = "Nombre del Script";
		t["SCRIPTVER"] = "Versión";
		t["SCRIPTWRIGHT"] = "Autor";
				// Options Settings
		t["MENU_EXTRAS"] = "Tools";
		t["TAB1"] = "Opciones 1";
		t["TAB2"] = "Opciones 2";
		t["TAB3"] = "Opciones 3";
		t["TAB4"] = "Opciones "+ t["MENU_EXTRAS"] +"-Menu";
		t["UPDATE"] = "Actualizar";
		t["ABOUT"] = "Sobre";
		t["SETTINGS"] = "GrepoCollection";
		t["OPTIONSTXT"] = "Einstellungen";
		t["OPTSETTXT1"] = " ";
		t["OPTSETTXT2"] = " ";
		t["OPTSETTXT3"] = " ";
		t["OPTSETTXT4"] = "<b>"+ t["MENU_EXTRAS"] +"-Menü der Schnellleiste konfigurieren</b> <br>Hinweise: Nur Schlüssel / Passwort eingeben - nicht die Kommas mitkopieren!<br>Die Einstellungen dieser Seite werden nach Welten getrennt gesichert.<br><br>";
		t["OPTSETTXT4A"] = "(...reservation/"+ GE.Server[3] +",<b>Code</b>,<b>Passwort</b>)";
		t["ForumLnk"] = "» Link zum deutschen Forum «";
		t["ABOUTTEXT"] = "<br><b>GrepoCollection</b> ist eine Sammlung von Scripten verschiedener Autoren.<br>Zusammengestellt als Ergänzung zu Faarks GrepoTools.<br>Herzlichen Dank an alle Autoren.<br><br>GrepoCollection sollte in der Script-Reihenfolge hinter Faarks GrepoTools stehen!<br><br>© - Hinweise:<br>Lizenz: Creative Commons - http://creativecommons.org/licenses/by-sa/3.0/de/<br>Es werden Grafiken von InnoGames/Grepolis verwendet.<br><br><a href="+ scriptforum +" target='_blank'><b>"+ t['ForumLnk'] +"</b></a>";
		t["OPTSETFOOTER"] = " Version " + scriptVersion;
		t["OPTCANCEL"] = "Cancelar";
		t["OPTSAVE"] = "Guardar";
		t["OPTFORMATTER"] = "Formato de Informes (Text / BB-Code)";
		t["OPTREPRES"] = "Mostrar pérdidas en informes";
		t["OPTTOOLBAR"] = "Barra vista rápida";
		t["ToolbarText"] = "Barra vista rápida Habilitada";
		t["OPTPRODINFO"] = "Información de producción";
		t["OPTFARMERHELP"] = "Información pueblos agrícolas";
		t["OPTFARMINFO"] = "Ver info P.agrícolas en el mapa";
		t["OPTREPORTINFO"] = "Realzar colores en la tabla";
		t["OPTTOWNLIST"] = "Lista ciudades en columnas";
		t["TownlistText"] = "4 Columnas";
		t["OPTALLIANCE"] = "Propio nombre alianza";
		t["NOALLIANCE"] = "Ninguna alianza";
		t["AllianceText"] = "statt GrepoCollection";
		t["OPTCULTURE"] = "Información de cultura";
		t["OPTMARKET"] = "Ayuda mercado y cueva";
		t["OPTBUILDINGPNTS"] = "Puntos de construcciones";
		t["OPTUSERLINKS"] = "Enlaces de jugador";
		t["OPTALLYLINKS"] = "Enlaces de alianza";
		t["OPTREDIRECTCLEANER"] = "Vinculos directos de transporte";
		t["WarnPage"] = "Advertencia acuerdo";
		t["OPTRESCALC"] = "Pérdidas en muralla y simulador";
		t["OPTARROWCNTRL"] = "Flechas para próximo informe";
		t["OPTSWCITYCNTRL"] = "ciudad más cercana con [Ctrl] + flecha derecha / izquierda";
		t["POLISSEARCH"] = "Busqueda de ciudades: ";
		t["POLISSRCHPOPUP"] = "\"Guardar Busqueda\" Haga click ";
		t["MAPKEY"] = "Clave grepolismpaps: ";
		t["MAPPOPUP"] = "Mapa";
		t["RESPASSWORD"] = "Clave Herramienta reservas: ";
		t["RESPASSPOPUP"] = " ";
		t["RESPASSKEY"] = "Nombre Herramienta reservas: ";
		t["RESERVATIONTXT"] = "Reservierung *";
		t["POLISSEARCHTXT"] = "Busca Polis*";
		t["GPMAP"] ="Mapa *";
		t["OptText"] = "* Ver opciones";
		t["OPTLINK1NAM"] = "Nombre Link1:";
		t["OPTLINK1"] = "Link1:";
		t["OPTLINK2NAM"] = "Nombre Link2:";
		t["OPTLINK2"] = "Link2:";
		t["PAOnly"] = "Solo con Administrador";
		t["OPTUPDTXT"] = "<b> Comprobar actualización de "+ scriptName +" verfügbar ist </b>";
		t["NOTREADY"] = "No está listo";
		t["OPTLINE1"] = "— <small>  "+ t['PAOnly'] +":  </small> ——————————————————————";
		t["OPTLINE2"] = "—————————————————————————";
		t["OPTLNKTXT"] = "<b>eigene Links für das "+ t["MENU_EXTRAS"] +"-Menü</b> —— <small>(beginnend mit <b>http://</b>  oder  <b>/game/</b>) </small>",
		t["OPTLINE4"] = "_______________________________________________________________________";
			// Updater
		t["UPDTITLE"] = "Actualizar Buscardor";
		t["UPDUPD"] = "Buscar actualizaciones";
		t["SRCHFORUPD"] = "Buscar actualizaciones";
		t["UPDNEW"] = "Una nueva versión de";
		t["UPDREADY"] = "está listo para instalar.";
		t["UPDCURRENT"] = "Deine vorhandene Version ist";
		t["UPDLATEST"] = "Última versión";
		t["UPDONE"] = " Jede Stunde";
		t["UPDSIX"] = " Cada 6 horas";
		t["UPDDAY"] = " Todos los dias";
		t["UPDWEEK"] = " Todas las semanas";
		t["UPDWEEK4"] = " Cada 4 semanas";
		t["UPDNEVER"] = " No (No recomendado)";
		t["UPDCANCEL"] = "Cancelar";
		t["UPDINST"] = "Instalar";
			// End of Updater
		t["NONE"] = "kein";
		t["OFMAX"] = "Máximo";
		t["WITHQUEUE"] = "Cola de construcción";
		t["POINTS"] = "Puntos";
		t["LEVEL"] = "Nivel";
		t["ALLPOINTS"] = "Puntuación";
		t["ALLPOP"] = "BH";
		t["ATTACKR"] = "Atacante";
		t["DEFENDR"] = "Defensoor";
		t["BPNTS"] = "Puntos de combate";
		t["UBBC"] = "código BB";
		t["TXTC"] = "als Text";
		t["ATK"] = " vs ";
		t["REPTIME"] = "Tiempo";
		t["GHTOWN"] = "Pueblo fantasma";
		t["CITB"] = "Bono de combate";
		t["LOST"] = "Perdido";
		t["LOOT"] = "Botín";
		t["NOLOOT"] = "No se tomaron las materias primas";
		t["WALL"] = "Muralla";
		t["NOWALL"] = "Sin muralla";
		t["NON"] = "No hay unidades en la ciudad";
		t["NON2"] = "Unidades no visibles";
		t["NON3"] = "Unidades de tierra no son visibles";
		t["Wood"] = "Madera";
		t["Stone"] = "Piedra";
		t["Iron"] = "Plata";
		t["Favor"] = "Favor";
		t["BH"] = "Kampfpunkte";
		t["REPTITLE"] = "Informe ataque";
		t["SPYTITLE"] = "Informe Espia";
		t["RESOURCES"] = "Materias primas";
		t["RESOURCES2"] = "Materias primas([color=#006600]saquearon[/color])";
		t["SPYCOST"] = "Monedas de plata usadas";
		t["SPY"] = "Espia";
		t["POWER"] = "Poder";
		t["MORALE"] = "Moral";
		t["LUCK"] = "Suerte";
		t["NBONUS"] = "Bono nocturno";
		t["UNITS"] = "Unidades";
		t["BUILDINGS"] = "Edificios";
		t["HOUR"] = "h";
		t["RESCNTR"] = "Restzeit";
		t["NOTEMPLE"] = "Sin templo";
		t["NOGOD"] = " Sin Dios";
		t["FARM_RES"] = "Ataques máximos en curso";
		t["FARM_MOOD_DROP"] = "Pérdida de sensibilidad";
		t["FARM_STR_DROP"] = "Perdida fuerza ataque actual";
		t["FARM_STR"] = "Mejora fuerza ataque actual";
		t["FARM_STR_PREV"] = "Fuerza de un ataque previo";
		t["FARM_STR_NOW"] = "aktuelle Stärke";
		t["FARM_STR_TOTAL"] = "neue Stärke";
		t["FARM_TOWN_ID"] = "Diese ID gehört zur Stadt mit dem BB-Code: ";
		t["GREPO_FARM_NOT_COMPATIBLE"] = "Die FarmHilfe ist nicht kompatibel mit dieser Version von Grepolis";
		t["OPENINPOPUP"] = "öffnet Link in Popup-Window";
		t["CLICKNCOPY"] = "Klicke einmal und kopiere (ctrl+c)";
		t["NOMILITIA"] = "<em>Miliz zählt nicht</em>";
		t["RCATT_LOST"] = "Gesamtverlust Angreifer";
		t["RCDEF_LOST"] = "Gesamtverlust Verteidiger";
		t["OPENRESBOX"] = "Estadísticas";
		t["CLOSERESBOX"] = "Statistik schließen";
		t["WALLYOURCOSTS"] = "deine Kosten";
		t["WALLFOECOSTS"] = "Gegner Kosten";
		t["RESTABLE"] = "Ressourcen Vorschau";
		t["LostTitle"] = "Ressourcen insgesamt";
		t["MYCOSTS"] = "Coste";
		t["FOECOSTS"] = "Gegner";
		t["SIMSTATS"] = "Simulador";
		t["STATS"] = "Estadísticas";
		t["WALLSTATS1"] = "Muertes Ofensivas: ";
		t["WALLSTATS2"] = "Muertes defensivas: ";
		t["WALLSTATS3"] = "Asesinatos ofensivos: ";
		t["WALLSTATS4"] = "Asesinatos defensivos: ";
			// units
		t["militia"] = "Milizen";
		t["unknown"] = "unbekannt";
		t["sword"] = "Schwerter";
		t["slinger"] = "Schleuderer";
		t["archer"] = "Bogenschützen";
		t["hoplite"] = "Hoplits";
		t["rider"] = "Reiter";
		t["chariot"] = "Streitwagen";
		t["catapult"] = "Katas";
		t["big_transporter"] = "Langsame Transporter";
		t["bireme"] = "Biremen";
		t["attack_ship"] = "Feuerschiffe";
		t["demolition_ship"] = "Brander";
		t["small_transporter"] = "Schnelle Transporter";
		t["trireme"] = "Triremen";
		t["colonize_ship"] = "Kolo";
		t["minotaur"] = "Minotaurus";
		t["manticore"] = "Mantikor";
		t["zyklop"] = "Zyklop";
		t["sea_monster"] = "Hydra";
		t["harpy"] = "Harpie";
		t["medusa"] = "Medusa";
		t["centaur"] = "Zentaur";
		t["pegasus"] = "Pegasus";
			// toolbar & buildings
		t["main"] = "Senat";
		t["barracks"] = "Cuartel";
		t["docks"] = "Puerto";
		t["academy"] = "Academia";
		t["academyshort"] = "Aca";
		t["market"] = "Mercao";
		t["wall"] = "Muro";
		t["place"] = "Agora";
		t["simulator"] = "Simular";
		t["simulatorshort"] = "Sim";
		t["temple"] = "Templo";
		t["hide"] = "Cueva";
		t["farm"] = "Granja";
		t["ironer"] = "Plata";
		t["lumber"] = "Madera";
		t["stoner"] = "Piedra";
		t["storage"] = "Almacén";
		t["theater"] = "Teatro";
		t["thermal"] = "Termás";
		t["library"] = "Biblioteca";
		t["lighthouse"] = "Faro";
		t["tower"] = "Torre";
		t["statue"] = "Götterstatue";
		t["oracle"] = "Oráculo";
		t["trade_office"] = "Handelskontor";
				// other
		t["highlighting"] = "Farbige Kennzeichnung";
		t["GWLanguage"] = "deutsch";
		if (GE.Alliance_name[0] == "1") { t["SETTINGS"] = GE.Alliance_name[1].substr(0,25); }
		GE.Lang['de'] = t;
	};
	L_de();
//---------------------------------------------------------------------------------------
//   INGLÉS
//---------------------------------------------------------------------------------------	
	function L_en() {
		var t = [];
		t["SCRIPTNAME"] = "Script name";
		t["SCRIPTVER"] = "Script version";
		t["SCRIPTWRIGHT"] = "Script authors";
		t["SETTINGS"] = "Grepo 2 Collection ";
				// Options Settings
		t["MENU_EXTRAS"] = "Tools";
		t["TAB1"] = "Options 1";
		t["TAB2"] = "Options 2";
		t["TAB3"] = "Options 3";
		t["TAB4"] = "Options "+ t["MENU_EXTRAS"] +"-Menu";
		t["UPDATE"] = "Update";
		t["ABOUT"] = "About";
		t["SETTINGS"] = "Grepo 2 Collection";
		t["OPTIONSTXT"] = "Settings";
		t["OPTSETTXT1"] = " ";
		t["OPTSETTXT2"] = " ";
		t["OPTSETTXT3"] = " ";
		t["OPTSETTXT4"] = "<b>Config "+ t["MENU_EXTRAS"] +"-Menu</b> <br>Notes: copy only the key  - do not copy the \'/\' <br>The settings of this side are saved separately for every world.<br><br>";
		t["OPTSETTXT4A"] = "(...reservation/"+ GE.Server[3] +",<b>Code</b>,<b>Passwort</b>)";
		t["ForumLnk"] = "» Link to the German GrepoCollection forum «";
		t["ABOUTTEXT"] = "<br><b>Grepo 2 Collection</b> is a collection of scripts of many authors.<br>Thanx to all.<br><br><br>©-notes:<br>License: Creative Commons - http://creativecommons.org/licenses/by-sa/3.0/<br>InnoGames/Grepolis graphics are used.<br><br><br><a href="+ scriptforum +" target='_blank'><b>"+ t['ForumLnk'] +"</b></a><br>";
		t["OPTSETFOOTER"] = " Version " + scriptVersion;
		t["OPTCANCEL"] = "Cancel";
		t["OPTSAVE"] = "Close";
		t["OPTFORMATTER"] = "Report Formatter (Text / BB-Code)";
		t["OPTREPRES"] = "Show Losses in Reports";
		t["OPTTOOLBAR"] = "Show advanced Toolbar";
		t["ToolbarText"] = "Grepo toolbar must be enabled";
		t["OPTPRODINFO"] = "Show Productioninfo";
		t["OPTFARMERHELP"] = "Help for Farming Villages";
		t["OPTFARMINFO"] = "Show farming village infos on the map";
		t["OPTREPORTINFO"] = "Colored Report Overview";
		t["OPTTOWNLIST"] = "multiple columns Townlist";
		t["TownlistText"] = "1 to 4 columns";
		t["OPTALLIANCE"] = "Show name of the own ally";
		t["NOALLIANCE"] = "no alliance";
		t["AllianceText"] = "instead of Grepo 2 Collection";
		t["OPTCULTURE"] = "Extended Culture Overview";
		t["OPTMARKET"] = "Extended Market and Hide Overview";
		t["OPTBUILDINGPNTS"] = "Show buildingpoints in the Senate";
		t["OPTUSERLINKS"] = "Playerlinks to Grepo-world";
		t["OPTALLYLINKS"] = "Allylinks to Grepo-world";
		t["OPTREDIRECTCLEANER"] = "Remove redirect from external links";
		t["WarnPage"] = "skip warningpage ";
		t["OPTRESCALC"] = "Show resourcetables in Wall & Simulator";
		t["OPTARROWCNTRL"] = "Jump report with right / left keys";
		t["OPTSWCITYCNTRL"] = "Switch city with ctrl + right / left key";
		t["POLISSEARCH"] = "Polissearch (Tonda+Faark) Key: ";
		t["POLISSRCHPOPUP"] = "Click \"Save Search\" for the Key";
		t["MAPKEY"] = "grepolismaps.org Map Key: ";
		t["MAPPOPUP"] = "Show Map (grepolismaps.org)";
		t["RESPASSWORD"] = "Reservation Password: ";
		t["RESPASSPOPUP"] = " ";
		t["RESPASSKEY"] = "Reservation Code: ";
		t["RESERVATIONTXT"] = "Reservation *";
		t["POLISSEARCHTXT"] = "Polissearch *";
		t["GPMAP"] ="GP Map *";
		t["OptText"] = "* see options";
		t["OPTLINK1NAM"] = "shown name for Link 1:";
		t["OPTLINK1"] = "Link 1:";
		t["OPTLINK2NAM"] = "shown name for Link 2:";
		t["OPTLINK2"] = "Link 2:";
		t["OPTLINK3NAM"] = "shown name for Link 3:";
		t["OPTLINK3"] = "Link 3:";
		t["OPTLINK4NAM"] = "shown name for Link 4:";
		t["OPTLINK4"] = "Link 4:";
		t["PAOnly"] = "only with Administrator";
		t["OPTUPDTXT"] = "<b> Is there an Update for "+ scriptName +" available ?</b>";
		t["NOTREADY"] = "not ready yet";
		t["OPTLINE1"] = "— <small>  "+ t['PAOnly'] +":  </small> ————————————————————————";
		t["OPTLINE2"] = " ";
		t["OPTLNKTXT"] = "<b>Own Links for the "+ t["MENU_EXTRAS"] +"-Menu</b> —— <small>(starting with <b>http://</b>  oder  <b>/game/</b>) </small>",
		t["OPTLINE4"] = "_____________________________________________________________________";
			// Updater
		t["UPDTITLE"] = "Update Finder";
		t["UPDUPD"] = "Check for Updates";
		t["SRCHFORUPD"] = "Search for Update";
		t["UPDNEW"] = "A new version of";
		t["UPDREADY"] = "is available";
		t["UPDCURRENT"] = "Your version is";
		t["UPDLATEST"] = "Available version";
		t["UPDONE"] = " Every hour";
		t["UPDSIX"] = " Every 6 hours";
		t["UPDDAY"] = " Every day";
		t["UPDWEEK"] = " Every week";
		t["UPDWEEK4"] = " Every 4 weeks";
		t["UPDNEVER"] = " Never (not recommended)";
		t["UPDCANCEL"] = "Cancel";
		t["UPDINST"] = "Install";
			// End of Updater
		t["NONE"] = "none";
		t["OFMAX"] = "of max.";
		t["WITHQUEUE"] = "with Queue";
		t["POINTS"] = "Points";
		t["LEVEL"] = "Level";
		t["ALLPOINTS"] = "Points";
		t["ALLPOP"] = "Population";
		t["ATTACKR"] = "Attacker";
		t["DEFENDR"] = "Defender";
		t["BPNTS"] = "Bashpoints";
		t["UBBC"] = "with BB-Code";
		t["TXTC"] = "pure Text";
		t["ATK"] = " vs ";
		t["REPTIME"] = "Time";
		t["GHTOWN"] = "Ghosttown";
		t["CITB"] = "Kampfboni";
		t["LOST"] = "lost";
		t["LOOT"] = "Booty";
		t["NOLOOT"] = "No recources found";
		t["WALL"] = "Wall";
		t["NOWALL"] = "no wall";
		t["NON"] = "no units in the city";
		t["NON2"] = "no units visible";
		t["NON3"] = "Landunits not visible";
		t["Wood"] = "Wood";
		t["Stone"] = "Stone";
		t["Iron"] = "Iron";
		t["Favor"] = "Favor";
		t["BH"] = "Bashpoints";
		t["ABOUT"] = "About";
		t["NONE"] = "None";
		t["IN"] = "in";
		t["ATTACKR"] = "Attacker";
		t["DEFENDR"] = "Defender";
		t["APNTS"] = "Attacker points";
		t["DPNTS"] = "Defender points";
		t["UBBC"] = "BB-code";
		t["TXTC"] = "Pure text";
		t["FROM"] = "from";
		t["ATK"] = "attacks";
		t["CITB"] = "Combat bonus";
		t["OF_WHICH"] = "of which";
		t["WITH"] = "with";
		t["LOST"] = "Lost";
		t["LOOT"] = "Loot";
		t["NOLOOT"] = "Nothing";
		t["NON"] = "no units";
		t["Wood"] = "Wood";
		t["Stone"] = "Rock";
		t["Iron"] = "Silver coins";
		t["Favor"] = "Favor";
		t["BH"] = "Population";
		t["RESOURCES"] = "Resources";
		t["RESOURCES2"] = "Resources ([color=#006600]lootable[/color])";
		t["NBONUS"] = "Nightbonus";
		t["UNITS"] = "Units";
		t["REPTITLE"] = "Attack Report";
		t["SPYTITLE"] = "Spy Report";
		t["POWER"] = "Power";
		t["MORALE"] = "Morale";
		t["LUCK"] = "Luck";
		t["SPYCOST"] = "Spy cost";
		t["SPY"] = "spy at";
		t["UNITS"] = "Units";
		t["BUILDINGS"] = "Buildings";
		t["HOUR"] = "h";
		t["RESCNTR"] = "Time until full";
		t["NOTEMPLE"] = "No Temple";
		t["NOGOD"] = " No God";
		t["FARM_TOWN_ID"] = "This ID links to the town with the following bb-code: ";
		t["LostTitle"] = "Ressource Overview";
		t["OPENINPOPUP"] = "Open link in popup-window";
		t["CLICKNCOPY"] = "Click once and copy (ctrl+c)";
		t["NOMILITIA"] = "<em>'Militia'</em> doesn't count";
		t["RCATT_LOST"] = "Total losses for Attacker";
		t["RCDEF_LOST"] = "Total losses for Defender";
		t["OPENRESBOX"] = "Open resource window";
		t["CLOSERESBOX"] = "Close resource window";
		t["WALLYOURCOSTS"] = "Your expenses";
		t["WALLFOECOSTS"] = "Your opponents expenses";
		t["RAWMATSINCL"] = "Used resources";
		t["RESTABLE"] = "Resource table";
		t["MYCOSTS"] = "My expenses";
		t["FOECOSTS"] = "Opponents expenses";
		t["SIMSTATS"] = "Simulator statistics";
		t["STATS"] = "Statistic";
			// units
		t["militia"] = "Militia";
		t["sword"] = "Swordsman";
		t["slinger"] = "Slinger";
		t["archer"] = "Archer";
		t["hoplite"] = "Hoplite";
		t["rider"] = "Rider";
		t["chariot"] = "Chariot";
		t["catapult"] = "Catapult";
		t["big_transporter"] = "Transport boat";
		t["bireme"] = "Bireme";
		t["attack_ship"] = "Light ship";
		t["demolition_ship"] = "Fire ship";
		t["small_transporter"] = "Fast transport ship";
		t["trireme"] = "Trireme";
		t["colonize_ship"] = "Colony ship";
		t["minotaur"] = "Minotaur";
		t["manticore"] = "Manticore";
		t["zyklop"] = "Cyclop";
		t["sea_monster"] = "Hydra";
		t["harpy"] = "Harpy";
		t["medusa"] = "Medusa";
		t["centaur"] = "Centaur";
		t["pegasus"] = "Pegasus";
			// toolbar & buildings
		t["academy"] = "Academy";
		t["academyshort"] = "Aca";
		t["barracks"] = "Barracks";
		t["barracksshort"] = "Barr";
		t["docks"] = "Harbor";
		t["farm"] = "Farm";
		t["hide"] = "Cave";
		t["ironer"] = "Silver mine";
		t["lumber"] = "Timber camp";
		t["stoner"] = "Quarry";
		t["main"] = "Senate";
		t["market"] = "Market";
		t["storage"] = "Warehouse";
		t["temple"] = "Temple";
		t["wall"] = "City Wall";
		t["wallshort"] = "Wall";
		t["place"] = "Agora";
		t["simulator"] = "Simulator";
		t["simulatorshort"] = "Sim";
		t["theater"] = "Theater";
		t["thermal"] = "Thermal bats";
		t["library"] = "Library";
		t["lighthouse"] = "Lighthouse";
		t["tower"] = "Tower";
		t["statue"] = "Divine statue";
		t["oracle"] = "Oracle";
		t["trade_office"] = "Merchant's shop";
				// other
		t["highlighting"] = "Colored Report Overview";
		t["GWLanguage"] = "english";
		if (GE.Alliance_name[0] == 1) { t["SETTINGS"] = GE.Alliance_name[1].substr(0,25); }
		GE.Lang['en'] = t;
	};
	L_en();

	var server = GE.Server[3];
	var language = GE.Server[2];
	if (language == "zz") {language = "en";}
	var text_translations = {
		"de" : {
			popups : {
				// Texts uses in pop-ups.
				show_games	: "Anzeige Olympischer Spiele an/aus.",
				show_theater: "Anzeige Theaterspiele an/aus.",
				show_party 	: "Anzeige Stadtfeste an/aus.",
				show_triumph: "Anzeige Triumphzüge an/aus.",
				next_party 	: "Click zum <b>Ausführen</b> eines Stadtfestes.",
				auto_party	: "Click zum <b>automatischen Ausführen</b> möglicher Stadtfeste.",
				no_party	: "Kein weiteres Stadtfest möglich.",
				next_triumph: "Click zum <b>Ausführen</b> eines Triumphzugs.",
				auto_triumph: "Click zum <b>automatischen Ausführen</b> möglicher Triumphzüge.",
				no_triumph	: "Kein weiterer Triumphzug möglich."
			}
		},
		"en" : {
			popups : {
				// Texts uses in pop-ups.
				show_games	: "Show Olympic Games on/off.",
				show_theater: "Show theater plays on/off.",
				show_party	: "Show town parties on/off.",
				show_triumph: "Show triumph parties on/off.",
				next_party	: "Click for <b>start</b> of one town party.",
				auto_party	: "Click for <b>automatic start</b> of all possible town parties.",
				no_party	: "No further town party available.",
				next_triumph: "Click for <b>start</b> of one victory procession.",
				auto_triumph: "Click for <b>automatic start</b> of all possible victory processions.",
				no_triumph	: "No further triumph party available."
			}
		}
	};

	switch (GE.Server[2]) { // languages: only de
		case 'zz':
			GE.L = GE.Lang['en']; break;
		case 'de':
			GE.L = GE.Lang['de']; break;
		case 'en':
			GE.L = GE.Lang['en']; break;
		default:
			GE.L = GE.Lang['de'];
	}

	var unitCosts = {
		// Wood, Stone, Iron, FoodPoints, Favor, Name, Booty
		'militia':		[ 0, 0, 0, 0, 0, 0, L('militia'), 0],
		'unkown':		[ 0, 0, 0, 0, 0, 0, L('unknown'), 0],   // 'unkown': Fehler in Grepo, soll wohl 'unknown' heißen
		'sword':		[95, 0, 85, 1, 0, 16, L('sword'), 16],
		'slinger':		[55, 100, 40, 1, 0, 8, L('slinger'), 8],
		'archer':		[120, 0, 75, 1, 0, 24, L('archer'), 24],
		'hoplite':		[0, 75, 150, 1, 0, 8, L('hoplite'), 8],
		'rider':		[240, 120, 360, 3, 0, 72, L('rider'), 72],
		'chariot':		[200, 440, 320, 4, 0, 64, L('chariot'), 64],
		'catapult':		[1200, 1200, 1200, 15, 0, 400, L('catapult'), 400],
		'big_transporter': [500, 500, 400, 7, 0, 20, L('big_transporter'), 0],
		'bireme':		[800, 700, 180, 8, 0, 0, L('bireme'), 0],
		'attack_ship':	[1300, 300, 800, 10, 0, 0, L('attack_ship'), 0],
		'demolition_ship': [500, 750, 150, 8, 0, 0, L('demolition_ship'), 0],
		'small_transporter': [800, 0, 400, 5, 0, 10, L('small_transporter'), 0],
		'trireme':		[2000, 1300, 900, 16, 0, 0, L('trireme'), 0],
		'colonize_ship':[10000, 10000, 10000, 170, 0, 0, L('colonize_ship'), 0],
		'minotaur':		[1400, 600, 3100, 30, 202, 480, L('minotaur'), 480],
		'manticore':	[4400, 3000, 3400, 45, 405, 360, L('manticore'), 360],
		'zyklop':		[2000, 4200, 3360, 40, 360, 320, L('zyklop'), 320],
		'sea_monster':	[5400, 2800, 3800, 50, 400, 0, L('sea_monster'), 0],
		'harpy':		[1600, 400, 1360, 14, 130, 340, L('harpy'), 340],
		'medusa':		[1500, 3800, 2200, 18, 210, 400, L('medusa'), 400],
		'centaur':		[1740, 300, 700, 12, 100, 200, L('centaur'), 200],
		'pegasus':		[2800, 360, 80, 20, 180, 160, L('pegasus'), 160]
	};
	
	GE.buildingStats = [];
	GE.buildingStats["main"] = [L('main'),110,11,12,13,15,16,18,19,22,23,26,29,31,35,38,41,46,51,56,61,67,74,81,90,98];
	GE.buildingStats["lumber"] = [L('lumber'),22,2,3,2,3,3,4,4,4,5,5,6,6,7,8,8,9,10,11,13,13,15,16,18,20,21,24,26,29,32,35,38,43,46,51,56,62,68,75,82];
	GE.buildingStats["farm"] = [L('farm'),17,2,2,3,2,4,3,4,5,5,5,6,7,8,9,10,11,12,14,16,17,20,21,25,27,31,34,38,43,48,54,61,67,76,85,95,106,120,133,150];
	GE.buildingStats["stoner"] = [L('stoner'),22,2,3,2,3,3,4,4,4,5,5,6,6,7,8,8,9,10,11,13,13,15,16,18,20,21,24,26,29,32,35,38,43,46,51,56,62,68,75,82];
	GE.buildingStats["storage"] = [L('storage'),15,2,2,3,3,4,4,4,5,6,7,8,8,10,12,13,15,16,20,22,25,28,33,37,42,48,55,63,71,81];
	GE.buildingStats["ironer"] = [L('ironer'),22,2,3,2,3,3,4,4,4,5,5,6,6,7,8,8,9,10,11,13,13,15,16,18,20,21,24,26,29,32,35,38,43,46,51,56,62,68,75,82];
	GE.buildingStats["barracks"] = [L('barracks'),33,4,5,4,6,6,6,8,8,9,10,12,13,14,16,17,20,22,24,28,30,34,38,42,47,52,59,65,73,81];
	GE.buildingStats["wall"] = [L('wall'),34,4,4,5,6,6,7,8,9,10,11,13,14,16,17,20,22,25,27,31,35,39,44,48,55];
	GE.buildingStats["hide"] = [L('hide'),60,12,14,18,20,25,30,36,43,52];
	GE.buildingStats["docks"] = [L('docks'),66,7,7,8,9,9,11,12,12,15,15,17,19,21,23,25,27,31,33,37,40,44,49,54,59,65,72,78,87,95];
	GE.buildingStats["academy"] = [L('academy'),67,8,9,10,12,12,15,16,17,20,23,25,28,31,35,40,44,49,56,62,69,78,87,98,109,122,137,154,172,193];
	GE.buildingStats["temple"] = [L('temple'),216,17,19,20,22,23,26,27,30,32,34,38,40,43,47,51,55,59,64,69,75,80,87,94,102];
	GE.buildingStats["market"] = [L('market'),108,9,9,10,11,12,12,14,15,16,17,19,20,22,23,26,27,30,32,34,37,41,43,47,51,55,59,64,69,74];
	GE.buildingStats["place"] = [L('place'),33];
	GE.buildingStats["theater"] = [L('theater'),500];
	GE.buildingStats["thermal"] = [L('thermal'),500];
	GE.buildingStats["library"] = [L('library'),500];
	GE.buildingStats["lighthouse"] = [L('lighthouse'),500];
	GE.buildingStats["tower"] = [L('tower'),500];
	GE.buildingStats["statue"] = [L('statue'),500];
	GE.buildingStats["oracle"] = [L('oracle'),500];
	GE.buildingStats["trade_office"] = [L('trade_office'),500];
	GE.Positions = GE_getValue("Positions"+ GE.Game.player_id);


	// START of SCRIPTUPDATER
	Updater = {
		//------------------------------------------- "public" methods --------------------------------------
		check:function(scriptId, currentVersion, callback) {
			Updater.initVars(scriptId, currentVersion, callback, true, false);
			var d = new Date();
			if (Updater.getInterval() > 0 && d.getTime() - Updater.getLastCheck() > Updater.getInterval())
				Updater.checkRemoteScript();
		},
		forceCheck:function(scriptId, currentVersion, callback) {
			Updater.initVars(scriptId, currentVersion, callback, true, false);
			Updater.checkRemoteScript();
		},
		getLatestVersion:function(scriptId, callback) {
			if (typeof(callback) != 'function') {
				error_log("Updater Fehler:\n\n Updater.getLatestVersion() benötigt eine Callback-Funktion als drittes Argument");
			}
			Updater.initVars(scriptId, callback, false, false, false);
			Updater.checkRemoteScript();
		},
		forceNotice:function(scriptId, currentVersion, callback) {
			Updater.initVars(scriptId, currentVersion, callback, true, true);
			Updater.checkRemoteScript();
		},
		checkStored:function() {
			if (typeof(Updater.scriptId) != 'undefined' && typeof(Updater.scriptCurrentVersion) != 'undefined') {
				return (typeof(GM_getValue('Updater_versionAvailable')) != 'undefined' && Updater.scriptCurrentVersion.toString() != GM_getValue('Updater_versionAvailable').toString());
			} else return false;
		},
		//------------------------------------------- "private" methods --------------------------------------
		$:function(id) {
			return document.getElementById(id);
		},
		initVars: function (scriptId, currentVersion, callbackFunction, useNotice, forceNoticeEnabled) {
			Updater.scriptId = scriptId;
			Updater.scriptCurrentVersion = typeof(currentVersion) != 'undefined' ? currentVersion.toString() : false;
			Updater.callbackFunction = typeof(callbackFunction) == 'function' ? callbackFunction : false;
			Updater.useNotice = useNotice;
			Updater.forceNoticeEnabled = forceNoticeEnabled;
		},
		checkRemoteScript:function() {
			if (Updater.scriptCurrentVersion && !Updater.alreadyOffered(Updater.scriptCurrentVersion))
				Updater.addOffer(Updater.scriptCurrentVersion);
			var d = new Date();
			Updater.setVal('lastCheck', d.getTime());
			// check the userscripts.org code review page
			GM_xmlhttpRequest ({
				method: "GET",
				url: "http://userscripts.org/scripts/source/" + Updater.scriptId + '.meta.js',
				headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
				onload: function (response) {
					Updater.meta = Updater.parseHeaders(response.responseText);
					// store latest version available
					GM_setValue('Updater_versionAvailable', Updater.meta.version);
					if (Updater.forceNoticeEnabled || (!Updater.alreadyOffered(Updater.meta.version) && Updater.useNotice)) {
						if (!Updater.alreadyOffered(Updater.meta.version)) Updater.addOffer(Updater.meta.version);
						Updater.showNotice();
					}
					if (typeof(Updater.callbackFunction) == 'function') Updater.callbackFunction(Updater.meta.version);
				}
			});
		},
		parseHeaders: function (metadataBlock) {
			var source = metadataBlock;
			var headers = {};
			var tmp = source.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/);
			if (tmp) {
				var lines = tmp[0].match(/@(.*?)(\n|\r)/g);
				for (var i = 0; i < lines.length; i++) {
					var tmp = lines[i].match(/^@([^\s]*?)\s+(.*)/);
					var key = tmp[1];
					var value = tmp[2];
					if (headers[key] && !(headers[key] instanceof Array)) headers[key] = new Array(headers[key]);
					if (headers[key] instanceof Array) headers[key].push(value);
					else headers[key] = value;
				}
			}
			return headers;
		},
		showNotice: function() {
			if (Updater.meta.name && Updater.meta.version) {
				var iButtonWidth =  (9 + L('UPDINST').length) * 6;
				var cButtonWidth =  (10 + L('UPDCANCEL').length) * 6;
				GM_addStyle("\
					#UpdaterMask { position:absolute; width:100%; top:0; left:0; height:100%; background-color:#000000; opacity:.3; z-index:9000; } \
					#UpdaterBody * { border:none; font-size:13px; color:#303010; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; } \
					#UpdaterBody { background:url(http://static.grepolis.com/images/game/border/brown.png) repeat scroll 0 0 transparent; width:607px; margin:auto;  position:fixed; left:20.2%; top:111px; text-align:left; border:1px solid #000000; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:0 0 12px 12px; cursor:default; z-index:9010; color:#202010; padding-bottom:1em ; } \
					#UpdaterBody a { margin:0 .5em; text-decoration:underline; color:#000099; font-weight:bold; } \
					#UpdaterBody strong { font-weight:bold; } \
					#UpdaterBody h1 { background:url(http://static.grepolis.com/images/game/border/header.png) repeat scroll 0 0 transparent; font-size:13px; color:#ffffff; font-weight:bold; padding:.5em; border-bottom:2px solid #000000;  margin-bottom:.75em; } \
					#UpdaterBody h2 { font-weight:bold; margin:.5em 1em; } \
					#UpdaterBody h1 a { font-size:14px; font-weight:bold; color:#ffffff; text-decoration:none; cursor:help; } \
					#UpdaterBody h1 a:hover { text-decoration:underline; } \
					#UpdaterBody table { width:auto; margin:0 1em; } \
					#UpdaterBody table tr th { padding-left:2em; text-align:right; padding-right:.5em; line-height:2em; } \
					#UpdaterBody table tr td { line-height:2em; font-weight:bold; } \
					#UpdaterBody li { list-style-type:circle; } \
					#UpdaterBody p { font-size:12px; font-weight:normal; margin:1em; } \
					#UpdaterHistory { margin:0 1em 1em 1em; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em; width:448px; } \
					#UpdaterHistory ul { margin-left:2em; } \
					#UpdaterClose { float:right; cursor:pointer; height:15px; opacity:.5; } \
					#UpdaterClose:hover { opacity:.7; } \
					#UpdaterInterval { background:url(http://static.grepolis.com/images/game/border/even.png) repeat scroll 0 0 transparent; border:1px dotted #332211; color:#48341b } \
					#UpdaterInterval option { background:url(http://static.grepolis.com/images/game/border/brown.png) repeat scroll 0 0 transparent; border:none; color:#48341b } \
					#UpdaterFooter { padding: .9em 1em 0 !important;} \
					#UpdaterFooter input { border:1px #000000 outset; padding:4px 12px 4px 27px !important; font-weight:bold; background:no-repeat 7px center #48341b; -moz-border-radius:5px; color:#ffcc66; cursor:pointer; float:right; margin-left:1em !important; } \
					#UpdaterCloseButton { width:"+ cButtonWidth +"px; } \
					#UpdaterInstallButton { width:"+ iButtonWidth +"px; } \
					#UpdaterFooter input:hover {border:1px #000000 inset; background-color:#48341b #947854; color:#ffb400 } \
				");

				var noticeBg = document.createElement('div');
				noticeBg.id = "UpdaterMask";
				document.body.appendChild(noticeBg);

				var noticeWrapper = document.createElement('div');
				noticeWrapper.setAttribute('style', 'position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;');
				noticeWrapper.id = "UpdaterBodyWrapper";
				var upd_available = (Updater.scriptCurrentVersion && (Updater.scriptCurrentVersion < Updater.meta.version));
				var html = new Array();
				var notice = document.createElement('div');
				notice.id = "UpdaterBody";
				html.push('<h1><img id="UpdaterClose" src="');
				html.push(Updater.icons.close);
				html.push('" title="Close"/><img src="');
				html.push(Updater.icons.uso);
				html.push('" align="absmiddle" style="margin-top:-2px;"/> '+ L('UPDTITLE') +' </h1>');
				if (!Updater.forceNoticeEnabled) {
					html.push('<p>'+ (upd_available ? L('UPDNEW') : '') +' <strong><a href="http://userscripts.org/scripts/show/');
					html.push(Updater.scriptId);
					html.push('" target="_blank" title="Go to script page">');
					html.push(Updater.meta.name);
					html.push('</a> </strong> '+ (upd_available ? L('UPDREADY') : '') +'</p>');
				} else {
					html.push('<p><strong><a href="http://userscripts.org/scripts/show/');
					html.push(Updater.scriptId);
					html.push('" target="_blank" title="Go to script page" style="margin:0; padding:0;">');
					html.push(Updater.meta.name);
					html.push('</a> </strong></p>');
				}
				if (Updater.scriptCurrentVersion) {
					html.push('<p>'+ L('UPDCURRENT') +' <strong>');
					html.push(Updater.scriptCurrentVersion)
					html.push('</strong>.<br> '+  L('UPDLATEST') +' <strong>');
					html.push(Updater.meta.version);
					html.push('</strong></p>');
				}
				if (Updater.meta.history) {
					html.push('<h2>Version History:</h2><div id="UpdaterHistory">');
					var history = new Array();
					var version, desc;
					if (typeof(Updater.meta.history) != 'string') {
						for (var i = 0; i < Updater.meta.history.length; i++) {
							var tmp = Updater.meta.history[i].match(/(\S+)\s+(.*)$/);
							version = tmp[1];
							change = tmp[2];
							history[version] = typeof(history[version]) == 'undefined' ? new Array() : history[version];
							history[version].push(change);
						}
					} else {
						var tmp = Updater.meta.history.match(/(\S+)\s+(.*)$/);
						version = tmp[1];
						change = tmp[2];
						history[version] = typeof(history[version]) == 'undefined' ? new Array() : history[version];
						history[version].push(change);
					}
					for (var v in history) {
						html.push('<div style="margin-top:.75em;"><strong>v' + v + '</strong></div><ul>');
						for (var i = 0; i < history[v].length; i++)
							html.push('<li>' + history[v][i] + '</li>');
						html.push('</ul>');
					}
					html.push('</div>');
				}
				html.push('<p> <small> '+ L('UPDUPD') +': </small>');
				html.push('<select id="UpdaterInterval"> \
					<option value="3600000"> '+ L('UPDONE') +'</option>\
					<option value="21600000"> '+ L('UPDSIX') +'</option>\
					<option value="86400000"> '+ L('UPDDAY') +'</option>\
					<option value="604800000"> '+ L('UPDWEEK') +'</option>\
					<option value="2419200000"> '+ L('UPDWEEK4') +'</option>\
					<option value="0"> '+ L('UPDNEVER') +'</option>\
					</select>');
				html.push('</p></div>');

				html.push('<div id="UpdaterFooter">');
				html.push('<input type="button" id="UpdaterCloseButton" value="'+ L('UPDCANCEL') +'" style="background-image:url(');
				html.push(Updater.icons.close);
				html.push(')"/>');
				if (upd_available) {
					html.push('<input type="button" id="UpdaterInstallButton" value="'+ L('UPDINST') +'" style="background-image:url(');
					html.push(Updater.icons.install);
					html.push(');"/>');
				}

				notice.innerHTML = html.join('');
				noticeWrapper.appendChild(notice);
				document.body.appendChild(noticeWrapper);
				Updater.$('UpdaterClose').addEventListener('click', Updater.closeNotice, true);
				Updater.$('UpdaterCloseButton').addEventListener('click', Updater.closeNotice, true);
				if (upd_available) {
					Updater.$('UpdaterInstallButton').addEventListener('click', function() {
						setTimeout(Updater.closeNotice, 300);
						document.location = typeof(Updater.installUrl) == 'string' ? Updater.installUrl : 'http://userscripts.org/scripts/source/' + Updater.scriptId + '.user.js';
					}, true);
				}
				window.addEventListener('keyup', Updater.keyUpHandler, true);
				// set current interval in selector
				var selector = Updater.$('UpdaterInterval');
				for(var i = 0; i < selector.options.length; i++) {
					if (selector.options[i].value.toString() == Updater.getInterval().toString())
						selector.options[i].selected = true;
				}
				selector.addEventListener('change', function() {
					Updater.setInterval(this.value);
				}, true);
				noticeWrapper.style.height = document.documentElement.clientHeight +'px';
				$('#UpdaterMask')[0].style.height = (unsafeWindow.scrollMaxY + unsafeWindow.innerHeight) +'px';
			}
		},
		closeNotice:function() {
			document.body.removeChild(Updater.$('UpdaterBodyWrapper'));
			document.body.removeChild(Updater.$('UpdaterMask'));
			window.removeEventListener('keyup', Updater.keyUpHandler, true);
		},
		keyUpHandler:function (e) {
			if (e.keyCode == 27) { Updater.closeNotice(); }
		},
		getVal:function(key) {
			key = 'Updater.'+ key;
			return eval(GM_getValue(key, ('({})')));
		},

		setVal:function(key, value) {
			key = 'Updater.'+ key;
			GM_setValue(key, '('+ JSON.stringify(value) + ')');
		},
		alreadyOffered:function(version) {
			var offers = Updater.getOffers();
			if (offers.length == 0) {
				Updater.addOffer(version);
				return true;
			}
			for(var i = 0; i < offers.length; i++)
				if (version.toString() == offers[i].toString()) { return true; }
			return false;
		},
		getOffers:function() {
			var offers = Updater.getVal('versionsOffered');
			return (typeof(offers) == 'undefined' || typeof(offers.length) == 'undefined' || typeof(offers.push) == 'undefined') ? new Array() : offers;
		},
		addOffer:function(version) {
			var offers = Updater.getOffers();
			offers.push(version);
			Updater.setVal('versionsOffered', offers);
		},
		getInterval:function() {
			var interval = Updater.getVal('interval');
			return (typeof(interval) == 'undefined' || !interval.toString().match(/^\d+$/)) ? 86400000 : parseInt(interval.toString(), 10);
		},
		setInterval:function(interval) {
			Updater.setVal('interval', parseInt(interval, 10));
		},
		getLastCheck:function() {
			var lastCheck = Updater.getVal('lastCheck');
			return (typeof(lastCheck) == 'undefined' || !lastCheck.toString().match(/^\d+$/)) ? 0: parseInt(lastCheck.toString(), 10);
		},
		icons:{
			install:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
			close:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
			uso:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D",
		},
	};
	// END of SCRIPTUPDATER


	// CONFIG MENUE
	Config = {
		data: {},
		callback: null,
		tempOptions: {},
		footerHtml: '',
		reloadOnSave: true,

		init: function(settings) {
			Config.settings = settings;
		},

		icons: {
			close: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
			save:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII%3D",
		},

		close: function() {
			document.body.removeChild(document.getElementById('ConfigBodyWrapper'));
			document.body.removeChild(document.getElementById('ConfigMask'));
			window.removeEventListener('keyup', Config.keyUpHandler, true);
			if (typeof(Config.callback) == 'function')
				Config.callback();
		},

		show: function(callback) {
			Config.tempOptions = {};
			Config.settings = typeof(Config.settings) != 'undefined' ? Config.settings : Config.tabs;
			Config.callback = typeof(callback) == 'function' ? callback : null;
			if (typeof(Config.styleDrawn) == 'undefined') {
				var cButtonWidth = (8 + L('OPTSAVE').length) * 6;
				var uButtonWidth = (8 + L('SRCHFORUPD').length) * 6;
				GM_addStyle("\
					#ConfigMask { position:absolute; width:100%; top:0; left:0; height:100%; background-color:#000000; opacity:.4; z-index:9000; } \
					#ConfigSettings { border:none; position:fixed; z-index:9010} \
					#ConfigBody * { border:none; border-collapse:collapse; font-size:13px; color:#202010; margin:0 !important; padding:0 !important; background:none; text-decoration:none; font-family:Helvetica Neue, Arial, Helvetica, sans-serif; line-height:1.2em; } \
					#ConfigBody { background:url(http://static.grepolis.com/images/game/border/brown.png) repeat scroll 0 0 transparent; width:608px; margin:auto !important; text-align:left; padding:0; cursor:default; padding-bottom:25px !important; } \
					#ConfigBody strong, #ConfigContentBox strong { font-weight:bold !important; } \
					#ConfigBody h1 { background:url(http://static.grepolis.com/images/game/border/header.png) repeat scroll 0 0; font:13px Verdana, Arial, Helvetica, sans-serif; font-weight:bold !important; padding:4px 13px !important; padding-top:9px !important; color:#FFFFFF; text-decoration:none; border-bottom:1px solid #000000 !important; } \
					#ConfigBody li { list-style-type:circle; } \
					#ConfigBody p { font-size:13px; font-weight:normal; margin-bottom:1em !important; } \
					#ConfigTabs { margin-top:1.5em !important; }\
					#ConfigTabs span { border:1px solid #404040; -moz-border-radius:6px 6px 0 0; padding: 2px 10px !important; position:relative; top:-2px; background-color:#48341b; color:#ffcc66; cursor:pointer; font-size:12px; font-weight:bold;}\
					#ConfigTabs span:hover { background-color:#876b47; color:#ffb400}\
					#ConfigTabs span.active { background-color:#ffebbd; top:-1px; border-bottom:none; color:#804000; padding-top:3px !important; font-weight:bold; cursor:inherit; }\
					#ConfigTabs span.active:hover { background-color:#ffebbd; }\
					#ConfigContentPadding { margin:0 1em !important; }\
					#ConfigContentBox {background:url(http://static.grepolis.com/images/game/border/even.png) repeat scroll 0 0 transparent; border:1px inset #606040; padding:1.5em 1em 1em !important; max-height:300px; }\
					#ConfigContentBox table { width:auto !important; }\
					#ConfigContentBox td { font-weight:normal; }\
					#ConfigContentBox input { border:1px inset #606040 !important; }\
					#ConfigContentBox td.fieldLabel { text-align:right !important; padding-right:.5em !important; font-weight:bold !important; }\
					#ConfigContentBox td input { float:left; }\
					#ConfigContentBox td select { border:1px inset #202020; }\
					#ConfigContentBox #ConfigFieldTable { width:auto !important; margin-left:2em !important; }\
					#ConfigContentBox #ConfigFieldTable td { padding-bottom:6px !important; }\
					#ConfigCheckUpdatesLink { border:1px #000000 outset; font-weight:bold; padding:4px 10px 5px 25px !important; background: url("+ Updater.icons.uso +") no-repeat 7px center #48341b; -moz-border-radius:5px; color:#ffcc66; cursor:pointer; width:"+ uButtonWidth +"px; margin:1em 14em 1em !important; } \
					#ConfigCheckUpdatesLink:hover { border:1px #000000 inset; background-color:#48341b #947854; color:#ffb400 }\
					#ConfigFooter { padding: .9em 1em 0 !important;} \
					#ConfigFooter input { border:1px #000000 outset; padding:4px 10px 4px 25px !important; font-weight:bold; background:no-repeat 7px center #48341b; -moz-border-radius:5px; color:#ffcc66; cursor:pointer; width:"+ cButtonWidth +"px; float:right; margin-left:1em !important; } \
					#ConfigFooter input:hover { border:1px #000000 inset; background-color:#48341b #947854; color:#ffb400 }"
				);
				Config.styleDrawn = true;
			}
			// declare and apply config background mask
			var noticeBg = document.createElement('div');
			noticeBg.id = "ConfigMask";
			noticeBg.style.height = (unsafeWindow.scrollMaxY + unsafeWindow.innerHeight) + 'px';
			document.body.appendChild(noticeBg);
			// declare and apply config window
			var noticeWrapper = document.createElement('div');
			noticeWrapper.setAttribute('style', 'position:absolute; width:100%; top:0; left:0; max-width:auto; min-width:auto; max-height:auto; min-height:auto;');
			noticeWrapper.id = "ConfigBodyWrapper";
			var notice = document.createElement('div');
			notice.id = "ConfigSettings";
			notice.setAttribute('style', 'position:fixed; left:20%; top:77px');
			var	html = '<div class="game_inner_box">'
			html +='<table cellspacing="0" cellpadding="0" class="game_border">'
			html += '<tr><td class="game_border_edge"></td><td class="game_border_top"></td><td class="game_border_edge game_border_edge_2"></td></tr>';
			html += '<tr><td class="game_border_left"></td><td><div style="position:relative; margin: 0px; display: inline-block;">';
			html += '<div class="game_border_socket game_border_socket1"></div><div class="game_border_socket game_border_socket2"></div>';
			html += '<div class="game_border_socket game_border_socket3"></div><div class="game_border_socket game_border_socket4"></div>';
			html += '<div id="ConfigBody">'
			html += '<h1><img src ='+ pImage['icongrepocoll'] +' align="absmiddle"></img> ' + (typeof(Config.scriptName) == 'string' ? Config.scriptName + ' - ' : ' ') + ' ' + L('OPTIONSTXT') +'</h1>';
			html += '<div id="ConfigContentPadding"><div id="ConfigTabs">';
			// draw tabs
			var i = 0;
			var firstTabId = "";
			for (var label in Config.settings) {
				var id = 'configTab' + label.replace(/\s/g, '_');
				html += '<span id="' + id + '">' + L(label) + '</span>';
				firstTabId = (i == 0 ? id : firstTabId);
				i++;
			}
			html += '</div><div id="ConfigContentBox"></div></div>';
			html += '<div id="ConfigFooter">';
			// html += '<input type="button" id="ConfigCancelButton" value="'+ L("OPTCANCEL") +'" style="background-image:url(' + Config.icons.close + ')"/>';
			html += '<input type="button" id="ConfigCloseButton" value="'+ L("OPTSAVE") +'" style="background-image:url(' + Config.icons.close + ')"/>';
			html += Config.footerHtml +'</div></div>';
			html += '</td><td class="game_border_right"></td></tr><tr><td class="game_border_edge game_border_edge_3"></td>';
			html += '<td class="game_border_bottom"></td><td class="game_border_edge game_border_edge_4"></td></tr>';
			html += '</table></div>';
			notice.innerHTML = html;
			noticeWrapper.appendChild(notice);
			document.body.appendChild(noticeWrapper);

			// add tab change listeners
			for (var label in Config.settings) {
				var id = 'configTab'+ label.replace(/\s/g, '_');
				document.getElementById(id).addEventListener('click', function() { Config.activateTab(this.id); }, false);
			}
			// add escape key press and other listener
			Config.activateTab(firstTabId);
			window.addEventListener('keyup', Config.keyUpHandler, true);
			document.getElementById('ConfigCloseButton').addEventListener('click', function() {
				Config.save();
				Config.close();
				if (Config.reloadOnSave)
					document.location.reload();
			}, true);
//			document.getElementById('ConfigCancelButton').addEventListener('click', Config.close, true);
		},

		//  - "private" methods -
		activateTab: function(id) {
			// deactivate current tab
			var elems = document.getElementById('ConfigTabs').getElementsByTagName('span');
			for( var i = 0; i < elems.length; i++) {
				elems[i].className = '';
			}
			// set current tab
			document.getElementById(id).className = 'active';
			var key = id.replace(/^configTab/, '').replace(/_/g, ' ');
			var fields = Config.settings[key].fields;
			if (key != 'TAB4' || $gc('toolbar')[0]) {
				var html = typeof(Config.settings[key].html) == 'string' ? Config.settings[key].html : '';
			} else {
				var html = '<br>';
			}
			html += '<table cellpadding="0" cellspacing="0" border="0" id="ConfigFieldTable">';
			if (key != 'TAB4' || $gc('toolbar')[0]) {
				for (var fieldName in fields) {
					var field = fields[fieldName];
					var type = typeof(field.type) != 'string' ? 'html' : field.type;
					var tip = typeof(field.tip) == 'string' ? field.tip : '';
					if (type != 'html')
						html += '<tr title="' + L(key) + '"><td colspan="' + (type == 'html' ? '2' : '1') + '" class="fieldLabel">' +
						(typeof(field.label) == 'string' ? field.label : '') + '</td><td>';
					else html += '<tr>';
					switch(type) {
						case 'select':
							html += '<select id="configInput_' + fieldName + '">';
							if (typeof(field.options) == 'undefined')
								error_log('Options Error: ' + fieldName + ' of type "select" is missing the "options" property');
							else {
								for(var text in field.options) {
									var val = field.options[text];
									html += '<option value="' + val + '"' + (Config.get(fieldName) == val ? ' selected' : '') + '>' + text + ' &nbsp;</option>';
								}
							}
							html += '</select>';
							break;
						case 'text':
							if ($gc('toolbar')[0]) {
								var width = typeof(fields[fieldName].width) != 'undefined' ? (fields[fieldName].width.toString().match(/px/) ? fields[fieldName].width : fields[fieldName].width + 'px') : false;
								html += '<input id="configInput_'+ fieldName +'" value="'+ Config.get(fieldName) +'" style="' + (width ? 'width:'+ width +';' : '') +'" type="'+ type +'"/>';
							}
							break;
						case 'checkbox':
							html += '<input id="configInput_' + fieldName + '" type="checkbox" style="position:relative; top:2px;"' + (Config.get(fieldName) ? 'checked' : '' ) + '/>';
							break;
						case 'html':
							html += '<td colspan="2">' + field.value + '</td>';
							break;
					}
					if (type != 'html') {
						html += typeof(fields[fieldName].text) == 'string' ? ' &nbsp; - ' + fields[fieldName].text : '';
						html += '</td></tr>';
					} else {
						html += '</tr>';
					}
				}
			} else {
				html += '<td colspan="2"><b>' + L('PAOnly') + '</b></td>';
			}
			html += '</table>';
			// add check for updates
			if (id == "configTabUPDATE" && typeof(Updater) == 'object' && typeof(Updater.scriptId) != 'undefined') {
				html += '<p><br><a href="javascript:void(0)" id="ConfigCheckUpdatesLink">'+ L('SRCHFORUPD') +'</a></p>';
			}

			document.getElementById('ConfigContentBox').innerHTML = html;
			// add event listeners
			if (key != 'TAB4' || $gc('toolbar')[0]) {
				var a = "";
				for (var fieldName in fields) {
					switch (fields[fieldName].type) {
						case 'checkbox':
							document.getElementById('configInput_' + fieldName).addEventListener('change', function() {
								a = this.id.toString().match(/configInput_(.+)$/)[1];
								Config.tempOptions[a] = this.checked ? '1' : '0';
								GM_setValue(a, Config.tempOptions[a]);
							}, false);
							break;
						case 'select':
							document.getElementById('configInput_' + fieldName).addEventListener('change', function() {
								a = this.id.toString().match(/configInput_(.+)$/)[1];
								Config.tempOptions[a] = this.value;
								GM_setValue(a, Config.tempOptions[a]);
							}, false);
							break;
						case 'text':
							document.getElementById('configInput_'+ fieldName).addEventListener('change', function() {
								a = this.id.toString().match(/configInput_(.+)$/)[1];
								Config.tempOptions[a] = this.value;
								GM_setValue(a +"_"+ GE.Server[1], Config.tempOptions[a]);
							}, false);
							break;
					}
				}
			}
			if (id == "configTabUPDATE" && typeof(Updater) == 'object' && typeof(Updater.scriptId) != 'undefined') {
				$('#ConfigCheckUpdatesLink')[0].addEventListener('click', function() { Updater.forceNotice(Updater.scriptId, Updater.scriptCurrentVersion); }, false);
			}
		},

		keyUpHandler: function (e) {
			if (e.keyCode == 27) { Config.close(); }
		},

		getField: function(key) {
			Config.settings = typeof(Config.tabs) != 'undefined' ? Config.tabs : Config.settings;
			for (var tabName in Config.settings) {
				if (typeof(Config.settings[tabName].fields) == "object") {
					var fields = Config.settings[tabName].fields
					for( var fieldName in fields) {
						if (fieldName == key) {
							return fields[fieldName];
						}
					}
				}
			}
			return false;
		},

		get: function(key) {
			var field = Config.getField(key);
			switch(field.type) {
				case 'checkbox':
					if(typeof(field.value) == 'undefined' || !field.value)
						return (typeof(GM_getValue(key)) != 'undefined' && GM_getValue(key).toString() == "1") ? true : false;	// false by default
					else
						return (typeof(GM_getValue(key)) != 'undefined' && GM_getValue(key).toString() == "0") ? false : true;	// true by default
					break;
				case 'select':
				case 'text':
					return typeof(field.value) != 'undefined' ?  field.value : GM_getValue(key +"_"+ GE.Server[1]);
					break;
				default:
					return typeof(GM_getValue(key)) == 'undefined' ? false : GM_getValue(key);
			}
		},

		save: function() {
			Res_Pass	= Config.tempOptions['ResPass'];
			Res_Key		= Config.tempOptions['ResKey'];
			Polis_Search= Config.tempOptions['PolisSearch'];
			Map_Key		= Config.tempOptions['MapKey'];
			Link1_Name	= Config.tempOptions['Link1Name'];
			Own_Link1	= Config.tempOptions['OwnLink1'];
			Link2_Name	= Config.tempOptions['Link2Name'];
			Own_Link2	= Config.tempOptions['OwnLink2'];

			for(var x in Config.tempOptions) {
				if (Config.tempOptions[x] == '0' || Config.tempOptions[x] == '1') {
					Config.set(x, Config.tempOptions[x]);
				}
			}
			Config.tempOptions = {};
		},
		set: function(key, value) {
			GM_setValue(key, value);
		},

		$:function(id) {
			return document.getElementById(id);
		},
	};
	// End of CONFIG MENUE


	var allyLnk = false, userLnk = false;
	if (Config.get('optAllylinks')) {allyLnk = true;} 	// 'cause of GM_getValue access violation in unsafeWindow
	if (Config.get('optUserlinks')) {userLnk = true;}
	if  ((GE.Alliance_name[1].length > 20) && (GE.Alliance_name[0] = "1")) { var ofont = "9";} else {var ofont = "11";}
	var Css = ""+
		" .game_list li {border-bottom: 1px solid #D0BE97; padding: 1px 2px;}"+
		" .game_list li img { margin-top:1px; margin-bottom:-1px; }"+
		" .message_icon { margin-top:2px; margin-bottom:2px; }"+
		" #GE_Report {position:absolute; left:300px; top:360px; z-index:10; text-align:left;}"+
		// Wall and Sim
		" #GE_Stats_Tbl {font-size:11px; font-weight:bold; font-family:tahoma,arial;}"+
		" #GE_Stats_Tbl table {width:244px; border-collapse:collapse; text-align:center; margin:10px 0px;}"+
		" #GE_Stats_Tbl table tr td:first-child {min-width:17px; background-position:center center;}"+
		" #GE_Stats_Tbl th {border-bottom: 1px solid #CCAA88;}"+
		" #GE_Stats_Tbl th:first-child {background:transparent;}"+
		" #GE_Stats_Tbl tr td:nth-child(odd) {background:url(http://static.grepolis.com/images/game/border/brown.png);}"+
		" #GE_Stats_Tbl tr td:nth-child(even) {background:url(http://static.grepolis.com/images/game/border/odd.png); border-style:solid; border-color:#CCAA88; border-width:0 1px;}"+
		" #GE_Stats_Tbl tr td:first-child {background:url("+ pImage['iconAtt'] +") no-repeat transparent;}"+
		" #GE_Stats_Tbl tr:last-child td:first-child {background-image: url("+ pImage['iconDef'] +");}"+
		" #GE_Stats_Tbl td {padding:1px 1px; text-align:center; height:20px; white-space:nowrap;}"+
		" #fcWallShow, #fcSimShow {background:url(http://static.grepolis.com/images/game/place/showhide.png) no-repeat scroll 0 0 transparent; height:22px; float:right; margin-top:1px; margin-right:2px;}"+
		" #fcWallShow:hover, #fcSimShow:hover {background:url(http://static.grepolis.com/images/game/place/showhide.png) no-repeat scroll 0 -23px transparent;  height:22px;}"+
		// Other
		" .building_special span.image {background-position:100% 100%; cursor:default;}"+
		" .thread .lastpost > a:first-child {display:inline; padding:2px 3px 0 3px;}"+
		" .thread .lastpost form a {display:inline; padding:0;}"+
		" .thread .date {display:block;}"+
		" .author .date {display:inline;}"+
		" .frmUserLink, .thread .frmUserLink {vertical-align:baseline; display:inline;}"+
		" .thread .frmUserLink a {padding:0;}"+
		" .forum_lastpost {margin-top:4px; margin-right:2px;}"+
		" .text_bg, .text_fg {font-size:11px;}"+
		" #GE_prodinfo {position:absolute; margin-top:-4px; right:0px; color:#F0F0F0; font-style:normal; font-weight:normal; font-size: 10px;z-index: 10; font-family:verdana;}"+
		" #GE_prodinfo td span {color:#F8D077; font-style:normal; font-weight:bold; display:inline; margin: 0;}"+
		" #GE_prodinfo img {width:15px; margin-bottom:-4px;}"+
		" .GE_bl {background:rgba(80,85,91,0.6); border:2px ridge rgba(53, 57, 66, 0.6); color:#ffffff; font-family:tahoma; font-size:11px; z-index:10; position:absolute; width:12px; height:12px; valign:middle; text-align:center; padding:1px;}"+
		" .fcWinHeader {cursor:move; font-weight:bold; background-image: url(http://static.grepolis.com/images/game/border/header.png);background-position: 0 -1px; padding:3px 6px 3px 6px; text-align:center; color: #FFFFFF; font-family:tahoma,arial; font-size:12px;line-height:16px;}"+
//		" .ge_button {background-image:url("+ pImage['ge_button']+"); background-repeat:no-repeat; color:#FFCC66 !important; height:19px; margin:3px 2px 0 5px; font-size:12px;line-height:18px; font-family:tahoma; text-align:center; width:120px; float:right;}"+
		" #GE_wood, #GE_silver, #GE_stone, #GE_favor {background:url(/images/game/res/res_small.png) no-repeat scroll 0 0 transparent; padding-left:21px; padding-right:29px;}"+
		" #GE_stone {background-position:0 -16px;}"+
		" #GE_silver {background-position:0 -32px;}"+
		" #GE_favor {background-image:url("+ pImage['iconFavor'] +");}"+
		" #GE_Settings {top:390px; margin:0 auto; position:absolute; width:152px; height:25px; left:11px;}"+
		" #GE_Settings_A {background-image:url("+ pImage['ge_button2'] +"); background-repeat:no-repeat; color:#FFCC66; display:block; height:25px; margin:0 auto; font-size:"+ ofont +"px; line-height:24px; font-family:tahoma; text-align:center; width:138px;}"+
		" #GE_Settings_A:hover {background-position:0 -25px;}"+
		" #GE_Settings_A:focus {background-position:0 -75px;}"+
		" #GE_TownId {float:right;}"+
		" .fight_bonus {display:inline; font-size:11px; padding:3px;}"+
		" .oldwall, .morale {float:left;}"+
		" .luck, .nightbonus {float:right;}"+
		" a.crButton, a#forumMarkAsRead {background: transparent url("+ pImage['crButtonR'] +") no-repeat scroll top right; display:block; float:right; height:24px; margin-right:6px; margin-top:1px; padding-right:5px; text-decoration:none; color:#FFCC66 !important; font-size:12px;}"+
		" a.crButton span, a#forumMarkAsRead span {background: transparent url("+ pImage['crButtonL'] +") no-repeat top left; display:block; line-height:20px; padding:2px 10px 2px 15px;}"+
		" a.crButton:hover span, a#forumMarkAsRead:hover span {background-position: left -25px;}"+
		" a.crButton:hover {background-position: right -25px;}"+
		" a.crButtonA span {background-position: left -50px;}"+
		" a.crButtonA {background-position: right -50px;}"+
		" a.crButtonA:hover span {background-position:left -75px;}"+
		" a.crButtonA:hover {background-position:right -75px;}"+
		" a#forumMarkAsRead {margin-top:-25px; float:left;}"+
		" .report_units_overview #resources {margin-top:35px; padding:0;}"+
		" .report_icon, #resources hr {display:none;} "+
		" .report_units_overview #resources #load,"+
		" .report_units_overview #resources > span:last-child {border-bottom:1px solid #CCAA88; border-top:1px solid #CCAA88; padding:5px 0; margin:5px 0;}"+
		" .report_units_overview #resources > span:last-child {border-top:1px solid transparent; display:block; padding-top:0;}"+
		" .fight_bonus {height:10px;}"+
		" .report_units_overview #resources h4, .report_units_overview #resources .bold {font-size:11px;}"+
		" .report_units_overview .res_background .bold {color:#FFCC66;margin-top:3px;}"+
		" #resources > ul {width:200px;}"+
		" #right_side h4 {text-align:center;}"+
		" .report_units_overview .res_background, .report_units_overview #resources > ul > li {background:url('http://static.grepolis.com/images/game/layout/bg_resources.png') no-repeat scroll 0 0 transparent; width:62px; margin:0; padding:2px;}"+
		" .report_units_overview .res_background .wood_img,"+
		" .report_units_overview .res_background .stone_img,"+
		" .report_units_overview .res_background .iron_img {display:block; height:31px; margin-left:15px; margin-top:0px; width:35px;}"+
		" .empty {z-index:4;}"+
		" #farm_res_cont {min-width:120px;}"+
		" .farm_infos {display:block; padding:7px 2px 0 40px; height:23px; border:solid #f7cd81 0px; overflow:hidden; white-space:nowrap; background-position:3px 50%; background-repeat:no-repeat;font-size:11px;}"+
		" .farm_infos.error, .farm_infos .error {color:#c00000}"+
		" #farm_booty {vertical-align:-2px;}"+
		" #culture_overview_towns div.celebration_progressbar { background-position:0 -59; background-repeat:repeat-x; bottom:0; color:#FFFFFF; height:13px; left:30px; line-height:8px; right:4px; text-align:center; } "+
		" #culture_overview_towns div.celebration_progressbarI { background-position:0 -59; background-repeat:repeat-x; bottom:0; color:#FFFFFF; height:13px; left:30px; line-height:8px; right:4px; text-align:center; } "+
		" #culture_overview_towns div.celebration_progressbarII { background-position:0 -59; background-repeat:repeat-x; bottom:0; color:#FFFFFF; height:13px; left:30px; line-height:8px; right:4px; text-align:center; } "+
		" #culture_overview_towns div.celebration_progressbarIII { background-position:0 -59; background-repeat:repeat-x; bottom:0; color:#FFFFFF; height:13px; left:30px; line-height:8px; right:4px; text-align:center; } "+
		" #culture_overview_towns div.celebration_progressbarI { background-image:url("+ pImage['pbar_hide'] +"); position:absolute;  background-position:0 0; } "+
		" #culture_overview_towns div.celebration_progressbarII { background-image:url("+ pImage['pbar_hide'] +"); position:absolute;  background-position:0 0; } "+
		" #culture_overview_towns div.celebration_progressbarIII { background-image:url("+ pImage['pbar_hide'] +"); position:absolute;  background-position:0 0; } "+
		" #culture_overview_towns div.celebration_progressbarI div { background-image:url("+ pImage['pbar_yellow'] +"); background-position:0 0; position:absolute; border-left:1px solid #716135; border-right:1px solid #766E34; height:10px; left:-1px; z-index:1; } "+
		" #culture_overview_towns div.celebration_progressbarII div { background-image:url("+ pImage['pbar_orange'] +"); background-position:0 0; position:absolute; border-left:1px solid #694835; border-right:1px solid #715634; height:10px; left:-1px; z-index:1; } "+
		" #culture_overview_towns div.celebration_progressbarIII div { background-image:url("+ pImage['pbar_red']    +"); background-position:0 0; position:absolute; border-left:1px solid #673535; border-right:1px solid #663434; height:10px; left:-1px; z-index:1; } "+
		" #culture_overview_towns div.celebration_progressbar .eta { position:relative; z-index: 2; text-shadow:black 1px 1px} "+
		" #culture_overview_towns div.celebration_progressbarI .eta { position:relative; z-index: 2; text-shadow:black 1px 1px; } "+
		" #culture_overview_towns div.celebration_progressbarII .eta { position:relative; z-index: 2; text-shadow:black 1px 1px; } "+
		" #culture_overview_towns div.celebration_progressbarIII .eta { position:relative; z-index: 2; text-shadow:black 1px 1px; } "+
 		" #faarksGrepoPicSaver_captureSidebarButton {top:108px !important; right:42px !important; position:absolute; }"+
		" #faarksGrepoPicSaver_captureSidebarButton:hover {top:108px !important; right:42px !important; position:absolute; }";
	GM_addStyle(Css);

	GE_Positions = GE.Positions.toString();
	GE_Positions = GE_Positions.split(",");
	var topX, leftX;
	if (!(GE_Positions[1] == "")) {
		leftX = GE_Positions[1];
		topX = GE_Positions[2];
	} else {
		leftX = "300px";
		topX = "360px";
	}

	// Functions
	function ajaxND(aR) {var ansdoc = document.implementation.createDocument("", "", null); var ans = $e('HTML', aR.responseText); ansdoc.appendChild(ans); return ansdoc;};
	function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};
	function $t(att) {var aTb = document.createElement("TABLE"); $at(aTb, att);	return aTb;};
	function $tx(iHTML){ return document.createTextNode(iHTML); };
	function $r(att) {var aRow = document.createElement("TR"); $at(aRow, att); return aRow;};
	function $hc(iHTML, att) {var aHeaderCell = document.createElement("TH"); aHeaderCell.innerHTML = iHTML; $at(aHeaderCell, att); return aHeaderCell;};
	function $c(iHTML, att) {var aCell = document.createElement("TD"); aCell.innerHTML = iHTML; $at(aCell, att); return aCell;};
	function $img(att) {var aImg = document.createElement("IMG"); $at(aImg, att); return aImg;};
	function $a(iHTML, att) {var aLink = document.createElement("A"); aLink.innerHTML = iHTML; $at(aLink, att); return aLink;};
	function $ul(iHTML, att) {var aUl = document.createElement("UL"); aUl.innerHTML = iHTML; $at(aUl, att); return aUl;};
	function $li(iHTML, att) {var aLi = document.createElement("LI"); aLi.innerHTML = iHTML; $at(aLi, att); return aLi;};
	function $i(att) {var aInput = document.createElement("INPUT"); $at(aInput, att); return aInput;};
	function $d(iHTML, att) {var aDiv = document.createElement("DIV"); aDiv.innerHTML = iHTML; $at(aDiv, att); return aDiv;};
	function $sc(iHTML, att) {var aScript = document.createElement("SCRIPT"); aScript.innerHTML = iHTML; $at(aScript, att); return aScript;};
	function $f(iHTML, att) {var aForm = document.createElement("FORM"); aForm.innerHTML = iHTML; $at(aForm, att); return aForm;};
	function $s(iHTML, att) {var aSpan = document.createElement("SPAN"); aSpan.innerHTML = iHTML; $at(aSpan, att); return aSpan;};
	function $ta(iHTML, att) {var aTextarea = document.createElement("TEXTAREA"); aTextarea.innerHTML = iHTML; $at(aTextarea, att); return aTextarea;};
	function dummy() {return;}; //does nothing. Used when there is no other choice but need to use a function
	function getRndtime(maxrange) {return Math.floor(maxrange * (0.6 + 0.4 * Math.random())); };
	function basename(path) {return path.replace(/.*\//, "");}; //name of a file from a path or URL
	function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);}; //returns the element with the aID id (wrapper for getElementById)
	function $gt(e) {return document.getElementsByTagName(e);}
	function $gc(e) {return document.getElementsByClassName(e);}
	function arrayByN(a, n) {var b = arrayClone(a); for (var i in b) {b[i] *= n;}; return b;}; //multiply every element of the "a" array by "n"
	function arrayClone(a) {var b = new Array(); for (var i in a) {b[i] = a[i];}; return b;}; //return a copy of the "a" array
	function dF(s) {var s1 = unescape(s.substr(0, s.length - 1)); var ts = ''; for (i = 0; i < s1.length; i++) ts += String.fromCharCode(s1.charCodeAt(i) - s.substr(s.length - 1, 1)); return ts;};
	function arrayAdd(a, b) {if (!a) return arrayClone(b); if (!b) return arrayClone(a); var c = new Array(); for (var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]); return c;};
	function removeElement(ex) {if (ex && ex.parentNode) ex.parentNode.removeChild(ex);}; //remove the "ex" element from the current document
	function L(xT) {				 //translated t item if available
		if (GE.L[xT] != undefined && GE.L[xT] != '') return GE.L[xT];
		else if (GE.Lang['de'][xT] != undefined && GE.Lang['de'][xT] != '') return GE.Lang['de'][xT];
		else return '---';
	};
	function moveElement(ex, dest) {removeElement(ex); dest.appendChild(ex);}; //move the "ex" element from the current parent to the destination "dest" node of the DOM
	function arrayToInt(arr) {var h = 0; for (var i in arr) {h += arr[i];}; return h;}; //Sum all the values of the arr array
	function insertAfter(node, referenceNode) {node.parentNode.insertBefore(referenceNode, node.nextSibling);}; //insert a referenceNode after a specified node
	function $e(aType, iHTML){var ret = document.createElement(aType); if (iHTML) ret.innerHTML = iHTML; return ret;}; //Create a new element of the DOM (type, innerHTML)
	function $ls(aX) {return aX.toLocaleString();}; //convert a number to local string
	function pauseScript(ms) {var ms1 = getRndtime(ms); var aDate = new Date(); var crtDate = new Date(); do {crtDate = new Date();} while (crtDate - aDate < ms1);};
	function gG(url) { var point = url.indexOf('?') + 1; url = url.substring(point,url.length); url = url.split('&'); var gets = []; for (var x in url) { var ok = url[x].split('='); gets[ok[0]] = ok[1]; } return gets; } ;

	function GE_getValue(varname) { return eval(GM_getValue(varname, '[]')); }
	function GE_setValue(varname,vardata){ GM_setValue(varname,vardata.toSource()); }
	function storeValue( name, value ) { try { GM_setValue( name, value ); } catch (e) { error_log("setValue failed - "+ e);} };
	function readValue( name ) { try { return GM_getValue( name ); } catch (e) { error_log("getValue failed - "+ e );} return null; };

	function insertUserLinksMap() {return 0;}  //dummy
	function insertAllyLinksMap() {return 0;}  //dummy

	function setAttributeOfElement(attributeName,attributeValue,ElementXpath) {
		var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (i=0; i<alltags.snapshotLength; i++)
		alltags.snapshotItem(i).setAttribute(attributeName, attributeValue)
	}
	function ajaxRequest(url, aMethod, param, onSuccess, onFailure) {
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.onreadystatechange = function() {
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) onSuccess(xmlHttpRequest);
			else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200) onFailure(xmlHttpRequest);
		};
		xmlHttpRequest.open(aMethod, url, true);
		if (aMethod == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
		xmlHttpRequest.send(param);
	};
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
	function $xf(xpath, xpt, startnode, aDoc) {
		if (!aDoc) aDoc = document;
		if (!startnode) startnode = document;
		var xpres = XPFirst;
		switch (xpt) {case 'i': xpres = XPIterator; break; case 'l': xpres = XPList; break; case 'r': xpres = XPResult; break;};
		var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
		return (xpres == XPFirst ? ret.singleNodeValue : ret);
	}
	for (var i in GE.Positions) {
		var pos = GE.Positions[i];
		if (pos && $g(pos[0])) {
			$g(pos[0]).style.left = (pos[1].substr(0,pos[2].length-2) < 0 ? "0px" : pos[1]);
			$g(pos[0]).style.top = (pos[2].substr(0,pos[2].length-2) < 0 ? "0px" : pos[2]);
		}
	}

	function ft(sec) {
		var hour,min,time;
		time = "";
		hour = Math.floor(sec / 3600);
		sec = (sec-(hour * 3600));
		min = Math.floor(sec / 60);
		sec = Math.floor(sec-(min * 60));
		if (hour < 10) { time += "0"; } time += hour; time +=":";
		if (min < 10) { time += "0"; } time += min;   // if you want to see seconds add:    time += "'"; if (sec < 10) { time += "0"; } time += sec+"\"";
		return time;
	};
	var counter_updsec = 5;	 // update interval
	function counters() {
		for (var i in GE.counters) {
			if (GE.counters[i] && $g(GE.counters[i][0])) {
				if (GE.counters[i][1] > 0) {
					GE.counters[i][1] = GE.counters[i][1] - counter_updsec;
					$g(GE.counters[i][0]).innerHTML = ft(GE.counters[i][1]);
				} else {
					if (GE.counters[i][2] != null) {
						$g(GE.counters[i][2]).style.display = "none";
					} else {
						$g(GE.counters[i][0]).style.color = "#D80000";
					}
				}
			}
		}
	};
	window.setInterval(counters, counter_updsec * 1000);

	$.extend({
		getUrlVars: function (){
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
		return vars;
		},
		getUrlVar: function (name) {
			return $.getUrlVars()[name];
		}
	});

	function trim (zeichenkette) {
		return zeichenkette.replace (/^\s+/, '').replace (/\s+$/, '');
	}


	//cookie alternative for GM_*Value functions
	var Cookie;
	var newCookieLib = function () {
		var createCookie = function (name, Cookie, days) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			document.cookie = name + "=" + Cookie + expires + "; path=/";
		}
		var readCookie = function (name) {
			var nameEq = name + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') { c = c.substring(1,c.length); }
				if (c.indexOf(nameEq) == 0) { return c.substring(nameEq.length,c.length); }
			}
			return undefined;
		}
		return {
			set: function (name, Cookie) { createCookie(name, Cookie, 365); },
			get: function (name, def) { var ret = readCookie(name); if (ret !== undefined) { return ret; } else { return def; }; },
			del: function (name) { document.cookie = name + "= ; expires = Thu, 01-Jan-70 22:02:55 GMT";}
		}
	}


	function uniqueArr(a) {
		temp = new Array();
		for (i = 0; i < a.length; i++){
			if (!contains(temp, a[i])) {
				temp.length += 1;
				temp[temp.length -1] = a[i];
			}
		}
		return temp;
	}

	function contains(a, e) {
	 for (j = 0; j < a.length; j++) if (a[j]==e) return true;
	 return false;
	}

	// Object.create
	if (typeof Object.create !== 'function') { Object.create = function (o) { var F = function () {}; F.prototype = o; return new F(); }; }

	// Start of Drag-n-drop
	// © 2007 by Richard Laffers (http://userscripts.org/scripts/show/35277)
	var mouseOffset = null;
	var iMouseDown = false;
	var lMouseState = false;
	var dragObject = null;
	var curTarget = null;
	function mouseCoords(ev) {return {x:ev.pageX, y:ev.pageY};};
	function getMouseOffset(target, ev) {var docPos = getPosition(target); var mousePos = mouseCoords(ev); return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};};
	function mouseDown(ev) {var target = ev.target; iMouseDown = true; if (target.getAttribute('DragObj')) return false;};
	function getPosition(e) {
		var dx = 0;
		var dy = 0;
		while (e.offsetParent) {
			dx += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
			dy += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
			e = e.offsetParent;
		};
		dx += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		dy  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		return { x:dx, y:dy };
	};
	function mouseMove(ev) {
		var target = ev.target;
		var mousePos = mouseCoords(ev);
		if (dragObject) {
			oSpos = dragObject.style.position;
			dragObject.style.position = 'absolute';
			dragObject.style.top = (mousePos.y - mouseOffset.y) + 'px';
			dragObject.style.left = (mousePos.x - mouseOffset.x) + 'px';
			dragObject.style.position = oSpos;
		};
		lMouseState = iMouseDown;
		return false;
	};
	function mouseUp(ev) {
		if (dragObject) {
			var dOx = dragObject.style.left;
			var dOy = dragObject.style.top;
			switch (dragObject.id) {
				case "GE_Report" : GE.Positions[0] = [dragObject.id,dOx,dOy]; break;
			}
			GE_setValue('Positions'+GE.Game.player_id, GE.Positions);
		};
		dragObject = null;
		iMouseDown = false;
	};
	function makeDraggable(parent, item) {
		document.addEventListener('mousemove', mouseMove, false);
		document.addEventListener('mousedown', mouseDown, false);
		document.addEventListener('mouseup', mouseUp, false);
		if (!parent || !item) return;
		item.addEventListener('mousedown',function(ev) {
			dragObject = parent;
			mouseOffset = getMouseOffset(parent, ev);
			document.body.appendChild(parent);
			return false;
		}, false);
	};
	// End of Drag-n-drop

	function GE_Report_Clean() {  		// not used!!
		$g("GE_Report").innerHTML = '';
	}

	function FarmInfoInit() {
		//get jQuery
		var $ = uW.jQuery;
		with( uW ) {
			if (uW.Game.controller != "map") return;

			if ( WMap && WMap.mapData ) {
				var towns = WMap.mapData.getTowns(
					WMap.mapTiles.tile.x,
					WMap.mapTiles.tile.y,
					WMap.mapTiles.tileCount.x,
					WMap.mapTiles.tileCount.y
				);
				$('head').append(
					"<style type='text/css'>"+".mFInfo { color:#FFCC66; font-size:0.8em; border:0px; margin-top:16px; margin-left:8px; text-shadow:black 1px 1px;}"+
					".mFOK2 { color:#00F090;}"+".mFOK { color:#30F030;}"+".mFDip1 { color:#A0E010;}"+".mFDip2 { color:#F0F000;}"+".mFDip3 { color:#F0A000;}"+".mFDanger { color:#F84040;}"+"</style>"
				);
				for (var townNr in towns ) {
					var town = towns[townNr];
					if ( town.mood ) {
						var tel = $("#farm_town_"+town.id );
						var mF = "";
						if (tel && tel.length > 0) {
							if (town.mood >= 80) { mF = "mFOK2"; }
							else if (town.mood > 74) { mF = "mFOK"; }
							else if (town.mood > 71) { mF = "mFDip1"; }
							else if (town.mood > 59) { mF = "mFDip2"; }
							else if (town.mood > 56) { mF = "mFDip3"; }
							else { mF = "mFDanger"; }
							tel.html( '<table class=mFInfo><tr><td align="center"><span class="' + mF +'">'+town.mood+ '%</span>&nbsp;'+town.strength+
							'%</td></tr><tr><td><span class="resource_'+town.demand+'_icon"></span><span style="color:#E8E8E8;" class="popup_ratio">'+
							town.ratio+'</span><span class="resource_'+town.offer+'_icon"></span></td></tr></table>');
						}
					}
				}
			}
		}
	};

	// C'tor for a "ResCounter"-Object. Used in calculations below.
	ResCounter = function() {
		this.iWood  = 0;
		this.iStone = 0;
		this.iIron  = 0;
		this.iBH    = 0;
		this.iFavor = 0;
	};

	// Adds costs
	ResCounter.prototype.add = function( iCount, sName ) {
		var uc = ResCalc.UnitData[ sName.toLowerCase() ];
		if ( uc ) {
			if ( uc.resources ) {
				this.iWood    += iCount * uc.resources.wood;
				this.iStone   += iCount * uc.resources.stone;
				this.iIron    += iCount * uc.resources.iron;
			}
			if ( uc.population ) this.iBH += iCount * uc.population;
			if ( uc.favor ) this.iFavor += iCount * uc.favor;
		}
	};

	// Renders the resources for one report side as html element (used in report page and embedded reports).
	ResCounter.prototype.renderResult = function() {
		var fValues = this.GetFormattedValues();
		var r =
			"<table  cellpadding='0px' cellspacing='0px'>"+
			"<tr><td style='text-align:right;'>"+fValues.BH    +"</td></tr>"+
			"<tr><td style='text-align:right;'>"+fValues.Wood  +"</td></tr>"+
			"<tr><td style='text-align:right;'>"+fValues.Stone +"</td></tr>"+
			"<tr><td style='text-align:right;'>"+fValues.Iron+"</td></tr>"+
			"<tr><td style='text-align:right;'>"+fValues.Favor +"</td></tr>"+
			"</table>";
		return r;
	};

	ResCounter.prototype.GetFormattedValues = function() {
		return {
			Wood  : ResCalc.fInt(this.iWood),
			Stone : ResCalc.fInt(this.iStone),
			Iron  : ResCalc.fInt(this.iIron),
			Favor : ResCalc.fInt(this.iFavor),
			BH    : ResCalc.fInt(this.iBH)
		};
	};
	// END of FUNCTIONS & VARIABLES ______________________________________________________________________________________________________________


	// START of CONFIG
	if (true) {
		//var ResPass, ResKey, PolisSearch, MapKey;
		Config.scriptName = scriptName;
		Config.footerHtml = '<span style="font-size:1em;">'+ L('OPTSETFOOTER') +'</span>',
		Config.tabs = {
			TAB1: {
				html: L('OPTSETTXT1'),
				fields: {
					optProdinfo: {
						type : 'checkbox',
						label: L('OPTPRODINFO'),
						value: true,
					},
					optFormatter: {
						type : 'checkbox',
						label: L('OPTFORMATTER'),
						value: true,
					},
					optReportInfo: {
						type : 'checkbox',
						label: L('OPTREPORTINFO'),
						value: true,
					},
					optFarmerhelp: {
						type : 'checkbox',
						label: L('OPTFARMERHELP'),
						value: true,
					},
					optFarmInfo: {
						type : 'checkbox',
						label: L('OPTFARMINFO'),
						value: true,
					},
					optResCalc: {
						type : 'checkbox',
						label: L('OPTRESCALC'),
						value: true,
					},
					optRepRes: {
						type : 'checkbox',
						label: L('OPTREPRES'),
						value: true,
					},
					optline1: {
						type : 'html',
						value: L('OPTLINE1'),
					},
					optToolbar: {
						type : 'checkbox',
						label: L('OPTTOOLBAR'),
						text : L('ToolbarText'),
						value: true,
					},
					optCulture: {
						type : 'checkbox',
						label: L('OPTCULTURE'),
						value: true,
					},
					optMarket: {
						type : 'checkbox',
						label: L('OPTMARKET'),
						value: true,
					},
				}
			},
			TAB2: {
				html: L('OPTSETTXT2'),
				fields: {
					optAllylinks: {
						type : 'checkbox',
						label: L('OPTALLYLINKS'),
						value: true,
					},
					optUserlinks: {
						type : 'checkbox',
						label: L('OPTUSERLINKS'),
						value: true,
					},
					optAlliance: {
						type : 'checkbox',
						label: L('OPTALLIANCE'),
						text : L('AllianceText'),
						value: false,
					},
					optBuildingpnts: {
						type : 'checkbox',
						label: L('OPTBUILDINGPNTS'),
						value: true,
					},
					optArrowcntrl: {
						type : 'checkbox',
						label: L('OPTARROWCNTRL'),
						value: true,
					},
					optSwCitycntrl: {
						type : 'checkbox',
						label: L('OPTSWCITYCNTRL'),
						value: true,
					},
//					optline2: {
//						type : 'html',
//						value: L('OPTLINE2'),
//					},
					optTownList: {
						type : 'checkbox',
						label: L('OPTTOWNLIST'),
						text : L('TownlistText'),
						value: true,
					},
					optRedirectcleaner: {
						type : 'checkbox',
						label: L('OPTREDIRECTCLEANER'),
						text : L('WarnPage'),
						value: true,
					},
				}
			},
			TAB4: {
				html:L('OPTSETTXT4'),
				fields:{
					ResPass:{
						type : 'text',
						label: L('RESPASSWORD'),
						value: Res_Pass,
						width: 250,
					},
					ResKey:{
						type : 'text',
						label: L('RESPASSKEY'),
						value: Res_Key,
						text : L('OPTSETTXT4A'),
						width: 32,
					},
					PolisSearch:{
						type : 'text',
						label: L('POLISSEARCH'),
						value: Polis_Search,
						width: 250,
					},
					MapKey:{
						type : 'text',
						label: L('MAPKEY'),
						value: Map_Key,
						width: 250,
					},
					optline3:{
						type : 'html',
						value: L('OPTLINE4'),
					},
					optlinktext:{
						type : 'html',
						value: L('OPTLNKTXT'),
					},
					OwnLink1:{
						type : 'text',
						label: L('OPTLINK1'),
						value: Own_Link1,
						width: 250,
					},
					Link1Name:{
						type : 'text',
						label: L('OPTLINK1NAM'),
						value: Link1_Name,
						width: 92,
					},
					OwnLink2:{
						type : 'text',
						label: L('OPTLINK2'),
						value: Own_Link2,
						width: 250,
					},
					Link2Name:{
						type : 'text',
						label: L('OPTLINK2NAM'),
						value: Link2_Name,
						width: 92,
					},
				}
			},
			UPDATE: {
				fields:{
					configTabUpdate: {
						type : 'html',
						value: L('OPTUPDTXT'),
					}
				}
			},
			ABOUT: {
				html: '<strong>'+ L('SCRIPTNAME') +': </strong>'+ scriptName +'<br><br><strong>'+ L('SCRIPTVER') +': </strong>'+ scriptVersion +'<br><br><strong>'+ L('SCRIPTWRIGHT') +': </strong>'+ scriptWright +'<br>'+ L('OPTLINE4') +'<br>'+ L('ABOUTTEXT') + '<br> ',
			}
		};
		var GE_Settings_Div = $d('', [['id', 'GE_Settings']]);
		var GE_Settings_A = $a(L('SETTINGS'), [['href', jsVoid], ['id', 'GE_Settings_A']]);
		Config.reloadOnSave = true;
		GE_Settings_A.addEventListener('click', Config.show, false);
		GE_Settings_Div.appendChild(GE_Settings_A);
		$(GE_Settings_Div).insertAfter($('#links'));
	}
	// END of CONFIG


	// START of TOWNLIST
	if ((Config.get('optTownList')) && ($('a.city_list')[0] != undefined)) {
		var scriptEl = document.createElement("script");
		scriptEl.setAttribute('type','text/javascript');
		scriptEl.setAttribute('id','gtio_reportcollector');
		scriptEl.appendChild(document.createTextNode("\
			var MAX_COLUMNS = 3; if (window.innerWidth > 1016) MAX_COLUMNS = 4; \
			var SPLIT_AT = parseInt((window.innerHeight - 127) / 16, 10);\
			function gt2c_reorganize() {\
				if ($('#town_list').length == 0) { window.setTimeout(gt2c_reorganize, 50); return;}\
				var N  = $('#town_list ul li').length;\
				var N2 = Math.floor(N / 2);\
				var N3 = Math.floor(N / 3);\
				var N4 = Math.floor(N / 4);\
				if (N < SPLIT_AT) return;\
				$('#town_list ul li').css('text-align','left');\
				$('#town_list ul li a').css( {'position':'relative', 'left':'30px'} );\
				if ((N >= SPLIT_AT) && (MAX_COLUMNS > 1)) NUM_COLUMNS = 2;\
				if ((N / 2 >= SPLIT_AT) && (MAX_COLUMNS > 2)) NUM_COLUMNS = 3;\
				if ((N / 3 >= SPLIT_AT) && (MAX_COLUMNS == 4)) NUM_COLUMNS = 4;\
				if (NUM_COLUMNS == 4) {\
					$('#town_list').css( {'width':'1024px', 'left':'1px', 'background':'url(http://www.imgbox.de/users/Peety/grepolis/town_list_middle2.png) repeat scroll 0 0 transparent', 'hight':'60px', 'top':'43px'} );\
					$('#town_list_top').css( {'width':'1024px', 'background':'url(http://www.imgbox.de/users/Peety/grepolis/town_list_top2.png) repeat-x scroll 0 0 transparent',  'height':'12px', 'top':'-12px'});\
					$('#town_list_bottom').css( {'width':'1024px', 'background':'url(http://www.imgbox.de/users/Peety/grepolis/town_list_bottom2.png) repeat-x scroll 0 0 transparent', 'hight':'15px', 'top':'15px'} );\
					$('#town_list ul li a').css({'position':'relative', 'left':'26px'});\
					$('#town_list ul li div div.faarksGrepoTownListEnhancement_infoButton').css({'position':'relative', 'left':'-766px'});\
					$('#town_list ul li div a.faarksGrepoTownListEnhancement_gotoButton').css({'position':'relative', 'left':'-766px'});\
				}\
				if (NUM_COLUMNS == 3) {\
					$('#town_list').css( {'width':'832px', 'left':'84px'} );\
					$('#town_list_top').css('width','832px');\
					$('#town_list_bottom').css('width','832px');\
					$('#town_list ul li div div.faarksGrepoTownListEnhancement_infoButton').css({'position':'relative', 'left':'-552px'});\
					$('#town_list ul li div a.faarksGrepoTownListEnhancement_gotoButton').css({'position':'relative', 'left':'-552px'});\
				}\
				if (NUM_COLUMNS == 2) {\
					$('#town_list').css('width','553px');\
					$('#town_list_top').css('width','553px');\
					$('#town_list_bottom').css('width','553px');\
					$('#town_list ul li div div.faarksGrepoTownListEnhancement_infoButton').css({'position':'relative', 'left':'-276px'});\
					$('#town_list ul li div a.faarksGrepoTownListEnhancement_gotoButton').css({'position':'relative', 'left':'-276px'});\
				}\
				allA = document.evaluate( \"//div[@id = 'town_list']/ul/li/a\", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );\
				allFaarkDiv = document.evaluate( \"//div[@id = 'town_list']/ul/li/div[@class = 'faarksGrepoTownListEnhancement_box']\", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );\
				allLI = document.evaluate( \"//div[@id = 'town_list']/ul/li\", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );\
				if (NUM_COLUMNS == 2) {\
					for (i = 0; i < N2; i++) {\
						src = allA.snapshotItem(Math.ceil(N / 2) + i);\
						dest = allLI.snapshotItem(i);\
						dest.appendChild(src);\
						src.setAttribute('style','position:absolute; left:308px');\
					}\
					if (allFaarkDiv.snapshotLength > 0) {\
						for (i = 0; i < N2; i++) {\
							src = allFaarkDiv.snapshotItem(Math.ceil(N / 2) + i);\
							before = allA.snapshotItem(i);\
							dest = allLI.snapshotItem(i);\
							dest.insertBefore(src, before);\
						div = src.firstChild;\
							div.setAttribute('style','position:relative; left:2px');\
							div.nextSibling.setAttribute('style','position:relative; left:2px');\
						}\
					}\
				}\
				if (NUM_COLUMNS == 3) {\
					maxi = N3;\
					if (N%3 == 2) maxi = N3 + 1;\
					for (i = 0; i < maxi; i++) {\
						src = allA.snapshotItem(Math.ceil(N / 3) + i);\
						dest = allLI.snapshotItem(i);\
						dest.appendChild(src);\
						src.setAttribute('style', 'position:absolute; left:308px');\
					}\
					maxi2 = N3;\
					for (i = 0; i < maxi2; i++) {\
						src = allA.snapshotItem(Math.ceil(N / 3) + i + maxi);\
						dest = allLI.snapshotItem(i);\
						dest.appendChild(src);\
						src.setAttribute('style', 'position:absolute; left:586px');\
					}\
					if (allFaarkDiv.snapshotLength > 0) {\
						for (i = 0; i < maxi; i++) {\
							src = allFaarkDiv.snapshotItem(Math.ceil(N / 3) + i);\
							before = allA.snapshotItem(i);\
							dest = allLI.snapshotItem(i);\
							dest.insertBefore(src, before);\
							div = src.firstChild;\
							div.setAttribute('style','position:relative; left:-274px');\
							div.nextSibling.setAttribute('style', 'position:relative; left:-274px');\
						}\
						for (i = 0; i < maxi2; i++) {\
							src = allFaarkDiv.snapshotItem(Math.ceil(N / 3) + i + maxi);\
							before = allA.snapshotItem(i);\
							dest = allLI.snapshotItem(i);\
							dest.insertBefore(src, before);\
							div = src.firstChild;\
							div.setAttribute('style','position:relative; left:4px');\
							div.nextSibling.setAttribute('style', 'position:relative; left:4px');\
						}\
					}\
				}\
				if (NUM_COLUMNS == 4) {\
					maxi = N4;\
					if (N%4 > 1) maxi = N4 + 1;;\
					for (i = 0; i < maxi; i++) {\
						src = allA.snapshotItem(Math.ceil(N / 4) + i);\
						dest = allLI.snapshotItem(i);\
						dest.appendChild(src);\
						src.setAttribute('style', 'position:absolute; left:282px');\
					}\
					maxi2 = N4;\
					if (N%4 > 2) maxi2 = N4 + 1;\
						for (i = 0; i < maxi2; i++) {\
						src = allA.snapshotItem(Math.ceil(N / 4) + i + maxi);\
						dest = allLI.snapshotItem(i);\
						dest.appendChild(src);\
						src.setAttribute('style', 'position:absolute; left:538px');\
					}\
					maxi3 = N4;\
					for (i = 0; i < maxi3; i++) {\
						src = allA.snapshotItem(Math.ceil(N / 4) + i + maxi + maxi2);\
						dest = allLI.snapshotItem(i);\
						dest.appendChild(src);\
						src.setAttribute('style', 'position:absolute; left:794px');\
					}\
					if (allFaarkDiv.snapshotLength > 0) {\
						for (i = 0; i < maxi; i++) {\
							src = allFaarkDiv.snapshotItem(Math.ceil(N / 4) + i);\
							before = allA.snapshotItem(i);\
							dest = allLI.snapshotItem(i);\
							dest.insertBefore(src, before);\
							div = src.firstChild;\
							div.setAttribute('style','position:relative; left:-510px');\
							div.nextSibling.setAttribute('style', 'position:relative; left:-510px');\
						}\
						for (i = 0; i < maxi2; i++) {\
							src = allFaarkDiv.snapshotItem(Math.ceil(N / 4) + i + maxi);\
							before = allA.snapshotItem(i);\
							dest = allLI.snapshotItem(i);\
							dest.insertBefore(src, before);\
							div = src.firstChild;\
							div.setAttribute('style','position:relative; left:-254px');\
							div.nextSibling.setAttribute('style', 'position:relative; left:-254px');\
						}\
						for (i = 0; i < maxi3; i++) {\
							src = allFaarkDiv.snapshotItem(Math.ceil(N / 4) + i + maxi + maxi2);\
							before = allA.snapshotItem(i);\
							dest = allLI.snapshotItem(i);\
							dest.insertBefore(src, before);\
							div = src.firstChild;\
							div.setAttribute('style','position:relative; left:2px');\
							div.nextSibling.setAttribute('style', 'position:relative; left:2px');\
						}\
					}\
				}\
			};\
			function gt2c_1col() {\
				$('#town_list').css('width','-5px');\
			};\
			(function() {\
				onclick=$('a.city_list')[0].getAttribute('onclick');\
				if (onclick == 'Layout.toggleTownList();') {\
					$('a.city_list')[0].setAttribute('onclick', onclick + 'gt2c_reorganize()');\
					if ($('a.town_group_list'))\
						$('a.town_group_list')[0].setAttribute('onclick', $('a.town_group_list')[0].getAttribute('onclick') + 'gt2c_1col()');\
				};\
			})();"
		));
		document.body.appendChild(scriptEl);
	}
	//End of TOWNLIST


	// START of TOOLBAR
	if ((Config.get('optToolbar')) && ($gc('toolbar')[0])) {
		var curCity = GE.Game.townId;
		var reservation = '<li><a href="http://www.grepotools.de/reservation';
		if ((Res_Pass != "") && (Res_Key != "")){
			reservation += '/'+ GE.Server[3] +','+ Res_Key +','+ Res_Pass;
		}
		reservation += '" target="_blank">'+L('RESERVATIONTXT')+'</a><span class="right"></span></li>';

		var polissearch = '<li><a href="http://grepo.faark.de/tondasPolisSuche/townSearch.php/'+GE.Server[1];
		if (Polis_Search != "") {
			polissearch += '?key='+ Polis_Search;
		}
		polissearch += '" target="_blank">'+L('POLISSEARCHTXT')+'</a><span class="right"></span></li>';

		var grepostats = 'www.grepostats.com';
		if (GE.Server[2] == 'de') {grepostats = 'de.grepostats.com';}

		var link1 = ""; var link2 = "";
		var lline = '<li><span><br></span><span class="right"></span></li>'
		if (Own_Link1.length > 11) {
			if (Link1_Name.length == 0) Link1_Name = "Link1";
			link1 = '<li><span><a href="'+ Own_Link1 +'" target="_blank">'+ Link1_Name +'</a></span><span class="right"></span></li>';
		}
		if (Own_Link2.length > 11) {
			if (Link2_Name.length == 0) Link2_Name = "Link2";
			link2 = '<li><span><a href="'+ Own_Link2 +'" target="_blank">'+ Link2_Name +'</a></span><span class="right"></span></li>';
		}
		

		var curMenu = ''+
		'<li><a href="/game/building_main?town_id='+ curCity +'"><b>'+ L('main') +'</b></a></li>'+
		'<li><a href="/game/building_barracks?town_id='+ curCity +'"><b>'+ L('barracks') +'</b></a></li>'+
		'<li><a href="/game/building_docks?town_id='+ curCity +'"><b>'+ L('docks') +'</b></a></li>'+
		'<li><a href="/game/building_academy?town_id='+ curCity +'"><b>'+ L('academyshort') +'</b></a></li>'+
		'<li><a href="/game/building_temple?town_id='+ curCity +'"><b>'+ L('temple') +'</b></a></li>'+
		'<li><a href="/game/building_wall?town_id='+ curCity +'"><b>'+ L('wall') +'</b></a></li>'+
		'<li><a href="/game/building_hide?town_id='+ curCity +'"><b>'+ L('hide') +'</b></a></li>'+
		'<li><a href="/game/building_place?action=simulator&town_id='+ curCity +'"><b>'+L('simulatorshort')+'</b></a></li>'+
		'<li><a href="/game/building_place?action=culture&town_id='+ curCity +'"><b>'+L('place')+'</b></a></li>'+
		'<li><a href="/game/building_market?town_id='+curCity+'"><b>'+ L('market') +'</b></a></li>'+
		'<li class="liTop"><a class="aTop" href="#"><img src="http://static.grepolis.com/images/game/toolbar/main.png" /><b> '+ L('MENU_EXTRAS') +' </b></a>'+
			'<div class="submenu">'+
				'<ul>'+
					reservation +
					polissearch +
					'<li><a href="http://'+ GE.Server[1] +'.grepolismaps.org/'+ Map_Key +'" target="_blank">'+L('GPMAP')+'</a><span class="right"></span></li>'+
					'<li><a href="http://'+ grepostats +'/world/'+ GE.Server[1] +'/index" target="_blank">Grepo Stats</a><span class="right"></span></li>'+
					'<li><a href="http://www.grepo-world.com/index.php?view=top_players&land='+ GE.Server[2] +'&world='+ GE.Server[3] +'" target="_blank">Grepo World</a><span class="right"></span></li>'+
					'<li><a href="http://www.grepotools.de/" target="_blank">Grepo Tools</a><span><span class="right"></span><li>'+
					'<li><a href="http://www.grepolis-times.de/" target="_blank">Grepolis Times</a><span><span class="right"></span><li>'+
					link1 +
					link2 +
					lline +
					'<li><span><small>'+ L('OptText') +'</small></span><span class="right"></span></li>'+
					'<li class="submenu_bottom"><span class="right"></span></li>'+
				'</ul>'+
			'</div>'+
		'</li>';

		Css =  " .toolbar li { float:left; margin:-4px 0 0 0;}";
		Css += " .toolbar li a { display:block; float:left; height:28px; line-height:25px; color:#FFCC66; text-decoration:none; font-family:tahoma; font-size:11px; text-align:center; padding:0 1px 0 3px;}";
		Css += " .toolbar li a b { float:right; display:block; padding:0 5px 0 3px; margin-right:-1px;}";
		Css += " .toolbar li a:hover, .aHov { color:#ffb400; background:transparent url("+ pImage['menubg2'] +") center top; }";
		Css += " .toolbar li a:hover b, .bHov { background:transparent center top;}";
		Css += " .liTop a img, .aTop img { margin-top:5px; border:none;}";
		Css += " .toolbar li ul { display:none; background:url(http://static.grepolis.com/images/game/layout/toolbar_submenu_middle_left.png); width:11.8em; position:absolute; z-index:20; top:28px; left:-38px; text-align:center;}";
		Css += " .toolbar li:hover ul { z-index:21; display:block; }";
		Css += " .toolbar li li a, .toolbar li li a:link, .toolbar li li a:visited, .toolbar li li a:hover { background:none; color:#804000; height:1.0em; padding:7px 7px 0; float:none; line-height:.1.2em; text-align:left;}";
		Css += " .toolbar li li a:hover { color:#0082BE; }";
		Css += " .submenu { display:block; padding-top: 7px; position: absolute; z-index: 21;}";
		Css += " .submenu ul { background: url(http://static.grepolis.com/images/game/layout/toolbar_submenu_middle_left.png) repeat-y scroll 0 0 transparent; }";
		Css += " .submenu li a { display:block; font:bold 13px Verdana, Arial, Helvetica, sans-serif; text-align:center; }";
		Css += " .submenu ul li { clear: both; float: none; margin:0; max-width: 278px; position: relative; }";
		Css += " .submenu_bottom { background: url(http://static.grepolis.com/images/game/layout/toolbar_submenu_bottom_left.png) no-repeat scroll 0 0 transparent; height:10px; top:5px;}";
		GM_addStyle(Css);

		$gc('toolbar')[0].innerHTML = curMenu;

		$(".liTop").hover(function() {
			$(".aTop").toggleClass("aHov");
			$(".aTop > b").toggleClass("bHov");
		});
	}
	// END of TOOLBAR


	// START of PROGRESSBAR //
	function progress_bar() {
		if ($g('send_units_form') || $g('units')) {
			if ($g('progressbar')) {
				var style_bgred = "background: url("+ pImage['pbar_bgII'] +") repeat-x scroll 0 0 transparent; height: 25px; margin: 0 auto; width: 466px;";
				var style_norm  = "background: url(http://static.grepolis.com/images/game/towninfo/progressbar_bg.png) repeat-x scroll 0 0 transparent; height: 25px; margin: 0 auto; width: 466px;";
				if ($g("capacity_current") != null) {
					var ca = parseInt($g('capacity_current').firstChild.nodeValue, 10);
					var cm = parseInt($g('capacity_max').firstChild.nodeValue, 10);
					if ((ca > cm) && (cm > 0)) {
						if (pr_bar == 0) {
							GM_addStyle (" #progressbar { "+ style_bgred +"}" );
							pr_bar = 1;
						}
					} else {
						if (pr_bar == 1) {
							GM_addStyle (" #progressbar { "+ style_norm +" }" );
							pr_bar = 0;
						}
					}
				}
			}
		}
	}
	window.addEventListener('keyup', progress_bar, false);
	window.addEventListener('click', progress_bar, false);
	// END of  PROGRESSBAR


	// START of PA_MENU
	if ($g('overviews_link_hover_menu') != undefined) {
		function pa_menu() {
			GM_addStyle(" #overviews_link_hover_menu { clear: both; left:-1px !important; position:absolute; top:17px !important; z-index:200; }");
		}
		pa_menu();
	}
	// END of PA_MENU


	// START of CULTURE_OVERVIEW
	if ((GE.Controller == 'town_overviews') && (( uW.document.URL.indexOf("=culture_overview") > 0)) && (Config.get('optCulture'))) {
		// Stadtfeste nach oben
		var scriptEl = document.createElement("script");
		scriptEl.setAttribute('type','text/javascript');
		scriptEl.appendChild(document.createTextNode("\
			(function(){\
				allAParty=document.evaluate(\
					\"//a[@class='confirm type_theater  ']\",\
					document,\
					null,\
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
					null\
				);\
				ul=$('#culture_overview_towns')[0];\
				for (i=0; i<allAParty.snapshotLength; i++) {\
					li=$(allAParty.snapshotItem(i)).parents('li.town_item')[0];\
					sib=li.previousSibling;\
					ul.insertBefore(li, ul.firstChild);\
					ul.insertBefore(sib, ul.firstChild);\
				}\
				allAParty=document.evaluate(\
					\"//a[@class='confirm type_party  ']\",\
					document,\
					null,\
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
					null\
				);\
				ul=$('#culture_overview_towns')[0];\
				for (i=0; i<allAParty.snapshotLength; i++) {\
					li=$(allAParty.snapshotItem(i)).parents('li.town_item')[0];\
					sib=li.previousSibling;\
					ul.insertBefore(li, ul.firstChild);\
					ul.insertBefore(sib, ul.firstChild);\
				}\
			})();\
		"));// ie may needs (null == scriptEl.canHaveChildren || scriptEl.canHaveChildren) ? scriptEl.text = txt;
		document.body.appendChild(scriptEl);

		// Alle Feste zaehlen
		var allEtaSpans;
		var counter = 0;
		allEtaSpans=document.evaluate(
			"//span[@class='eta']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null
		);

		var divPlaceCult=document.getElementById("place_culture_count");
		var points = divPlaceCult.firstChild.nodeValue.split("/");
		var newpoints = parseInt(points[0], 10)+allEtaSpans.snapshotLength;
		var diffpoints = parseInt(points[1], 10)-newpoints;

		var date = new Date();
		var red_time = parseInt( date.getTime() / 1000 + (20 * 60), 10); // time for red
		var orange_time = red_time + (40 * 60);							// + time for orange
		var yellow_time = orange_time + (60 * 60);						// + time for yellow
		allEtas = new Array(allEtaSpans.snapshotLength);
		allProgressbars = new Array(allEtaSpans.snapshotLength);
		// ETA Farbe zuordnen
		for (i = 0; i < allEtaSpans.snapshotLength; i++) {
			allEtas[i] = allEtaSpans.snapshotItem(i).firstChild.nodeValue.substr(14, 10);
			allProgressbars[i] = allEtaSpans.snapshotItem(i).parentNode;
			if ((allEtas[i] - red_time) < 0) {
				allProgressbars[i].className = 'celebration_progressbarIII';
			} else if ((allEtas[i] - orange_time) < 0){
				allProgressbars[i].className = 'celebration_progressbarII';
			} else if ((allEtas[i] - yellow_time) < 0){
				allProgressbars[i].className = 'celebration_progressbarI';
			} else {
				allProgressbars[i].className = 'celebration_progressbar';
			}
		}

		// Und Statuszeile anpassen
		// for debugs: diffpoints = -2;
		//  display
		if (diffpoints > 0) {
			divPlaceCult.firstChild.nodeValue = points[0] +" / "+ points[1] +" [-"+ diffpoints +"]";
		} else {
			// ETA berechnen, wann Kulturstufe fertig
			allEtas = new Array(allEtaSpans.snapshotLength);
			for (i = 0; i < allEtaSpans.snapshotLength; i++) {
				allEtas[i] = allEtaSpans.snapshotItem(i).firstChild.nodeValue.substr(14, 10);
			}
			allEtas.sort();
			// diffpoints sind = 0 oder < 0, bei = 0 -> letztes element,  bei < 0 -> zurückzählen, eta = anzahlelemente + diffpoints -1(wg. index)
			var eta;
			eta=allEtas[allEtaSpans.snapshotLength + diffpoints -1];
			divPlaceCult.firstChild.nodeValue = points[0]+" / "+ points[1] +" [-"+ diffpoints * -1 +"]"+" ["+ eta +"]";
			// thx @Faark
			var scriptEl = document.createElement("script");
			scriptEl.setAttribute('type', 'text/javascript');
			scriptEl.appendChild(document.createTextNode("\
				(function(){\
					var content = /([0-9]+) \\/ ?([0-9]+) \\[-([0-9]+)\\] \\[([0-9]+)\\]/.exec( $('#place_culture_count').text() );\
					if( content ){\
						$('#place_culture_count').html(content[1] +' / '+ content[2] +' [+'+ content[3] +']  <span></span>');\
						$('#place_culture_count span').countdown( content[4] );\
						$('#place_culture_count span').mousePopup( new MousePopup( 'Zeit bis zum Erreichen der nächsten Stufe' ) );\
					}\
				})();\
			"));	// ie may needs (null == scriptEl.canHaveChildren || scriptEl.canHaveChildren) ? scriptEl.text = txt;
			document.body.appendChild(scriptEl);
		}

		CultureOverview = {
			// Culture Overview module
			activateAutoParty : false,

			// Mapping from celeb type name to "show" switch
			typeSwitch : {
				triumph : 'Culture_ShowTriumph',
				theater : 'Culture_ShowTheater',
				games   : 'Culture_ShowGames',
				party   : 'Culture_ShowParty'
			},

			Counters : {
				party   : 0,
				games   : 0,
				theater : 0,
				triumph : 0
			},

			CurrentJob : {
				type : null,
				delay : 511
			},


			// Get all active celebration button fields of one type.
			//	types: 'party', 'games', 'theater', 'triumph'
			getCelebrationButtons : function ( type ) {
				return $('.confirm.type_'+ type +':not(.disabled)');
			},

			startNextCelebration : function() {
				var type = CultureOverview.CurrentJob.type;
				if ( type ) {
					var celebs  = CultureOverview.getCelebrationButtons(CultureOverview.CurrentJob.type);
					if ( celebs.length > 0 ) {
						celebs[0].onclick();
					}
					else {
						CultureOverview.CurrentJob.type = null;
					}
				}
			},

			updateVisibility : function ( onlyType ) {
				// Switch celebration fields
				for( var type in CultureOverview.typeSwitch ) {
					if ( onlyType === undefined || onlyType == type ) {
						var isOn = uW[ "_mh_"+CultureOverview.typeSwitch[type] ];
						$("#mh_"+type+"BtOL").css('display', isOn ? 'none' : 'block');
						$(".celebration:has(.type_"+type+")").css('display', isOn ? '' : 'none');
					}
				}
			},

			updateCounters : function () {
				var cc_count;
				for (var cname in CultureOverview.Counters ) {
					CultureOverview.Counters[cname] = CultureOverview.getCelebrationButtons(cname).length;
					cc_count = CultureOverview.Counters[cname];
					var ma = 1;
					if ((cname == "triumph") && (cc_count > 0)) {cc_count = "!!";}
					else if (cc_count > 99) {ma = -3;}
					$('#mh_'+ cname +'Count').html(
						'<span class="place_unit_white" style="margin:-3px '+ ma +'px">'+ cc_count +'</span>'
					);
				}
				$('#mh_autoParty'  ).setPopup( (CultureOverview.Counters.party > 0) ? (CultureOverview.activateAutoParty ? 'auto_party' : 'next_party'  ) : 'no_party' );
				$('#mh_autoTriumph').setPopup( (CultureOverview.Counters.triumph > 0) ? (CultureOverview.activateAutoParty ? 'auto_triumph' : 'next_triumph') : 'no_triumph' );
			},


			// Ajax-callback, executed after the result was handled by grepo (just because it was called via setTimeout)
			ajaxCallback : function( data ) {
				if (data.result) {
					if ( data.result.success && CultureOverview.activateAutoParty ) {
						// Request was successful, trigger next celebration
						setTimeout( CultureOverview.startNextCelebration, CultureOverview.CurrentJob.delay );
					} else {
						// If something failed or auto is off, re-activate our buttons
						CultureOverview.CurrentJob.type = null;

						if (!data.result.success) {
							// Check if the last (failed) request was a celebration and deactivate the buttons in this case!
							if ( data.json && data.json.celebration_type ) {
								if ( data.json.celebration_type == "triumph" ) {
									// The last request was for "triumph".
									// Disable ALL "triumph"-buttons
									$(".confirm.type_triumph").addClass('disabled');
								} else {
									// Disable the button of the last request
									$("#town_"+ data.json.town_id +" .confirm.type_"+ data.json.celebration_type).addClass('disabled');
								}
							}
						}
					}
				}
				CultureOverview.updateCounters();
			},

			adapt : function () {
				// Common styles for all buttons (should be moved to css...)
				var commonStyle = "cursor:pointer; background-image:url('http://static.grepolis.com/images/game/overviews/celebration_bg.png'); height:24px; width:24px; float:right; position:relative; -moz-border-radius:6px; font-weight:bold; text-shadow:black 1px 1px;";
				// Parent container for buttons
				var parent = $('<div style="float:right; margin:2px 12px;"></div>');
				parent.appendTo( $('.menu_inner')[0] );
				var bgOffs = { party:-111, games:-142, theater:-172, triumph:-203};
				// Auto-start buttons
				var startTriumphP = $(
					"<div id='mh_autoTriumph' onclick='mh_startCelebration(\"triumph\")' style=\""+ commonStyle +" background-position:0 "+ bgOffs.triumph +"px; border:3px #902020; border-style:ridge solid;\">"
					+"</div>"
				);
				var startPartyP = $(
					"<div id='mh_autoParty' onclick='mh_startCelebration(\"party\")' style=\""+ commonStyle +" background-position:0 "+ bgOffs.party +"px; border:3px #902020; border-style:ridge solid;\">"
					+"</div>"
				);

				startTriumphP.appendTo( parent );
				$('<div style="float:right; width:4px; height:1px;"/>').appendTo( parent );
				startPartyP.appendTo( parent );
				$('<div style="float:right; width:15px; height:1px;"/>').appendTo( parent );

				// "Show" switch buttons
				for (var type in this.typeSwitch ) {
					// Create code for view switches
					var bt = $(
						"<div onclick='mh_switchCelebrations(\""+ type +"\");' style=\""+ commonStyle +" border:3px #666666; border-style:ridge solid; background-position:0 "
						+ bgOffs[type] +"px;\"><div id='mh_"+ type +"BtOL' style='width:100%; height:100%; opacity:0.4; background:#000000;'></div>"
						+ "<div id='mh_"+ type +"Count'/></div>"
					);
					bt.appendTo(parent);
					$('<div style="float:right; width:4px; height:1px;"/>').appendTo( parent );
					bt.setPopup('show_'+ type);

					// Set flags in game window initial from storage.
					var swt = this.typeSwitch[type];
					var swt1 = swt.substr(8);
					var val = readValue (swt1 +"_"+ GE.Server[1], "yes");
					uW["_mh_"+ swt] = (val == "yes" ? true:false) ;
				}
				// Click callback for view switches above
				uW.mh_switchCelebrations = function(type) {
					var swt  = CultureOverview.typeSwitch[type];
					var swt1 = swt.substr(8);
					var wVar = "_mh_"+swt;
					uW[ wVar ] = !uW[ wVar ];
					CultureOverview.updateVisibility(type);

					uW.setTimeout( storeValue, 0, swt1 +"_"+ GE.Server[1], uW[wVar] ? "yes" : "no" );
				};
				// Click callback for start buttons above
				uW.mh_startCelebration = function (type) {
					if ( CultureOverview.CurrentJob.type == null ) {
						CultureOverview.CurrentJob.type = type;
						CultureOverview.startNextCelebration();
					}
				};
				// Update visibility of all types.
				this.updateVisibility();
				// Calc Counters
				this.updateCounters();
				// Hook in to update counters after ajax requests
				$("body").ajaxComplete( function(e, xhr, settings) {
					var result = null;
					var json = null;
					try {
						result = $.parseJSON( xhr.responseText );
						// settings.data contains something like "json={...}"
						json = $.parseJSON( unescape( settings.data.replace( /\+/g, " ") ).substr(5) );
					} catch (e) { };
					setTimeout( CultureOverview.ajaxCallback, 0, { result : result, url : settings.url, json : json } );
				});
			}
		};
	}
	// END of CULTURE_OVERVIEW


	// START of MARKET & HIDE
	if ((GE.Controller == 'building_market') && (Config.get('optMarket'))) {
		Market = {
			adaptSliders : function () {
				var cap = parseInt( $('#trade_capacity').text() );
				$( '.market_offers .slider_input').each( function(index, sliderInput) {
					if (parseInt( sliderInput.value, 10) > cap ) {
						sliderInput.value = cap;
						// Update slider
						var id = sliderInput.id;
						// e.g. offer_input_123456
						id = parseInt(id.substr(id.lastIndexOf('_')+1 ), 10);
						$('#slide_offer_'+id ).slider('value', cap);
					}
				});
			},

			adapt : function() {
				this.adaptSliders();
				// Hook into update after ajax post
				var oldUpdate = uW.Layout.updateBar;
				uW.Layout.updateBar = function() {
					Market.adaptSliders();
					oldUpdate.apply( this, arguments );
				};
			}
		};
	}

	if (((GE.Controller == 'town_overviews') && ( uW.document.URL.indexOf('=hides_overview') > 0) || (GE.Controller == 'building_hide')) && (Config.get('optMarket'))) {
		HidesOverview = {
			adapt : function () {
				$('.town_item').each( function(index, town) {
					// e.g. "town_12345"
					var id = town.id;
					var townId = parseInt( id.substr( id.lastIndexOf('_') + 1 ) );
					// e.g. "(33877/8)"
					var range = $('#'+ id +' .eta' ).text();
					var cur = parseInt( range.substring( range.indexOf('(') + 1, range.indexOf('/') ), 10);
					var max = parseInt( range.substring( range.indexOf('/') + 1, range.indexOf(')') ), 10);
					if (isNaN(max))
						max = 9999999;
					var cap = max-cur;
					var warehouseIron = parseInt($('#'+id+'_res .iron .count').text(), 10);
					if ((warehouseIron-cap) < hideMinIron)
						cap = warehouseIron-hideMinIron;

					if ( cap > 0 )
						$('#town_hide_'+townId )[0].value = cap;
				});
			}
		};

		Hide = {
			adapt : function()
			{
				// Must be delayed
				setTimeout( Hide.adaptSlider, 0 );
			},
			adaptSlider : function()
			{
				var input = $('#unit_order_input')[0];
				var max = parseInt($('#unit_order_max').text(), 10);
				var warehouseIron = parseInt($('#iron_count').text(), 10);

				if ((warehouseIron-max) < hideMinIron)
					max = warehouseIron - hideMinIron;

				if ( max > 0 )
				{
				input.value = max;
					var slider = $('#unit_order_slider');
					slider.slider('value', max);
					slider.change();
				}
			}
		};
	}
	// END of MARKET & HIDE


	// START of ARROWCONTROL
	if (Config.get('optArrowcntrl')) {
		if (GE.Controller == "report") {
			function keyCheck(e) {
				var keyID = (window.event) ? event.keyCode : e.keyCode;
				switch(keyID) {
					case 37:
					if (prevRep != undefined) {
						window.location.href = prevRep.getAttribute("href");
					}
					break;
					case 39:
					if (nextRep != undefined) {
						window.location.href = nextRep.getAttribute("href");
					}
					break;
				}
			}
			var nextRep = $gc("next_report game_arrow_right")[0];
			var prevRep = $gc("last_report game_arrow_left")[0];
			window.addEventListener('keyup', keyCheck, true);
		}
	}
	// END of ARROWCONTROL


	// START of ARROWCONTROL2
	if (Config.get('optSwCitycntrl')) {
		if ($('.prev_city.game_arrow_left').length != 0) {
			function keydown(evt) {
				if (!evt)
					evt = event;
				if (evt.ctrlKey && evt.keyCode == 37) {
					window.location.href = prevCity.getAttribute("href");
				} else if (evt.ctrlKey && evt.keyCode == 39) {
					window.location.href = nextCity.getAttribute("href");
				}
			} // function keydown(evt)
			var nextCity = $gc("next_city game_arrow_right")[0];
			var prevCity = $gc("prev_city game_arrow_left")[0];
			window.addEventListener('keydown', keydown, false);
		}
	}
	// END of ARROWCONTROL2


	// START of SHOWFARMINFO on MAP
	if (Config.get('optFarmInfo')) {
		if (GE.Controller == "map") {
			setTimeout( FarmInfoInit, 250);
		};
	}
	// END of SHOWFARMINFO on MAP


	// START of ALLIANCE
	function AllianceName () {
		if (GE.Controller == "map") {
			if (uW.MapTiles.mapData != undefined) {
				var islands = uW.MapTiles.mapData.towns_cache;
				for (var i in islands) {
					var island = islands[i];
					for (var y in island) {
						if (island[y].css_class == "own_town") {
							if (island[y].alliance_name != undefined) {
								GE.Alliance_name[1] = island[y].alliance_name;
							} else {
								GE.Alliance_name[1] = L('NOALLIANCE');
							}
							GM_setValue ("Alliance_name_"+ GE.Server[1], GE.Alliance_name[1]);
							return;
						}
					}
				}
			}
		} else {
			return GE.Alliance_name[1];
		}
	}
	if (Config.get('optAlliance')) {
		function GE_AllianceName() {
			AllianceName();
			GE.Alliance_name[0] = "1";
		}
	} else if (GE.Alliance_name[1] == "") {
		AllianceName();
	}
	// END of ALLIANCE


	// START of PRODINFO
	if (Config.get('optProdinfo')) {
		function GE_ProdInfo() {
			var wrm = (((GE.Layout.storage_volume -(GE.Layout.resources.wood+GE.Layout.resources.wood_offset)) / (GE.Layout.production.wood)) * 3600);
			var strm = (((GE.Layout.storage_volume -(GE.Layout.resources.stone+GE.Layout.resources.stone_offset)) / (GE.Layout.production.stone)) * 3600);
			var sirm = (((GE.Layout.storage_volume -(GE.Layout.resources.iron+GE.Layout.resources.iron_offset)) / (GE.Layout.production.iron)) * 3600);
			var farm = (((GE.Layout.max_favor -(GE.Layout.favor)) / GE.Layout.current_god_favor_production) * 3600);

			wrm2 = ft(wrm);
			strm2 = ft(strm);
			sirm2 = ft(sirm);
			farm2 = ft(farm);
			if (wrm !== Infinity) { GE.counters["GE_wood_C"] = ["GE_wood_C", wrm]; }
			if (strm !== Infinity) { GE.counters["GE_stone_C"] = ["GE_stone_C", strm]; }
			if (sirm !== Infinity) { GE.counters["GE_silver_C"] = ["GE_silver_C", sirm]; }
			if (farm !== Infinity) { GE.counters["GE_favor_C"] = ["GE_favor_C", farm]; } else { GE.counters["GE_favor_C"] = ["GE_favor_C", 0]; farm2 = L("NOGOD"); }

			var prodinfoHTML =	'<table><tr>'+
								'	<td id="GE_wood"> '+GE.Layout.production.wood+' -<span id="GE_wood_C">'+ wrm2 +'</span> </td>'+
								'	<td id="GE_stone"> '+GE.Layout.production.stone+' -<span id="GE_stone_C">'+ strm2 +'</span> </td>'+
								'	<td id="GE_silver"> '+GE.Layout.production.iron+' -<span id="GE_silver_C">'+ sirm2 +'</span> </td>'+
								'	<td id="GE_favor"> '+GE.Layout.current_god_favor_production+' -<span id="GE_favor_C">'+ farm2 +'</span> </td>'+
								'</tr></table>';
			if ($g('GE_prodinfo')) {
				$g('GE_prodinfo').innerHTML = prodinfoHTML;
			} else {
				prodinfo = $d(prodinfoHTML,[['id', 'GE_prodinfo']]);
				$g("box").appendChild(prodinfo);
			}
			var scrPop = $sc(''+
			'$(\'#GE_wood\').mousePopup(new MousePopup("(<em>'+ L('Wood') +'/'+ L('HOUR') +'</em>, '+ L('RESCNTR') +')"));'+
			'$(\'#GE_stone\').mousePopup(new MousePopup("(<em>'+ L('Stone') +'/'+ L('HOUR') +'</em>, '+ L('RESCNTR') +')"));'+
			'$(\'#GE_silver\').mousePopup(new MousePopup("(<em>'+ L('Iron') +'/'+ L('HOUR') +'</em>, '+ L('RESCNTR') +')"));'+
			'$(\'#GE_favor\').mousePopup(new MousePopup("(<em>'+ L('Favor') +'/'+ L('HOUR') +'</em>, '+ L('RESCNTR') +')"));'+
			'', [['type', 'text/javascript']]);
			prodinfo.appendChild(scrPop);
			counters();
		}
	}
	// END of PRODINFO


	// START of USERLINKS
	if (Config.get('optUserlinks')) {
		function insertUserLinksMap() {
			if ($g('townWindow')) {
				insertUserLinks($g('townWindow'));
			}
		};
		function insertUserLinks(el) {
			var links = el.getElementsByTagName("a");
			for (i = 0; i < links.length; i++) {
				if (links[i].href.indexOf('player_id=') != -1) {
					if (links[i].parentNode.id == "GE_QuickMsg"
					|| links[i].href == "#"
					|| links[i].parentNode.id == "invitation_form"
					|| links[i].parentNode.id == "arrows_citynames"
					|| links[i].parentNode.parentNode.parentNode.id == "links"
					|| links[i].parentNode.className == "arising"
					|| links[i].parentNode.className == "running"
					|| links[i].className == "cancel") { break; }
					insertUserLink(links[i]);
				}
			}
		}
		function insertUserLink(uEl) {
			var href = uEl.href;
			var uid = gG(href)['player_id'];
			var uname = $(uEl).text();
			if ($.getUrlVar('action') == 'members_show') {uname = uname.substr(1);}
			var aPM = $f('', [['method', 'POST'], ['id', 'GE_QuickMsg'+ uid], ['class', 'frmUserLink']]);
			aPM.appendChild($i([['type', 'hidden'],['value', uname],['name', 'recipients']]));
			var aPML = $a('&nbsp;', [['onclick', "submit_form('GE_QuickMsg"+ uid +"', 'message', 'new');"],['href', jsVoid]]);
			aPML.appendChild($img([['src' ,pImage['bMsg']]]));
			aPM.appendChild(aPML);
			if (GE.Server[2] != "de") {
				var aSL = $a('&nbsp;', [['id', 'GE_ULink'+uid], ['target', '_blank'], ['href', 'http://www.grepo-world.com/statistic.php?view=player_details&land='+ GE.Server[2] +'&world='+ GE.Server[3] +'&player='+ uname +'&language='+ L('GWLanguage')]]);
			} else {
				var aSL = $a('&nbsp;', [['id', 'GE_ULink'+uid], ['target', '_blank'], ['href', 'http://de.grepostats.com/world/'+ GE.Server[2] + GE.Server[3] +'/player/'+ uid]]);
			}
			aSL.appendChild($img([['src', pImage['uLink']]]));
			aPM.appendChild(aSL);
			uEl.parentNode.insertBefore(aPM, uEl.nextSibling);
		}
		insertUserLinks(document);
	}
	// END of USERLINKS


	// START of ALLYLINKS
	if (Config.get('optAllylinks')) {
		function insertAllyLinksMap() {
			if ($g('townWindow')) {
				insertAllyLinks($g('townWindow'));
			}
		};
		function insertAllyLinks(el) {
			var links = el.getElementsByTagName("a");
			for (i=0; i<links.length; i++) {
				if (links[i].href.indexOf('alliance_id=') != -1) {
					if (links[i].href == "#" || links[i].parentNode.parentNode.parentNode.id == "links") {
						break;
					}
					insertAllyLink(links[i]);
				}
			}
		}

		function insertAllyLink(aEl) {
			var href = aEl.href;
			var aid = gG(href)['alliance_id'];
			var aname = aEl.innerHTML;
			if (GE.Server[2] != "de") {
				var aSL = $a('&nbsp;',[['id','GE_ALink'+aid],['target','_blank'],['href', 'http://www.grepo-world.com/statistic.php?view=alliance_details&land='+GE.Server[2]+'&world='+GE.Server[3]+'&alliance='+aname]]);
			} else {
				var aSL = $a('&nbsp;',[['id','GE_ALink'+aid],['target','_blank'],['href', 'http://de.grepostats.com/world/'+GE.Server[1]+'/alliance/'+aid]]);
			}
			aSL.appendChild($img([['src', pImage['uLink']]]));
			aEl.parentNode.insertBefore(aSL, aEl.nextSibling);
		}
		insertAllyLinks(document);
	}
	// END of ALLYLINKS


	// START of BUILDINGPOINTS
	if (Config.get('optBuildingpnts')) {
		var grepoPoints = (function () {
			var buildingsData = {
				'main':			[110, 11, 12, 13, 15, 16, 18, 19, 22, 23, 26, 29, 31, 35, 38, 41, 46, 51, 56, 61, 67, 74, 81, 90, 98],
				'lumber':		[22, 2, 3, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 13, 13, 15, 16, 18, 20, 21, 24, 26, 29, 32, 35, 38, 43, 46, 51, 56, 62, 68, 75, 82],
				'farm':			[17, 2, 2, 3, 2, 4, 3, 4, 5, 5, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 17, 20, 21, 25, 27, 31, 34, 38, 43, 48, 54, 61, 67, 76, 85, 95, 106, 120, 133, 150],
				'stoner':		[22, 2, 3, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 13, 13, 15, 16, 18, 20, 21, 24, 26, 29, 32, 35, 38, 43, 46, 51, 56, 62, 68, 75, 82],
				'storage':		[15, 2, 2, 3, 3, 4, 4, 4, 5, 6, 7, 8, 8, 10, 12, 13, 15, 16, 20, 22, 25, 28, 33, 37, 42, 48, 55, 63, 71, 81],
				'ironer':		[22, 2, 3, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 13, 13, 15, 16, 18, 20, 21, 24, 26, 29, 32, 35, 38, 43, 46, 51, 56, 62, 68, 75, 82],
				'barracks':		[33, 4, 5, 4, 6, 6, 6, 8, 8, 9, 10, 12, 13, 14, 16, 17, 20, 22, 24, 28, 30, 34, 38, 42, 47, 52, 59, 65, 73, 81],
				'wall':			[34, 4, 4, 5, 6, 6, 7, 8, 9, 10, 11, 13, 14, 16, 17, 20, 22, 25, 27, 31, 35, 39, 44, 48, 55],
				'hide':			[60, 12, 14, 18, 20, 25, 30, 36, 43, 52],
				'docks':		[66, 7, 7, 8, 9, 9, 11, 12, 12, 15, 15, 17, 19, 21, 23, 25, 27, 31, 33, 37, 40, 44, 49, 54, 59, 65, 72, 78, 87, 95],
				'academy':		[67, 8, 9, 10, 12, 12, 15, 16, 17, 20, 23, 25, 28, 31, 35, 40, 44, 49, 56, 62, 69, 78, 87, 98, 109, 122, 137, 154, 172, 193],
				'temple':		[216, 17, 19, 20, 22, 23, 26, 27, 30, 32, 34, 38, 40, 43, 47, 51, 55, 59, 64, 69, 75, 80, 87, 94, 102],
				'market':		[108, 9, 9, 10, 11, 12, 12, 14, 15, 16, 17, 19, 20, 22, 23, 26, 27, 30, 32, 34, 37, 41, 43, 47, 51, 55, 59, 64, 69, 74],
				'place':		[33],
				'theater':		[500],
				'lighthouse':	[500],
				'library':		[500],
				'thermal':		[500],
				'tower':		[500],
				'statue':		[500],
				'oracle':		[500],
				'trade_office':	[500]
			};
			var populationData = {
				'main':			[2,2,2,3,3,4,4,4,4,5,4,6,5,5,6,6,6,6,7,6,7,7,7,8,7],
				'lumber':		[1,1,2,2,1,2,2,2,3,2,2,2,3,2,3,2,3,2,3,2,3,3,2,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,4],
				'farm':			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				'stoner':		[1,1,2,2,1,2,2,2,3,2,2,2,3,2,3,2,3,2,3,2,3,3,2,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,4],
				'storage':		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				'ironer':		[1,1,2,2,1,2,2,2,3,2,2,2,3,2,3,2,3,2,3,2,3,3,2,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,4],
				'barracks':		[1,1,2,2,2,2,3,2,2,3,3,2,3,3,3,3,3,3,3,3,3,4,3,3,4,3,4,3,4,3],
				'wall':			[2,2,3,3,3,3,3,3,4,3,3,4,3,4,3,4,3,4,4,4,3,4,4,4,4],
				'hide':			[3,1,1,1,1,0,1,0,1,0],
				'docks':		[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
				'academy':		[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
				'temple':		[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
				'market':		[2,2,3,2,3,2,3,3,2,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
				'place':		[0],
				'theater':		[60],
				'lighthouse':	[60],
				'library':		[60],
				'thermal':		[60],
				'tower':		[60],
				'statue':		[60],
				'oracle':		[60],
				'trade_office':	[60]
			};
			var allpoints = 0, allpop = 0;
			var allpointswQ = 0, allpopwQ = 0;
			var xpoints = 0, xpop = 0;
			var levels = Object.create(buildingsData);
			var levelsQueue = Object.create(buildingsData);
			var initStyle = function () {
				var style = [];
				style.push('span.building_points {font-size: 9px}');
				style.push('span.tear_down_points {font-size: 9px}');
				style.push('span.building_points_block {display:block; position:absolute; bottom:2px; right:3px; z-index:5; color:#ffffff; text-shadow:1px 1px #000000; font-size: 10px; font-weight: bold;}');
				$('<style type="text/css">' + style.join("\n") + '</style>').appendTo('head');
			}
			var getUpgradeBuildingHTMLPart_old;
			var getUpgradeBuildingHTMLPart_new = function(building) {
				var ret = getUpgradeBuildingHTMLPart_old.apply(window, arguments);
				var	name = building.controller.replace(/^building_(.*)$/, '$1');
				var	level = levels[name];
				var levelQueue = levelsQueue[name];
				var points = 0, pop = 0;
				if (typeof level === 'number' && typeof levelQueue === 'number') {
					for (var i = 0; i < level && typeof buildingsData[name][i] === 'number'; i++) {
						points += buildingsData[name][i];
						pop += populationData[name][i];
						if (buildingsData[name][i] == 500) { xpoints += 500; xpop += 60;}
					}
					ret += points + ' '+ L('POINTS') +' ';
					allpoints += points; 
					allpop += pop; 
					if (level !== levelQueue){
						for (var i = level; i < levelQueue && typeof buildingsData[name][i] === 'number'; i++) {
							points += buildingsData[name][i];
							pop += populationData[name][i];
							allpointswQ += buildingsData[name][i];
							allpopwQ += populationData[name][i];
						}
						ret += '('+ points +' '+ L('POINTS') +' '+ L('WITHQUEUE') +') ';
					}
					for (var i = levelQueue; typeof buildingsData[name][i] === 'number'; i++) {
						points += buildingsData[name][i];
						pop += populationData[name][i];
					}
					ret += ' '+ L('OFMAX') +' '+ points + '.<br>';
					ret += L('LEVEL') +' '+ level;
					if (level !== levelQueue){
						ret += ' (' + levelQueue +' '+ L('WITHQUEUE') +') ';
					}
					ret += ' '+ L('OFMAX') +' '+ buildingsData[name].length +'. ';
					return ret;
				} else {
					return ret;
				}
			}

			var addPoints = (function () {
				var examineQueue = function (name, level, val) {
					$('.main_tasks_image').each(function () {
						if ($(this).css('backgroundImage').replace(/.*\/([^.]+)\.png.*/, '$1') === name) {
							$(this).append(
								'<span class="building_points_block">' + (val[level] !== undefined ? val[level] : '?') + 'p<\/span>'
							);
						level++;
						}
					});
					return level;
				};

				return function () {
					if (!$('#building_main_main').hasClass('building_grepoPoints')){
						$('#building_main_main').addClass('building_grepoPoints')
						var b, level;
						$.each(buildingsData, function (key, val) {
							b = $('#building_main_' + key);
							if (b.length > 0) {
								level = parseInt($('.level', b).eq(0).text(), 10);
								if (!isNaN(level)) {
									levels[key] = level;
									level = examineQueue(key, level, val);
									levelsQueue[key] = level;
									if (level < val.length) {
										$('.name', b).append('<span class="building_points"> ' + (val[level] !== undefined ? val[level] : '?') + 'p</span>');
									}
									if ($('.tear_down', b)) {
										if (level - 1 >= 0) {
											$('.tear_down', b).append('<span class="tear_down_points"> -' + (val[level - 1] !== undefined ? val[level - 1] : '?') + 'p</span>');
										}
									}
								}
							} else {
								b = $('#special_building_' + key);
								if (b.length > 0) {
									levels[key] = 0;
									level = examineQueue(key, 0, val);
									levelsQueue[key] = level;
									b.append('<span class="building_points_block">' + (val[0] !== undefined ? val[0] : '?') + 'p</span>');
								}
							}			
						});
						uW.buildingMousePopup();
						// container for points --- (todo: xpoints wegen doppeltem Durchlauf bei Sondergebäuden)
						var apQ = ""+ (allpoints - (xpoints / 2)) +" ";
						var apopQ = ""+ (allpop - (xpop / 2)) +" ";
						if (allpointswQ > 0) {
							apQ += " + "+ allpointswQ +" ";
							apopQ = ""+ ((allpop - (xpop / 2)) + allpopwQ);
						}
						var parent = $(""+
							"<li id='allpoints' class='building_points' style='float:right;margin:15px 12px;'><a class='submenu_link' href='#'><span class='left' style='border-left: 1px solid #000000; border-top: 1px solid #000000;'><span class='right'>"+
							"<span class='middle'>"+'<b>'+ L('ALLPOP') +": "+ apopQ +' / '+ L('ALLPOINTS') +": "+ apQ +'</b>'+"</span></span></span></a></li>");
						parent.appendTo( $('.menu_inner ul')[0]);
					}
				};
			}());
			return function () {
				if (document.URL.indexOf('game/building_main') !== -1) {
					initStyle();
					$('*').ajaxComplete(function () {
						addPoints();
					});
					getUpgradeBuildingHTMLPart_old = uW.getUpgradeBuildingHTMLPart;
					uW.getUpgradeBuildingHTMLPart = getUpgradeBuildingHTMLPart_new;
					addPoints();
				}
			};
		}());

		function GE_Builds() {
			if (GE.Controller == 'building_main' ) {
				grepoPoints();
			}
		}
	}
	// END of BUILDINGPOINTS


	// START of CR FORMATTER and REPORTRESCALC
	if ( (Config.get('optFormatter') || Config.get('optRepRes')) && (GE.Controller == "report") ) {
		var aTown, aTownId, aPlayer, aAlly, GE_AP;
		var dTown, dTownId, dPlayer, dAlly, GE_DP;
		var aaTown, aaPlayer, ddTown, ddPlayer, aaAlly, ddAlly;
		var rTitle = "";
		var conquest = false;
		function GE_Report_Participants() {
			tName = []; tId = []; tOwner = []; tOwnerA = [];
			if ($g('report_report_header') != undefined) {
				rTitle = $.trim($g('report_report_header').firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nodeValue);
				if ((rTitle.search(/besetzte/) != -1) || (rTitle.search(/Besetzer/) != -1)) {
					conquest = true;  // german only
				} else if (rTitle.search(/fordert Rohstoffe/) != -1) {
					conquest = "Cancel"; return;
				}
			} else {
				conquest = "Cancel"; return;
			}
			for (var c = 0; c < document.getElementsByTagName('li').length; c++) {
				if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_name') {
					if (document.getElementsByTagName('li')[c].innerHTML.match("<a href")) {
						var townVar = "";
						if (document.getElementsByTagName('li')[c].getElementsByTagName('a')[0] != undefined) {
							townVar = uW.document.getElementsByTagName('li')[c].getElementsByTagName('a')[0].onclick;
							townVar = townVar.toString();
							tId.push(townVar.split("target_town_id=")[1].split("&")[0]);
						}
					}
				}
				if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_name') {
					if (document.getElementsByTagName('li')[c].getElementsByTagName('a')[0] != undefined) {
						tName.push(document.getElementsByTagName('li')[c].getElementsByTagName('a')[0].innerHTML);
					}
				}
				if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_owner') {
					if (document.getElementsByTagName('li')[c].innerHTML.match(">")) tOwner.push(document.getElementsByTagName('li')[c].innerHTML.split(">")[1].split("<")[0]);
				}
				if (document.getElementsByTagName('li')[c].getAttribute('class')=='town_owner_ally') {
					if (document.getElementsByTagName('li')[c].innerHTML.match(">")) tOwnerA.push(document.getElementsByTagName('li')[c].innerHTML.split(">")[1].split("<")[0]);
				}
			}
			aTown = tName[0]; aTownId = tId[0]; aPlayer = tOwner[0]; aAlly = tOwnerA[0];
			dTown = tName[1]; dTownId = tId[1]; dPlayer = tOwner[1]; dAlly = tOwnerA[1];
		}

		function GE_Report_Format(el) {
			GE_Report_Participants();
			if ( conquest == "Cancel") return;
			el = $g(el);
			if ($g('payed_iron')) {
				if ($g('menu_inner_subject_container')) {
					msgb = $g('report_date').parentNode;
					aubb = $a('', [['href', jsVoid], ['class', 'crButton'], ['id', 'UBBC']]);
					aubb.addEventListener('click',GE_Report_UBB_Spy,false);
					aubb.appendChild($s(L('UBBC'),[]));
					msgb.appendChild(aubb);
					aubb2 = $a('', [['href', jsVoid], ['class', 'crButton'], ['id', 'TXTC']]);
					aubb2.addEventListener('click', GE_Report_TXT_Spy, false);
					aubb2.appendChild($s(L('TXTC'), []));
					msgb.appendChild(aubb2);
				}
			} else if ($g('resources')) {
				if (!($g('trade_report_container')) || !($g('report_power_symbol')) ) {
					var nodes = el.getElementsByClassName(  "report_units report_side_attacker"  );
					if ( (!nodes) || nodes.length == 0 ) {
						var AWood = 0; var AStone = 0; var ASilver = 0; var AFP = 0; var AFavor = 0;
					} else {
						var node = nodes[0];
						var AWood = 0; var AStone = 0; var ASilver = 0; var AFP = 0; var AFavor = 0;
						var units = node.getElementsByClassName("report_unit");
						for (var i=0 ; i<units.length ; i++) {
							var unit = units[i];
							var type = unit.className.replace("report_unit report_side_attacker unit_",'');
							var countel = unit.parentNode.getElementsByClassName("report_losts")[0];
							var count = -parseInt( countel.innerHTML, 10 );
							var uc = unitCosts[type];
							if ( uc ) {
								AWood += count * uc[0];
								AStone += count * uc[1];
								ASilver += count * uc[2];
								AFP += count * uc[3];
								AFavor += count * uc[4];
								GE_AP = AFP;
							}
						}
					}
					var nodes = el.getElementsByClassName( "report_units report_side_defender" );
					if ( (!nodes) || nodes.length === 0 ) {
						var DWood = 0; var DStone = 0; var DSilver = 0; var DFP = 0; var DFavor = 0;
					} else {
						var node = nodes[0];
						var DWood = 0; var DStone = 0; var DSilver = 0; var DFP = 0; var DFavor = 0;
						var units = node.getElementsByClassName("report_unit");
						for (var i=0 ; i<units.length ; i++) {
							var unit = units[i];
							var type = unit.className.replace("report_unit report_side_defender unit_",'');
							var countel = unit.parentNode.getElementsByClassName("report_losts")[0];
							var count = -parseInt( countel.innerHTML, 10 );
							var uc = unitCosts[ type ];
							if ( uc ) {
								DWood += count * uc[0]; DStone += count * uc[1]; DSilver += count * uc[2]; DFP += count * uc[3]; DFavor += count * uc[4];
								GE_DP = DFP;
							}
						}
					}
					if (GE_AP === undefined) {
						GE_AP = 0;
					}
					if (GE_DP === undefined) {
						GE_DP = 0;
					}
						// Report ResCalc
					if (Config.get('optRepRes')) {
						var RI = $d('',[['id','GE_Stats_Tbl']]);
						var scrPop = $sc(''+
						'$(\'.attackr\').mousePopup(new MousePopup("'+ L('ATTACKR') +'"));'+
						'$(\'.defendr\').mousePopup(new MousePopup("'+ L('DEFENDR') +'"));'+
						'$(\'#AFP\').mousePopup(new MousePopup("'+ L('BPNTS') +' '+ L('DEFENDR') +'"));'+
						'$(\'#DFP\').mousePopup(new MousePopup("'+ L('BPNTS') +' '+ L('ATTACKR') +'"));'+
						'',[['type','text/javascript']]);
						RI.appendChild(scrPop);
						var minwidth = "min-width:50px;"; if (AFavor + DFavor > 0) minwidth = "min-width:36px;";
						var tbl = $t([]);
							row = $r([]);
							row.appendChild($hc('', [['style', 'min-width:18px;']]));
							row.appendChild($hc('<img alt="'+ L('Wood')+ '" src=' + pImage.iconWd  + '>', [['style', minwidth]]));
							row.appendChild($hc('<img alt="'+ L('Stone')+ '" src=' + pImage.iconStn + '>', [['style', minwidth]]));
							row.appendChild($hc('<img alt="'+ L('Iron')+ '" src=' + pImage.iconSil+ '>', [['style', minwidth]]));
							if (AFavor + DFavor > 0) {
								row.appendChild($hc('<img alt="'+L('Favor')+'" src=' + pImage.iconFavor + '>', [['style', minwidth]]));
							}
							row.appendChild($hc('<img alt="'+ L('BH') +'" src="http://static.grepolis.com/images/game/temp/population.png">', [['style', minwidth]]));
						tbl.appendChild(row);
							row = $r([]);
							row.appendChild($c('', [['class', 'attackr']]));
							row.appendChild($c(AWood,[]));
							row.appendChild($c(AStone,[]));
							row.appendChild($c(ASilver,[]));
							if (AFavor + DFavor > 0) {
								row.appendChild($c(AFavor,[]));
							}
							row.appendChild($c(AFP,[['id', 'AFP']]));
						tbl.appendChild(row);
							row = $r([]);
							row.appendChild($c('',[['class', 'defendr']]));
							row.appendChild($c(DWood, []));
							row.appendChild($c(DStone, []));
							row.appendChild($c(DSilver, []));
							if (AFavor + DFavor > 0) {
								row.appendChild($c(DFavor, []));
							}
							row.appendChild($c(DFP,[['id', 'DFP']]));
						tbl.appendChild(row);
						RI.appendChild(tbl);
						if ($g('report_booty_bonus_fight') != null) {
							$g('report_booty_bonus_fight').appendChild(RI);
						}
					}

					if (($g('report_date')) && (Config.get('optFormatter'))) {
						msgb = $g('report_date').parentNode;
						aubb = $a('', [['href', jsVoid],['class', 'crButton'],['id', 'UBBC']]);
						aubb.addEventListener('click', GE_Report_UBB_Normal, false);
						aubb.appendChild($s(L('UBBC'), []));
						msgb.appendChild(aubb);
						aubb2 = $a('', [['href', jsVoid],['class', 'crButton'],['id', 'TXTC']]);
						aubb2.addEventListener('click', GE_Report_TXT_Normal, false);
						aubb2.appendChild($s(L('TXTC'), []));
						msgb.appendChild(aubb2);
					}
				}
			}
		}
	}

	if ( (Config.get('optFormatter')) && (GE.Controller == "report") ) {
		function GE_Report_UBB_Spy() {
			GE_Report_Participants();
			if ( conquest == "Cancel") return;
			$('#UBBC').addClass('crButtonA');
			if ($g('ReportTextArea2')) {
				$g('ReportTextArea2').style.display = 'none';
				$('#TXTC').removeClass('crButtonA');
			}
			if ($g('ReportTextArea')) {
				if ($g('ReportTextArea').style.display == "block") {
					$g('ReportTextArea').style.display = 'none';
					$('#UBBC').removeClass('crButtonA');
				} else {
					$g('ReportTextArea').style.display = 'block';
					$('#UBBC').addClass('crButtonA');
				}
				return;
			}
			var imageURL = 'http://static.grepolis.com/images/game/';
			if ($g('left_side')) {
				var ReportArea = $e("textarea");
				$at(ReportArea,[['id', 'ReportTextArea'],['onclick', 'this.select()'],['style', 'z-index: 10; position: absolute; top: 100px; left: 1px; display:block; border:0px; width:745px; height:'+($g('report_game_body').clientHeight-$g('report_header').clientHeight - 1)+'px;']]);
				$g('left_side').appendChild(ReportArea);
			}
			if ($g('report_date')) { var reportDate = $g('report_date').innerHTML; }
			var units = {};
			var buildings = {};
			for (var i in $g('left_side').getElementsByClassName('report_unit')) {
				el = $g('left_side').getElementsByClassName('report_unit')[i];
				if (el.className.indexOf("report_unit unit_") != -1) {
					units[el.className.replace("report_unit unit_","")] = el.getElementsByClassName("place_unit_black")[0].innerHTML;
				} else {
					buildings[el.id] = el.getElementsByClassName("place_unit_black")[0].innerHTML;
				}
			}
			var cost = $g('payed_iron').getElementsByTagName('span')[0].innerHTML;
			var wood = 0;var stone = 0;var silver = 0;
			if ($g('resources')) {
				var els = $g('resources').getElementsByTagName("span");
				wood = Number(els[0].innerHTML);
				stone = Number(els[1].innerHTML);
				silver = Number(els[2].innerHTML);
			}
			if (aPlayer !== undefined) { aaPlayer ='[player]'+ aPlayer +'[/player]'} else {aaPlayer = '' };
			if (dPlayer !== undefined) { ddPlayer ='[player]'+ dPlayer +'[/player]'} else {ddPlayer = '' };
			if (aTownId !== undefined) { aaTown = '[town]'+ aTownId +'[/town]'} else {aaTown = L('GHTOWN') };
			if (dTownId !== undefined) { ddTown = '[town]'+ dTownId +'[/town]'} else {ddTown = L('GHTOWN') };
			if (aAlly !== undefined) { aaAlly = '[color=#001188]'+ aAlly +'[/color]'} else {aaAlly = '' };
			if (dAlly !== undefined) { ddAlly = '[color=#001188]'+ dAlly +'[/color]'} else {ddAlly = '' };
			var UBB = "[quote]", UBB2 = "";
			var storage;
			if (buildings.toSource() != "({ })" ) {
				var element_count = 0;
				for (var i in buildings) {
					if (i == 'building_storage') { storage = buildings[i] };
					element_count++;
					UBB2 += "[img]" +imageURL+ "main/" + i.replace("building_", "") + "_50x50.png[/img][b][size=11]" + buildings[i] + "[/size][/b][color=#FFFFFF]__[/color]";
					if (element_count == 8) {
						UBB2 += "\n\n"
					}
				}
			} else {
				UBB2 += L('NON')+"\n";
			}
			storage *= 100;
			var wo_s, st_s, si_s;
			if ((wood - storage) <= 0) {wo_s = "0"; } else { wo_s = "[color=#006600]"+ (wood - storage) +"[/color]";}
			if ((stone -storage) <= 0) {st_s = "0"; } else { st_s = "[color=#006600]"+ (stone - storage) +"[/color]";}
			if ((silver-storage) <= 0) {si_s = "0"; } else { si_s = "[color=#006600]"+ (silver - storage) +"[/color]";}

			UBB += "[quote][size=11][b] "+ L('SPYTITLE') +" [/b][/size][size=8][color=#FFFFFF]______________________________________________________[/color][/size]";
			UBB += "[size=8][b]"+L('REPTIME')+": [/b][/size][size=9][i]"+ reportDate +"[/i] [/size]"
			if (conquest){
				UBB += "\n\n[size=9][b] "+ rTitle +" [/b][/size]";
			}
			UBB += " \n\n[b][size=8]"+ L('ATTACKR') +":[/size] [size=10]"+ aaPlayer +"  ("+ aaTown +") "+ aaAlly +" ";
			UBB += " \n[size=8]"+ L('SPY') +" :[/size] [size=10]"+ ddPlayer +"  ("+ ddTown +") "+ ddAlly +"[/size][/b] ";
			UBB += "\n[size=8]_____________________________________________________________________________________________[/size]";
			UBB += "\n\n [size=8][b]"+L('SPYCOST')+": [/b][/size][size=9][b]"+ cost +"[/b] [/size]";
			UBB += " \n\n[b][size=8]"+L('RESOURCES2')+":[/size][/b] [color=#FFFFFF]___[/color][img]"+ pImage['iconWood'] +"[/img][size=9][b] "+ wood +" ("+ wo_s +")[/b][/size] ";
			UBB += "[color=#FFFFFF]___[/color][img]"+ pImage['iconStone'] +"[/img][size=9][b] "+ stone +" ("+ st_s +")[/b][/size] ";
			UBB += "[color=#FFFFFF]___[/color][img]"+ pImage['iconSilver'] +"[/img][size=9][b] "+ silver +" ("+ si_s +")[/b][/size]";
			UBB += "\n[size=8]_____________________________________________________________________________________________[/size]";
			UBB += "\n\n[size=8][b]"+L('UNITS') +": [/b][/size]\n";
			if (units.toSource() != "({ })") {
				var element_count = 0;
				for (var i in units) {
					element_count++;
					UBB += " [img]" +imageURL+ "units/" + i + "_40x40.png[/img][b][size=11]" + units[i] + "[/size][/b][color=#FFFFFF]__[/color]";
					if (element_count == 8) {
						UBB += " \n\n"
					}
				}
			} else {
				UBB += L('NON')+"\n";
			}
			UBB += "\n\n[size=8][b] "+ L('BUILDINGS') +": [/b]\n"+ UBB2 ;
			UBB += "\n[/quote][/quote]";
			$g('ReportTextArea').innerHTML = UBB;
		}

		function GE_Report_TXT_Spy() {
			GE_Report_Participants();
			if ( conquest == "Cancel") return;
			$('#TXTC').addClass('crButtonA');
			if ($g('ReportTextArea')) {
				$g('ReportTextArea').style.display = 'none';
				$('#UBBC').removeClass('crButtonA');
			}
			if ($g('ReportTextArea2')) {
				if ($g('ReportTextArea2').style.display == "block") {
					$g('ReportTextArea2').style.display = 'none';
					$('#TXTC').removeClass('crButtonA');
				} else {
					$g('ReportTextArea2').style.display = 'block';
					$('#TXTC').addClass('crButtonA');
				}
				return;
			}
			if ($g('left_side')) {
				var ReportArea = $e("textarea");
				$at(ReportArea,[['id', 'ReportTextArea2'],['onclick', 'this.select()'],['style', 'z-index: 10; position: absolute; top: 100px; left: 1px; display:block; border:0px; width:745px; height:'+($g('report_game_body').clientHeight-$g('report_header').clientHeight - 1)+'px;']]);
				$g('left_side').appendChild(ReportArea);
			}
			if ($g('report_date')) { var reportDate = $g('report_date').innerHTML; }
			var units = {};
			var buildings = {};
			for (var i in $g('left_side').getElementsByClassName('report_unit')) {
				el = $g('left_side').getElementsByClassName('report_unit')[i];
				if (el.className.indexOf("report_unit unit_") != -1) {
					units[el.className.replace("report_unit unit_","")] = el.getElementsByClassName("place_unit_black")[0].innerHTML;
				} else {
					buildings[el.id] = el.getElementsByClassName("place_unit_black")[0].innerHTML;
				}
			}
			var cost = $g('payed_iron').getElementsByTagName('span')[0].innerHTML;
			var wood = 0; var stone = 0; var silver = 0;
			if ($g('resources')) {
				var els = $g('resources').getElementsByTagName("span");
				wood = Number(els[0].innerHTML);
				stone = Number(els[1].innerHTML);
				silver = Number(els[2].innerHTML);
			}
			var UBB = "";
			UBB += aPlayer+"  ("+aTown+") "+L('SPY')+" "+dPlayer+" ("+dTown+") @ "+reportDate+"\n";
			if (conquest){
				UBB += rTitle +"\n";
			}
			UBB += ""+L('SPYCOST')+": "+cost+" &mdash; "+L('RESOURCES')+": "+L('Wood')+": "+wood+", "+L('Stone')+": "+stone+", "+L('Iron')+": "+silver+"\n";
			UBB += L('UNITS') +" &mdash; ";
			if (units.toSource() != "({ })" ) { for (var i in units) { UBB += unitCosts[i][6]+": "+units[i] + ", "; }} else { UBB += L('NON')+"\n";}
			UBB += "\n"+L('BUILDINGS') +" &mdash; ";
			if (buildings.toSource() != "({ })" ) { for (var i in buildings) { UBB += GE.buildingStats[i.replace("building_","")][0]+": "+buildings[i] + ", "; }} else { UBB += L('NON');}
			$g('ReportTextArea2').innerHTML = UBB;
		}

		function GE_Report_UBB_Normal() {
			GE_Report_Participants();
			if ( conquest == "Cancel") return;
			$('#UBBC').addClass('crButtonA');
			if ($g('ReportTextArea2')) {
				$g('ReportTextArea2').style.display = 'none';
				$('#TXTC').removeClass('crButtonA');
			}
			if ($g('ReportTextArea')) {
				if ($g('ReportTextArea').style.display == "block") {
					$g('ReportTextArea').style.display = 'none';
					$('#UBBC').removeClass('crButtonA');
				} else {
					$g('ReportTextArea').style.display = 'block';
					$('#UBBC').addClass('crButtonA');
				}
				return;
			}
			for(var c = 0; c < document.getElementsByTagName('div').length; c++) {
				if (document.getElementsByTagName('div')[c].getAttribute('class')=='report_units_overview') {
					var ReportFormat=document.getElementsByTagName('div')[c];
					break;
				}
			}
			if (ReportFormat) {
				var ReportArea = document.createElement("textarea");
				$at(ReportArea,[['id', 'ReportTextArea'],['onclick', 'this.select()'],['style', 'z-index: 10; position: absolute; top: 100px; left: 1px; display:block; border:0px; width:745px; height:'+($g('report_game_body').clientHeight-$g('report_header').clientHeight - 1)+'px;']]);
				ReportFormat.appendChild(ReportArea);
			}
			var output="[quote]";
			//General
				var imageURL = 'http://static.grepolis.com/images/game/units/';
				if ($g('report_date')) {
					var reportDate = $g('report_date').innerHTML;
					reportDate = "[i]"+ reportDate +"[/i]";
				}
				if (aPlayer !== undefined) { aaPlayer ='[player]'+ aPlayer +'[/player]'} else {aaPlayer = '' };
				if (dPlayer !== undefined) { ddPlayer ='[player]'+ dPlayer +'[/player]'} else {ddPlayer = '' };
				if (aTownId !== undefined) { aaTown = '[town]'+ aTownId +'[/town]'} else {aaTown = L('GHTOWN') };
				if (dTownId !== undefined) { ddTown = '[town]'+ dTownId +'[/town]'} else {ddTown = L('GHTOWN') };
				if (aAlly !== undefined) { aaAlly = '[color=#001188]'+ aAlly +'[/color]'} else {aaAlly = '' };
				if (dAlly !== undefined) { ddAlly = '[color=#001188]'+ dAlly +'[/color]'} else {ddAlly = '' };
				output += "[quote][size=11][b] "+ L('REPTITLE') +" [/b][/size][size=8][color=#FFFFFF]_______________________________________________[/color][/size]";
				output += "[size=8][b]"+L('REPTIME')+": [/b][/size][size=9][i]"+ reportDate +"[/i] [/size]"
				if (conquest) {
					output += "\n\n[size=9][b] "+ rTitle +" [/b][/size]";
				}
				output += " \n\n[b][size=8]"+ L('ATTACKR') +":[/size] [size=10]"+ aaPlayer +"  ("+ aaTown +") "+ aaAlly +" [/size]";
				output += " \n[size=8]"+ L('DEFENDR') +":[/size] [size=10]"+ ddPlayer +"  ("+ ddTown +") "+ ddAlly +"[/size][/b][size=13][color=#FFFFFF]|[/color][/size] ";
				output += "\n[size=8]_____________________________________________________________________________________[/size]\n\n";
			//Resources
				var morale = $.trim($('.morale').text());
				if (morale.length = 0) {
					morale = 0;
				} else {
					while (isNaN(parseInt(morale, 10))) {
						if (morale.length < 1) break;
						morale = morale.substr(1);
					}
					morale = parseInt(morale, 10);
				}
				var luck = $.trim($('.luck').text());
				if (luck.length = 0) {
					luck = 0;
				} else {
					while (isNaN(parseInt(luck, 10))) {
						if (luck.length < 1) break;
						luck = luck.substr(1);
					}
					luck = parseInt(luck, 10);
				}
				var nightbonus = $.trim($('.nightbonus').text());
				var wall = $.trim($('.oldwall').text());
				var wall2 = 0;
				if (wall.length < 5) {
					wall = 0;
				} else {
					while (isNaN(parseInt(wall, 10))) {
						if (wall.length < 1) break;
						wall = wall.substr(1);
					}
					wall2 = wall;
					wall = parseInt(wall, 10);
					wall2 = wall2.substr(String(wall).length+1);
					while (isNaN(parseInt(wall2, 10))) {
						if (wall2.length < 1) break;
						wall2 = wall2.substr(1);
					}
					wall2 = parseInt(wall2, 10);
				}
			// Output
				output += "[size=8][b]"+ L('CITB') +": [/b][/size] ";
				output += "[size=8][color=#FFFFFF]__[/color]"+ L('MORALE') +":[/size] ";
				if (morale > 90) {
					output += "[size=9][b][color=#007700]"+ morale +"%[/color][/b][/size] ";
				} else if (morale > 80){
					output += "[size=9][b]"+ morale +"%[/b][/size]";
				} else {
					output += "[size=9][b][color=#990000]"+ morale +"%[/color][/b][/size] ";
				}
				output += "[size=8][color=#FFFFFF]__[/color]"+ L('LUCK') +":[/size] ";
				if (luck > 9) {
					output += "[size=9][b][color=#007700]"+ luck +"%[/color][/b][/size] ";
				} else if (luck > -5){
					output += "[size=9][b]"+ luck +"%[/b][/size]";
				} else {
					output += "[size=9][b][color=#990000]"+ luck +"%[/color][/b][/size] ";
				}
				if (nightbonus.length > 0){
					output += "[size=8][color=#FFFFFF]__[/color]"+ L('NBONUS') +":[/size][size=9][b][color=#990000] 100% [/color][/b][/size] ";
				}
				output += "\n\n";
				var res=[];
				res['total'] = $('#load').html();
				res['wood'] = $('.wood_img').siblings('span').html();
				res['stone'] = $('.stone_img').siblings('span').html();
				res['iron'] = $('.iron_img').siblings('span').html();
				if (res['total'] !== null) {
					output += "[size=8][b]"+ res['total'] +"[/b] [/size][size=9][color=#FFFFFF]___[/color]";
					output += "[img]"+ pImage['iconWood'] +"[/img] [b]"+ res['wood'] +"[/b][color=#FFFFFF]___[/color]";
					output += "[img]"+ pImage['iconStone'] +"[/img] [b]"+ res['stone'] +"[/b][color=#FFFFFF]___[/color]";
					output += "[img]"+ pImage['iconSilver'] +"[/img] [b]"+ res['iron'] +"[/b][/size]";
				} else {
					output += "[size=8][b]"+ L('LOOT') +":[/b][color=#FFFFFF]__[/color][/size][size=9]"+ L('NOLOOT') +"[/size]";
				}
				output += "\n[size=8]_____________________________________________________________________________________[/size]";

			//Attacker Units
				output += "\n\n[b][size=8]"+L('ATTACKR')+":[/size][/b] [size=8][color=#FFFFFF]____________________[/color][/size]";
				output += "[b][size=8]"+ L('BPNTS') +":[/size][/b][size=9] [b]"+ GE_DP +"[/b][/size] \n\n";
				var gt_apower = [];
				if ($('.report_units .report_power') != undefined) {
					gt_apower = $('.report_units .report_power');
				}
				var element_count = 0;
				if (gt_apower[0] != undefined) {
					element_count++;
					output += "[img]"+ pImage[gt_apower[0].id] +"[/img][color=#FFFFFF]____[/color] ";
				}

				var gt_aunits=[];
				for (var aU = 0; aU < $gc('report_side_attacker_unit').length; aU++) {
					for (var uArr in unitCosts) {
						gt_aunits[uArr] = $('.report_side_attacker .unit_'+ uArr).children('.place_unit_black').html();
						gt_aunits[uArr+'-l'] = $('.report_side_attacker .unit_'+ uArr).siblings('span').html();
					}
				}
			// Output
				for (var uArr in unitCosts) {
					if (gt_aunits[uArr] != null) {
						element_count++;
						if (gt_aunits[uArr + '-l'] == "-0") {
							output += "[img]"+ imageURL + uArr +"_40x40.png[/img] [size=9]"+ gt_aunits[uArr] +"[/size][color=#FFFFFF]__[/color]";
						} else {
							output += "[img]"+ imageURL + uArr +"_40x40.png[/img] [size=9]"+ gt_aunits[uArr] +" ([color=#AA0000]"+ gt_aunits[uArr +'-l'] +"[/color])[/size][color=#FFFFFF]__[/color]";
						}
						if (element_count == 6) {
							element_count = 0;
							output += "\n\n"
						}
					}
				}
			//Defender Units
				var gt_dunits = [];
				gt_dunits['unkown'] = 0;
				for (var dU = 0; dU < $gc('report_side_defender_unit').length; dU++) {
					if ($('.report_side_defender_unit .report_unit')[dU].id == "unknown") {
						gt_dunits['unkown'] += 1;
						gt_dunits['unkown-l'] = "-?";
					} else {
						for (var uArr in unitCosts) {
							if (uArr != 'unkown') {
								gt_dunits[uArr] = $('.report_side_defender .unit_'+uArr).children('.place_unit_black').html();
								gt_dunits[uArr + '-l'] = $('.report_side_defender .unit_'+uArr).siblings('span').html();
							}
						}
					}
				}
			// Output
				output += "\n\n\n[b][size=8]"+L('DEFENDR')+":[/size][/b] [size=8][color=#FFFFFF]___________________[/color][/size]";
				output += "[b][size=8]"+ L('BPNTS') +":[/size][/b][size=9] [b]"+ GE_AP +"[/b][/size] ";
				if (wall !== 0) {output += " [size=8][color=#FFFFFF]__________________[/color][b]"+ L('WALL') +"[/b]: [/size][b][size=9]"+ wall +"[/size][/b]";}
				if (wall2 !== 0) { output += " [b][size=9]([color=#AA0000]"+ (wall2) +"[/color])[/size][/b]" ;}
				else if (wall + wall2 == 0)  {output += " [size=8][color=#FFFFFF]__________________[/color][b]"+ L('NOWALL') +"[/b][/size]";}
				output += "\n\n";

				var uOutput = "";
				element_count = 0;
				var troup_count = 0;
				for (var uArr in unitCosts) {
					if (gt_dunits[uArr] != null) {
						element_count++;
						if (uArr != "unkown") {
							troup_count++;
							if (gt_dunits[uArr + '-l'] == "-0") {
								uOutput += "[img]"+ imageURL + uArr +"_40x40.png[/img] [size=9]"+ gt_dunits[uArr] +"[/size][color=#FFFFFF]__[/color]";
							} else {
								uOutput += "[img]"+ imageURL + uArr +"_40x40.png[/img] [size=9]"+ gt_dunits[uArr] +" ([color=#AA0000]"+ gt_dunits[uArr + '-l'] +"[/color])[/size][color=#FFFFFF]__[/color]";
							}
						} else {
							for ( i=0; i < gt_dunits['unkown']; i++) {
								uOutput += "[img]"+ imageURL + "unkown" +"_40x40.png[/img] [size=9] ([color=#ff0000]"+ gt_dunits[uArr + '-l'] +"[/color])[/size][color=#FFFFFF]__[/color]";
							}
						}
						if (element_count == 6) {
							element_count = 0;
							uOutput += "\n\n"
						}
					}
				}
				if (uOutput !== "")  { output += uOutput;}
				if ((troup_count == 0) && (gt_dunits['unkown'] > 0)) {output += "\n\n[size=9][b][color=#DD0000]"+ L('NON2') +"[/color][/b][/size]";}
				else if (uOutput == "") {output += "\n[size=9]"+ L('NON') +"[/size]";}
				else if ((troup_count > 0) && (gt_dunits['unkown'] == 1)) {output += "\n\n[size=9]"+ L('NON3') +"[/size]";}
			output += "[/quote][/quote]";
			if ($g('ReportTextArea')) {
				$g('ReportTextArea').innerHTML = output;
			}
		}

		function GE_Report_TXT_Normal() {
			GE_Report_Participants();
			if ( conquest == "Cancel") return;
			$('#TXTC').addClass('crButtonA');
			if ($g('ReportTextArea')) {
				$g('ReportTextArea').style.display = 'none';
				$('#UBBC').removeClass('crButtonA');
			}
			if ($g('ReportTextArea2')) {
				if ($g('ReportTextArea2').style.display == "block") {
					$g('ReportTextArea2').style.display = 'none';
					$('#TXTC').removeClass('crButtonA');
				} else {
					$g('ReportTextArea2').style.display = 'block';
					$('#TXTC').addClass('crButtonA');
				}
				return;
			}
			for(var c = 0; c < document.getElementsByTagName('div').length; c++) {
				if (document.getElementsByTagName('div')[c].getAttribute('class')=='report_units_overview') {
					var ReportFormat=document.getElementsByTagName('div')[c];
					break;
				}
			}
			if (ReportFormat) {
				var ReportArea = document.createElement("textarea");
				$at(ReportArea,[['id', 'ReportTextArea2'],['onclick', 'this.select()'],['style', 'z-index: 10; position: absolute; top: 100px; left: 1px; display:block; border:0px; width:745px; height:'+($g('report_game_body').clientHeight-$g('report_header').clientHeight - 1)+'px;']]);
				ReportFormat.appendChild(ReportArea);
			}

			var output = '';
			//General
				if ($g('report_date')) { var reportDate = $g('report_date').innerHTML; }
				if (dPlayer == undefined) {
					if (dTownId == undefined) {
						output += aPlayer+'  ('+aTown+') '+L('ATK')+' '+L('GHTOWN')+' @ '+reportDate+'\n';
					} else {
						output += aPlayer+'  ('+aTown+') '+L('ATK')+' '+dTown+' ('+L('GHTOWN')+') @ '+reportDate+'\n';
					}
				} else {
					output += aPlayer+'  ('+aTown+') '+L('ATK')+' '+dPlayer+' ('+dTown+') @ '+reportDate+'\n';
				}
				if (conquest){
					output +=  rTitle +"\n";
				}
			//Resources
				var morale = $.trim($('.morale').text());
				var luck = $.trim($('.luck').text());
				var nightbonus = $.trim($('.nightbonus').text());
				output += ''+L('CITB')+': '+ morale +', '+ luck +', '+ nightbonus +'\n';
				output += ''+L('BPNTS')+' '+L('ATTACKR')+': '+ GE_DP +' \n'+ L('BPNTS') +' '+ L('DEFENDR') +': '+ GE_AP +' \n';
				var res=[];
				res['total'] = $('#load').html();
				res['wood'] = $('.wood_img').siblings('span').html();
				res['stone'] = $('.stone_img').siblings('span').html();
				res['iron'] = $('.iron_img').siblings('span').html();
				if (res['total'] !== null) {
					output += ''+res['total']+' '+L('Wood')+': '+res['wood']+', '+L('Stone')+': '+res['stone']+', '+L('Iron')+': '+res['iron']+'';
				} else { output += " "+ L('NOLOOT');}
			//Attacker Units
				output += '\n'+L('ATTACKR')+': ';
				var gt_aunits=[];
				for (var aU = 0; aU < $gc('report_side_attacker_unit').length; aU++) {
					for (var uArr in unitCosts) {
						gt_aunits[uArr] = $('.report_side_attacker .unit_'+uArr).children('.place_unit_black').html();
						gt_aunits[uArr+'-l'] = $('.report_side_attacker .unit_'+uArr).siblings('span').html();
					}
				}
				for (var uArr in unitCosts) {
					if (gt_aunits[uArr]!=null) {output += unitCosts[uArr][6]+' '+gt_aunits[uArr]+' '+gt_aunits[uArr+'-l']+', ';}
				}
			//Defender Units
				var wall = $.trim($('.oldwall').text());
				output += '\n'+L('DEFENDR')+': ';
				if (wall !== "") { output += wall;}
				var gt_dunits=[];
				for (var dU = 0; dU < $gc('report_side_defender_unit').length; dU++) {
					for (var uArr in unitCosts) {
						gt_dunits[uArr] = $('.report_side_defender .unit_'+uArr).children('.place_unit_black').html();
						gt_dunits[uArr + '-l'] = $('.report_side_defender .unit_'+uArr).siblings('span').html();
					}
				}
				var uOutput = "";
				for (var uArr in unitCosts) {
					if (gt_dunits[uArr]!=null) { uOutput += unitCosts[uArr][6]+' '+ gt_dunits[uArr] +' ('+ gt_dunits[uArr + '-l']+'), ';}
				}
				if (uOutput == "") {output += L('NON');} else { output += uOutput;}
			output += '';
			if ($g('ReportTextArea2')) {
				$g('ReportTextArea2').innerHTML = output;
			}
		}
	}

	if (Config.get('optFormatter') || Config.get('optRepRes')) {
		if ($g('report_report')) {
			GE_Report_Format("report_report");
			for(i in $g("report_report").getElementsByTagName("div")){
				if($g("report_report").getElementsByTagName("div")[i].className == 'report_fight_classic'){
					$g("report_report").getElementsByTagName("div")[i].style.display = "block";
				}
				if($g("report_report").getElementsByTagName("div")[i].className == 'report_fight_modern'){
					$g("report_report").getElementsByTagName("div")[i].style.display = "none";
				}
			}
		}
	}
	// END of FORMATTER & REPORTRESCALC


	// START of REDIRECT CLEANER
	if (Config.get('optRedirectcleaner')) {
		if (GE.Controller == "alliance" || GE.Controller == "player") {  // todo: check
			for (var i = 0; i < document.links.length; i++) {
				linkx = document.links[i];
				if (linkx.href.substring(0, 42) == "http://"+GE.Server[2]+".grepolis.com/start/redirect?url=") {
					linkx.href = decodeURIComponent(linkx.href.substring(42));
				}
			}
		}
	}
	// END of REDIRECT CLEANER


	// START of FARMER HELP
	if (Config.get('optFarmerhelp')) {
		if (GE.Controller == "map") {
			(function () {
				var grepoFarmHelper = (function () {
					//	var GameData;
					var TownInfo;
					var bindDurationCounter_old;
					var sendUnits_old;
					var init_old;
					var townId = parseInt(uW.Game.townId, 10);
					var strength_prev = 0;
					var strength_now = 0;
					var mood_now = 0;
					var moodColor = '#ffffff';
					var booty;
					var farm_str_tot;
					var r = function (n, x) {var f = Math.pow(10, x); return Math.round(n * f) / f;};
					var r2 = function (n) {return Math.round(n * 100) / 100;};
					var calcRes = function () {
						var res = 0;
						$('.unit_input_ground').each(function () {
							var uCount = parseInt($(this).val(), 10);
							if (isNaN(uCount)) { uCount = 0; }
							res += parseInt(GE.GameData.units[$(this).attr('name')].booty, 10) * uCount;
						});
						if ($('#farm_booty').is(':checked')) { res *= 1.3; }
						res = Math.floor(res);
						return res;
					};
					var handleResFarm = function () {
							var res = calcRes();
							booty = $('#farm_booty').is(':checked');
							Cookie.set("booty_" + GE.Server[1] + "_" + townId, booty);
							var percent=(strength_prev + strength_now) / 100;
							if (percent > 1){ percent = 1;}
							var maxLoot = Math.round(6005 * Math.pow( percent, Math.sqrt(2) ));
							var text = res;
							if (res > maxLoot ) {
								$('#farm_res').addClass('error');
								text = res + "/" + maxLoot;
								res = maxLoot;
							} else {
								$('#farm_res').removeClass('error');
							}
							var strength_total = (strength_prev + strength_now) / 100;
							$('#farm_res').text(text);
							$('#farm_mood_drop').text(r2( - res / (125 * strength_total)));
							$('#farm_strength_drop').text(r2( - res / (375 * strength_total)));
					};
					var handleResPlayer = function () {
							var res = calcRes();
							booty = $('#farm_booty').is(':checked');
							Cookie.set("booty_" + GE.Server[1] + "_" + townId, booty);
							$('#farm_res').text(res);
					};

					var calcStrength = function () {
							var strength = 0, strength_total = strength_prev + strength_now;
							$('.unit_input_ground').each(function () {
								var uCount = parseInt($(this).val(), 10);
								if (isNaN(uCount)) {
									uCount = 0;
								}
								strength += parseInt(GE.GameData.units[$(this).attr('name')].population, 10) * uCount / 5;
							});
							if (strength > 15) {
								$('#farm_strength').addClass('error');
								strength = 15;
							} else {
								$('#farm_strength').removeClass('error');
							}
							strength_total += strength;
							if (strength_total > 100) {
								$('#farm_strength_total').addClass('error');
								strength_total = 100;
							} else {
								$('#farm_strength_total').removeClass('error');
							}
							$('#farm_strength').text(r2(strength));
							$('#farm_strength_total').text(r2(strength_total));
							farm_str_tot = r2(strength_total);
							return strength;
					};

					var unitQuantity = function(){
							var $this = $(this);
							if ($("#attack_type_input").val() == 'farm_attack') {
								var population =  (GE.GameData.units[$this.attr('id')].population)/5;
								var missing_strength = 101 - $('#farm_strength_total').text();
								if (missing_strength > 15) missing_strength  = 15;
								var total = Math.floor(missing_strength / population);
								var maxU = $this.find("span.black").text();
								total = total > maxU ? maxU : total;
								$('#unit_type_'+$this.attr('id')).attr('value', total);
							} else if ($("#attack_type_input").val() == 'ask_farm_for_resources') {
								var booty = parseInt(GE.GameData.units[$this.attr('id')].booty, 10);
								booty = $('#farm_booty').is(':checked') ? booty *= 1.3 : booty;
								var percent=(strength_prev + strength_now) / 100;
								percent = percent > 1 ? 1 : percent;
								var res = calcRes();
								var maxLoot = Math.floor(6005 * Math.pow( percent, Math.sqrt(2) ));
								res = maxLoot - res;
								res = res < 0 ? 0:res;
								var total = Math.ceil(res / booty);
								var maxU = $this.find("span.black").text();
								total = total > maxU ? maxU : total;
								$('#unit_type_'+ $this.attr('id')).attr('value',  total);
							} else {		 // 'ask_farm_for_units'
								$('#unit_type_'+ $this.attr('id')).attr('value', $this.find("span.black").text());
							}
					};

					var calc = function () {
						handleResFarm();
						calcStrength();
					};

					var bindDurationCounter_new = function () {
						if (TownInfo.type == 'farm_town_info' && GE.Controller !== 'player') {
							if ($('#duration_container').length !== 1 || $('#attack_type').length !== 1) {
								error_log(L('GREPO_FARM_NOT_COMPATIBLE'));
								return false;
							}
							$g('send_units_form').getElementsByClassName('middle')[0].style.color = moodColor;
							if ($('#GE_FH_03').length != 0) {
								$('#GE_FH_03').text(" "+mood_now+"%");
							} else {
								$g('send_units_form').getElementsByClassName('middle')[0].innerHTML += "<span style=\"font-weight:normal;\" id=\"GE_FH_03\"> ("+mood_now+"%)</span>";
							}
							var html = '<div style="position: absolute; width: auto; right: 107px; top: 265px;" id="GE_FH_01">' +
								'<div class="farm_infos" style="background-image:url(' + pImage.booty + '); border-width:1px 0 1px 1px; padding-right:5px; width:auto;" id="farm_res_cont">' +
								'<span id="farm_res">0 </span> <label><input type="checkbox" id="farm_booty"><em> '+L('LOOT')+'</em></label></div>' +
								'<div class="farm_infos" style="background-image:url(' + pImage.mood_drop + '); float:left; width:auto; border-width:0 1px 1px;padding-right:10px;" id="farm_mood_drop">0</div>' +
								'<div class="farm_infos" style="background-image:url(' + pImage.strength_drop + '); border-width:0 0 1px; width:auto; padding-right:10px;" id="farm_strength_drop">0</div></div>' +
								'<div style="position: absolute; top: 202px; left: 373px;" id="GE_FH_02">' +
								'<div class="farm_infos" style="background-image:url(' + pImage.strength + '); margin-top:3px; border-width:1px 1px 0;" id="farm_strength">0</div>' +
								'<div class="farm_infos" style="background-image:url(' + pImage.strength_prev + '); border-width:0 1px;" id="farm_strength_prev">' + r2(strength_prev) + '</div>' +
								'<div class="farm_infos" style="background-image:url(' + pImage.strength_now + '); border-width:0 1px;" id="farm_strength_now">' + r2(strength_now) + '</div>' +
								'<div class="farm_infos" style="background-image:url(' + pImage.strength_total + '); border-width:1px; border-top-style:dashed;" id="farm_strength_total">0</div>' +
								'</div>';
							if ($('#GE_FH_01') && $('#GE_FH_02')) {
								$('#GE_FH_01').remove();
								$('#GE_FH_02').remove();
							}
							$('#units').after(html);
							if (booty) { $('#farm_booty').attr('checked', 'checked'); }
							$('#farm_res_cont').setPopup('farm_res');
							$('#farm_mood_drop').setPopup('farm_mood_drop');
							$('#farm_strength_drop').setPopup('farm_strength_drop');
							$('#farm_strength').setPopup('farm_strength');
							$('#farm_strength_prev').setPopup('farm_strength_prev');
							$('#farm_strength_now').setPopup('farm_strength_now');
							$('#farm_strength_total').setPopup('farm_strength_total');
							$('.index_unit').attr('onclick','');
							$('.index_unit').bind('click', unitQuantity);
							$('.index_unit').bind('click', calc);
							$('.unit_input').bind('keyup', calc);
							$('.ui-slider').bind('slide', calc);
							$('.unit_input').bind('onchange', calc);
							$('#farm_booty').bind('click', calc);
							calc();
							if (farm_str_tot < 100) {
								TownInfo.setAttackType('attack_type_input', 'farm_attack');
							}
						} else if (TownInfo.type == 'town_info' || GE.Controller == 'player') {
							var html = '<div class="farm_infos" style="background-image:url(' + pImage.booty + '); float:right; padding-right:77px;" id="farm_res_cont">' +
								'<span id="farm_res"></span><label><input type="checkbox" id="farm_booty"> <em>'+L('LOOT')+'</em></label></div>';
							if ($('#farm_res_cont').length != 0) {
								$('#farm_res_cont').remove();
							}
							$('#duration_container').prepend(html).width(350);
							$('#way_duration, #arrival_time').width(70);
							if (booty) { $('#farm_booty').attr('checked', 'checked'); }
							$('#farm_res_cont').setPopup('farm_res');
							$('.index_unit').bind('click', handleResPlayer);
							$('.unit_input').bind('keyup', handleResPlayer);
							$('#farm_booty').bind('click', handleResPlayer);
							$('#town_info_units a').bind('click', handleResPlayer);
						}
						return bindDurationCounter_old.apply(TownInfo, arguments);
					};

					var sendUnits_new = function () {
						if (TownInfo.type === 'farm_town_info' && $('#attack_type_input').val() === 'farm_attack') {
							strength_prev += calcStrength();
							$('#farm_strength_prev').text(r2(strength_prev));
						}
						return sendUnits_old.apply(TownInfo, arguments);
					};

					var init_new = (function() {
						var handleAjaxComplete = function () {
							uW.PopupFactory.addTexts( {
								farm_town_id: L('FARM_TOWN_ID') + "<em>[town]"+uW.TownInfo.town_id+"[/town]</em>",
								farm_res: L('FARM_RES'),
								farm_mood_drop: L('FARM_MOOD_DROP'),
								farm_strength_drop: L('FARM_STR_DROP'),
								farm_strength: L('FARM_STR'),
								farm_strength_prev: L('FARM_STR_PREV'),
								farm_strength_now: L('FARM_STR_NOW'),
								farm_strength_total: L('FARM_STR_TOTAL'),
							});
							if ($(this).find('#farmtown_strength').length === 1) {
									strength_now = parseInt($('#farmtown_strength .farm_bar_container').text(), 10);
							}
							if ($(this).find('#farmtown_mood').length === 1) {
								var moodLevel = document.getElementById("farmtown_mood").getElementsByTagName("div")[0].id;
								mood_now = parseInt($('#farmtown_mood .farm_bar_container').text(), 10);
								if (mood_now > 79) { moodColor = "#00F0B0"; }
								else if (mood_now > 74) { moodColor = "#30F030"; }
								else if (mood_now > 71) { moodColor = "#A0E010"; }
								else if (mood_now > 59) { moodColor = "#F0F000"; }
								else if (mood_now > 56) { moodColor = "#F0A000"; }
								else { moodColor = "#F82020"; };
							}
							if ($('#townWindow #towninfo_towninfo').length === 1) {
								if (userLnk == true) { insertUserLinksMap(); }
								if (allyLnk == true) { insertAllyLinksMap(); }
							}
							if (($('#townWindow #towninfo_towninfo').length === 1) && ($("#GE_TownId").length === 0)) {
								$('#townWindow #towninfo_towninfo .game_header').append("<span id=\"GE_TownId\">ID: "+uW.TownInfo.town_id+"</span>");
								$("#GE_TownId").setPopup('farm_town_id');
							}
							$('#townWindow').unbind('ajaxComplete', handleAjaxComplete);
						};

						return function (tid) {
							var r = init_old.apply(TownInfo, arguments);
							strength_prev = 0;
							$('#townWindow').ajaxComplete(handleAjaxComplete);
							return r;
						}
					}());

					return function () {
						Cookie = newCookieLib();
						if (GE.Controller == 'map' || GE.Controller == 'player') {
							TownInfo = uW.TownInfo;
							if (typeof TownInfo !== 'object'
							|| typeof TownInfo.bindDurationCounter !== 'function'
							|| typeof TownInfo.sendUnits !== 'function'
							|| typeof GE.GameData.units !== 'object') {
								error_log(L('GREPO_FARM_NOT_COMPATIBLE'));
								return false;
							}
							booty = Cookie.get("booty_" + GE.Server[1] + "_" + townId, 'false') == 'true';
							bindDurationCounter_old = TownInfo.bindDurationCounter;
							sendUnits_old =  TownInfo.sendUnits;
							init_old =  TownInfo.init;
							TownInfo.bindDurationCounter = bindDurationCounter_new;
							TownInfo.sendUnits = sendUnits_new;
							TownInfo.init = init_new;
						}
					}
				}());
				grepoFarmHelper();
			}());
		}
	}
	// END of FARMER HELP


	// START of RESOURCES at SIMULATOR and WALL
	if ((Config.get('optResCalc')) && ((GE.Controller == "building_wall") || (GE.Controller == "building_place"))) {
		ResCalc = {
			uW : null,
			$  : null,
			UnitData : {		  // Unit data from grepo version 1.07
				militia : {resources:{wood:   0,stone:   0,iron:   0},population: 0,favor:  0},
				sword   : {resources:{wood:  95,stone:   0,iron:  85},population: 1,favor:  0},
				slinger : {resources:{wood:  55,stone: 100,iron:  40},population: 1,favor:  0},
				archer  : {resources:{wood: 120,stone:   0,iron:  75},population: 1,favor:  0},
				hoplite : {resources:{wood:   0,stone:  75,iron: 150},population: 1,favor:  0},
				rider   : {resources:{wood: 240,stone: 120,iron: 360},population: 3,favor:  0},
				chariot : {resources:{wood: 200,stone: 440,iron: 320},population: 4,favor:  0},
				catapult: {resources:{wood:1200,stone:1200,iron:1200},population:15,favor:  0},
				minotaur: {resources:{wood:1400,stone: 600,iron:3100},population:30,favor:202},
				manticore:{resources:{wood:4400,stone:3000,iron:3400},population:45,favor:405},
				zyklop  : {resources:{wood:2000,stone:4200,iron:3360},population:40,favor:360},
				harpy   : {resources:{wood:1600,stone: 400,iron:1360},population:14,favor:130},
				medusa  : {resources:{wood:1500,stone:3800,iron:2200},population:18,favor:210},
				centaur : {resources:{wood:1740,stone: 300,iron: 700},population:12,favor:100},
				pegasus : {resources:{wood:2800,stone: 360,iron:  80},population:20,favor:180},
				big_transporter : {resources:{wood:  500,stone:  500,iron:  400},population:  7,favor:  0},
				bireme          : {resources:{wood:  800,stone:  700,iron:  180},population:  8,favor:  0},
				attack_ship     : {resources:{wood: 1300,stone:  300,iron:  800},population: 10,favor:  0},
				demolition_ship : {resources:{wood:  500,stone:  750,iron:  150},population:  8,favor:  0},
				small_transporter:{resources:{wood:  800,stone:    0,iron:  400},population:  5,favor:  0},
				trireme         : {resources:{wood: 2000,stone: 1300,iron:  900},population: 16,favor:  0},
				colonize_ship   : {resources:{wood:10000,stone:10000,iron:10000},population:170,favor:  0},
				sea_monster     : {resources:{wood: 5400,stone: 2800,iron: 3800},population: 50,favor:400}
			},
			server	: "",

			// Translations, Thx to ludoo http://userscripts.org/users/ludoo
			text_translations:{
				de:{
					lostTable: "Rohstoffe",
					lostTitle: "Rohstoffe ingesamt",

					// The "&nbsp;" only to insert a little space between columns
					places: "&nbsp;&nbsp;BH&nbsp;&nbsp;",
					rcwood: "Holz",
					rcstone: "Stein",
					rciron: "Silber",
					rcfavor: "Gunst",

					popups : {
					// Texts uses in pop-ups.
						rcwood_lost  : "<h4>Holz</h4>Basiskosten Holz, die f&uuml;r verlorenen Einheiten aufgewendet werden mussten.<br/>Nicht ber&uuml;cksichtigt werden Forschungen wie <i>'Wehrpflicht'</i>.",
						rcstone_lost : "<h4>Stein</h4>Basiskosten Stein, die f&uuml;r verlorenen Einheiten aufgewendet werden mussten.<br/>Nicht ber&uuml;cksichtigt werden Forschungen wie <i>'Wehrpflicht'</i>.",
						rciron_lost  : "<h4>Silber</h4>Basiskosten Silber, die f&uuml;r verlorenen Einheiten aufgewendet werden mussten.<br/>Nicht ber&uuml;cksichtigt werden Forschungen wie <i>'Wehrpflicht'</i>.",
						rcfavor_lost : "<h4>Gunst</h4>Gunst, die f&uuml;r verlorenen Einheiten aufgewendet werden musste.",
						rcbh_lost    : "<h4>Bauernhofpl&auml;tze</h4>Bauernhofpl&auml;tze, die durch die verlorenen Einheiten frei werden.<br/><i>'Miliz'</i> wird nicht berücksichtigt.",
						rcatt_lost   : "Kosten f&uuml;r Angreifer",
						rcdef_lost   : "Kosten f&uuml;r Verteidiger",
						openResBox   : "Rohstofffenster &ouml;ffnen",
						closeResBox  : "Rohstofffenster schlie&szlig;en",
						wallYourCosts: "deine Kosten",
						wallFoeCosts : "Kosten deiner Gegner / deine Kampfpunkte"
					}
				},
			},

			init : function() {
				// Get the unsafe window outside of GM.
				if (typeof unsafeWindow === 'object') {
					ResCalc.uW = unsafeWindow;
				} else 	{
					ResCalc.uW = window;
				}

				var uW = ResCalc.uW;
				ResCalc.server = "";
				var sr = /(([a-zA-Z]+)\w+)\.grepolis\.\w+/.exec( uW.location.host );
				if (sr) {
					ResCalc.server = sr[1];
					ResCalc.language = sr[2];
					ResCalc.text = ResCalc.text_translations[ResCalc.language];
					// If language has no translation, use english
					if ( !ResCalc.text )
						ResCalc.text = ResCalc.text_translations["de"];
				}

				//get jQuery (used by Grepo, but also very usefull for us)
				ResCalc.$ = ResCalc.uW.jQuery;
				var $ = ResCalc.$;

				// Get GameData
				if ( uW.GameData && uW.GameData.units && uW.GameData.units.archer ) {
					var gunits = ResCalc.unwrap( uW.GameData.units );
					ResCalc.UnitData = {};
					for (var u in gunits) {
						var nu = {
							resources : gunits[u].resources,
							population: gunits[u].population,
							favor     : gunits[u].favor
						};
						ResCalc.UnitData[u] = nu;
					}
					ResCalc.storeValue( "Units", ResCalc.UnitData );
				} else {
					var gunits = ResCalc.readValue( "Units" );
					if ( gunits && gunits.length > 0 ) {
						eval( "ResCalc.UnitData = "+gunits );
					} else {
						error_log ("OptResCalc: No unit definition found");
					}
				}

				// Add Pop-up texts we use here (will be bound to html elements later by "setPopup" calls)
				uW.PopupFactory.addTexts( ResCalc.text.popups );
				uW.rc_ShowPopup = ResCalc.ShowPopup;
				if ( ResCalc.UnitData ) {
					if ( uW.document.getElementById('report_mood_strength') ) {
						// Farm NOT handled. And will never be.
					} else if ( uW.document.URL.indexOf( "action=simulator") > 0 ) {
						// Simulator
						$(ResCalc).ajaxComplete( function(e, xhr, settings) {
							var txt = "/game/building_place?action=simulate&";
							if ( settings.url.substr(0, txt.length) == txt ) {
								var attCosts = ResCalc.calcSimRes( "building_place_att_losses_" ).GetFormattedValues();
								var defCosts = ResCalc.calcSimRes( "building_place_def_losses_" ).GetFormattedValues();

								for( var res in {'Wood':1,'Stone':1,'Iron':1,'Favor':1,'BH':1} ) {
									$('#fcSimAtt'+res ).text( attCosts[ res ] );
									$('#fcSimDef'+res ).text( defCosts[ res ] );
								}
							}
						});
						// Add "+"-Button
						$(".game_header").parent().prepend( '<div id="fcSimShow" onclick="'
							+'rc_ShowPopup(\'fcSim\',\'fcSimShow\')'
							+ '" class="place_sim_showhide" style="float:right;"/>' );

						ResCalc.$('#fcSimShow').setPopup('openResBox');
						ResCalc.createResPopup('fcSim', L('RESTABLE'));

					} else if ( uW.document.URL.indexOf( "game/building_wall?") > 0 ) {
						// "Building wall"
						// Items on the left side - "Besiegt..."
						var defeatedUnits = $('.list_item_left');
						var foeCounters = new ResCounter();

						ResCalc.calcWallRes( defeatedUnits[2], foeCounters );
						ResCalc.calcWallRes( defeatedUnits[4], foeCounters );

						// Items on the right side - "Verluste..."
						var lostUnits   = $('.list_item_right');
						var yourCounters  = new ResCounter();
						ResCalc.calcWallRes( lostUnits[2], yourCounters );
						ResCalc.calcWallRes( lostUnits[4], yourCounters );

						// Add "+"-Button
						$(".game_header").parent().prepend( '<div id="fcWallShow" onclick="'
							+'rc_ShowPopup(\'fcWall\',\'fcWallShow\')'
							+ '" class="place_sim_showhide" style="float:right"/>' );
						ResCalc.createResPopup( 'fcWall', L('LostTitle'));

						$('#fcWallAttLosts').setPopup('wallYourCosts')
						$('#fcWallDefLosts').setPopup('wallFoeCosts')

						// Update counters in pop-up.
						yourCounters = yourCounters.GetFormattedValues();
						foeCounters  = foeCounters.GetFormattedValues();
						for( var res in {'Wood':1,'Stone':1,'Iron':1,'Favor':1,'BH':1} ) {
							$('#fcWallAtt'+res ).text( ResCalc.fInt( yourCounters[ res ] ) );
							$('#fcWallDef'+res ).text( ResCalc.fInt( foeCounters[ res ] ) );
						}
					} else if ( uW.document.URL.indexOf( "game/alliance?action=forum") > 0 ) {
						// Included reports inside threads
						// Forum
						$('.report_units_overview').each( ResCalc.calcEmbeddedReportRes );
						ResCalc._orgHide = uW.Layout.hideAjaxLoader;
						// Hook inside the Thread-"save" workflow (TODO: better way? There is no explicite hook for this action)
						uW.Layout.hideAjaxLoader = function() {
							ResCalc._orgHide.apply( this, arguments );
							$('.report_units_overview').each( ResCalc.calcEmbeddedReportRes );
						};
					}
				}
			},

			calcSimRes : function ( idPrefix ) {
				var sumCosts = new ResCounter();
				for (var uName in ResCalc.UnitData) {
					var node = ResCalc.uW.document.getElementById( idPrefix+uName );
					if ( node )
						sumCosts.add( ResCalc.pInt( node.innerHTML ) , uName );
				}
				return sumCosts;
			},

			joinsReportSides : function( attCostsTable, defCostsTable ) {
				if ( !attCostsTable ) {attCostsTable = "";}
				if ( !defCostsTable ) {defCostsTable = "";}

				if ( attCostsTable.length | defCostsTable.length ) {
					return "<div style='text-align:left; font-size:9px;'>"
						+"<center>"
						+"<table cellpadding='0px' cellspacing='0px'>"
						+"<tr><td>"+attCostsTable+"</td>"
						+ "<td><b><table cellpadding='0px' cellspacing='0px'>"
						+ "<tr><td align=center>"+ResCalc.text.places+"</td></tr>"
						+ "<tr><td align=center>"+ResCalc.text.rcwood+"</td></tr>"
						+ "<tr><td align=center>"+ResCalc.text.rcstone+"</td></tr>"
						+ "<tr><td align=center>"+ResCalc.text.rciron+"</td></tr>"
						+ "<tr><td align=center>"+ResCalc.text.rcfavor+"</td></tr>"
						+ "</table></b></td>"
						+"<td>"+defCostsTable+"</td></tr></table></center></div>";
				} else { error_log ("OptResCalc: No units found in report.");}
				return null;
			},

			// Some DOM functions return "wrapped" objects with restricted access to some properties.
			// We need the real ones...
			unwrap : function(node) {
				return (node && node.wrappedJSObject) ? node.wrappedJSObject : node;
			},

			// Escapes a string for use in object dumps, without any prototype magic.
			escapeString : function(str) {
				var sb = "";
				for (var i = 0; i < str.length; i++) {
					var c=str[i];
					var cc=str.charCodeAt(i);
					if ((cc >= 0x000 && cc <= 0x01F) || (cc >= 0x007F && cc <= 0x09F)) {
						// Use Unicode
						sb += "\\u";
						var hexval= cc.toString(16);
						while( hexval.length < 2) hexval = "0" + hexval; sb += hexval;
					} else {
						switch (c) {
							case "'" : sb += "\\'" ; break;
							case '"' : sb += "\\\""; break;
							case '\\': sb += "\\\\"; break;
							case '/' : sb += "\\/" ; break;
							case '\b': sb += "\\b" ; break;
							case '\f': sb += "\\f" ; break;
							case '\n': sb += "\\n" ; break;
							case '\r': sb += "\\r" ; break;
							case '\t': sb += "\\t" ; break;
							default  : sb += c     ; break;
						}
					}
				}
				return sb;
			},

			// JSON like strinigify funtion. Creates simple javascript source from objects, but not real JSON.
			xString : function(obj) {
				if (obj === null) {
					return 'null';
				}
				switch (typeof obj) {
					case 'undefined':
					case 'unknown'  : return '';
					case 'function' :
					case 'number'   :
					case 'boolean'  : return obj.toString();
					case 'string'   : return '"'+ ResCalc.escapeString(obj)+ '"';
					case 'object'   : if (obj.nodeType != 1) {
						var x=[];
						if ('splice' in obj && 'join' in obj) { // Array
							for (var e in obj) {
								x.push(ResCalc.xString(obj[e]));
							}
							return '['+ x.join(',') +']';
						} else {
							for (var e in obj) {
								x.push( '"'+ e +'":'+ResCalc.xString(obj[e]));
							}
							return '{'+ x.join(',') +'}';
						}
					} break;
				}
				return obj.toString();
			},

			storeValue : function( name, value ) {
				try {
					value = ResCalc.xString( value );
					GM_setValue( ResCalc.server+"."+name, value );
				}
				catch (e) { error_log ("OptResCalc: setValue failed - "+e );}
			},

			readValue : function( name ) {
				try {
					var data = GM_getValue( ResCalc.server+"."+name );
					return data;
				} catch (e) { error_log ("OptResCalc: getValue failed - "+e );}
				return null;
			},

			// Convenience replacement for "parseInt".
			pInt : function( txt, dft ) {
				var v = parseInt( txt, 10 );
				if (isNaN(v)) v = (dft === undefined) ? 0 : dft;
				return v;
			},

			// Fills up numbers (to look more pretty)
			pad : function(number, digits) {
				var x = "" + number;
				while(x.length < digits) x = "0" + x;
				return x;
			},

			// Format large integer values
			// E.g. "1000" will be "1.000"
			fInt : function( val ) {
				var txt = "";
				while( val >= 1000 ) {
					var nv = Math.floor(val / 1000);
					txt = "." + ResCalc.pad(val -(nv * 1000),3) + txt;
					val = nv;
				}
				txt = "" + val + txt;
				return txt;
			},

			// IE and Opera use two new line characters, mozilla only one.
			// Fix this, before we use regexp:
			fixNL : function( html ) {
				return html.replace(/(\x0a\x0d|\x0d\x0a|\n)/g,"");
			},

			// Crossbrowser event fixing (stupid IE).
			cbFix : function(e) {
				if (undefined == e) e = ResCalc.uW.event;
				if (undefined == e.layerX) e.layerX = e.offsetX;
				if (undefined == e.layerY) e.layerY = e.offsetY;
				return e;
			},

			// Get the absolute left position of some html element inside the page.
			getLeft : function(el) {
				var x = 0;
				while(el != null){ x += el.offsetLeft; el = el.offsetParent;}
				return x;
			},

			// Get the absolute top position of some html element inside the page.
			getTop : function(el) {
				var y = 0;
				while( el != null ) {
					y += el.offsetTop; el = el.offsetParent;
				}
				return y;
			},

			// Simple "drag" support
			drag : {
				obj : null,

				init : function(oAnchor, oRoot ) {
					var a = ResCalc.unwrap( ResCalc.uW.document.getElementById(oAnchor) );
					var o = ResCalc.unwrap( ResCalc.uW.document.getElementById(oRoot) );
					a.onmousedown = ResCalc.drag.start;
					a.root = o ? o: a;
					if (isNaN(parseInt(a.root.style.left))) a.root.style.left = "0px";
					if (isNaN(parseInt(a.root.style.top ))) a.root.style.top = "0px";
				},

				start : function(e) {
					var o = ResCalc.drag.obj = ResCalc.unwrap(this);
					var e = ResCalc.cbFix(e);
					var y = ResCalc.pInt(o.root.style.top);
					var x = ResCalc.pInt(o.root.style.left);
					o.lastMouseX   = e.clientX;
					o.lastMouseY   = e.clientY;

					var d = ResCalc.uW.document;
					d.onmousemove = ResCalc.drag.drag;
					d.onmouseup   = ResCalc.drag.end;
					return false;
				},

				drag : function(e) {
					e = ResCalc.cbFix(e);
					var o = ResCalc.drag.obj;
					var rt = o.root;

					var ey = e.clientY;
					var ex = e.clientX;
					var y = ResCalc.pInt(rt.style.top);
					var x = ResCalc.pInt(rt.style.left);
					var w = rt.offsetWidth;
					var nx, ny;

					nx = ex - o.lastMouseX;
					ny = ey - o.lastMouseY;

					var rtLeft = ResCalc.getLeft(rt);
					var ww = ResCalc.uW.innerWidth;

					x += nx;
					if (x < 0) x=0;
					if ((x + w) > ww) x = ww - w;

					y += ny;
					if (y < 0) y=0;

					rt.style.left = x +"px";
					rt.style.top  = y +"px";

					o.lastMouseX   = ex;
					o.lastMouseY   = ey;

					return false;
				},

				end : function() {
					var d = ResCalc.uW.document;
					d.onmousemove = null;
					d.onmouseup   = null;
					ResCalc.drag.obj = null;
				}
			},


			// Create some pop-up as hidden div add the end of body.
			// Used by the other "create" functions, simply to encapsulate
			// the general code for handling "grepo-style" pop-ups here.
			createPopup : function( idPrefix, title, content ) {
				var stStyle = "background: transparent url(http://static.grepolis.com/images/game/layout/resources.png) no-repeat scroll -0px -30px; height:30px; width:30px";
				var wdStyle = "background: transparent url(http://static.grepolis.com/images/game/layout/resources.png) no-repeat; height:30px; width:30px;";
				var svStyle = "background: transparent url(http://static.grepolis.com/images/game/layout/resources.png) no-repeat scroll 0px -60px; height:30px; width:30px;";
				var bhStyle = "background: transparent url(http://static.grepolis.com/images/game/layout/resources.png) no-repeat scroll 0px -120px; height:30px; width:30px;";
				var fvStyle = "background: transparent url(http://static.grepolis.com/images/game/layout/resources.png) no-repeat scroll 0px -150px; height:30px; width:30px;";

				ResCalc.$( "body" ).after(
				// Z-index 21, just above the "Manager"-bar (currently 20) and below the pop-ups.
					'<div class="game_inner_box" style="z-index: 21; position:absolute; left:0px; top:0px; display:none;" id="'+idPrefix+'ResCostBox">'
					+    '<table cellspacing="0" cellpadding="0" class="game_border">'
					+    '<tr><td class="game_border_edge"/><td class="game_border_top"/>'
					+	'<td class="game_border_edge game_border_edge_2"/></tr>'
					+    '<tr><td class="game_border_left"/>'
					+    '<td>'
					+     '<div style="position:relative; margin: 0px; display: inline-block;">'
					+     '<div class="game_border_socket game_border_socket1"/>'
					+     '<div class="game_border_socket game_border_socket2"/>'
					+     '<div class="game_border_socket game_border_socket3"/>'
					+     '<div class="game_border_socket game_border_socket4"/>'

					// Title bar (dragable)
					+     '<div class="game_header" style="cursor:move; font:13px Verdana,Arial,Helvetica,sans-serif; font-weight:bold;" id="'+idPrefix+'boxDragBar">'+title+'</div>'
					+     '<div class="game_body">'+content+'</div>'
					+    '</td>'
					+   '<td class="game_border_right"/>'
					+   '</tr>'
					+  '<tr><td class="game_border_edge game_border_edge_3"/>'
					+	'<td class="game_border_bottom"/>'
					+	'<td class="game_border_edge game_border_edge_4"/></tr>'
					+    '</table></div>'
				);
				// Delay drag binding, otherwise some of the properties may not be initializied.
				ResCalc.uW.setTimeout( ResCalc.drag.init, 100, idPrefix +'boxDragBar', idPrefix +'ResCostBox' );
			},


			// Create the a resource pop-up.
			createResPopup : function( idPrefix, title ) {
				var wdStyle = "background: transparent url(http://static.grepolis.com/images/game/layout/resources.png) no-repeat; height:30px; width:30px;";
				var stStyle = "background: transparent url(http://static.grepolis.com/images/game/layout/resources.png) no-repeat scroll -0px -30px; height:30px; width:30px";
				var svStyle = "background: transparent url(http://static.grepolis.com/images/game/layout/resources.png) no-repeat scroll 0px -60px; height:30px; width:30px;";
				var fvStyle = "background: transparent url(http://static.grepolis.com/images/game/layout/resources.png) no-repeat scroll 0px -150px; height:30px; width:30px;";
				var bhStyle = "background: transparent url(http://static.grepolis.com/images/game/layout/resources.png) no-repeat scroll 0px -120px; height:30px; width:30px;";

				ResCalc.createPopup( idPrefix, title,
				'<table cellspacing="0" cellpadding="0" class="place_simulator_table">'
				+ '<tr>'
				+	'<td class="place_simulator_even" width="18px"/>'
				+	'<td class="left_border place_simulator_odd"  style="min-width: 45px" align=center><div id="'+idPrefix+'HeadWood"  style="'+wdStyle+'"/></td>'
				+	'<td class="left_border place_simulator_even" style="min-width: 45px" align=center><div id="'+idPrefix+'HeadStone" style="'+stStyle+'"/></td>'
				+	'<td class="left_border place_simulator_odd"  style="min-width: 45px" align=center><div id="'+idPrefix+'HeadIron"  style="'+svStyle+'"/></td>'
				+	'<td class="left_border place_simulator_even" style="min-width: 45px" align=center><div id="'+idPrefix+'HeadFavor" style="'+fvStyle+'"/></td>'
				+	'<td class="left_border place_simulator_odd"  style="min-width: 45px" align=center><div id="'+idPrefix+'HeadBH"    style="'+bhStyle+'"/></td>'
				+ '</tr>'
				+ '<tr>'
				+	'<td class="left_border place_simulator_even place_losses" align=center style = "border: none;">'
				+	'<div class="place_symbol place_att" id="'+idPrefix+'AttLosts"/></td>'
				+	'<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'AttWood"  style = "margin:2px;"/></td>'
				+	'<td class="left_border place_simulator_even place_losses"><div id="'+idPrefix+'AttStone" style = "margin:2px;"/></td>'
				+	'<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'AttIron"  style = "margin:2px;"/></td>'
				+	'<td class="left_border place_simulator_even place_losses"><div id="'+idPrefix+'AttFavor" style = "margin:2px;"/></td>'
				+	'<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'AttBH"    style = "margin:2px;"/></td>'
				+ '</tr>'
				+ '<tr>'
				+	'<td class="left_border place_simulator_even place_losses" align=center style = "border: none;"><div class="place_symbol place_def" id="'+idPrefix+'DefLosts"/></td>'
				+	'<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'DefWood"  style = "margin:2px;"/></td>'
				+	'<td class="left_border place_simulator_even place_losses"><div id="'+idPrefix+'DefStone" style = "margin:2px;"/></td>'
				+	'<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'DefIron"  style = "margin:2px;"/></td>'
				+	'<td class="left_border place_simulator_even place_losses"><div id="'+idPrefix+'DefFavor" style = "margin:2px;"/></td>'
				+	'<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'DefBH"    style = "margin:2px;"/></td>'
				+' </tr>'
				+' </table></div>' );

				var $ = ResCalc.$;
				// Bind info pop-ups to headers.
				$('#'+idPrefix+'HeadWood' ).setPopup( 'rcwood_lost'  );
				$('#'+idPrefix+'HeadStone').setPopup( 'rcstone_lost' );
				$('#'+idPrefix+'HeadIron' ).setPopup( 'rciron_lost'  );
				$('#'+idPrefix+'HeadFavor').setPopup( 'rcfavor_lost' );
				$('#'+idPrefix+'HeadBH'   ).setPopup( 'rcbh_lost'    );
				$('#'+idPrefix+'AttLosts' ).setPopup( 'rcatt_lost'   );
				$('#'+idPrefix+'DefLosts' ).setPopup( 'rcdef_lost'   );
			},

			// Flags to initicate that a pop-up was already shown and should not be aligned again.
			bBoxOnceShown : {},

			// Displays a pop-up.
			ShowPopup : function(idPrefix, adjustToId, adjustMode) {
				var $ = ResCalc.$;
				var showBox = $('#'+idPrefix+'Show')[0];
				var resBox = $('#'+idPrefix+'ResCostBox')[0];
				var bShow = resBox.style.display === "none";

				showBox.className = bShow ? "place_sim_bonuses_more_confirm" : "place_sim_showhide";
				$('#'+idPrefix+'Show').setPopup( bShow ? 'closeResBox' : 'openResBox' );
				resBox.style.display = bShow ? "block" : "none";

				if ( !ResCalc.bBoxOnceShown[idPrefix] ) {
					ResCalc.bBoxOnceShown[idPrefix] = true;
					var adjNode = $( '#'+adjustToId )[0];
					if (idPrefix == "fcSim") { resBoxTop = -109; resBoxLeft = -23; } else if (idPrefix == "fcWall") { resBoxTop = -56; resBoxLeft = -23; }
					resBox.style.top  = ( ResCalc.getTop( adjNode )+adjNode.offsetHeight + resBoxTop )+"px";
					resBox.style.left = ( ResCalc.getLeft( adjNode) + adjNode.offsetWidth - resBox.offsetWidth + resBoxLeft )+"px";
				}
				return false;
			},

			// Create  report infos from a report side as html.
			calcReportRes: function( nodeClass ) {
				var nodes = ResCalc.uW.document.getElementsByClassName( nodeClass );
				if ( (!nodes) || nodes.length == 0 ) {
					return "";
				}
				var node = nodes[0];
				var costs = new ResCounter();
				var typeFromImageRE = /url\(.*\/images\/game\/units\/(.+)_40x40\.png/i;
				var countRE         = /<span class="report_losts">(-\d+)<\/span>/i;
				var units = node.getElementsByClassName("report_unit");
				for (var i=0 ; i<units.length ; i++) {
					var unit = units[i];
					if ( unit.style.backgroundImage ) {
						var mTP = typeFromImageRE.exec(unit.style.backgroundImage);
						if (mTP) {
							var countTP = countRE.exec(unit.parentNode.innerHTML);
							if ( countTP )
								costs.add( -ResCalc.pInt( countTP[1] ), mTP[1] );
						}
					}
				}
				return costs.renderResult();
			},


			calcWallRes : function ( unitRow, counter ) {
				var unitRE = /\/(\w+)_\d0x\d0\.png(?:.+?)class="place_unit_black bold">(\d+)<\/span>/ig;

				// IE and Opera use two new line characters, mozilla only one.
				// Fix this, before we use regexp:
				var html = ResCalc.fixNL( unitRow.innerHTML );
				var r;
				try {
					while ( r = unitRE.exec( html ) )
						counter.add( ResCalc.pInt( r[2] ), r[1] );
				} catch(e) { error_log ("OptResCalc: CalcWallRes "+e );}
			},

			// Using jQuery.each, this method is called for each node with class "report_units_overview"
			calcEmbeddedReportRes : function( index, report ) {
				// We are hooked in all ajax calls. So we have to mark already modified reports.
				if ( !report._resCalcHandled  ) {
					report._resCalcHandled = true;
					var att = ResCalc.calcEmbeddedReportRes_OneSide( report.getElementsByClassName( 'report_side_attacker_unit' ) );
					var def = ResCalc.calcEmbeddedReportRes_OneSide( report.getElementsByClassName( 'report_side_defender_unit' ) );
					var joinedReports = ResCalc.joinsReportSides( att, def );
					if ( joinedReports ) {
						var sumNode = ResCalc.$(joinedReports);
						var id = "fcResShow"+index;
						sumNode.attr("id", id);
						sumNode.css( "display", "none" );
						sumNode.appendTo( report.getElementsByClassName('report_booty_bonus_fight' ) );

						// Add "+" Button to open the ressource overview (toggles slides and change the button to a "-")
						var openButton = ResCalc.$( '<div id="Button'+id+'" onclick="'+'$(\'#'+id+'\').slideToggle();var bt=$(\'#Button'+id+'\');var _s=!!bt[0]._state;bt.css(\'background-position\',_s?\'-126px 0\':\'-144px 0\');bt[0]._state=!_s;" style="float:right; background-image:url(\'http://static.grepolis.com/images/game/layout/button.png\'); height:19px;width:18px;background-position:-126px 0; "/>' );
						openButton.appendTo( report.getElementsByClassName('resources')[0] );
						openButton.setPopup( 'openResBox');
					}
				}
			},

			// Calculates ressources for one side of an embedded report.
			calcEmbeddedReportRes_OneSide: function( unitNodes ) {
				// RE to extract unit type and amount from report.
				var unitRE = /class="report_unit report_side_(?:defender|attacker) unit_(\w+)".+<span class="report_losts">(-\d+)<\/span>/i;
				var costs = new ResCounter();
				if ( unitNodes && unitNodes.length > 0 ) {
					for (var i=0 ; i<unitNodes.length ; i++) {
						var html = ResCalc.fixNL( unitNodes[i].innerHTML );
						var sr = unitRE.exec( html );
						if ( sr ) {
							costs.add( -ResCalc.pInt( sr[2] ), sr[1] );
						}
					}
				}
				return costs.renderResult();
			}
		};
		setTimeout( ResCalc.init, 250 );
	}
	// END of RESOURCES at SIMULATOR and WALL


	// START of REPORT HIGHLIGHTING (german only)
	if ((Config.get('optReportInfo') && (GE.Server[2] == 'de' || GE.Server[2] == 'ch')) && GE.Controller == "report"  ) {
		var uW;
		if (typeof unsafeWindow === 'object'){
			uW = unsafeWindow;
		} else {
			uW = window;
		}
		//get jQuery
		var $ = uW.jQuery;

		function setVal (name, value) {
			GM_setValue (name, value);
		}


		var doHighlights = function() {
			// Highlights german only
			uW.setTimeout( setVal, 0, 'HighLighting', 'yes' );

			var highLights = [
				// Angriff auf eine Eroberung
				{ re : />(.+ )(\()(.+)(\))( greift )(die .+ Stadt )(.+) an/
				, rp : "><font color=#505050>$1</font>$2<font color=#B10000>$3</font>$4<font color=#50283C>$5</font>$6<font color=#505050>$7</font> an" },

				{ re : />( Du )(greifst)( die von )(.+)( besetzte)( Stadt )(.+) an/
				, rp : ">$1<font color=#50283C>$2</font>$3<font color=#B10000>$4</font><font color=#DD0050>$5</font>$6<font color=#505050>$7</font> an" },

				// Angriff auf eine Unterstützung von Player.
				{ re : />(.*)(\()(.+)(\))( greift)( deine von Spieler )(.+)( besetzte)( Stadt )(.+) an/
				, rp : "><font color=#404040>$1</font>$2<font color=#B10000>$3</font>$4<font color=#50283C>$5</font>$6<font color=#B10000>$7</font><font color=#DD0050>$8</font>$9<font color=#005050>$10</font> an" },

				{ re : />(.+ )(\()(.+)(\))( greift)( deine )(Unterstützung)( aus )(.+) in (.+) \((.+)\) an/
				, rp : "><font color=#505050>$1</font>$2<font color=#B10000>$3</font>$4<font color=#50283C>$5</font>$6<font color=#0080C0>$7</font>$8<font color=#005050>$9</font> in <font color=#505050>$10</font> (<font color=#B10000>$11</font>) an" },

				// Angriff auf Player.
				{ re : />(.+ )(\()(.+)(\))( greift )(.+) an/
				, rp : "><font color=#505050>$1</font>$2<font color=#B10000>$3</font>$4<font color=#50283C>$5</font><font color=#005050>$6</font> an" },

				// Angriff von Player.
				{ re : />(.+)( greift )(.+) (\()(.+)(\)) an/
				, rp : "><font color=#005050>$1</font><font color=#50283C>$2</font><font color=#505050>$3</font> $4<font color=#B10000>$5</font>$6 an" },

				{ re : />( Du )(greifst)( den Besetzer )(.+)( in deiner Stadt )(.+)( an)/
				, rp : ">$1<font color=#50283C>$2</font>$3<font color=#B10000>$4</font>$5<font color=#005050>$6</font>$7" },

				// Gunst auf Stadt (owner + Stadt)
				{ re : />(.*Du hast )(.+)( auf )(.+)(\()(.+)(\))( gewirkt)/
				, rp : ">$1<font color=darkblue>$2</font>$3<font color=#005050>$4</font>$5<font color=#B10000>$6</font>$7<font color=#50283C>$8</font>" },

				// Bündnisse
				{ re : />(.*Du wurdest soeben in die )(.+)( Allianz )(eingeladen)/
				, rp : ">$1<font color=green>$2</font>$3<font color=#50283C>$4</font>" },

				{ re : />(.*Die Allianz )(.+)( lädt )(euch zu einem )(Bündnis)( ein)/
				, rp : ">$1<font color=green>$2</font><font color=#50283C>$3</font>$4<font color=#6060D0>$5</font>$6" },

				{ re : />(.*Die Allianz )(.+)( hat dem )(Bündnis )(zugestimmt)/
				, rp : ">$1<font color=green>$2</font>$3<font color=#6060D0>$4</font><font color=#50283C>$5</font>" },

				{ re : />( Eine)(.+)( wurde )(abgelehnt|zurückgezogen)/
				, rp : ">$1<font color=#6060E0>$2</font>$3<font color=#50283C>$4</font>" },
				
				{ re : />(.*Die Allianz )(.+)( hat das )(Bündnis)( aufgelöst)/
				, rp : ">$1<font color=green>$2</font>$3<font color=#6060D0>$4</font><font color=#000000>$5</font>" },

				// Gunst auf Angriff
				{ re : />(.*Du hast )(.+)( auf )(.+[^)])( gewirkt)/
				, rp : ">$1<font color=darkblue>$2</font>$3<font color=#B10000>$4</font><font color=#50283C>$5</font>" },

				{ re : />(.+)( hat )(.+)( auf dich )(gewirkt)/
				, rp : "><font color=#B10000>$1</font>$2<font color=darkblue>$3</font>$4<font color=#50283C>$5</font>" },

				{ re : />(.+)( hat )(.+)( auf deine Stadt )(.+)( gewirkt)/
				, rp : "><font color=#B10000>$1</font>$2<font color=darkblue>$3</font>$4<font color=#005050>$5</font><font color=#50283C>$6</font>" },

				// Spy
				{ re : /(Spion)( in )(.+)( aus )(.+)\((.+)\)( entdeckt)/
				, rp : "<font color=#808000>$1</font>$2<font color=#005050>$3</font>$4<font color=#B10000>$5</font>(<font color=#505050>$6</font>)<font color=#808000>$7</font>" },

				{ re : />(.*)( spioniert )(.+)( \()(.+)(\) aus)/
				, rp : "><font color=#005050>$1</font><font color=#808000>$2</font><font color=#505050>$3</font>$4<font color=#B10000>$5</font>$6" },

				{ re : />(.*)( unterstützt )(.+)( \()(.+)(\))/
				, rp : "><font color=#005050>$1</font><font color=#0080C0>$2</font><font color=#505050>$3</font>$4<font color=#B10000>$5</font>$6" },

				{ re : />(.*)(\()(.+)(\))( unterstützt )(.+)/
				, rp : "><font color=#404040>$1</font>$2<font color=#B10000>$3</font>$4<font color=#0080C0>$5</font><font color=#005050>$6</font>" },

				{ re : />(.*)( schickt )(stationierte Truppen aus )(.+)( zurück)/
				, rp : "><font color=#B10000>$1</font><font color=#50283C>$2</font>$3<font color=#005050>$4</font>$5" },

				{ re : />(.*)( zieht )(stationierte Truppen aus )(.+)( ab)/
				, rp : "><font color=#B10000>$1</font><font color=#50283C>$2</font>$3<font color=#505050>$4</font>$5" },

				{ re : />( Du hast )(.+)( erfolgreich )(erobert\.)/
				, rp : ">$1<font color=#005050>$2</font><font color=#800040> erfolgreich </font><font color=#50283C>erobert</font>." },

				{ re : />(.*)( hat deine Stadt )(.+)( erobert\.)/
				, rp : "><font color=#B10000>$1</font>$2<font color=#505050>$3</font><font color=darkred> erobert</font>." },

				{ re : />(.+)( steigert die Stärke )(im Bauerndorf)(.+)/
				, rp : "><font color=#005050>$1</font><font color=darkgreen>$2</font>im Bauerndorf<font color=#404040>$4</font>" },

				{ re : />(.+)( fordert Rohstoffe )(im Bauerndorf)(.+)/
				, rp : "><font color=#005050>$1</font><font color=darkgreen>$2</font>im Bauerndorf<font color=#404040>$4</font>" },

				{ re : />( Truppenverluste )(.+)/
				, rp : "><font color=black>$1</font>$2" },

				{ re : />( Einige deiner Truppen aus )(.+)( wurden von )(Trümmern)( begraben)/ //P207 Hype
				, rp : ">$1<font color=#005050>$2</font>$3<font color=black>$4</font> begraben" },

				{ re : />( Du )(beginnst)( eine)( neue Stadt )(zu )(gründen)/
				, rp : ">$1<font color=#50283C>$2</font>$3<font color=#C05000>$4</font>$5<font color=#50283C>$6</font>" },

				{ re : />( Du hast eine)( neue Stadt )(gegründet)/
				, rp : ">$1<font color=#C05000>$2</font><font color=#50283C>$3</font>" },

				{ re : />( Du konntest )(.+)( \()(.+)(\))( nicht aus )(.+)( unterst.+)/
				, rp : ">$1<font color=#B10000>$2</font>$3<font color=#50283C>$4</font>$5$6<font color=#50283C>$7</font>$8" },

				{ re : />( Du hast)(.+)( Gold )(erhalten)/
				, rp : ">$1<font color=#108080>$2</font><font color=#CCAA00>$3</font>$4" },

				{ re : />( Antwort auf )(Support-Anfrage)/
				, rp : ">$1<font color=#904070>$2</font>" },

				{ re : />(.*)( besucht )(.+)( \()(.+)(\) in Friedenszeiten)/
				, rp : "><font color=#005050>$1</font>$2<font color=#505050>$3</font>$4<font color=#B10000>$5</font>$6" },

				{ re : />(.*)( \()(.+)(\) besucht )(.+)( in Friedenszeiten)/
				, rp : "><font color=#505050>$1</font>$2<font color=#B10000>$3</font>$4<font color=#005050>$5</font>$6" }

			];

			var repsubs = uW.document.getElementsByClassName( "report_subject" );
			if ( repsubs ) {
				for ( var i=0 ; i<repsubs.length ; i++) {
					repsubs[i]._htmlBackup = repsubs[i].innerHTML;
					for ( var h=0 ; h<highLights.length ; h++ ) {
						if ( repsubs[i].innerHTML.match( highLights[h].re ) ) {
							repsubs[i].innerHTML = repsubs[i].innerHTML.replace( highLights[h].re, highLights[h].rp );
							break;
						}
					}
				}
			}
		}

		undoHighlights = function() {
			uW.setTimeout( setVal, 0, 'HighLighting', 'no' );
			var repsubs = uW.document.getElementsByClassName( "report_subject" );
			if ( repsubs ) {
				for ( var i=0 ; i<repsubs.length ; i++) {
					if ( repsubs[i]._htmlBackup ) {
						repsubs[i].innerHTML = repsubs[i]._htmlBackup;
					}
				}
			}
		}

		var rl = uW.document.getElementById('report_list');
		if ( rl ) {
			function markReports( re, checkIt ) {
				var reps = uW.document.getElementsByClassName( "report_subject" );
				if ( reps ) {
					var idRE = /\/game\/report\?id=(\d+)&amp;action=view/i;
					for ( var i = 0 ; i< reps.length ; i++) {
						var html = reps[i]._htmlBackup;
						if ( html == undefined ) html = reps[i].innerHTML;
						if ( re.test(html) ) {
							// Get report id ID
							var id = idRE.exec( html )[1];
							// Get the checkbox
							var ckXPath = uW.document.evaluate(
								"//input[@type='checkbox' and @value='"+id+"']", uW.document, null
								,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
							if ( ckXPath.singleNodeValue ) {
								// Mark it!
								ckXPath.singleNodeValue.checked = checkIt;
							}
						}
					}
				}
			};

			uW.gpRC_HL = function(cb) {
				if ( cb.checked ) {
					doHighlights();
				}
				else {
					undoHighlights();
				}
			};

			var bDoHL = true;
			try {
				if ( GM_getValue ) {
				var sHL = GM_getValue( "HighLighting" );
					bDoHL = ( sHL != "no" );
					$('<div style="position:relative;float:left;"></div>').appendTo('.game_list_footer');
					markButton = $('<label style="position:relative;float:left;"><input style="vertical-align: middle;" id="gpRC_cbHL" type="checkbox"'
					+ (bDoHL?" checked ":"")+'onclick="gpRC_HL(this);"/>'+L("highlighting")+'</label>');
					markButton.appendTo('.game_list_footer');
				}
			} catch (e) {;}

			if ( bDoHL ) {
				doHighlights();
			}
		} // else { error_log ("Highlighting: No report list found.");}
	}
	// END of REPORT HIGHLIGHTING


	if ((Config.get('optCulture')) || (Config.get('optMarket'))) {
		function init () {
			var texts = text_translations[language];
			if ( !texts ) { // If language has no translation, use english
				texts = text_translations["en"];
			}
			uW.PopupFactory.addTexts( texts.popups );
			if (Config.get('optMarket')) {
				if ( uW.document.URL.indexOf("/building_hide") > 0) { Hide.adapt();}
				else if ( uW.document.URL.indexOf("=hides_overview") > 0) { HidesOverview.adapt();}
				else if ( uW.document.URL.indexOf("/building_market") > 0) { Market.adapt();}
			}
			if ((Config.get('optCulture')) && ( uW.document.URL.indexOf("=culture_overview") > 0)) { CultureOverview.adapt();}
		};
		init();
	}


function functionMain(e) {
	Updater.check(scriptId, scriptVersion);
	if (Config.get('optAlliance')) { GE_AllianceName(); }
	if (Config.get('optProdinfo')) { GE_ProdInfo(); }
	if (Config.get('optBuildingpnts')) { GE_Builds(); }
}
window.addEventListener('load', functionMain, false);
