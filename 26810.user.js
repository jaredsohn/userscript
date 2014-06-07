//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TribalWars Enhancer v2", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           TribalWars scriptmix rebuild
// @version        0.1f
// @namespace      i.am.timas-at-gmail.com
// @description    Ads Remover. 15x15 Map. Shortcuts Bar. TW-Tools quick-access. Multi-Language and more!
// @include        http://ro*.triburile.ro/*
// @include        http://ru*.voyna-plemyon.ru/*
// @include        http://ro*.triburile.ro/*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://no*.tribalwars.no/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// @include	   http://en*.ds.ignames.net/*
// @copyright      Copyright (c) 2007 - 2008, Gelu Kelu
// @maintainer     Timas
// ==/UserScript==

// ==ChangeLog==
// v0.1 - Jan 24, 2008
// - All the default functionality provided by the original script
// - Fix: Attack links in the report screen
// - Fix: Some cosmetics got lined out better
// - Feature: Inpage popups for market and rally point
// - Feature: Search ability in map screen
// - Feature: BB-codes for player, village and ally through buttons
//
// v0.1b - Jan 25, 2008
// - Fix: Track/untrack village gave errors die to GreaseMonkey security setting for reading and writing variables
// - Fix: Quickbar doesn't show in buildings popup anymore
// - Fix: Added checks to see if elements are available before trying to access them
//
// v0.1c - Jan 25, 2008
// - Fix: Report screen was set to use english words to collect information, now multilanguaged
// - Feature: Market screen can now be opened by hovering over the button after selecting a box
// - Feature: It now lists the tracked villages at login
// - Lang: Two language tags added for popups
//
// v0.1d - Jan 25, 2008
// - Fix: More references to specific worlds and servers cleaned out
// - Fix: Market and rally point popups no longer depend on the 'your own' text
// - Language: Updated dutch language tags that weren't filled in yet
//
// v0.1e Jan 25, 2008
// - Fix: Intro page major error in xmlhttprequest caused nothing to work on that page
// - Fix: Attacks now happen from the original village when using the report links
// - Language: Updated polish by copying it from a polish fork of the original script
// - Fix: Popup for market and rally point is now multilanguage enabled
//
// v0.1f Jan 25, 2008
// - Fix: Worlds with old units now also should have the attack again links
// - Fix: Ad removal in forums
// ==/ChangeLog==



// ======== Language Dictionary ========

var lng = {
"en" : {
	"villages" : "Villages",
	"overview" : "Village overview",
	"map"      : "Map",
	"main"     : "Village Headquarters",
	"place"    : "Rally point",
	"train"    : "Train",
	"barracks" : "Barracks",
	"stable"   : "Stable",
	"garage"   : "Workshop",
	"smith"    : "Smithy",
	"statue"   : "Statue",
	"market"   : "Market",
	"snob"     : "Academy",
	"player"   : "User",
	"tribe"    : "Tribe",
	"i_player" : "Show player information",
	"i_tribe"  : "Show tribe information",
	"loading"  : "Loading...",
	"c_close"  : "Click to close",
	"track"    : "track village",
	"tracked"  : "Village tracked",
	"untrked"  : "Village untracked",
	"untrack"  : "untrack village",
	"cltrack"  : "clear all",
	"notrack"  : "No tracked villages",
	"oktrack"  : "tracked villages",
	"at_none"  : "Attack again",
	"at_same"  : "Attack again with the same troops",
	"at_all"   : "Attack again with all troops",
	"mapsize"  : "Map size",
	"pop_close": "Close",
	"pop_auto" : "Show automatically:"
},

"ru" : {
	"villages" : "Деревни",
	"overview" : "Обзор Деревни",
	"by"       : "Список Деревень",
	"map"      : "Карта",
	"main"     : "Ратуша",
	"place"    : "Площадь",
	"train"    : "Train",
	"barracks" : "Казарма",
	"stable"   : "Конюшня",
	"garage"   : "Мастерская",
	"smith"    : "Кузница",
	"statue"   : "Статуя",
	"market"   : "Рынок",
	"snob"     : "Академия",
	"forum"    : "фОРУМ",
	"player"   : "Игрок",
	"tribe"    : "Племя",
	"i_player" : "Show player information",
	"i_tribe"  : "Show tribe information",
	"loading"  : "Загрузка...",
	"c_close"  : "Click to close",
	"track"    : "Следить",
	"tracked"  : "Следим за деревней",
	"untrked"  : "Не следим за деревней",
	"untrack"  : "Не следить",
	"cltrack"  : "Очистить всё",
	"notrack"  : "No tracked villages",
	"oktrack"  : "tracked villages",
	"at_none"  : "Атаковать снова",
	"at_same"  : "Attack again with the same troops",
	"at_all"   : "Attack again with all troops",
	"mapsize"  : "Размер карты",
	"pop_close": "Close",
	"pop_auto" : "Show automatically:"
},

"ro" : { // Romanian
	"villages" : "Sate",
	"overview" : "Privire generală asupra satului",
	"map"      : "Hartă",
	"main"     : "Clădirea principală",
	"place"    : "Piaţa centrală",
	"train"    : "Recrutare",
	"barracks" : "Cazarmă",
	"stable"   : "Grajd",
	"garage"   : "Atelier",
	"smith"    : "Fierărie",
	"statue"   : "Statuie",
	"market"   : "Tîrg",
	"snob"     : "Curte nobilă",
	"player"   : "Jucător",
	"tribe"    : "Trib",
	"i_player" : "Arată informaţii despre acest jucător",
	"i_tribe"  : "Arată informaţii despre acest trib",
	"loading"  : "Sencarcă...",
	"c_close"  : "Click pt închidere",
	"track"    : "adaugă la istoric",
	"tracked"  : "Sat adăugat",
	"untrked"  : "Sat şters",
	"untrack"  : "şterge din istoric",
	"cltrack"  : "şterge istoric",
	"notrack"  : "Nici un sat în istoric",
	"oktrack"  : "sate în istoric",
	"at_none"  : "Atacă din nou",
	"at_same"  : "Atacă din nou cu aceleaşi trupe",
	"at_all"   : "Ataca din nou cu toate trupele",
	"mapsize"  : "Dimensiune harta",
	"pop_close": "{close_pop}",
	"pop_auto" : "{auto_pop}"
},

"cz" : { // Czech
	"villages" : "Vesnice",
	"overview" : "Vesnice náhled",
	"map"      : "Mapa",
	"main"     : "Hlavní budova",
	"place"    : "Nádvoří",
	"train"    : "Tréning",
	"barracks" : "Kasárna",
	"stable"   : "Stáj",
	"garage"   : "Dílna",
	"smith"    : "Kovárna",
	"statue"   : "Statue",
	"market"   : "Tržiště",
	"snob"     : "Panský dvůr",
	"player"   : "Hráč",
	"tribe"    : "Kmen",
	"i_player" : "Zobraz info o hráči",
	"i_tribe"  : "Zobraz info o kmenu",
	"loading"  : "Loading...",
	"c_close"  : "Click pro zavření",
	"track"    : "Sledovat vesnici",
	"tracked"  : "Vesnice sledována",
	"untrked"  : "Sledování zrušeno",
	"untrack"  : "Zrušit sledování",
	"cltrack"  : "Zrušit vše",
	"notrack"  : "Žádné sledované vesnice",
	"oktrack"  : "Sledované vesnice",
	"at_none"  : "{Attack again}",
	"at_same"  : "{Attack again with the same troops}",
	"at_all"   : "{Attack again with all troops}",
	"mapsize"  : "{Map size}",
	"pop_close": "{close_pop}",
	"pop_auto" : "{auto_pop}"
},

"nl" : { // Dutch
	"villages" : "Dorpen",
	"overview" : "Dorpoverzicht",
	"map"      : "Kaart",
	"main"     : "Hoofdgebouw",
	"place"    : "Verzamelplaats",
	"train"    : "Train",
	"barracks" : "Kazerne",
	"stable"   : "Stal",
	"garage"   : "Werkplaats",
	"smith"    : "Smederij",
	"statue"   : "Standbeeld",
	"market"   : "Marktplaats",
	"snob"     : "Adelshoeve",
	"player"   : "Speler",
	"tribe"    : "Stam",
	"i_player" : "Toon speler informatie",
	"i_tribe"  : "Toon stam informatie",
	"loading"  : "Laden...",
	"c_close"  : "Klik om te sluiten",
	"track"    : "Houd een dorp bij",
	"tracked"  : "Dorp word bijgehouden",
	"untrked"  : "Dorp wordt niet meer bijgehouden",
	"untrack"  : "Dorp niet langer bijhouden",
	"cltrack"  : "Leeg de lijst van bijgehouden dorpen",
	"notrack"  : "Geen enkel dorp word bijgehouden",
	"oktrack"  : "Bijgehouden dorpen",
	"at_none"  : "Val nogmaals aan",
	"at_same"  : "Val nogmaals aan met dezelfde troepen",
	"at_all"   : "Val nogmaals aan met al je troepen",
	"mapsize"  : "",
	"pop_close": "Sluit scherm",
	"pop_auto" : "Automatisch openen:"
},

"se" : { // Swedish
	"villages" : "Byar",
	"overview" : "Byöversikt",
	"map"      : "Karta",
	"main"     : "Högkvarter",
	"place"    : "Sammlingsplats",
	"train"    : "Rekrytera",
	"barracks" : "Barrack",
	"stable"   : "Stall",
	"garage"   : "Verkstad",
	"smith"    : "Smedja",
	"statue"   : "Staty",
	"market"   : "Marknad",
	"snob"     : "Akademi",
	"player"   : "Användare",
	"tribe"    : "Stam",
	"i_player" : "Visa spelar information",
	"i_tribe"  : "Visa stam information",
	"loading"  : "Laddar...",
	"c_close"  : "Stäng",
	"track"    : "Spåra by",
	"tracked"  : "Byn spårad",
	"untrked"  : "By ospårad",
	"untrack"  : "Sluta spåra by",
	"cltrack"  : "Rensa alla",
	"notrack"  : "Inga byar spårade",
	"oktrack"  : "Spårade byar",
	"at_none"  : "Attackera igen",
	"at_same"  : "Attackera igen med samma trupp",
	"at_all"   : "Attackera igen med alla trupper",
	"mapsize"  : "{Map size}",
	"pop_close": "{close_pop}",
	"pop_auto" : "{auto_pop}"
},

"no" : { // Norwegian
	"villages" : "Byar",
	"overview" : "Byöversikt",
	"map"      : "Karta",
	"main"     : "Högkvarter",
	"place"    : "Sammlingsplats",
	"train"    : "Rekrytera",
	"barracks" : "Barrack",
	"stable"   : "Stall",
	"garage"   : "Verkstad",
	"smith"    : "Smedja",
	"statue"   : "Staty",
	"market"   : "Marknad",
	"snob"     : "Akademi",
	"player"   : "Användare",
	"tribe"    : "Stam",
	"i_player" : "Visa spelar information",
	"i_tribe"  : "Visa stam information",
	"loading"  : "Laddar...",
	"c_close"  : "Stäng",
	"track"    : "Spåra by",
	"tracked"  : "Byn spårad",
	"untrked"  : "By ospårad",
	"untrack"  : "Sluta spåra by",
	"cltrack"  : "Rensa alla",
	"notrack"  : "Inga byar spårade",
	"oktrack"  : "Spårade byar",
	"at_none"  : "Attackera igen",
	"at_same"  : "Attackera igen med samma trupp",
	"at_all"   : "Attackera igen med alla trupper",
	"mapsize"  : "{Map size}",
	"pop_close": "{close_pop}",
	"pop_auto" : "{auto_pop}"
},

"es" : { // Spanish
	"villages" : "Pueblos",
	"overview" : "Visión general del pueblo",
	"map"      : "Mapa",
	"main"     : "Edificio principal",
	"place"    : "Plaza de Reuniones",
	"train"    : "{Train}",
	"barracks" : "Cuartel",
	"stable"   : "Cuadra",
	"garage"   : "Taller",
	"smith"    : "Herrería",
	"statue"   : "Estatua",
	"market"   : "Plaza del Mercado",
	"snob"     : "Corte aristócrata",
	"player"   : "Jugadore",
	"tribe"    : "Tribu",
	"i_player" : "Demuestre la información del jugador",
	"i_tribe"  : "Demuestre la información del tribu",
	"loading"  : "Cargamento...",
	"c_close"  : "Hacer click a cerrarse",
	"track"    : "{track village}",
	"tracked"  : "{Village tracked}",
	"untrked"  : "{Village untracked}",
	"untrack"  : "{untrack village}",
	"cltrack"  : "{clear all}",
	"notrack"  : "{No tracked villages}",
	"oktrack"  : "{tracked villages}",
	"at_none"  : "Ataque otra vez",
	"at_same"  : "Ataque otra vez con las mismas tropas",
	"at_all"   : "Ataque otra vez con todas las tropas",
	"mapsize"  : "{Map size}",
	"pop_close": "{close_pop}",
	"pop_auto" : "{auto_pop}"
},

"fr" : { // French
	"villages" : "Villages",
	"overview" : "Vue d'ensemble du village",
	"map"      : "Carte",
	"main"     : "Quartier général du village",
	"place"    : "Point de ralliement",
	"train"    : "{Train}",
	"barracks" : "Caserne",
	"stable"   : "Ecurie",
	"garage"   : "Atelier",
	"smith"    : "Forge",
	"statue"   : "Statue",
	"market"   : "Marché",
	"snob"     : "Académie",
	"player"   : "Joueur",
	"tribe"    : "Tribu",
	"i_player" : "Montrez l'information de joueur",
	"i_tribe"  : "Montrez l'information de tribu",
	"loading"  : "Chargement...",
	"c_close"  : "Clic à fermer",
	"track"    : "{track village}",
	"tracked"  : "{Village tracked}",
	"untrked"  : "{Village untracked}",
	"untrack"  : "{untrack village}",
	"cltrack"  : "{clear all}",
	"notrack"  : "{No tracked villages}",
	"oktrack"  : "{tracked villages}",
	"at_none"  : "Attaque encore",
	"at_same"  : "Attaque encore avec les mêmes troupes",
	"at_all"   : "Attaque encore avec toutes les troupes",
	"mapsize"  : "{Map size}",
	"pop_close": "{close_pop}",
	"pop_auto" : "{auto_pop}"
},

"it" : { // Italian
	"villages" : "Villaggi",
	"overview" : "Piantina del villaggio",
	"map"      : "Mappa",
	"main"     : "Quartier Generale",
	"place"    : "Punto di raduno",
	"train"    : "{Train}",
	"barracks" : "Caserma",
	"stable"   : "Stalla",
	"garage"   : "Officina",
	"smith"    : "Fabbro",
	"statue"   : "Statua",
	"market"   : "Mercato",
	"snob"     : "Accademia",
	"player"   : "Giocatore",
	"tribe"    : "Tribù",
	"i_player" : "Mostri le informazioni del giocatore",
	"i_tribe"  : "Mostri le informazioni del tribù",
	"loading"  : "Caricamento...",
	"c_close"  : "Scatto da chiudersi",
	"track"    : "{track village}",
	"tracked"  : "{Village tracked}",
	"untrked"  : "{Village untracked}",
	"untrack"  : "{untrack village}",
	"cltrack"  : "{clear all}",
	"notrack"  : "{No tracked villages}",
	"oktrack"  : "{tracked villages}",
	"at_none"  : "Attacco ancora",
	"at_same"  : "Attacco ancora con le stesse truppe",
	"at_all"   : "Attacco ancora con tutte le truppe",
	"mapsize"  : "{Map size}",
	"pop_close": "{close_pop}",
	"pop_auto" : "{auto_pop}"
},

"pl" : { // Polish
	"villages" : "Przegląd wioski",
	"overview" : "Przeglądy",
	"map"      : "Mapa",
	"main"     : "Ratusz",
	"place"    : "Plac",
	"train"    : "Rekrutuj",
	"barracks" : "Koszary",
	"stable"   : "Stajnia",
	"garage"   : "Warsztat",
	"smith"    : "Kuźnia",
	"statue"   : "Piedestał",
	"market"   : "Rynek",
	"snob"     : "Pałac",
	"player"   : "Gracz",
	"tribe"    : "Wioska",
	"i_player" : "Pokaż informacje o graczu",
	"i_tribe"  : "Pokaż informacje o wiosce",
	"loading"  : "Odświeżanie...",
	"c_close"  : "Zamknij",
	"track"    : "Badaj wioskę",
	"tracked"  : "Wioska badana",
	"untrked"  : "Wioska bez badania",
	"untrack"  : "Zaprzestaj badania",
	"cltrack"  : "wyczyść",
	"notrack"  : "No tracked villages",
	"oktrack"  : "tracked villages",
	"at_none"  : "Ponowny atak",
	"at_same"  : "Ponowny atak tymi samymi jednostkami",
	"at_all"   : "Ponowny atak wszystkimi jednostkami"
}

};



// ======== Global Vars ========

var TW_Use_Cache  = true;
var TW_Image_Base = "/graphic/";
var TW_World      = null;
var TWT_World     = null;
var TW_Domain     = null;
var TW_DotWhat    = null;
var TW_Hash       = null;
var TW_Screen     = null;
var TW_Mode       = null;
var TW_Is_Premium = false;
var TW_Quickbar   = null;
var TW_Village_Id = null;
var TW_Player_Id  = null;
var TW_Villages   = null;
var TW_Lang       = null;
var TW_Mpt        = null;
var TW_Is_Opera   = window.opera ? true : false;
var TW_World_Unit_Speed = 0;
var TW_World_Game_Speed = 0;


// ======== Entry Point ========

(function(){

	// Enhance Forum Screen
	if (location.href.match( /forum\.php/ )) {
		enhance_forum_screen();
		return;
	}

	// Enhance Mail screen
	if (location.href.match( /screen=mail/ )) {
		enhance_mail_screen();
		//return;
	}


	// Enhance Staemme Screen
	if(location.href.match( /staemme\.php/ )){
		enhance_staemme_screen();
		return;
	}

	// Enhance View-Thread Screen
	if(location.href.match( /screen=view_thread/ )){
		enhance_view_thread_screen();
		return;
	}

	// Init Server Info
	if(init_server_info() == false) return;

	// Init Logger
	if(init_logger() == false) return;

	// Init Game Info
	if(init_game_info() == false) return;

	// Add CSS style
	if(true) add_css_style();

	// Build Shortcuts Menu
	if(build_shortcuts_menu() == false) return;

	// Enhance Intro Screen
	if(location.href.match( /intro/ )){
		enhance_intro_screen();
		return;
	}

	// Enhance Main Screen
	if(TW_Screen == "main"){
		enhance_main_screen();
		return;
	}

	// Enhance Map Screen
	if(TW_Screen == "map"){
		enhance_map_screen();
		return;
	}

	// Enhance Info-Village Screen
	if(TW_Screen == "info_village"){
		enhance_info_village_screen();
		return;
	}

	// Enhance Report Screen
	if(TW_Screen == "report" && TW_Mode == "all"){
		enhance_report_screen();
		return;
	}

	// Enhance Market Screen
	if(TW_Screen == "market" && (!TW_Mode || TW_Mode == "send")){
		enhance_market_screen();
		return;
	}

})();


// ======== Enhance Staemme Screen ========

function enhance_staemme_screen(){

	// Remove ads
	var frmsets = $$("frameset");
	if(frmsets.length > 0){
		var frmset = frmsets[0];
		for(kk=0; kk<frmset.childNodes.length; kk++){
			var frm = frmset.childNodes[kk];
			if(frm.tagName=="FRAME" && frm.getAttribute("name") != "main"){
				frm.src = "about:blank";
			}
		}
		if(frmset.getAttribute("rows")) frmset.setAttribute("rows", "0, *");
		else frmset.setAttribute("cols", "*, 0");

		// Remove ads timer
		TW_Set_Function("reload", function(ad_top, ad_sky){; });

		// No need to go any further; this must be the top page
		return;
	}

	var iframes = $$("iframe");
	var ad_iframe   = null;
	var main_iframe = null;
	if(iframes.length == 2){
		if(iframes[0].getAttribute("name") == "main"){
			main_iframe = iframes[0];
			ad_iframe   = iframes[1];
		}else{
			ad_iframe   = iframes[0];
			main_iframe = iframes[1];
		}

		// Remove add iframe
		ad_iframe.src           = "about:blank";
		ad_iframe.style.display = "none";
		main_iframe.style.top   = "0px";
		main_iframe.style.left  = "0px";

		var ad_div = ad_iframe.parentNode;
		if(ad_div.tagName == "DIV"){
			ad_div.style.display = "none";
		}

		var main_div = main_iframe.parentNode;
		if(main_div.tagName == "DIV"){
			main_iframe.parentNode.style.top   = "0px";
			main_iframe.parentNode.style.right = "0px";
		}

		// Remove ads timer
		TW_Set_Function("reload", function(src_ad){; });
	}
}



// ======== Init Server Info ========

function init_server_info(){

	// Get TW_World
	var tmp = location.href.replace(/http:\/\//, "").split(".");
	TW_World = tmp[0];

	// Get TWT World
	TWT_World = TW_World;
	if(TW_World.substring(0, 2) == "en") TWT_World = "net" + TW_World.substring(2);

	// Get TW_Domain
	tmp = location.href.replace(/http:\/\//, "").split("/");
	TW_Domain = "http://" + tmp[0];

	// Get TW_DotWhat
	tmp = tmp[0].split(".");
	TW_DotWhat = tmp[tmp.length - 1];

	// Build unique string to identify a specific world on a specific server
	TW_Hash = TW_World + "_" + TW_DotWhat;

	// Get language; default to "en"
	TW_Lang = lng[TW_DotWhat];
	if(!TW_Lang) TW_Lang = lng["en"];

	// Get screen
	var tmp = location.href.match( /screen=([^&]+)/ );
	TW_Screen = (tmp && tmp[1]) ? tmp[1] : null;

	// Get mode
	var tmp = location.href.match( /mode=([^&]+)/ );
	TW_Mode = (tmp && tmp[1]) ? tmp[1] : null;
}


// ======== Init Logger ========

function init_logger(){
	var ldiv = document.createElement("DIV");
	ldiv.setAttribute("id"   , "ldiv");
	ldiv.setAttribute("title", " " + TW_Lang["c_close"] + " ");
	ldiv.setAttribute("style", "position:absolute; width:300px; left:10px; top:10px; border:2px #804000 solid; background-color:#F8F4E8; color:black; padding:10px; visibility:hidden; cursor:pointer; z-index:1000");
	ldiv.innerHTML = "&nbsp;";
	if ($$("body")[0]) {
		$$("body")[0].appendChild(ldiv);
		ldiv.addEventListener("click", hideLdiv, true);
	}
}

function hideLdiv(){
	$("ldiv").style.visibility = "hidden";
}

function tw_alert(title, text){
	$("ldiv").innerHTML = '<b style="display:block; margin-bottom:10px">' + title + '</b>' + text;
	$("ldiv").style.visibility = "visible";
}



// ======== Init Game Info ========

function init_game_info(){

	TW_Set_Function("clear_mpt", function(){
		window.setTimeout(function(){
			TW_setValue("MPTrk", "");
		}, 0);
	});

	// If coming from login; update cache
	if(location.href.match( /&intro&/ )){
		TW_Use_Cache = false;
	}

	// Get village ID
	TW_Village_Id = get_village_id();
	if(TW_Village_Id == null){
		//tw_alert("TW-Enhancer Error", "Cannot get Village ID; bailing out...");
		return false;
	}

	// Get player ID
	TW_Player_Id = get_player_id(TW_Village_Id);
	if(TW_Player_Id == null){
		//tw_alert("TW-Enhancer Error", "Cannot get Player ID; bailing out...");
		return false;
	}

	// Get villages list
	TW_Villages = get_villages(TW_Player_Id);

	// Is this a premium account?
	TW_Is_Premium = $("quickbar") ? true : false;
	if(TW_Is_Premium) TW_Quickbar = $("quickbar");

	// Thursday, January 24, 2008 - New version changed the quickbar
	var uls = $$("ul");
	for(kk=0; kk<uls.length; kk++){
		if(uls[kk].getAttribute("class") == "menu nowrap quickbar"){
			TW_Quickbar = uls[kk];
			TW_Is_Premium = true;
			break;
		}
	}

	// Update browser title
	for(kk=0; kk<TW_Villages.length; kk++){
		if(TW_Village_Id == TW_Villages[kk][0]){
			window.top.document.title = unescape(TW_Villages[kk][1]) + " (" + unescape(TW_Villages[kk][2]) + ")";
		}
	}
	if(TW_Screen) window.top.document.title += " - " + TW_Screen.substr(0,1).toUpperCase() + TW_Screen.substr(1, TW_Screen.length);

	// Debug
	if(TW_Use_Cache === false){
		var info = '';
		info += 'Player ID: ' + TW_Player_Id + '<br />Villages:<br /><ul style="margin-top:3px">';

		for(kk=0; kk<TW_Villages.length; kk++){
			info += '<li>' + TW_Villages[kk][1] + ' [' + TW_Villages[kk][2] + ']' + ' - ' + TW_Villages[kk][3] + '</li>';
		}
		info += '</ul>';

	// Get mpt points
	TW_Mpt = get_mpt();

		var mpt = get_mpt();
		var mpt_len = 0;
		for(i in mpt) mpt_len++;

		var pointtrackinfo = "";
		if (mpt_len > 0) {

			for (i in mpt) {

					if ((/^([0-9]+)$/).test(i)) {
						if (pointtrackinfo == '') pointtrackinfo = "<ul>";
						var url = TW_Domain + "/game.php?village="+TW_Villages[0][0]+"&screen=info_village&id="+i;
						var xhReqi = new XMLHttpRequest();
						xhReqi.open("GET", url, false);
						xhReqi.send(null);

						var response = new String(xhReqi.responseText);

						i_pointstmp = new String(response.match(/<tr><td>(\w+):<\/td><td width="180">(\d+)<span class="grey">.<\/span>(\d+)<\/td><\/tr>/));
						i_points = i_pointstmp.replace(/(.+)>(\d+)<([^0-9]+)>(\d+)<(.+)/gi, "$2$4");
						if (i_pointstmp == 'null') {
						i_pointstmp = new String(response.match(/<tr><td>(\w+):<\/td><td width="180">(\d+)<\/td><\/tr>/));
						i_points = i_pointstmp.replace(/(.+)>(\d+)<(.+)/gi, "$2");
						}
						i_village = new String(response.match(/<tr><th colspan="2">(.+)<\/th><\/tr>/));
						i_village = i_village.replace(/(.+),(.+)/gi, "$2");
						i_coords = new String(response.match(/<tr><td width="80">(\w+):<\/td><td>(\d+)\|(\d+)<\/td><\/tr>/));
						i_coords = i_coords.replace(/(.+),(\d+),(\d+)$/i, "$2|$3");


						pointtrackinfo += "<li><a href=\""+url+"\">"+i_village+' ['+i_coords+'] - '+i_points+"</a></li>";

					}
				}
		}
		if (pointtrackinfo != '') pointtrackinfo += "</ul>";


		info += mpt_len == 0 ? TW_Lang["notrack"] : mpt_len + ' ' + TW_Lang["oktrack"] + ' &raquo; <a href="javascript:;" onclick="clear_mpt()">' + TW_Lang["cltrack"] + '</a>' ;

		tw_alert("TW-Enhancer: Cache updated!" , info+pointtrackinfo);
	}

	// Make synchronous request
	var url = TW_Domain + "/interface.php?func=get_config";
	var xhReq = new XMLHttpRequest();
	xhReq.open("GET", url, false);
	xhReq.send(null);
	// Parse response
	var gs = xhReq.responseText.match( /<speed>(.+)<\/speed>/im );
	var us = xhReq.responseText.match( /<unit_speed>(.+)<\/unit_speed>/im );
	TW_World_Unit_Speed = us[1];
	TW_World_Game_Speed = gs[1];
	// Save to cache
	TW_setValue("TW_World_Unit_Speed", TW_World_Unit_Speed);
	TW_setValue("TW_World_Game_Speed", TW_World_Game_Speed);
}



// ======== Build Shortcuts Menu ========

function build_shortcuts_menu(){

	if (location.href.match(/building_popup.php/gi)) return;

	var menu_xhtml = '<table class="box" cellspacing="0" cellpadding="4"><tr>';

	// Add villages dropdown
	if(TW_Villages.length > 1){
		menu_xhtml += '<td style="padding:0px 4px"><select style="width:150px" onchange="switch_village(this)"><option value="">- - - - -</option>';
		for(kk=0; kk<TW_Villages.length; kk++){
			menu_xhtml += '<option value="' + TW_Villages[kk][0] + '"' + (TW_Village_Id == TW_Villages[kk][0] ? ' selected="selected"' : '') + '>' + unescape(TW_Villages[kk][1]) + ' [' + unescape(TW_Villages[kk][2]) + '] ' + TW_Villages[kk][3] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>';
		}
		menu_xhtml += '</select></td>';
	}

	// Add links
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=overview_villages"><img src="' + TW_Image_Base + 'unit/unit_snob.png" style="margin:0px 2px" title=" ' + TW_Lang["by"] + ' " /></a></td>';
menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=overview"><img src="' + TW_Image_Base + 'face.png" style="margin:0px 2px" title=" ' + TW_Lang["overview"] + ' " /></a></td>';
menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=map"><img src="' + TW_Image_Base + 'ally_rights/found.png" style="margin:0px 2px" title=" ' + TW_Lang["map"] + ' " /></a></td>';
	menu_xhtml += '<td style="border-left:dotted 1px"><a href="/game.php?village=' + TW_Village_Id + '&screen=main"><img src="' + TW_Image_Base + 'buildings/main.png" style="margin:0px 2px" title=" ' + TW_Lang["main"] + ' " /></a></td>';
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=barracks"><img src="' + TW_Image_Base + 'buildings/barracks.png" style="margin:0px 2px" title=" ' + TW_Lang["barracks"] + ' " /></a></td>';
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=stable"><img src="' + TW_Image_Base + 'buildings/stable.png" style="margin:0px 2px" title=" ' + TW_Lang["stable"] + ' " /></a></td>';
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=garage"><img src="' + TW_Image_Base + 'buildings/garage.png" style="margin:0px 2px" title=" ' + TW_Lang["garage"] + ' " /></a></td>';
	if(TW_Is_Premium){
		menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=smith"><img src="' + TW_Image_Base + 'buildings/smith.png" style="margin:0px 2px" title=" ' + TW_Lang["smith"] + ' " /></a></td>';
		menu_xhtml += '<td style="border-left:dotted 1px"><a href="/game.php?village=' + TW_Village_Id + '&screen=train"><img src="' + TW_Image_Base + 'unit/unit_sword.png" style="margin:0px 2px" title=" ' + TW_Lang["train"] + ' " /></a></td>';
	}else{
		menu_xhtml += '<td style="border-left:dotted 1px"><a href="/game.php?village=' + TW_Village_Id + '&screen=smith"><img src="' + TW_Image_Base + 'buildings/smith.png" style="margin:0px 2px" title=" ' + TW_Lang["smith"] + ' " /></a></td>';
	}
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=place"><img src="' + TW_Image_Base + 'buildings/place.png" style="margin:0px 2px" title=" ' + TW_Lang["place"] + ' " /></a></td>';
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=market"><img src="' + TW_Image_Base + 'buildings/market.png" style="margin:0px 2px" title=" ' + TW_Lang["market"] + ' " /></a></td>';
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=snob"><img src="' + TW_Image_Base + 'buildings/snob.png" style="margin:0px 2px" title=" ' + TW_Lang["snob"] + ' " /></a></td>';

	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=ally&mode=forum"><img src="' + TW_Image_Base + 'ally_forum.png" style="margin:0px 2px" title=" ' + TW_Lang["forum"] + ' " /></a></td>';
menu_xhtml += '<td style="border-left: dotted 1px"><a id="twtools_a" href="javascript:twtools_show()"><img id="twtools_img" src="' + TW_Image_Base + 'unten.png" style="margin:0px 2px" title="twstats" /></a></td>';
	menu_xhtml += '</tr></table>';

	TW_Set_Function("switch_village", function(selectObj){
		var target_village_id = selectObj.options[selectObj.selectedIndex].value;
		var redirect_to;
		if(target_village_id == ""){
			redirect_to = "/game.php?village=" + TW_Village_Id + "&screen=overview_villages";
		}else{
			redirect_to = location.href.replace(/village=([^&]+)/, "village=" + target_village_id);
		}
		location.href = redirect_to;
	});

	TW_Set_Variable("twtools_hidden", "yes");
	TW_Set_Function("twtools_show", function(){
		if(TW_Get_Variable("twtools_hidden") == "yes"){
			$("twtools_div").style.display = "block";
			$("twtools_img").src = "graphic/oben.png";
			$("twtools_tribe").focus();
			$("twtools_tribe").value = TW_Lang["player"];
			$("twtools_tribe").select();
			window.setTimeout(function(){
				TW_Set_Variable("twtools_hidden", "no");
			}, 0);
		}else{
			$("twtools_div").style.display = "none";
			$("twtools_img").src = "graphic/unten.png";
			window.setTimeout(function(){
				TW_Set_Variable("twtools_hidden", "yes");
			}, 0);
		}
	});

	TW_Set_Function("i_focus", function(i_obj){
		if(i_obj.value == TW_Lang["player"] || i_obj.value == TW_Lang["tribe"]) i_obj.value = "";
	});

	TW_Set_Function("i_blur_tribe", function(i_obj){
		if(i_obj.value == "") i_obj.value = TW_Lang["player"];
	});

	TW_Set_Function("i_blur_ally", function(i_obj){
		if(i_obj.value == "") i_obj.value = TW_Lang["tribe"];
	});


	TW_Set_Function("tribe_info", function(){
		var i_obj = $("twtools_tribe");
		var tribe_name = i_obj.value;
		if(tribe_name=="" || tribe_name==TW_Lang["player"]){
			i_obj.value = "";
			i_obj.focus();
			return;
		}
		window.open("http://twstats.se/index.php?page=search&name=" + escape(tribe_name) + "&type=player");
	});

	TW_Set_Function("ally_info", function(){
		var i_obj = $("twtools_ally");
		var ally_name = i_obj.value;
		if(ally_name=="" || ally_name==TW_Lang["tribe"]){
			i_obj.value = "";
			i_obj.focus();
			return;
		}
			window.open("http://twstats.se/index.php?page=search&name=" + escape(ally_name) + "&type=tribe");
	});



	// ======== Add twstats Bar ========

	var twt_xhtml = '';
	twt_xhtml += '<table class="box" cellspacing="0" cellpadding="3" style="margin-top:4px"><tr>';
	twt_xhtml += '<td><a href="http://' + TWT_World + '.twstats.com/index.php?object=main&method=worldindex&lng=en&type=html" target="_blank">twstats</a>:</td>';
	twt_xhtml += '<td><input type="text" id="twtools_tribe" value="' + TW_Lang["player"] + '" onfocus="i_focus(this)" onblur="i_blur_tribe(this)" /><a href="javascript:tribe_info()"><img src="' + TW_Image_Base + 'rechts.png" style="margin:0px 2px" title="' + TW_Lang["i_player"] + '" /></a></td>'
	twt_xhtml += '<td><input type="text" id="twtools_ally" value="' + TW_Lang["tribe"] + '" onfocus="i_focus(this)" onblur="i_blur_ally(this)" /><a href="javascript:ally_info()"><img src="' + TW_Image_Base + 'rechts.png" style="margin:0px 2px" title="' + TW_Lang["i_tribe"] + '" /></a></td>'
	twt_xhtml += '</tr></table>';

	// Remove premium quickbar
	if(TW_Is_Premium){

		var rplc = null;

		// Premium account
		var quickbar = $("quickbar");
		if(quickbar){

			// Hide quickbar
			quickbar.style.display = "none";
			var brElm = quickbar.previousSibling;
			while(brElm && brElm.tagName != "BR") brElm = brElm.previousSibling;
			if(brElm && brElm.tagName == "BR") brElm.style.display = "none";

			// Get target container
			rplc = quickbar.nextSibling;
			while(rplc.tagName != "TABLE") rplc = rplc.nextSibling;
			if(TW_Is_Opera){
				rplc = rplc.childNodes[0].childNodes[0].childNodes[0];
			}else{
				rplc = rplc.childNodes[1].childNodes[0].childNodes[1];
			}
			rplc.innerHTML = menu_xhtml + '<div id="twtools_div" style="display:none">' + twt_xhtml + '</div>';
		}

		// Thursday, January 24, 2008 - New quickbar
		var menu_row2 = $("menu_row2");
		if(menu_row2){

			// Hide quickbar
			TW_Quickbar.style.display = "none";

			// Remove <br/>
			var brElm = TW_Quickbar.parentNode;
			while(brElm && brElm.tagName != "TABLE") brElm = brElm.parentNode;
			if(brElm){
				brElm = brElm.previousSibling;
				while(brElm && brElm.tagName != "BR") brElm = brElm.previousSibling;
				if(brElm && brElm.tagName == "BR") brElm.style.display = "none";
			}

			// Get target container
			rplc = menu_row2.parentNode;
			while(rplc.tagName != "TABLE") rplc = rplc.parentNode;
			if(rplc) rplc = rplc.parentNode;
		}

		// If target container found, replace content
		if(rplc){
			rplc.innerHTML = menu_xhtml + '<div id="twtools_div" style="display:none">' + twt_xhtml + '</div>';
		}

	}else{

		// Non-premium account
		var rplc = null;
		if(TW_Is_Opera){
			if ($$('table')[1]) {
					rplc = $$('table')[1].childNodes[0].childNodes[0].childNodes[0];
				}
		}else{
			if ($$('table')[1]) {
					rplc = $$('table')[1].childNodes[1].childNodes[0].childNodes[1];
				}
		}
		if (rplc != null) {
		rplc.innerHTML = menu_xhtml + '<div id="twtools_div" style="display:none">' + twt_xhtml + '</div>';
		}
		if(TW_Is_Opera && $$('table')[1]){
			$$('table')[1].childNodes[0].childNodes[0].childNodes[1].setAttribute("valign", "top");
		}else if ($$('table')[1]){
			$$('table')[1].childNodes[1].childNodes[0].childNodes[3].setAttribute("valign", "top");
		}
	}
}




// ======== Add CSS Style ========

function add_css_style(){
	var new_css = "";

	// Global
	new_css += "body, th { background-image:url('data:image/gif;base64,R0lGODlhLwAwAJEAAOLVuuHRtuLYvuHXvCH5BAAAAAAALAAAAAAvADAAAAL/lI8IEO3/wDCj2hpkBakzqF3fl2mLtSzRJEwDqXWHCDYWtEFZSV1WchHoKi2Eq8VQcWY+IjM4eLAks2Jrx3q+VKXQz/BhOTjESbjz0umorcsY1xYGZNE1abUlquf6eeKuYVNnxtXlsnboV4Y4mEZRmOGDkxbA0ldZh/l1kEIZuQVDuVTkQLRglMW5FCrWIOFgdOc0M0Y3eQOHoGO0l5VZ2vZrEzfcQBsxEokkKNgGUYQxyilFM7JBxRD8WyZ0olBiLLkj6KmIEX6jYmls8JlzUCrscq4pt5mRoBnF5CqKj+uFHL0q3sIVUedEYL8c+ly5CqYNBThM7T5ZY/gpQr+I/564YAyRxA05fLo4CknFAJdFgZnS5TMp7UoiiyFVuizZREDMfVcWXqR3E15EMEAUjbnmjpVGZZvqjFiCx6nIbz+P/PA3qmWOEHLyDZtH5tQRWMdOpOGa5JTOrzIPcXuo06PNhLXWUmTq6Nwqai+0tlJWcRxEp2SXkYM0i6SuCNDuVPrDR2WzihPYlcMEok9PGisWP4AmLJ6zcY9n8sVIsce2WeW8yBkikibHIGZJUAjcpmqmVyzFTTTnSVwTjYEwY0pymh7L3oDOOb/sw7G759HVQKrrOyrDJoT2uMoq8ff0jj5mpPjOJg7QK2x8wU7FPX65a02kH/UlP7sgCWnvxx9eyFp9vWzRWQ/8MNIXF9JJtVsMMgTj3R7n0ddXhQUAADs=') !important }\n";
	new_css += "table { border-collapse:collapse }\n";
	new_css += "th { font-variant: small-caps }\n";
	new_css += "table.main, table.box, table.menu { background-image:url('data:image/gif;base64,R0lGODlhLwAwAJEAAPHp2vHr3PHm1/Hs3SH5BAAAAAAALAAAAAAvADAAAAL/nB2TFwECo5ygMWtATZX58VDaqEGhoHGA4jQnurlvd9S1I5VCgkfOS8HYhpfJDkFUGFeIhZP3PLxYtAsowuQxRqaUZxFaYIVXlLVnzEGl2AkyAHEigN00zdmOKAwQG9ocBgeoZrPEE1dIobQjyGHk51a20pCAdaL1ZalHWXYk4YHFx5jU0Ne5J4oiKGDzIqTShaowk5jTtKo3l6Z6YMTZadqrivgHE7TYU9sHxVtDyxZ682BR6VNjiZCHWn2ZcXJjzWI7YA036Xho6oqnCgYzGXaNB87LlYXDtPgWPtvhlU1M1IIrWeKlMoHpxqxIi2g8yHdikh1Ze+gcichmYLeH/+Dm0DjCRqIJBiA7OcrHx6OYVmZW5YOj0RrHaypTOmsZTUlMRDOz1QQxkOAiM9kghsJ1VKFFRyMzEO0x8FjQN0BINuspaB8ij/0GrsK0lSCGhxoWliQ3z6q/EvcMlopWriW6oU59sDuLbWggJCbC6WBldZm4KnWbFia6ZVQ1fuSGHSn2FyGyEMqevv2ky07UCb/osBzjQUdZr7hQNn7Et2mcqUUAf9sMMsS5xX8T7nH52kK3dFOXIGsELBjApmIAJw4VaOSM3gyLyzErQjOSoYSgveRhUerOyPc6ZZH1Q/a/23XFpAiKFDEGas+FTFmDPXu7JKTSIyFhidKP6vSh9xs1vtwHqNhBAhcoBEEMWXcQgd0uu6SwloADFAAAOw==') !important }\n";
	new_css += "table.menu tr td { background-color:transparent; background-image:none !important }\n";
	new_css += "table.vis, table.menu table { background-image:url('data:image/gif;base64,R0lGODlhLwAwAJEAAPjx5Pjz5vjv4fj06CH5BAAAAAAALAAAAAAvADAAAAL/nH8RByAPYwQL2casdrIp1YQQNpDD14zVEnCCp2mtSz1MdLrSG/eXVPG1JkGfMYAzAHy03owTKiI4h9EpyJHmdDuYBflKURE2A3byGL4miepDJCDHf1awIl1iW95itwa9NPACMueg82eVJyClAmEEoTaXAKkY6MZTYskU6EK34DgVtigDpYXUJ6d3Caq085bK2prk9ikJxpdCaWADtremKQisGDbV9PPjUDRiOVKmsLtWlhkLBqw3FhzqxjnbqmlIgr1L5suJ6i3nK6lkru4bailu+GpUiQkdP+qNiXZPd5jH0KQgt8wMSmDpmRKCyaDpO/GwIEQKUxJgQTCkgi6I5wRBnSqS8CJCfRuRdHR20ExIBgxJ4jF4RqCgZv5CRSszL+E9edGEbXjjj17AdKkutCtKFN2NELL2kJNjTqbSVdwk+XOwTZY0Wcr4XBqjEKi0XOtuWRNG45sxbfC2zqw1aRnZh7zc8qm5w2YXWG65rAvY8EspGaKsicVLz8QmrXRuPHRYw626SF9izUQENNCgIfssz5QK7WedNHaG1fzsWdoZmpF1JPya4oNjU3O7UKwsKpHj0ypzRemBLSWdN1rq4ZY80hVv46bLUqCxIsey4oJdq14L3PaHJ7WXvAxx23ht5WFAmKFeAAA7'); border-left:1px #DED3B9 solid; border-top:1px #DED3B9 solid; border-collapse:collapse; margin:1px }\n";
	new_css += "table.vis tr td { background-color:transparent; background-image:none; padding:2px 3px; border-bottom:1px #DED3B9 solid; border-right:1px #DED3B9 solid }\n";
	new_css += 'table.vis table.vis, table.vis table.vis td { border:0px !important }';
	new_css += "table.vis th { padding:3px 3px }\n";
	new_css += "table.vis tr.row_a td { background-color:transparent }\n";
	new_css += "table.vis tr.row_b td { background-color:transparent }\n";
	new_css += "tr.lit, tr.lit2, td.inactive { background-image:url('data:image/gif;base64,R0lGODlhAwADAIAAAPj05/Hn2CH5BAAAAAAALAAAAAADAAMAAAIETHAZBQA7') !important }\n";

	// Report detail
	new_css += "h4 + table td { border:0px !important }\n";
	new_css += 'h4 + table tr td table tr td { padding:0px !important; border:0px !important }';
	new_css += "h4 + table + table td { border:0px !important }\n";

	// Market - Make offer
	new_css += "table + h3 + form table table td { border:0px !important }\n";

	// Time server
	new_css += 'p[align="right"] { background-color:#DED3B9 !important; padding:2px; font-size:10px !important }';

	// Cosmetic fixes
	new_css += "table.box {height: 30px !important; }\n";
	new_css += "table.box select {width: 200px !important; }\n";
	switch (TW_Screen) {

		case 'overview_villages':
				// Clean up the page a bit
				new_css += "table.vis {width: 100%; }\n";
				new_css += "table.villagenames { width: 100%; } \n";
				new_css += "table.villagenames, table.villagenames td {border: none !important; }\n";
				new_css += "table.villagenames td.coords { width: 80px; } \n";
				new_css += "table.villagenames td.continent { width: 40px; } \n";
				new_css += "table.resources { width: 90%; align: center; }\n";
				new_css += "table.resources, table.resources td {border: none !important; }\n";
				new_css += "table.resources td {align: left; width: 85px; } \n";

				// Grab the tables in the page
				var celltable = $$("table");

				// Structure the village names
				celltable[7].childNodes[1].innerHTML = celltable[7].childNodes[1].innerHTML.replace(/<span id="label_text_(\d+)">(.+)\s\((\d+)\|(\d+)\)\sK(\d+)<\/span>/gi, "$2 ($3|$4) X$5");
				celltable[7].childNodes[1].innerHTML = celltable[7].childNodes[1].innerHTML.replace(/<a href="game.php\?village=(\d+)&amp;screen=overview&amp;">(\s+)(.+)\s\((\d+)\|(\d+)\)\sX(\d+)(\s+)<\/a>/gi, "<table class=\"villagenames\"><tr><td><a href=\"game.php\?village=$1&amp;screen=overview&amp;\">$3</a></td><td class=\"coords\"><a href=\"game.php?village=$1&screen=map\">($4|$5)</a></td><td class=\"continent\">K$6</td></tr></table>");

				// Structure the resources
				celltable[7].childNodes[1].innerHTML = celltable[7].childNodes[1].innerHTML.replace(/<span class="grey">.<\/span>/gi,"");
				celltable[7].childNodes[1].innerHTML = celltable[7].childNodes[1].innerHTML.replace(/<img src="graphic\/holz.png" title="Wood" alt="">(\d+)\s/gi,"<table class='resources'><tr><td><img src=\"graphic/holz.png\" title=\"Wood\" alt=\"\" /> $1</td>");
				celltable[7].childNodes[1].innerHTML = celltable[7].childNodes[1].innerHTML.replace(/<img src="graphic\/lehm.png" title="Clay" alt="">(\d+)\s/gi,"<td><img src=\"graphic/lehm.png\" title=\"Clay\" alt=\"\" /> $1</td>");
				celltable[7].childNodes[1].innerHTML = celltable[7].childNodes[1].innerHTML.replace(/<img src="graphic\/eisen.png" title="Iron" alt="">(\d+)\s/gi,"<td><img src=\"graphic/eisen.png\" title=\"Iron\" alt=\"\" /> $1</td></tr></table>");
			break;
		case 'market':
				new_css += "#innerpopdiv table { width: 100%; }\n";
				new_css += "#innerpopdiv table.menu td { text-align: center; v-align: middle; } \n";

				// Grab the tables in the page
				var celltable = $$("table");

				if (celltable[13].childNodes[1]) {

				// Add js call and ids to the input fields
				celltable[13].childNodes[1].innerHTML = celltable[13].childNodes[1].innerHTML.replace(/<input name="(\w+)" value="" size="5" type="text">/gi, "<input name=\"$1\" value=\"\" size=\"5\" type=\"text\" id=\"input_$1\">");
				celltable[13].childNodes[1].innerHTML = celltable[13].childNodes[1].innerHTML.replace(/<a href="javascript:popup_scroll\('(.+)', (\d+), (\d+)\)">([^<]+)<\/a>/gi, "<a href=\"javascript:popup_scroll('$1', $2, $3)\">$4</a> <a href=\"javascript:inpagePopup('$1',$2,$3)\" id=\"inpagepoplink\"><img src=\"/graphic/rechts.png\" /></a><div id=\"innerpopdiv\" style=\"display: none;\">&nbsp;</div>");

				if (TW_getValue("showpoponhover") == 1) { $("inpagepoplink").setAttribute("onmouseover", $("inpagepoplink").getAttribute("href")); }
				}
			break;
		case 'place':
				new_css += "#innerpopdiv table { width: 100%; }\n";
				new_css += "#innerpopdiv table.menu td { text-align: center; v-align: middle; } \n";

				// Grab the tables in the page
				var celltable = $$("table");

				if (celltable[15]) {
				// Add js call and ids to the input fields
				celltable[15].innerHTML = celltable[15].innerHTML.replace(/<input name="(\w+)" value="" size="5" type="text">/gi, "<input name=\"$1\" value=\"\" size=\"5\" type=\"text\" id=\"input_$1\">");
				celltable[15].innerHTML = celltable[15].innerHTML.replace(/<a href="javascript:popup_scroll\('(.+)', (\d+), (\d+)\)">([^<]+)<\/a>/gi, "<a href=\"javascript:popup_scroll('$1', $2, $3)\">$4</a> <a href=\"javascript:inpagePopup('$1',$2,$3)\" id=\"inpagepoplink\"><img src=\"/graphic/rechts.png\" /></a><div id=\"innerpopdiv\" style=\"display: none;\">&nbsp;</div>");

				if (TW_getValue("showpoponhover") == 1) { $("inpagepoplink").setAttribute("onmouseover", $("inpagepoplink").getAttribute("href")); }
				}
			break;
	}


	// Add style
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = new_css;
	document.getElementsByTagName('head')[0].appendChild(style);
}



// ======== Enhance View-Thread Screen ========

function enhance_view_thread_screen(){
	var iframes = $$("iframe");
	if(iframes.length == 1) iframes[0].parentNode.style.display = "none";
}



// ======== Enhance Intro Screen ========

function enhance_intro_screen(){

	// Invalidate cache when coming form login
	TW_Use_Cache = false;

	// Remove premium reminder
	var tbls = $$("table");
	var main_found = 0;
	for(kk=0; kk<tbls.length; kk++){
		if(tbls[kk].getAttribute("class") == "main"){
			tbls[kk].setAttribute("id", "main_" + main_found);
			main_found++;
		}
	}

	if(main_found == 2){
		$("main_0").style.display = "none";
		var brElm = $("main_0").previousSibling;
		while(brElm.tagName != "BR") brElm = brElm.previousSibling;
		if(brElm.tagName == "BR") brElm.style.display = "none";

		var brElm = $("main_0").nextSibling;
		while(brElm.tagName != "BR") brElm = brElm.nextSibling;
		if(brElm.tagName == "BR") brElm.style.display = "none";
	}
}



// ======== Enhance Main Screen ========

function enhance_main_screen(){

	// Remove premium reminder; this gets annoying after some time
	var tbls = $$('table');
	for(kk=0; kk<tbls.length; kk++){
		var table = tbls[kk];
		if(table.getAttribute("class") != "vis") continue;
		var tableChilds = table.childNodes[0].childNodes;
		if(tableChilds.length == 1){
			var nextBr = table.nextSibling;
			if(nextBr && nextBr.tagName == "BR"){
				nextBr.style.display = "none";
				table.style.display  = "none";
				break;
			}
		}
	}
}



// ======== Enhance Map Screen ========

function enhance_map_screen(){
	// Get map size
	var new_size = TW_getValue("MSize");
	if(!new_size) new_size = 15;
	window.setTimeout(function() {
	TW_setValue("MSize", new_size);
	},0);

	TW_Set_Function("resize_map", function(){
		var mss = $("map_size_select");
		var nsz = parseInt(mss.options[mss.selectedIndex].value);

		window.setTimeout(function(){TW_setValue("MSize", nsz);}, 0);
		window.setTimeout("window.location.reload(true)", 100);
	});
	TW_Set_Function("search_map", function(){

		var plr = $("mark_player");
		var trb = $("mark_tribe");
		var map = document.getElementById("mapCoords");

		var villages = map.getElementsByTagName("img");

		for (i = 0; i < villages.length; i++) {

				var tmp = villages[i].getAttribute("onmouseover");

				if (tmp != null) {
						tmp = tmp.replace(/map_popup\('(.+)', '(.*)', '(.*)', (\d+), '(.+)\s\((.+)\)', '(.+)\s\((.+) Points\)', (\w+), (\w+), (\w+), (\w+)\)/gi, "$5 $7");

						if (villages[i].getAttribute("rel") != null) {

								villages[i].style.border = 'none';
								villages[i].style.width = '53px';
								villages[i].style.height = '38px';
								villages[i].setAttribute("rel", null);
							}

						if (plr.value != '') {
								if (tmp.match(new RegExp(plr.value, "i"))) {
										villages[i].style.border = '1px solid red';
										villages[i].style.width = '51px';
										villages[i].style.height = '36px';
										villages[i].setAttribute("rel","searched");
									}
							}
						if (trb.value != '') {
								if (tmp.match(new RegExp(trb.value+"$", "i")) && villages[i].getAttribute("rel") == null) {
										villages[i].style.border = '1px solid blue';
										villages[i].style.width = '51px';
										villages[i].style.height = '36px';
										villages[i].setAttribute("rel","searched");
									}
							}
					}

			}
	});

	var form = $$("form")[1];
	var sizes = [7, 10, 12, 15, 18, 20, 22, 24, 26, 28, 30];
	var iHtml = '<table><tr><td colspan="2">&nbsp;</td></tr><tr><td align="right">Map size: </td><td><select id="map_size_select" onchange="resize_map()">';
	for(kk=0; kk<sizes.length; kk++) iHtml += '<option ' + (sizes[kk]==new_size ? 'selected="selected" ' : '') + 'value="' + sizes[kk] +'">' + sizes[kk] + 'x' + sizes[kk] + '</option>';

	iHtml += '</select></td></tr>';
	iHtml += '<tr><td align="right">Mark player: </td><td><input type="text" id="mark_player" size="8" /><input type="text" id="mark_tribe" size="8" /><a href="javascript:search_map();"><img src="'+TW_Image_Base+'/map/map_e.png" /></a></td></tr>';

	iHtml += '</table>';
	form.innerHTML += iHtml;

	var map_requests_needed = null;
	var map_requests_size   = null;

	if(new_size < 16){
		map_requests_needed = 1;
	}else{
		map_requests_needed = 4;
		map_requests_size   = parseInt(new_size / 2);
		new_size = map_requests_size * 2;
	}

	// Get mpt points
	TW_Mpt = get_mpt();

	// Get current position
	var map_x = TW_Get_Variable("mapX");
	var map_y = TW_Get_Variable("mapY");
	var map_s = TW_Get_Variable("mapSize");

	// Calculate new X and Y
	var delta = parseInt((map_s - new_size) / 2);

	// Overwrite values
	map_x += delta;
	map_y += delta;

	// InnerHTML
	var ihtml = "";
	ihtml += '<tr>';
	ihtml += '<td height="38">' + map_y + '</td>';
	ihtml += '<td colspan="' + new_size + '" rowspan="' + new_size + '">';
	ihtml += '<div style="background-image:url(graphic/map/gras1.png); position:relative; width:' + (53 * new_size) + 'px; height:' + (38 * new_size) +'px; overflow:hidden" id="map">';
	ihtml += '<div id="mapOld" style="position:absolute">';
	if(map_requests_needed == 4){
		var w = 53 * map_requests_size + 1;
		var h = 38 * map_requests_size + 2;
		ihtml += '<table cellspacing="0" cellpadding="0"><tr><td><div id="old_1" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div></div></td><td><div id="old_2" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr><tr><td><div id="old_3" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td><td><div id="old_4" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr></table>';
	}
	ihtml += '<div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div>';
	ihtml += '</div>';
	ihtml += '<div id="mapNew" style="position:absolute; left:0px; top:0px">&nbsp;</div>';
	ihtml += '</div>';
	ihtml += '</td>';
	ihtml += '</tr>';
	for(jj=1; jj<new_size; jj++){
		ihtml += '<tr><td width="20" height="38">' + (map_y + jj) + '</td></tr>';
	}
	ihtml += '<tr id="map_x_axis">';
	ihtml += '<td height="20"></td>';
	for(jj=0; jj<new_size; jj++){
		ihtml += '<td align="center" width="53">' + (map_x + jj) + '</td>';
	}
	ihtml += '</tr>';
	$("mapCoords").innerHTML = ihtml;

	// Update data (asynchronously)
	if(map_requests_needed == 1){
		var url = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + new_size + '&size_y=' + new_size;
		var xhReq = new XMLHttpRequest();
		xhReq.open("GET", url, true);
		xhReq.onreadystatechange = function(){
			if(xhReq.readyState != 4 || xhReq.status != 200) return;
			$("mapOld").innerHTML = xhReq.responseText;
		}
		xhReq.send(null);
	}else{
		var url_1 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		var url_2 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_requests_size) + '&start_y=' + map_y + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		var url_3 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + (map_y + map_requests_size) + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		var url_4 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_requests_size) + '&start_y=' + (map_y + map_requests_size) + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;

		var xhReq_1 = new XMLHttpRequest();
		xhReq_1.open("GET", url_1, true);
		xhReq_1.onreadystatechange = function(){
			if(xhReq_1.readyState != 4 || xhReq_1.status != 200) return;
			$("old_1").innerHTML = xhReq_1.responseText;
		}
		xhReq_1.send(null);

		var xhReq_2 = new XMLHttpRequest();
		xhReq_2.open("GET", url_2, true);
		xhReq_2.onreadystatechange = function(){
			if(xhReq_2.readyState != 4 || xhReq_2.status != 200) return;
			$("old_2").innerHTML = xhReq_2.responseText;
		}
		xhReq_2.send(null);

		var xhReq_3 = new XMLHttpRequest();
		xhReq_3.open("GET", url_3, true);
		xhReq_3.onreadystatechange = function(){
			if(xhReq_3.readyState != 4 || xhReq_3.status != 200) return;
			$("old_3").innerHTML = xhReq_3.responseText;
		}
		xhReq_3.send(null);

		var xhReq_4 = new XMLHttpRequest();
		xhReq_4.open("GET", url_4, true);
		xhReq_4.onreadystatechange = function(){
			if(xhReq_4.readyState != 4 || xhReq_4.status != 200) return;
			$("old_4").innerHTML = xhReq_4.responseText;
		}
		xhReq_4.send(null);

		TW_Set_Function("downloadMapData", function(x_mod, y_mod){

			var map_x  = TW_Get_Variable("mapX");
			var map_y  = TW_Get_Variable("mapY");
			var map_s  = TW_Get_Variable("mapSize");
			var map_ss = map_s / 2;

			map_x += x_mod * map_s;
			map_y += y_mod * map_s;

			window.setTimeout(function() {
			TW_Set_Variable("mapX", map_x);
			TW_Set_Variable("mapY", map_y);}, 0);

			// Prepare new blocks
			var w = 53 * map_ss + 1;
			var h = 38 * map_ss + 1;
			var map_new = TW_Get_Variable("mapNew");
			map_new.innerHTML = '<table cellspacing="0" cellpadding="0"><tr><td><div id="new_1" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div></div></td><td><div id="new_2" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr><tr><td><div id="new_3" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td><td><div id="new_4" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr></table>';

			var url_1 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + map_ss + '&size_y=' + map_ss;
			var url_2 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_ss) + '&start_y=' + map_y + '&size_x=' + map_ss + '&size_y=' + map_ss;
			var url_3 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + (map_y + map_ss) + '&size_x=' + map_ss + '&size_y=' + map_ss;
			var url_4 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_ss) + '&start_y=' + (map_y + map_ss) + '&size_x=' + map_ss + '&size_y=' + map_ss;

			var xhReq_1 = new XMLHttpRequest();
			xhReq_1.open("GET", url_1, true);
			xhReq_1.onreadystatechange = function(){
				if(xhReq_1.readyState != 4 || xhReq_1.status != 200) return;
				$("new_1").innerHTML = xhReq_1.responseText;
			}
			xhReq_1.send(null);

			var xhReq_2 = new XMLHttpRequest();
			xhReq_2.open("GET", url_2, true);
			xhReq_2.onreadystatechange = function(){
				if(xhReq_2.readyState != 4 || xhReq_2.status != 200) return;
				$("new_2").innerHTML = xhReq_2.responseText;
			}
			xhReq_2.send(null);

			var xhReq_3 = new XMLHttpRequest();
			xhReq_3.open("GET", url_3, true);
			xhReq_3.onreadystatechange = function(){
				if(xhReq_3.readyState != 4 || xhReq_3.status != 200) return;
				$("new_3").innerHTML = xhReq_3.responseText;
			}
			xhReq_3.send(null);

			var xhReq_4 = new XMLHttpRequest();
			xhReq_4.open("GET", url_4, true);
			xhReq_4.onreadystatechange = function(){
				if(xhReq_4.readyState != 4 || xhReq_4.status != 200) return;
				$("new_4").innerHTML = xhReq_4.responseText;
			}
			xhReq_4.send(null);
		});

		// ScrollX fix
		function watchMouse(e){
			var info = document.getElementById("info");
			if(!info || info.style.visibility != "visible") return false;

			var scrollX, scrollY, mouseX, mouseY;
			if(e){
				scrollX = window.pageXOffset;
				scrollY = window.pageYOffset;
				mouseX  = e.clientX;
				mouseY  = e.clientY;
			}else{
				scrollX = document.body.scrollLeft;
				scrollY = document.body.scrollTop;
				mouseX  = window.event.clientX;
				mouseY  = window.event.clientY;
			}

			info.style.left = mouseX + 5 + scrollX + "px";
			info.style.top =  mouseY - 100 + scrollY + "px";
			return true;
		};

		if(document.addEventListener) document.addEventListener("mousemove", watchMouse, true);
		else document.onmousemove = watchMouse;
	}

	// ajaxMapInit()
	window.setTimeout(function() {
	TW_Set_Variable("mapOld",  $('mapOld'));
	TW_Set_Variable("mapNew",  $('mapNew'));
	TW_Set_Variable("mapX",    map_x);
	TW_Set_Variable("mapY",    map_y);
	TW_Set_Variable("mapSize", new_size);
	}, 0);

	// mapMoveTopo()
	var scrollX = map_x;
	var scrollY = map_y;
	window.setTimeout(function() {
	TW_Set_Variable("scrollX", scrollX);
	TW_Set_Variable("scrollY", scrollY);
	}, 0);
	var topoX = parseInt(document.getElementsByName('min_x')[0].value);
	var topoY = parseInt(document.getElementsByName('min_y')[0].value);

	var relX = scrollX - topoX;
	if(TW_Get_Variable("globalYDir") == 1){
		var relY = scrollY - topoY;
	}else{
		var relY = (45-mapSize) - (scrollY-topoY);
	}

	// Rechteck verschieben (whatever this mean :)
	$('topoRect').style.left   = (5*(relX)) + 'px';
	$('topoRect').style.top    = (5*(relY)) + 'px';
	$('topoRect').style.width  = (5*(new_size)) + 'px';
	$('topoRect').style.height = (5*(new_size)) + 'px';

	// Tracking
	TW_Set_Function("old_map_popup", TW_Get_Function("map_popup"));
	TW_Set_Function("map_popup", function(title, bonus_image, bonus_text, points, owner, ally, village_groups, moral, village_id, source_id){
		var x_title  = arguments[0];
		var x_points = null;
		if(arguments.length == 8){
			x_points = arguments[1];
			(TW_Get_Function("old_map_popup"))(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
		}else{
			x_points = arguments[3];
			(TW_Get_Function("old_map_popup"))(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
		}


		var tmp = x_title.match( /\((\d+\|\d+)\)/ ); // fixed bug with ( and ) symbols in village names
		var vlg_coords = tmp && tmp[1] ? tmp[1] : null;

		if(vlg_coords != null){

		// added by Svel
		distancesBetweenVillages(vlg_coords);

			vlg_coords = vlg_coords.replace(/\|/, "x");

			var villagelinks = $("mapCoords").getElementsByTagName("a");
			for (i =0; i < villagelinks.length; i++) {

				var curvil = new String(villagelinks[i].innerHTML);
				var curcord = curvil.replace(/(.+)\((\d+)\|(\d+)\)(.+)/gi, "$2x$3");
				if (curcord == vlg_coords) {
						curid = villagelinks[i].href.replace(/^(.+)id=(\d+)$/i, "$2");
					}
				}
			var pointrackinfo = (get_mpt_xhtml(vlg_coords, x_points) != '') ? get_mpt_xhtml(vlg_coords, x_points) : get_mpt_xhtml(curid, x_points);
			$("info_points").innerHTML = x_points + pointrackinfo;
		}
	});
	// added by Svel
	var floatInfo = document.getElementById('info_content').getElementsByTagName('tbody')[0];

	var floatInfoTd = document.createElement('td');
	floatInfoTd.setAttribute('id', 'info_speed_counter1');
	floatInfoTd.setAttribute('colspan', '2');
	var floatInfoRow = document.createElement('tr');
	floatInfoRow.appendChild(floatInfoTd);
	floatInfo.appendChild(floatInfoRow);

	var floatInfoTd = document.createElement('td');
	floatInfoTd.setAttribute('id', 'info_speed_counter2');
	floatInfoTd.setAttribute('colspan', '2');
	var floatInfoRow = document.createElement('tr');
	floatInfoRow.appendChild(floatInfoTd);
	floatInfo.appendChild(floatInfoRow);

	if(TW_World_Unit_Speed === 0) TW_World_Unit_Speed = TW_getValue("TW_World_Unit_Speed");
	if(TW_World_Game_Speed === 0) TW_World_Game_Speed = TW_getValue("TW_World_Game_Speed");
}



// ======== Enhance Info-Village Screen ========

function enhance_info_village_screen(){
	var tbls = $$("table");
	var tmp = [];
	for(kk=0; kk<tbls.length; kk++){
		if(tbls[kk].getAttribute("class") == "vis"){
			tmp = tbls[kk].innerHTML.match( /<td>([^\<]+)<\/td>/i );
			break;
		}
	}

	var village_id = location.href.replace(/(.+)=(\d+)$/gi, "$2");

	var village_coords = (tmp && tmp[1]) ? tmp[1] : null;
	if(village_coords == null) return;
	village_coords = village_coords.replace(/\|/, "x");

	TW_Mpt = get_mpt();

	var xhtml = '';
	if(TW_Mpt[village_id] == null){
		xhtml += ' <span id="tracklink"><a href="javascript:add_track(\'' + village_id + '\')">&raquo; ' + TW_Lang['track'] + '</a></span>';
	}else if (TW_Mpt[village_coords]) {
		xhtml += ' <span id="tracklink"><a href="javascript:del_track(\'' + village_coords + '\')">&raquo; ' + TW_Lang['untrack'] + '</a></span>';
	} else {
		xhtml += ' <span id="tracklink"><a href="javascript:del_track(\'' + village_id + '\')">&raquo; ' + TW_Lang['untrack'] + '</a></span>';
		village_coords = village_id;
	}

	var tds = $$("td");
	for(kk=0; kk<tds.length; kk++){
		if(tds[kk].getAttribute("width") != "180") continue;
		tds[kk].innerHTML += xhtml;
	}

	TW_Set_Function("add_track", function(village_id){
		$("tracklink").innerHTML = TW_Lang["tracked"];
		window.setTimeout(function(){
			put_mpt(village_id, 0);
		}, 0);
	});

	TW_Set_Function("del_track", function(village_coords){
		$("tracklink").innerHTML = TW_Lang["untrked"];
		window.setTimeout(function(){
			var cacheMpt = get_mpt();
			cacheMpt[village_coords] = null;
			TW_setValue("MPTrk", serialize_x(cacheMpt));
		}, 0);
	});

	TW_Set_Function("clear_mpt", function(){
		window.setTimeout(function(){
			TW_setValue("MPTrk", "");
		}, 0);
	});
}




// ======== Enhance Report Screen ========

function enhance_report_screen(){

	// Do not alter premium account
	if(TW_Is_Premium) return;

	// To start, grab all the relevant elements
	var hrefs = $$("a");

	// Get the report id
	var tmp = location.href.match( /view=([^&]+)/ );
	if(!tmp || !tmp[1]) return;
	var report_id = tmp[1];

	// Get attacker village
	//attacker = hrefs[0].getAttribute("href").replace(/^game.php\?village=(\d+)&(.+)$/gi, "$1");

	// Check I am the attacher
/*	var my_attack;
	for(kk=0; kk<TW_Villages.length; kk++){
		if(TW_Villages[kk][0] == attacker){
			my_attack = true;
			break;
		}
	}
	if(my_attack !== true) return;
*/
	var attacker_vlg = null;
	var enemy_x, enemy_y;
	var spear,sword,axe,archer,scout,light_cav,marcher,heavy_cav,ram,catapult,paladin,noble;
	var as = $$("a");
	for(kk=0; kk < as.length; kk++){

		attackervil = as[kk].href.match(/(.+)screen=info_village(.+)id=(\d+)$/);//game\.php\?village=(\d+)&amp;

		if(attackervil != null) {

			isAttacker = false;

			for(xy=0; xy<TW_Villages.length; xy++){
				if(TW_Villages[xy][0] == attackervil[attackervil.length-1]){
					isAttacker = true;
					break;
				}
			}
			if (isAttacker == true) {
				attacker_vlg = attackervil[attackervil.length-1];

				tbl = as[kk].parentNode.parentNode.parentNode;
				trs = tbl.getElementsByTagName("tr");
				tds = trs[4].getElementsByTagName("td");

				if (tds.length > 10) {
					spear = tds[1].innerHTML;
					sword = tds[2].innerHTML;
					axe = tds[3].innerHTML;
					archer = tds[4].innerHTML;
					spy = tds[5].innerHTML;
					light = tds[6].innerHTML;
					marcher = tds[7].innerHTML;
					heavy = tds[8].innerHTML;
					ram = tds[9].innerHTML;
					catapult = tds[10].innerHTML;
					knight = tds[11].innerHTML;
					snob = tds[12].innerHTML;
				} else {
					spear = tds[1].innerHTML;
					sword = tds[2].innerHTML;
					axe = tds[3].innerHTML;
					spy = tds[4].innerHTML;
					light = tds[5].innerHTML;
					heavy = tds[6].innerHTML;
					ram = tds[7].innerHTML;
					catapult = tds[8].innerHTML;
					snob = tds[9].innerHTML;
					marcher = 0;
					archer = 0;
					knight = 0;
				}
			} else {
				var trs = as[kk].parentNode.parentNode.parentNode.getElementsByTagName('tr');
				enemy_x = trs[1].innerHTML.replace(/(.+)\((\d+)\|(\d+)\)\s(.+)/gi,"$2");
				enemy_y = trs[1].innerHTML.replace(/(.+)\((\d+)\|(\d+)\)\s(.+)/gi,"$3");
				defender = attackervil[attackervil.length-1];
			}
		}
	}

	if (attacker_vlg == null) return;


	TW_Set_Function("attackAgain", function(cx, cy, vid, spear, sword, axe, archer,spy,light,marcher,heavy,ram,catapult,knight,snob){

			var postform  = "<form name=\"units\" id=\"units\" action=\"game.php?village="+vid+"&amp;screen=place&amp;try=confirm\" method=\"post\">";
			postform += "<input name=\"spear\" value=\""+spear+"\" type=\"hidden\">";
			postform += "<input name=\"sword\" value=\""+sword+"\" type=\"hidden\">";
			postform += "<input name=\"axe\" value=\""+axe+"\" type=\"hidden\">";
			postform += "<input name=\"archer\" value=\""+archer+"\" type=\"hidden\">";
			postform += "<input name=\"spy\" value=\""+spy+"\" type=\"hidden\">";
			postform += "<input name=\"light\" value=\""+light+"\" type=\"hidden\">";
			postform += "<input name=\"marcher\" value=\""+marcher+"\" type=\"hidden\">";
			postform += "<input name=\"heavy\" value=\""+heavy+"\" type=\"hidden\">";
			postform += "<input name=\"ram\" value=\""+ram+"\" type=\"hidden\">";
			postform += "<input name=\"catapult\" value=\""+catapult+"\" type=\"hidden\">";
			postform += "<input name=\"knight\" value=\""+knight+"\" type=\"hidden\">";
			postform += "<input name=\"snob\" value=\""+snob+"\" type=\"hidden\">";
			postform += "<input name=\"x\" value=\""+cx+"\" type=\"hidden\">";
			postform += "<input name=\"y\" value=\""+cy+"\" type=\"hidden\">";
			postform += "<input class=\"attack\" name=\"attack\" value=\"Attack\" type=\"hidden\" id=\"doAttack\" style=\"display: none;\">";
			postform += "</form>";

			$("unitpostdiv").innerHTML = postform;
			$("units").submit();
	});
	TW_Set_Function("attackAll", function(cx, cy, vid) {


			// Collect all troops info
			url = "game.php?village="+vid+"&screen=place";
			var xhReq = new XMLHttpRequest();
			xhReq.open("GET", url, false);
			xhReq.send(null);

			resultStart = xhReq.responseText.search(/<form/gi);
			resultEnd = xhReq.responseText.search(/<\/form/gi);

			response_total = xhReq.responseText.substr(resultStart, (resultEnd-resultStart));

			spear = new String(response_total.match(/\.spear, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");
			sword = new String(response_total.match(/\.sword, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");
			axe = new String(response_total.match(/\.axe, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");
			archer = new String(response_total.match(/\.archer, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");
			spy = new String(response_total.match(/\.spy, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");
			light = new String(response_total.match(/\.light, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");
			marcher = new String(response_total.match(/\.marcher, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");
			heavy = new String(response_total.match(/\.heavy, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");
			ram = new String(response_total.match(/\.ram, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");
			catapult = new String(response_total.match(/\.catapult, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");
			knight = new String(response_total.match(/\.knight, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");
			snob = new String(response_total.match(/\.snob, (\d+)\)">/gi)).replace(/([^0-9]+)(\d+)\)">/i,"$2");

			if ((/([0-9]+)/).test(archer) == false) {

					marcher = 0;

					archer = 0;

					knight = 0;

			}

			var postform  = "<form name=\"units\" id=\"units\" action=\"game.php?village="+vid+"&amp;screen=place&amp;try=confirm\" method=\"post\">";
			postform += "<input name=\"spear\" value=\""+spear+"\" type=\"hidden\">";
			postform += "<input name=\"sword\" value=\""+sword+"\" type=\"hidden\">";
			postform += "<input name=\"axe\" value=\""+axe+"\" type=\"hidden\">";
			postform += "<input name=\"archer\" value=\""+archer+"\" type=\"hidden\">";
			postform += "<input name=\"spy\" value=\""+spy+"\" type=\"hidden\">";
			postform += "<input name=\"light\" value=\""+light+"\" type=\"hidden\">";
			postform += "<input name=\"marcher\" value=\""+marcher+"\" type=\"hidden\">";
			postform += "<input name=\"heavy\" value=\""+heavy+"\" type=\"hidden\">";
			postform += "<input name=\"ram\" value=\""+ram+"\" type=\"hidden\">";
			postform += "<input name=\"catapult\" value=\""+catapult+"\" type=\"hidden\">";
			postform += "<input name=\"knight\" value=\""+knight+"\" type=\"hidden\">";
			postform += "<input name=\"snob\" value=\""+snob+"\" type=\"hidden\">";
			postform += "<input name=\"x\" value=\""+cx+"\" type=\"hidden\">";
			postform += "<input name=\"y\" value=\""+cy+"\" type=\"hidden\">";
			postform += "<input class=\"attack\" name=\"attack\" value=\"Attack\" type=\"hidden\" id=\"doAttack\" style=\"display: none;\">";
			postform += "</form>";

			$("unitpostdiv").innerHTML = postform;
			$("units").submit();

		});

	// Get target DOM node
	var tds = $$("td");
	for(kk=0; kk<tds.length; kk++){
		if(tds[kk].getAttribute("height") == "160"){
			if(tds[kk].innerHTML.search( /\/rabe/ ) < 10) return;
			var xhtml = '<table class="vis" width="100%"><tr><th>Attack options:</td></tr>';
			xhtml += '<tr><td><a href="game.php?village=' + attacker_vlg + '&screen=place&mode=command&target='+defender+'"><img src="' + TW_Image_Base + 'command/attack.png" align="absmiddle" /> ' + TW_Lang["at_none"] + '</a></td></tr>';
			xhtml += '<tr><td><a href="javascript:attackAgain('+enemy_x+','+ enemy_y +','+ attacker_vlg +','+ spear +','+ sword +','+ axe +','+ archer +','+ spy +','+ light +','+ marcher +','+ heavy +','+ ram +','+ catapult +','+ knight +','+ snob+');"><img src="' + TW_Image_Base + 'command/attack.png" align="absmiddle" /> ' + TW_Lang["at_same"] + '</a></td></tr>';
			xhtml += '<tr><td><a href="javascript:attackAll('+enemy_x+','+enemy_y +','+ attacker_vlg +');"><img src="' + TW_Image_Base + 'command/attack.png" align="absmiddle" /> ' + TW_Lang["at_all"] + '</a></td></tr>';
			//xhtml += '<tr><td style="padding-bottom:10px"><a href="game.php?village=' + TW_Village_Id + '&screen=place&mode=sim&report_id=' + report_id + '"><img src="' + TW_Image_Base + 'command/attack.png" align="absmiddle" /> Sim</a></td></tr>';
			xhtml += '</tr></table>';
			xhtml += '</td></tr>';
			xhtml += '</table><div id="unitpostdiv">&nbsp;</div>';
			// Add xhtml & break the for cycle
			tds[kk].innerHTML += xhtml;
			return;
		}
	}
}

// ======== Enhance Forum Screen =========
function enhance_forum_screen() {

	var adframes = $$("iframe");
	for (i = 0; i < adframes.length; i++) {
		adframes[i].src = 'about:blank';
	}
	var posts = $$("div");
	for (i = 0; i < posts.length; i++) {
		if (posts[i].innerHTML.match(/<iframe/,"gi") != null) {
			posts[i].style.display = "none";
		}
	}

	enhance_mail_screen();
}


// ======== Enhance Mail Screen =========
function enhance_mail_screen() {

	var body = $$("body");

	var random = new Date;
	random = random.getTime();

	var xhtml = "<table class='bbcodearea'> " +
			"<tr>    " +

			"</tr>   " +
			"</table>";

	document.body.innerHTML = document.body.innerHTML.replace( /<textarea\s/gi, xhtml+"<textarea id=\"txt_"+random+"\" ");

	TW_Set_Function("insertBB", function(insertType, ident){

			txt = document.getElementById("txt_"+ident);

			var start = txt.selectionStart;
			var end   = txt.selectionEnd;
			var txtlength = 0;
			var insertButton = '';
			var txtinsertBefore = '';
			var txtinsertAfter = '';
			var selection = '';
			var selectionBefore = '';
			var selectionAfter = '';

			switch (insertType) {
				case 'player':
					txtinsertBefore = "[player]";
					txtinsertAfter = "[/player]";
					insertButton = 'P';
					break;
				case 'village':
					txtinsertBefore = "[village]";
					txtinsertAfter = "[/village]";
					insertButton = 'V';
					break;
				case 'tribe':
					txtinsertBefore = "[ally]";
					txtinsertAfter = "[/ally]";
					insertButton = 'A';
					break;
			}

			if (start == end) {
					txt.value = txt.value.substr(0, start) + txtinsertBefore + txtinsertAfter + txt.value.substr(end, txt.value.length);
				} else {
					txtlength = txt.value.length;
					selection = txt.value.substr(start, (end - start));
					selectionBefore = txt.value.substr(0, start);
					selectionAfter = txt.value.substr(end, txtlength);

					if (insertButton == 'V' && selection.match(/(\d+){3}([\/|]+){1}(\d+){3}/gi)) {
						selection = selection.replace(/(.*)(\d+)(\d+)(\d+)([\/|]+){1}(\d+)(\d+)(\d+)(.*)/gi, "$2$3$4|$6$7$8");
					}

					txt.value = selectionBefore + txtinsertBefore + selection + txtinsertAfter + selectionAfter;

				}
		});


}


// ======== Enhance Market Screen ========

function enhance_market_screen(){

	// Do not alter premium account
	if(TW_Is_Premium) return;
}



// ======== Generic Helper Functions ========

// DOM Shortcuts
function $(elm_id){
	return document.getElementById(elm_id);
}

function $$(tag_name){
	return document.getElementsByTagName(tag_name);
}

// Map Points Tracking
function get_mpt_xhtml(village_coords, points){
	if(TW_Mpt[village_coords] == null) return "";

	put_mpt(village_coords, points);
	var delta = points - TW_Mpt[village_coords];
	if(delta > 0) return ' <span style="color:green">(+' + delta + ')</span>';
	if(delta == 0) return ' <span style="color:black">(0)</span>';
	return ' <span style="color:red">(-' + Math.abs(delta) + ')</span>';
}

function get_mpt(){
	var cacheMpt = TW_getValue("MPTrk");
	if(!cacheMpt || cacheMpt == ""){
		cacheMpt = [];
	}else{
		cacheMpt = unserialize(cacheMpt);
	}
	return cacheMpt;
}


function put_mpt(village_coords, points){
	window.setTimeout(function() {
	var cacheMpt = get_mpt();
	cacheMpt[village_coords] = points;
	var to_save = serialize_x(cacheMpt);
	TW_setValue("MPTrk", to_save);
	},0);
}

// Persistent Storage
function TW_setValue(key, new_val){
	if(!TW_Is_Opera){
		GM_setValue(TW_Hash + "" + key, new_val);
		return;
	}

	// Opera patch
	document.cookie = escape(key) + "=" + escape(new_val) + ";expires=" + (new Date((new Date()).getTime() + 31536000000)).toGMTString() + ";path=/";
}

function TW_getValue(xkey){
	if(!TW_Is_Opera) return GM_getValue(TW_Hash + "" + xkey);

	// Opera patch
	var all_cookies = document.cookie.split("; ");
	for(kk=0; kk<all_cookies.length; kk++){
		var this_cookie = all_cookies[kk];
		var tmp = this_cookie.split("=");
		if(tmp[0] == xkey){
			return unescape(tmp[1]);
		}
	}
	return null;
}

function TW_delValue(key){
	if(!TW_getValue(key)) return;
	if(!TW_Is_Opera) GM_setValue(TW_Hash + "", "");

	// Opera patch
	document.cookie = key + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

// Unsafe window handling
function TW_Set_Variable(name, new_val){
	if(typeof unsafeWindow == "object"){
		unsafeWindow[name] = new_val;
	}else if(TW_Is_Opera){
		window[name] = new_val;
		/*
		window.opera.defineMagicVariable(
			name,
			function(curVal) { new_val; },
			function(newVal) { null; }
		);
		*/
	}
}

function TW_Get_Variable(name){
	if(typeof unsafeWindow == "object"){
		return unsafeWindow[name];
	//}else if(TW_Is_Opera){
	} else {
		return window[name];
	}
}


function TW_Set_Function(func, new_func){



	if(typeof unsafeWindow == "object"){
		unsafeWindow[func] = new_func;
	}else if(TW_Is_Opera){
		window[func] = new_func;
		/*
		window.opera.defineMagicFunction(
			func,
			function(oRealFunc, oThis, oParam1, oParam2){
				return oParam1.getElementById('oParam2').style;
			}
		);
		*/
	}
}

function TW_Get_Function(func){
	if(typeof unsafeWindow == "object"){
		return unsafeWindow[func];
	//}else if(TW_Is_Opera){
	} else {
		return window[func];
	}
}


// Serialize / Unserialize
function serialize(obj){
	var a=[], i, l = obj.length, v;

	for(i=0; i<l; i++){
		v = obj[i];
		switch(typeof v){
			case 'object':
				if(v){
					a.push(serialize(v));
				}else{
					a.push('null');
				}
				break;

			case 'string':
				a.push('"' + escape(v.replace(/\\/g, /\\\\/).replace(/"/g, "\\\"")) + '"');
				break;

			case 'number':
			case 'boolean':
				a.push(v + '');
				break;

			default:
				a.push('null');
		}
	}
	//alert(a);
	return '[' + a.join(',') + ']';
}

window.escape = function(str)
{
	var converter = Components.classes['@mozilla.org/intl/texttosuburi;1']
							  .createInstance(Components.interfaces.nsITextToSubURI);
	return converter.ConvertAndEscape('windows-1251', str);
}

function serialize_x(obj){
	var ret_val = '{';
	for(i in obj){
		if(obj[i] == null) continue;
		ret_val += '"' + i + '":' + obj[i] + ',';
	}
	if(ret_val != '{') ret_val = ret_val.substring(0, ret_val.length - 1);
	ret_val += '}';
	return ret_val;
}

function unserialize(str){
	//alert("(" + str + ")");
	var STR = eval("(" + str + ")");
	return STR;
}



// ======== Game Helper Functions ========

function get_village_id(){
	var logoutLink = $$('a')[0];
	if(!logoutLink) return 0;

	var logoutLinkHref = logoutLink.getAttribute("href");
	var tmp = logoutLinkHref.match( /village=([^&]+)/ );
	return (tmp && tmp[1]) ? tmp[1] : null;
}

function get_player_id(vlg_id){

	// Cache hit ?
	var player_id = TW_getValue("PlayerID");
	if(player_id && TW_Use_Cache) return player_id;

	// Make synchronous request
	var url = TW_Domain + "/guest.php?screen=info_village&id=" + vlg_id;
	var xhReq = new XMLHttpRequest();
	xhReq.open("GET", url, false);
	xhReq.send(null);

	// Parse response
	var tmp = xhReq.responseText.match( /info_player&amp;id=([^"]+)/ );
	player_id = tmp && tmp[1] ? tmp[1] : 0;
	if(player_id == 0) return null;

	// Save to cache
	TW_setValue("PlayerID", player_id);

	// Return Player ID
	return player_id;
}

function get_villages(player_id){

	// Cache hit ?
	var vlgs = TW_getValue("TW_Villages");
	if(vlgs && TW_Use_Cache) return unserialize(vlgs);

	// Init villages array
	vlgs = new Array();

	// Make synchronous request
	var url = TW_Domain + "/guest.php?screen=info_player&id=" + player_id;
	var xhReq = new XMLHttpRequest();
	xhReq.open("GET", url, false);
	xhReq.send(null);

	// Parse response
	var tmp = xhReq.responseText.match( /info_village&amp;id=([^"]+)">([^<]+)<\/a><\/td><td>([^<]+)<\/td><td>([^<]+)(<span class="grey">\.<\/span>([^<]+))?/gi );
	if(tmp.length == 0) return null;
	for(jj=0; jj<tmp.length; jj++){
		var tmpx = tmp[jj].match( /info_village&amp;id=([^"]+)">([^<]+)<\/a><\/td><td>([^<]+)<\/td><td>([^<]+)(<span class="grey">\.<\/span>([^<]+))?/i );
		var vlg_id     = tmpx[1];
		var vlg_name   = tmpx[2];
		var vlg_coords = tmpx[3];
		var vlg_points = tmpx[4];
		if(tmpx[6]) vlg_points += "." + tmpx[6];
		vlgs[jj] = [vlg_id, vlg_name, vlg_coords, vlg_points];
	}

	// Save to cache
	TW_setValue("TW_Villages", serialize(vlgs));

	// Return villages array
	return vlgs;
}
TW_Set_Function("inpagePopup", function (url,pwidth,pheight) {

	window.setTimeout(function() {
		var popdiv = $("innerpopdiv");

		//if (popdiv.style.display == 'block') { popdiv.style.display = 'none'; return;}

		if (popdiv.innerHTML.length < 20) {

		var xhReq = new XMLHttpRequest();
		xhReq.open("GET", url, false);
		xhReq.send(null);
		var tmp = xhReq.responseText;
		} else {
		var tmp = popdiv.innerHTML;
		}
		var ischecked = (TW_getValue("showpoponhover") == 1) ? "checked=\"checked\"" : "";


		popdiv.setAttribute("style", "position: absolute; height: "+pheight+"px; width: 500px; display:block;");

		popdiv.innerHTML = tmp.replace(/<\?xml([a-zA-Z0-9<>"._\-=\n\t\s]+)<\/h3>([a-zA-Z0-9<>"._\-=\n\t\s]+)/gi, "$2");
		popdiv.innerHTML = popdiv.innerHTML.replace(/<h3>(\w+)<\/h3>/gi, "<table class=\"menu\"><tr><td><b>$1</b></td><td><a href=\"#\" onclick=\"javascript:document.getElementById('innerpopdiv').style.display = 'none';\">"+TW_Lang["pop_close"]+"</a></td><td>"+TW_Lang["pop_auto"]+" <input type=\"checkbox\" id=\"showpoponhover\" "+ischecked+" onclick=\"setShowOnHover(this.checked);\"></td></tr></table>");
		popdiv.innerHTML = popdiv.innerHTML.replace(/javascript:selectTarget\((\d+), (\d+)\)/gi, "javascript:selectTargetInPage($1, $2)");
	},0);

});
var ischecked = (TW_getValue("showpoponhover") == 1)
TW_Set_Function("setShowOnHover", function(bool) {

	if (bool == true) { window.setTimeout(function() {TW_setValue("showpoponhover",1)},0); } else { window.setTimeout(function() {TW_setValue("showpoponhover",0)},0); }
	//window.setTimeout(function() {if (TW_getValue("showpoponhover") == 1) { $("inpagepoplink").setAttribute("onmouseover", $("inpagepoplink").getAttribute("href")); }},0);
	//alert(TW_GetValue("showpoponhover"));
});

TW_Set_Function("selectTargetInPage", function(x, y) {
$("input_x").value = x;
$("input_y").value = y;
$("innerpopdiv").style.display = 'none';
});

// ======== Debug Crap - !! Remove me in production !! ========

function alert_r(obj){
	tw_alert("DEBUG: alert_r()", print_r(obj));
}

function print_r(obj){
	var str = "";
	if(typeof obj != "object") return obj + "";

	for(i in obj){
		str += "[" + i + "] = [" + print_r(obj[i]) + "]\n";
	}
	return str;
}










// ======== Resurser ========




var TWR_resources = {0:"wood",1:"stone",2:"iron"};

var TWR_lng = "ru";

var TWR_dicts = {
  "en" : {"storage" : "Storage", "today" : "Today at", "tomorrow" : "Tomorrow at"},
  "ru" : {"storage" : "Склад", "today" : "Сегодня в", "tomorrow" : "Завтра в"},
  "de" : {"storage" : "Vorrat", "today" : "heute um", "tomorrow" : "morgen um"},
  "sk" : {"storage" : "Sklad", "today" : "Dnes o", "tomorrow" : "Zajtra o"},
  "cs" : {"storage" : "Skladiště", "today" : "Dnes v", "tomorrow" : "Zítra v"}
  }
var TWR_dict;

var TWR_wbar = 400;
var TWR_res = {
	"wood":0,
	"stone":0,
	"iron":0
};
var TWR_resIncome = {
	"wood":1,
	"stone":1,
	"iron":1
};
var TWR_storage = 1000;

var TWR_imgs = {
	"holz.png"  : "wood",
	"lehm.png"  : "stone",
	"eisen.png" : "iron",
};

var TWR_imgsrc = {
	"wood"  : "graphic/holz.png",
	"stone" : "graphic/lehm.png",
	"iron"  : "graphic/eisen.png"
};

var TWR_timers = new Array();
var TWR_timers_start = (new Date()).getTime()/1000;

readLng();
loadResources();
modifyPrices();
resourceTable();
startTimers();


function readLng(){

	// Get TW_World
	var tmp = location.href.replace(/http:\/\//, "");
	tmp = tmp.split(".");
	TWR_lng = tmp[0].substring(0,2);

	// Get language; default to "en"
	TWR_dict = TWR_dicts[TWR_lng];
	if(!TWR_dict) TWR_dict = TWR_dicts["en"];
}

function formatDate(time)
{
  var now = new Date();
  var tommorow = new Date(now.getTime() + (24*3600000));
  var dt = new Date(now.getTime() + (time*3600000));
  var dts = "";

  if (now.getDate()==dt.getDate()) dts = TWR_dict["today"];
  else if (tommorow.getDate()==dt.getDate()) dts = TWR_dict["tomorrow"];
  else dts = dt.getDate() + "."+dt.getMonth()+".";

  var min =dt.getMinutes();
  if (min<10) min = "0"+min;
  return dts+" "+dt.getHours() + ":"+min;
}

function formatTimeString(time)
{
/*
	var sec = Math.floor(time%60);
	if (sec<10) sec = "0"+sec;
	*/
	time =Math.floor(time/60);

	var min = Math.floor(time%60);
	if (min<10) min = "0"+min;
	var hour = Math.floor(time/60);
	return hour+":"+min ;//+":"+sec;
}

function formatTime(time)
{

   time *= 3600;
	return "<span class='TWR_timer' start='"+time+"'>"+formatTimeString(time)+"</span>";

}

function loadRes(name)
{
  var ores = document.getElementById(name);
  if (ores) {
	TWR_res[name] = ores.innerHTML;
	TWR_resIncome[name] = ores.getAttribute("title");
  }
}

function loadResources()
{
  loadRes("wood");
  loadRes("stone");
  loadRes("iron");
  var ores = document.getElementById("storage");
  if (ores) TWR_storage = ores.innerHTML;
}
function modifyPricesSnob()
{
  var prices = document.getElementsByTagName("img");
  for (var i=0; i<prices.length; i++ ) {
	var price = prices[i];
	var src = price.src;
	src = src.substring(src.lastIndexOf('/')+1);
	var restype = TWR_imgs[src];
	if (!restype) continue;

	var par = price.parentNode;
	if (par.tagName!="TD") continue;

	var res = price.nextSibling.data ;
	res = res * 1000;
	var dif = res - TWR_res[restype];
	if (dif<=0) {
	  par.innerHTML += "<br><span style='color:green; font-size: 80%;'><img src='"+price.src+"'>&nbsp;+"+(-dif)+"</span>";
	} else {
	  var ft = formatTime(dif / TWR_resIncome[restype]);
	  par.innerHTML += "<br><span style='color:red; font-size: 80%;'><img src='"+price.src+"'>&nbsp;-"+dif+"&nbsp;&nbsp;&nbsp;&nbsp;("+ft+")</span>";
	}

  }
}

function trim(string) {
	return string.replace(/(^\s+)|(\s+$)/g, "");
}

function modifyPrices()
{
  if (location.href.match( /screen=snob/ )) modifyPricesSnob();
  if((!location.href.match( /screen=main/ )) && (!location.href.match( /screen=smith/ ))) return;
  var prices = document.getElementsByTagName("img");
  for (var i=0; i<prices.length; i++ ) {
	var price = prices[i];
	var src = price.src;
	src = src.substring(src.lastIndexOf('/')+1);
	var restype = TWR_imgs[src];
	if (!restype) continue;
	var par = price.parentNode;
	if (par.tagName!="TD") continue;
	var res = par.innerHTML;
	var fResStr = res.substr(res.search(src));
	res = trim(fResStr.substr(fResStr.indexOf('>')+1));
	res = res.match(/^\d+/);
	var dif = res - TWR_res[restype];
	par.innerHTML += '<div>';
	if (dif<=0) {
	  par.innerHTML += "<span style='color:green; font-size: 80%;'>&nbsp;+"+(-dif)+"</span>";
	} else if (dif < 1000) {
	  var ft = formatTime(dif / TWR_resIncome[restype]);
	  par.innerHTML += "<span style='color:red; font-size: 80%;'>&nbsp;-"+dif+" ("+ft+")</span>";
	} else {
	  var ft = formatTime(dif / TWR_resIncome[restype]);
	  par.innerHTML += "<span style='color:red; font-size: 80%;'>&nbsp;-"+dif+" ("+ft+")</span>";
	}
	par.innerHTML += '</div>';
  }
}

function logger(text) //only debug
{
document.getElementById("serverTime").innerHTML += text+"<br>";
}

function resourceTable(){
  if (!TWR_res["wood"]) return;
	var resDiv = document.createElement( 'div' );
	resDiv.className = 'box';
	resDiv.setAttribute('align', 'center');
	resDiv.innerHTML = "<br><br>";
	var resTable = document.createElement( 'table' );
 //resTable.id='ResTable';
	resTable.className = 'vis';
		resTable.setAttribute('align', 'center');
	var row =document.createElement('tr');
	var cell = document.createElement('th');
	cell.setAttribute('colspan',5);
	cell.innerHTML=TWR_dict["storage"];

	row.appendChild( cell );
  resTable.appendChild(row);

  for each (var cr in TWR_resources) {
	   var row =document.createElement('tr');
	   row.className = 'lit';
	   var cell = document.createElement('td');
	   var img = document.createElement('img');
	   img.src = TWR_imgsrc[cr];
	   cell.appendChild(img);
	   row.appendChild( cell );

	   cell = document.createElement('td');
	   cell.innerHTML = TWR_res[cr] + " / +" + TWR_resIncome[cr];
	   row.appendChild( cell );


	   cell = document.createElement('td');
	   var perc = (TWR_res[cr] / TWR_storage)*100;

	   var sperc = Math.floor(perc) + "%";
	   var color = "green";
	   var wbar = TWR_wbar * (perc/100);
	   if (perc>90) color="red";
	   else if (perc>80) color="yellow";
	 cell.innerHTML = "<div style='font-size: 80%; width: "+TWR_wbar+"px;'><div style='text-align: right; background-color: "+color+"; width: "+wbar+"px; '>&nbsp;"+sperc+"&nbsp;</div></div>";
	   row.appendChild( cell );

	 var time = (TWR_storage-TWR_res[cr])/TWR_resIncome[cr];

	   cell = document.createElement('td');
	   cell.innerHTML = formatTime(time);
	   row.appendChild( cell );

	   cell = document.createElement('td');
	   cell.innerHTML = formatDate(time);
	   row.appendChild( cell );

	   resTable.appendChild(row);
		}
		resDiv.appendChild(resTable);
		document.body.appendChild(resDiv);
}


function ticker()
{
  var now = (new Date()).getTime()/1000;
   for each (var tmr in TWR_timers) {
		var time = tmr.getAttribute("start");
		time = time - (now-TWR_timers_start);
		tmr.innerHTML = formatTimeString(time);
   }
   setTimeout(ticker,10000);
}

function startTimers()
{
  var spans = document.getElementsByTagName("span");
  var items = 0;
  for (var i=0; i<spans.length; i++ )
	if (spans[i].className == 'TWR_timer') {

		TWR_timers[items] = spans[i];
		items++
   }
  setTimeout(ticker,10000);
}



	  // ======== Rozwiniecie ========

	  (function(){

		if (location.href.match( /forum\.php/ )) {
			CambiaForo();
			return;
		}

		if (location.href.match( /screen=mail/ )) {
			CambiaCuadroTexto();
			//return;
		}

	  })();

	  function CambiaForo() {

		var body = $$("body");

		var random = new Date;
		random = random.getTime();

		var xhtml = "<div class='bbcodearea'> " +
				"<p>    " +
				'	<a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="'+ TW_Image_Base +'/face.png" alt="Gracz" title="Gracz"/></a>' +
				'	<a tabindex="11" href="javascript:insertBB(\'village\','+random+');"><img src="'+ TW_Image_Base +'/buildings/main.png" alt="Wioska" title="Wioska"/></a>' +
				'	<a tabindex="12" href="javascript:insertBB(\'tribe\','+random+');"><img src="'+ TW_Image_Base +'/command/support.png" alt="Plemie" title="Plemie"/></a>' +
			'          |'+
				'	<a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://tnij.org/a60d" alt="Pogrubienie" title="Pogrubienie"/></a>' +
				'	<a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://tnij.org/a60e" alt="Kursywa" title="Kursywa"/></a>' +
				'	<a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://tnij.org/a60f" alt="Podkreslenie" title="Podkreslenie" /></a>' +
				'	|' +
				'	<a tabindex="16" href="javascript:insertBB(\'quote\','+random+');"><img src="http://tnij.org/a60g" alt="Cytat" title="Cytat" /></a>' +
				'	<a tabindex="17" href="javascript:insertBB(\'url\','+random+');"><img src="http://tnij.org/a60l" alt="URL" title="URL"/></a>' +
					'	<a tabindex="18" href="javascript:insertBB(\'img\','+random+');"><img src="http://tnij.org/a60h" alt="Obraz" title="Obraz"/></a>' +
				'	|' +
					'	<select>'+
					'	<option onclick="javascript:insertBB(\'bmaly\','+random+');">- -</option>'+
					'	<option onclick="javascript:insertBB(\'maly\','+random+');">-</option>'+
					'	<option onclick="javascript:insertBB(\'normal\','+random+');" selected="selected">Normal</option>'+
					'	<option onclick="javascript:insertBB(\'duzy\','+random+');">+</option>'+
					'	<option onclick="javascript:insertBB(\'bduzy\','+random+');">++</option>'+
					'</select>'+
					'<select>'+
					'<option onclick="javascript:insertBB(\'czarny\','+random+');" style="color: black; background-color: #FAFAFA" value="black">Standard</option>'+
					'<option onclick="javascript:insertBB(\'bialy\','+random+');" style="color: white; background-color: #FAFAFA" value="white"  >Vit</option>'+
					'<option onclick="javascript:insertBB(\'zolty\','+random+');" style="color: yellow; background-color: #FAFAFA" value="yellow"  >Gul</option>'+
					'<option onclick="javascript:insertBB(\'pomaranczowy\','+random+');" style="color: orange; background-color: #FAFAFA" value="Orange"  >Pomaranczowy</option>'+
					'<option onclick="javascript:insertBB(\'czerwony\','+random+');" style="color: red; background-color: #FAFAFA" value="red"  >R&ouml;d</option>'+
					'<option onclick="javascript:insertBB(\'indygo\','+random+');" style="color: indigo; background-color: #FAFAFA" value="indigo"  >Lila</option>'+
					'<option onclick="javascript:insertBB(\'fioletowy\','+random+');" style="color: violet; background-color: #FAFAFA" value="violet"  >Violet</option>'+
					'<option onclick="javascript:insertBB(\'niebieski\','+random+');" style="color: blue; background-color: #FAFAFA" value="blue"  >Bl&aring;</option>'+
					'<option onclick="javascript:insertBB(\'cniebieski\','+random+');" style="color: darkblue; background-color: #FAFAFA" value="darkblue"  >M&ouml;rkbl&aring;</option>'+
					'<option onclick="javascript:insertBB(\'cyan\','+random+');" style="color: cyan; background-color: #FAFAFA" value="cyan"  >Cyan</option>'+
					'<option onclick="javascript:insertBB(\'zielony\','+random+');" style="color: green; background-color: #FAFAFA" value="green"  >Gr&ouml;n</option>'+
					'<option onclick="javascript:insertBB(\'oliwkowy\','+random+');" style="color: olive; background-color: #FAFAFA" value="olive"  >Oliv gr&ouml;n</option>'+
					'<option onclick="javascript:insertBB(\'brazowy\','+random+');" style="color: brown; background-color: #FAFAFA" value="brown"  >Brun</option>'+
					'</select>'+
		"</p>    " +
		"<p>    " +
		' <a href="javascript:insertBB(\'beczy\','+random+');"><img src="http://tnij.org/becz" alt="Beczy" title="Beczy"/></a> ' +
		' <a href="javascript:insertBB(\'oczko\','+random+');"><img src="http://tnij.org/happ" alt="Oczko" title="Oczko"/></a> ' +
		' <a href="javascript:insertBB(\'smutny\','+random+');"><img src="http://tnij.org/smut" alt="Smutny" title="Smutny"/></a> ' +
		' <a href="javascript:insertBB(\'rotfl\','+random+');"><img src="http://tnij.org/rotf" alt="Rotfl" title="Rotfl"/></a> ' +
		' <a href="javascript:insertBB(\'fuck\','+random+');"><img src="http://tnij.org/kcuf" alt="Fuck" title="Fuck"/></a> ' +
		' <a href="javascript:insertBB(\'lol\','+random+');"><img src="http://tnij.org/a601" alt="LoL" title="LoL"/></a> ' +
		' <a href="javascript:insertBB(\'niee\','+random+');"><img src="http://tnij.org/nieee" alt="Niee" title="Niee"/></a> ' +
		' <a href="javascript:insertBB(\'taak\','+random+');"><img src="http://tnij.org/a613" alt="Taak" title="Taak"/></a> ' +
		' <a href="javascript:insertBB(\'usmiech\','+random+');"><img src="http://tnij.org/a61r" alt="Usmiech" title="Usmiech"/></a> ' +
		' <a href="javascript:insertBB(\'eeee\','+random+');"><img src="http://tnij.org/a60w" alt="Eeee" title="Eeee"/></a> ' +
		' <a href="javascript:insertBB(\'yyyy\','+random+');"><img src="http://tnij.org/a61a" alt="Yyyy" title="Yyyy"/></a> ' +
		' <a href="javascript:insertBB(\'jezyk\','+random+');"><img src="http://tnij.org/a604" alt="Jezyk" title="Jezyk"/></a> ' +
		' <a href="javascript:insertBB(\'jezyk2\','+random+');"><img src="http://tnij.org/a61j" alt="Jezyk2" title="Jezyk2"/></a> ' +
		' <a href="javascript:insertBB(\'ok\','+random+');"><img src="http://tnij.org/a6z7" alt="Ok" title="Ok"/></a> ' +
		' <a href="javascript:insertBB(\'uuuu\','+random+');"><img src="http://tnij.org/a60b" alt="Uuuu" title="Uuuu"/></a> ' +
		' <a href="javascript:insertBB(\'kwadrat\','+random+');"><img src="http://tnij.org/a60u" alt=":]" title=":]"/></a> ' +
		' <a href="javascript:insertBB(\'he\','+random+');"><img src="http://tnij.org/a603" alt=":>" title=":>"/></a> ' +
		' <a href="javascript:insertBB(\'figielek\','+random+');"><img src="http://tnij.org/a606" alt="Figielek" title="Figielek"/></a> ' +
		' <a href="javascript:insertBB(\'wysmiewacz\','+random+');"><img src="http://tnij.org/a607" alt="Wysmiewacz" title="Wysmiewacz"/></a> ' +
		' <a href="javascript:insertBB(\'glupek\','+random+');"><img src="http://tnij.org/a608" alt="Glupek" title="Glupek"/></a> ' +
		' <a href="javascript:insertBB(\'swir\','+random+');"><img src="http://tnij.org/a61k" alt="Swir" title="Swir"/></a> ' +
		' <a href="javascript:insertBB(\'???\','+random+');"><img src="http://tnij.org/a6z5" alt="???" title="???"/></a> ' +
		' <a href="javascript:insertBB(\'!!!\','+random+');"><img src="http://tnij.org/a6z6" alt="!!!" title="!!!"/></a> ' +
'	<table><tr><td><a tabindex="29" href="javascript:insertBB(\'smily lol\','+random+');"><img src="" /></a></td>' +
					'	<td><a tabindex="30" href="javascript:insertBB(\'smily lol\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_lol.gif" /></a></td>' +
'	<td><a tabindex="30" href="javascript:insertBB(\'smily smile\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/smile.gif" /></a></td>' +
					'	<td><a tabindex="31" href="javascript:insertBB(\'smily idea\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_idea.gif" /></a></td>' +
					'	<td><a tabindex="32" href="javascript:insertBB(\'smily wink\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_wink.gif" /></a></td>' +
					'	<td><a tabindex="33" href="javascript:insertBB(\'smily evil\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_evil.gif" /></a></td>' +
			'	<td><a tabindex="34" href="javascript:insertBB(\'smily twisted\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_twisted.gif" /></a></td>' +
					'	<td><a tabindex="35" href="javascript:insertBB(\'smily eek\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_eek.gif" /></a></td>' +
					'	<td><a tabindex="36" href="javascript:insertBB(\'smily surprised\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_surprised.gif" /></a></td>' +
					'	<td><a tabindex="37" href="javascript:insertBB(\'smily cry\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cry.gif" /></a></td>' +
					'	<td><a tabindex="38" href="javascript:insertBB(\'smily smile2\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_smile.gif" /></a></td>' +
			'	<td><a tabindex="39" href="javascript:insertBB(\'smily cool\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cool.gif" /></a></td>' +
			'	<td><a tabindex="40" href="javascript:insertBB(\'smily sad\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_sad.gif" /></a></td>' +
					'	<td><a tabindex="41" href="javascript:insertBB(\'smily confused\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_confused.gif" /></a></td>' +
			'	<td><a tabindex="42" href="javascript:insertBB(\'smily rolleyes\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_rolleyes.gif" /></a></td>' +
			'	<td><a tabindex="43" href="javascript:insertBB(\'smily briggin\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_biggrin.gif" /></a></td>' +
			'	<td><a tabindex="44" href="javascript:insertBB(\'smily redface\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_redface.gif" /></a></td>' +
			'	<td><a tabindex="45" href="javascript:insertBB(\'smily razz\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_razz.gif" /></a></td>' +
			'	<td><a tabindex="46" href="javascript:insertBB(\'smily neutral\','+random+');"><img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_neutral.gif" /></a></td>' +
			'	<td></td>' +
			"</tr>   " +
			'	<td></td>' +
			'	<td><a tabindex="47" href="javascript:insertBB(\'unit spear\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_spear.png" /></a></td>' +
			'	<td><a tabindex="48" href="javascript:insertBB(\'unit sword\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_sword.png" /></a></td>' +
			'	<td><a tabindex="49" href="javascript:insertBB(\'unit axe\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_axe.png" /></a></td>' +
			'	<td><a tabindex="50" href="javascript:insertBB(\'unit archer\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_archer.png" /></a></td>' +
			'	<td><a tabindex="51" href="javascript:insertBB(\'unit noble\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_snob.png" /></a></td>' +
			'	<td></td>' +
			'	<td><a tabindex="52" href="javascript:insertBB(\'unit scout\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_spy.png" /></a></td>' +
			'	<td><a tabindex="53" href="javascript:insertBB(\'unit lcav\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_light.png" /></a></td>' +
			'	<td><a tabindex="54" href="javascript:insertBB(\'unit hcav\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_heavy.png" /></a></td>' +
			'	<td><a tabindex="55" href="javascript:insertBB(\'unit marcher\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_marcher.png" /></a></td>' +
			'	<td><a tabindex="56" href="javascript:insertBB(\'unit paladin\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_knight.png" /></a></td>' +
			'	<td></td>' +
			'	<td><a tabindex="57" href="javascript:insertBB(\'unit ram\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_ram.png" /></a></td>' +
			'	<td><a tabindex="58" href="javascript:insertBB(\'unit catapult\','+random+');"><img src="http://www.tribalwars.net/graphic/unit/unit_catapult.png" /></a></td>' +
"</tr></table></div>";

		document.body.innerHTML = document.body.innerHTML.replace( /<textarea\s/gi, xhtml+"<textarea id=\"txt_"+random+"\" ");

		NuevaFuncionTW("insertBB", function(insertType, ident){

				txt = document.getElementById("txt_"+ident);

				var start = txt.selectionStart;
				var end   = txt.selectionEnd;
				var txtlength = 0;
				var insertButton = '';
				var txtinsertBefore = '';
				var txtinsertAfter = '';
				var selection = '';
				var selectionBefore = '';
				var selectionAfter = '';

				switch (insertType) {
					case 'czarny':
						txtinsertBefore = "[color=black]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'bialy':
						txtinsertBefore = "[color=white]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'zolty':
						txtinsertBefore = "[color=yellow]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'pomaranczowy':
						txtinsertBefore = "[color=orange]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'czerwony':
						txtinsertBefore = "[color=red]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'indygo':
						txtinsertBefore = "[color=indigo]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'fioletowy':
						txtinsertBefore = "[color=violet]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'niebieski':
						txtinsertBefore = "[color=blue]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'cniebieski':
						txtinsertBefore = "[color=darkblue]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'cyan':
						txtinsertBefore = "[color=cyan]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'zielony':
						txtinsertBefore = "[color=green]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'oliwkowy':
						txtinsertBefore = "[color=olive]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'brazowy':
						txtinsertBefore = "[color=brown]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'bmaly':
						txtinsertBefore = "[size=7]";
						txtinsertAfter = "[/size]";
						insertButton = 'A';
						break;
					case 'maly':
						txtinsertBefore = "[size=9]";
						txtinsertAfter = "[/size]";
						insertButton = 'A';
						break;
					case 'normal':
						txtinsertBefore = "[size=12]";
						txtinsertAfter = "[/size]";
						insertButton = 'A';
						break;
					case 'duzy':
						txtinsertBefore = "[size=18]";
						txtinsertAfter = "[/size]";
						insertButton = 'A';
						break;
					case 'bduzy':
						txtinsertBefore = "[size=24]";
						txtinsertAfter = "[/size]";
						insertButton = 'A';
						break;
					case 'player':
						txtinsertBefore = "[player]";
						txtinsertAfter = "[/player]";
						insertButton = 'P';
						break;
					case 'village':
						txtinsertBefore = "[village]";
						txtinsertAfter = "[/village]";
						insertButton = 'V';
						break;
					case 'tribe':
						txtinsertBefore = "[ally]";
						txtinsertAfter = "[/ally]";
						insertButton = 'A';
						break;
					case 'b':
						txtinsertBefore = "[b]";
						txtinsertAfter = "[/b]";
						insertButton = 'B';
						break;
					case 'i':
						txtinsertBefore = "[i]";
						txtinsertAfter = "[/i]";
						insertButton = 'I';
						break;
					case 'u':
						txtinsertBefore = "[u]";
						txtinsertAfter = "[/u]";
						insertButton = 'U';
						break;
					case 'quote':
						txtinsertBefore = "[quote]";
						txtinsertAfter = "[/quote]";
						insertButton = 'Q';
						break;
					case 'url':
						txtinsertBefore = "[url]";
						txtinsertAfter = "[/url]";
						insertButton = 'L';
						break;
					case 'img':
						txtinsertBefore = "[img]";
						txtinsertAfter = "[/img]";
						insertButton = 'M';
						break;
								case 'beczy':
					txtinsertBefore = "[img]http://tnij.org/becz[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'oczko':
					txtinsertBefore = "[img]http://tnij.org/happ[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'smutny':
					txtinsertBefore = "[img]http://tnij.org/smut[/img]";
					txtinsertAfter = " ";
					insertButton = 'A';
					break;
				case 'rotfl':
					txtinsertBefore = "[img]http://tnij.org/rotf[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'fuck':
					txtinsertBefore = "[img]http://tnij.org/kcuf[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'lol':
					txtinsertBefore = "[img]http://tnij.org/a601[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'niee':
					txtinsertBefore = "[img]http://tnij.org/nieee[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'taak':
					txtinsertBefore = "[img]http://tnij.org/a613[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'usmiech':
					txtinsertBefore = "[img]http://tnij.org/a61r[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '???':
					txtinsertBefore = "[img]http://tnij.org/a6z5[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case '!!!':
					txtinsertBefore = "[img]http://tnij.org/a6z6[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'glupek':
					txtinsertBefore = "[img]http://tnij.org/a608[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'ok':
					txtinsertBefore = "[img]http://tnij.org/a6z7[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'eeee':
					txtinsertBefore = "[img]http://tnij.org/a60w[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'yyyy':
					txtinsertBefore = "[img]http://tnij.org/a61a[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'jezyk':
					txtinsertBefore = "[img]http://tnij.org/a604[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'jezyk2':
					txtinsertBefore = "[img]http://tnij.org/a61j[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'kwadrat':
					txtinsertBefore = "[img]http://tnij.org/a60u[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'swir':
					txtinsertBefore = "[img]http://tnij.org/a61k[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'wysmiewacz':
					txtinsertBefore = "[img]http://tnij.org/a607[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'uuuu':
					txtinsertBefore = "[img]http://tnij.org/a60b[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'figielek':
					txtinsertBefore = "[img]http://tnij.org/a606[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;
				case 'he':
					txtinsertBefore = "[img]http://tnij.org/a603[/img]";
					txtinsertAfter = " ";
					insertButton = 'V';
					break;









case 'smily lol':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_lol.gif";
						txtinsertAfter = "[/img]";
						insertButton = '1';
						break;
				case 'smily smile':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/smile.gif";
						txtinsertAfter = "[/img]";
						insertButton = '2';
						break;
				case 'smily idea':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_idea.gif";
						txtinsertAfter = "[/img]";
						insertButton = '3';
						break;
								case 'smily wink':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_wink.gif";
						txtinsertAfter = "[/img]";
						insertButton = '4';
						break;
				case 'smily evil':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_evil.gif";
						txtinsertAfter = "[/img]";
						insertButton = '5';
						break;
				case 'smily twisted':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_twisted.gif";
						txtinsertAfter = "[/img]";
						insertButton = '6';
						break;
								case 'smily eek':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_eek.gif";
						txtinsertAfter = "[/img]";
						insertButton = '7';
						break;
				case 'smily surprised':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_surprised.gif";
						txtinsertAfter = "[/img]";
						insertButton = '8';
						break;
				case 'smily cry':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cry.gif";
						txtinsertAfter = "[/img]";
						insertButton = '9';
						break;
				case 'smily smile2':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_smile.gif";
						txtinsertAfter = "[/img]";
						insertButton = '10';
						break;
				case 'smily cool':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cool.gif";
						txtinsertAfter = "[/img]";
						insertButton = '11';
						break;
				case 'smily sad':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_sad.gif";
						txtinsertAfter = "[/img]";
						insertButton = '12';
						break;
				case 'smily confused':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_confused.gif";
						txtinsertAfter = "[/img]";
						insertButton = '13';
						break;
				case 'smily rolleyes':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_rolleyes.gif";
						txtinsertAfter = "[/img]";
						insertButton = '14';
						break;
				case 'smily briggin':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_biggrin.gif";
						txtinsertAfter = "[/img]";
						insertButton = '15';
						break;
				case 'smily redface':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_redface.gif";
						txtinsertAfter = "[/img]";
						insertButton = '16';
						break;
				case 'smily razz':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_razz.gif";
						txtinsertAfter = "[/img]";
						insertButton = '17';
						break;
				case 'smily neutral':
						txtinsertBefore = "[img]http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_neutral.gif";
						txtinsertAfter = "[/img]";
						insertButton = '18';
						break;
				case 'unit spear':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_spear.png";
						txtinsertAfter = "[/img]";
						insertButton = '19';
						break;
				case 'unit sword':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_sword.png";
						txtinsertAfter = "[/img]";
						insertButton = '20';
						break;
				case 'unit axe':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_axe.png";
						txtinsertAfter = "[/img]";
						insertButton = '21';
						break;
				case 'unit archer':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_archer.png";
						txtinsertAfter = "[/img]";
						insertButton = '22';
						break;
				case 'unit noble':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_snob.png";
						txtinsertAfter = "[/img]";
						insertButton = '23';
						break;
				case 'unit scout':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_spy.png";
						txtinsertAfter = "[/img]";
						insertButton = '24';
						break;
				case 'unit lcav':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_light.png";
						txtinsertAfter = "[/img]";
						insertButton = '25';
						break;
				case 'unit hcav':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_heavy.png";
						txtinsertAfter = "[/img]";
						insertButton = '26';
						break;
				case 'unit marcher':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_marcher.png";
						txtinsertAfter = "[/img]";
						insertButton = '27';
						break;
				case 'unit paladin':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_knight.png";
						txtinsertAfter = "[/img]";
						insertButton = '28';
						break;
				case 'unit ram':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_ram.png";
						txtinsertAfter = "[/img]";
						insertButton = '29';
						break;
				case 'unit catapult':
						txtinsertBefore = "[img]http://www.tribalwars.net/graphic/unit/unit_catapult.png";
						txtinsertAfter = "[/img]";
						insertButton = '30';
						break;
				case 'el-barto':
						txtinsertBefore = "[img]http://www.gifs.net/Animation11/Creatures_and_Cartoons/Cartoons_Simpsons/bart_simpson_2.gif";
						txtinsertAfter = "[/img]";
						insertButton = '30';
						break;








				}

				if (start == end) {
						txt.value = txt.value.substr(0, start) + txtinsertBefore + txtinsertAfter + txt.value.substr(end, txt.value.length);
					} else {
						txtlength = txt.value.length;
						selection = txt.value.substr(start, (end - start));
						selectionBefore = txt.value.substr(0, start);
						selectionAfter = txt.value.substr(end, txtlength);

						if (insertButton == 'V' && selection.match(/(\d+){3}([\/|]+){1}(\d+){3}/gi)) {
							selection = selection.replace(/(.*)(\d+)(\d+)(\d+)([\/|]+){1}(\d+)(\d+)(\d+)(.*)/gi, "$2$3$4|$6$7$8");
						}

						txt.value = selectionBefore + txtinsertBefore + selection + txtinsertAfter + selectionAfter;

					}
			});


	  }

function CambiaCuadroTexto() {

		var body = $$("body");

		var random = new Date;
		random = random.getTime();

		var xhtml = "<table class='bbcodearea'> " +
				"<p>    " +
				'	<a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="'+ TW_Image_Base +'/face.png"  title="Gracz"/></a>' +
				'	<a tabindex="11" href="javascript:insertBB(\'village\','+random+');"><img src="'+ TW_Image_Base +'/buildings/main.png"  title="Wioska"/></a>' +
				'	<a tabindex="12" href="javascript:insertBB(\'tribe\','+random+');"><img src="'+ TW_Image_Base +'/command/support.png"  title="Plemie"/></a>' +
			'          |'+
				'	<a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://tnij.org/a60d"  title="Pogrubienie"/></a>' +
				'	<a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://tnij.org/a60e"  title="Kursywa"/></a>' +
				'	<a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://tnij.org/a60f"  title="Podkreslenie" /></a>' +
				'	|' +
				'	<a tabindex="16" href="javascript:insertBB(\'quote\','+random+');"><img src="http://tnij.org/a60g"  title="Cytat" /></a>' +
				'	<a tabindex="17" href="javascript:insertBB(\'url\','+random+');"><img src="http://tnij.org/a60l"  title="URL"/></a>' +
					'	<a tabindex="18" href="javascript:insertBB(\'img\','+random+');"><img src="http://tnij.org/a60h"  title="Obraz"/></a>' +
					'	<select>'+
					'	<option onclick="javascript:insertBB(\'bmaly\','+random+');">Malutki</option>'+
					'	<option onclick="javascript:insertBB(\'maly\','+random+');">Maly</option>'+
					'	<option onclick="javascript:insertBB(\'normal\','+random+');" selected="selected">Normal</option>'+
					'	<option onclick="javascript:insertBB(\'duzy\','+random+');">Duzy</option>'+
					'	<option onclick="javascript:insertBB(\'bduzy\','+random+');">Olbrzymi</option>'+
					'</select>'+
					'<select>'+
					'<option onclick="javascript:insertBB(\'czarny\','+random+');" style="color: black; background-color: #FAFAFA" value="black">Standard</option>'+
					'<option onclick="javascript:insertBB(\'bialy\','+random+');" style="color: white; background-color: #FAFAFA" value="white"  >Bialy</option>'+
					'<option onclick="javascript:insertBB(\'zolty\','+random+');" style="color: yellow; background-color: #FAFAFA" value="yellow"  >Zolty</option>'+
					'<option onclick="javascript:insertBB(\'pomaranczowy\','+random+');" style="color: orange; background-color: #FAFAFA" value="orange"  >Orange</option>'+
					'<option onclick="javascript:insertBB(\'czerwony\','+random+');" style="color: red; background-color: #FAFAFA" value="red"  >Czerwony</option>'+
					'<option onclick="javascript:insertBB(\'indygo\','+random+');" style="color: indigo; background-color: #FAFAFA" value="indigo"  >Indygo</option>'+
					'<option onclick="javascript:insertBB(\'fioletowy\','+random+');" style="color: violet; background-color: #FAFAFA" value="violet"  >Fioletowy</option>'+
					'<option onclick="javascript:insertBB(\'niebieski\','+random+');" style="color: blue; background-color: #FAFAFA" value="blue"  >Niebieski</option>'+
					'<option onclick="javascript:insertBB(\'cniebieski\','+random+');" style="color: darkblue; background-color: #FAFAFA" value="darkblue"  >Ciemno niebieski</option>'+
					'<option onclick="javascript:insertBB(\'cyan\','+random+');" style="color: cyan; background-color: #FAFAFA" value="cyan"  >Cyan</option>'+
					'<option onclick="javascript:insertBB(\'zielony\','+random+');" style="color: green; background-color: #FAFAFA" value="green"  >Zielony</option>'+
					'<option onclick="javascript:insertBB(\'oliwkowy\','+random+');" style="color: olive; background-color: #FAFAFA" value="olive"  >Oliwkowy</option>'+
					'<option onclick="javascript:insertBB(\'brazowy\','+random+');" style="color: brown; background-color: #FAFAFA" value="brown"  >Brazowy</option>'+
					'</select>'+
	   "</p>    " +
				"</table>";

		document.body.innerHTML = document.body.innerHTML.replace( /<textarea\s/gi, xhtml+"<textarea id=\"txt_"+random+"\" ");

		NuevaFuncionTW("insertBB", function(insertType, ident){

				txt = document.getElementById("txt_"+ident);

				var start = txt.selectionStart;
				var end   = txt.selectionEnd;
				var txtlength = 0;
				var insertButton = '';
				var txtinsertBefore = '';
				var txtinsertAfter = '';
				var selection = '';
				var selectionBefore = '';
				var selectionAfter = '';

				switch (insertType) {
					case 'czarny':
						txtinsertBefore = "[color=black]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'bialy':
						txtinsertBefore = "[color=white]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'zolty':
						txtinsertBefore = "[color=yellow]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'pomaranczowy':
						txtinsertBefore = "[color=orange]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'czerwony':
						txtinsertBefore = "[color=red]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'indygo':
						txtinsertBefore = "[color=indigo]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'fioletowy':
						txtinsertBefore = "[color=violet]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'niebieski':
						txtinsertBefore = "[color=blue]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'cniebieski':
						txtinsertBefore = "[color=darkblue]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'cyan':
						txtinsertBefore = "[color=cyan]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'zielony':
						txtinsertBefore = "[color=green]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'oliwkowy':
						txtinsertBefore = "[color=olive]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'brazowy':
						txtinsertBefore = "[color=brown]";
						txtinsertAfter = "[/color]";
						insertButton = 'A';
						break;
					case 'bmaly':
						txtinsertBefore = "[size=7]";
						txtinsertAfter = "[/size]";
						insertButton = 'A';
						break;
					case 'maly':
						txtinsertBefore = "[size=9]";
						txtinsertAfter = "[/size]";
						insertButton = 'A';
						break;
					case 'normal':
						txtinsertBefore = "[size=12]";
						txtinsertAfter = "[/size]";
						insertButton = 'A';
						break;
					case 'duzy':
						txtinsertBefore = "[size=18]";
						txtinsertAfter = "[/size]";
						insertButton = 'A';
						break;
					case 'bduzy':
						txtinsertBefore = "[size=24]";
						txtinsertAfter = "[/size]";
						insertButton = 'A';
						break;
					case 'player':
						txtinsertBefore = "[player]";
						txtinsertAfter = "[/player]";
						insertButton = 'P';
						break;
					case 'village':
						txtinsertBefore = "[village]";
						txtinsertAfter = "[/village]";
						insertButton = 'V';
						break;
					case 'tribe':
						txtinsertBefore = "[ally]";
						txtinsertAfter = "[/ally]";
						insertButton = 'A';
						break;
					case 'b':
						txtinsertBefore = "[b]";
						txtinsertAfter = "[/b]";
						insertButton = 'B';
						break;
					case 'i':
						txtinsertBefore = "[i]";
						txtinsertAfter = "[/i]";
						insertButton = 'I';
						break;
					case 'u':
						txtinsertBefore = "[u]";
						txtinsertAfter = "[/u]";
						insertButton = 'U';
						break;
					case 'quote':
						txtinsertBefore = "[quote]";
						txtinsertAfter = "[/quote]";
						insertButton = 'Q';
						break;
					case 'url':
						txtinsertBefore = "[url]";
						txtinsertAfter = "[/url]";
						insertButton = 'L';
						break;
					case 'img':
						txtinsertBefore = "[img]";
						txtinsertAfter = "[/img]";
						insertButton = 'M';
						break;
				}

				if (start == end) {
						txt.value = txt.value.substr(0, start) + txtinsertBefore + txtinsertAfter + txt.value.substr(end, txt.value.length);
					} else {
						txtlength = txt.value.length;
						selection = txt.value.substr(start, (end - start));
						selectionBefore = txt.value.substr(0, start);
						selectionAfter = txt.value.substr(end, txtlength);

						if (insertButton == 'V' && selection.match(/(\d+){3}([\/|]+){1}(\d+){3}/gi)) {
							selection = selection.replace(/(.*)(\d+)(\d+)(\d+)([\/|]+){1}(\d+)(\d+)(\d+)(.*)/gi, "$2$3$4|$6$7$8");
						}

						txt.value = selectionBefore + txtinsertBefore + selection + txtinsertAfter + selectionAfter;

					}
			});


	  }


	  // ======== Funkcje ========

	  // Atajos DOM
	  function $(elm_id){
		return document.getElementById(elm_id);
	  }

	  function $$(tag_name){
		return document.getElementsByTagName(tag_name);
	  }

	  function NuevaFuncionTW(func, new_func){

		if(typeof unsafeWindow == "object"){
			unsafeWindow[func] = new_func;
		}else if(TW_Is_Opera){
			window[func] = new_func;
			/*
			window.opera.defineMagicFunction(
				func,
				function(oRealFunc, oThis, oParam1, oParam2){
					return oParam1.getElementById('oParam2').style;
				}
			);
			*/
		}
	  }


//info_content
function distancesBetweenVillages(foreignCoords)
{
	for(kk=0; kk<TW_Villages.length; kk++){
		if(TW_Village_Id == TW_Villages[kk][0]){
			var currentCoords = unescape(TW_Villages[kk][2]);
		}
	}
	var currentX=currentCoords.replace(/(\d+)\|(\d+)/gi, "$1");
	var currentY=currentCoords.replace(/(\d+)\|(\d+)/gi, "$2");

	var x2=foreignCoords.replace(/(\d+)\|(\d+)/gi, "$1");
	var y2=foreignCoords.replace(/(\d+)\|(\d+)/gi, "$2");

	var TW_World_Units_BaseSpeed = new Array(
		'spear=18',
		'sword=22',
		'axe=18',
		'archer=18',
		'spy=9',
		'light=10',
		'marcher=10',
		'heavy=11',
		'ram=30',
		'catapult=30',
		'knight=10',
		'snob=35'
	);
	var x=Math.abs(currentX-x2);
	var y=Math.abs(currentY-y2);
	var distance=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	
	var tempsOut = '<span style="font-size: 0.75em; color: red;">';
	
	for(var q = 0; q < TW_World_Units_BaseSpeed.length; q++){
		var tmp = TW_World_Units_BaseSpeed[q];
		tmp = tmp.match(/(.+)\=(\d+)/i);
		var temps=distance * (tmp[2] / (TW_World_Game_Speed*TW_World_Unit_Speed))*60;
		var j= Math.floor(temps/(24*3600));
		var h= Math.floor(temps/3600)%24;
		var m= Math.floor(temps/60)%60;
		var s= Math.floor(temps-3600*h-60*m-24*3600*j);
		tempsOut += new String('<img src="\/graphic\/unit\/unit_'+tmp[1]+'.png" \/>');
		tempsOut += ((j==0)? '' : j + ', ')+h+'h:'+m+'m:'+s+'s ';
	}
	tempsOut += '</span>';
	
	//document.getElementById('info_speed_counter1').innerHTML = 'Temps : '+j+','+h+'h:'+m+'m:'+s+'s';
	document.getElementById('info_speed_counter1').innerHTML = tempsOut;
	document.getElementById('info_speed_counter2').innerHTML = 'Distance : '+(Math.round(distance*100)/100)+' cases';
}
