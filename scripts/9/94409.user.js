// ==UserScript==
// @name			TheWest-Menu
// @namespace		TWM_M77
// @author			Meuchelfix77
// @description		Ändert den Aufbau der Menüleisten bei The-West
// @website			http://meuchelfix77.cwsurf.de/TWM/website.php?lang=en
// @include			http://*.the-west.*/game.php*
// @include			http://meuchelfix77.cwsurf.de/TWM/*.php*
// @include			http://localhost*/TWM/*.php*
// @include			http://www.twtimes.de/*
// @icon			http://www.the-west.de/favicon.ico
// @version			2.316
// @history			2.316:	Provisorisches Update, aufgrund von falschem Upload
// @history			2.316:	Blinken beim Fertigkeiten-Button ergänzt
// @history			2.316:	Beispielsammlung angelegt
// @history			2.316:	Debug-/Dev-Modus vereinfacht
// @history			2.316:	Neue Versions-/Sprachen-Anzeige im Einstellungs-Menü
// @history			2.315:	Beta-Welt-Unterstützung hinzugefügt
// @history			2.310:	Neue Einträge: Bestatter, Büchsenmacher, Bündnis, Einladungen, Gemischtwaren, Kirche, Saloon, Schneider, Sheriff, Stadthalle
// @history			2.310:	Benutzerskript-Befehle verbessert
// @history			2.310:	Neuer Updater
// @history			2.310:	TW-DB-Link verändert
// @history			2.310:	Sprachpakete eingefügt
// @history			2.301:	In v.2.300 hinzugekommenden 'TW-Forts'-Button aktiviert
// @history			2.300:	Neue Benutzerskript-Befehle 'Sprache einstellen' & 'Sprache zurücksetzen'
// @history			2.300:	Einige Grundlagen für weitere Sprachen wurden hinzugefügt
// @history			2.300:	Englisch hinzugefügt
// @history			2.230:	Bug behoben, dass sich die Einstellungsmenü-Einträge sich nicht verschieben lassen
// @history			2.220:	Bug behoben, der durch die blinkenden Symbole hervorgerufen wurde und zur Folge hatte, dass das Script stoppte und der Einstellungs-Link nicht angezeigt wurde
// @history			2.210:	Debug-/Dev-Modus hinzugefügt/erweitert
// @history			2.200:	Fehler mit dem Einstellungslink vernichtet :P
// @history			2.200:	Darstellung des Einstellungslinks verbessert
// @history			2.110:	Neuer Eintrag: TW-DB
// @history			2.110:	Neue Struktur im Einstellungsmenü
// @history			2.101:	Blinkendes Symbol für TW-Times hinzugefügt
// @history			2.101:	Bilder erneut überarbeitet
// @history			2.101:	Bug mit blinkenden Einträgen auf der Linken Seite behoben
// @history			2.100:	Bilder verändert
// @history			2.100:	Neuer Benutzerskriptbefehl: Nach Updates suchen
// @history			2.100:	Einstellungsmenü verbessert
// @history			2.100:	Bug mit blinkenden Einträgen behoben
// @history			2.100:	Markt, TW-Stats, TW-Times, TW-Wiki hinzugefügt
// @history			2.000:	Blinkende Menü-Einträge
// @history			2.000:	Einstellungsmenü hinzugefügt
// @history			2.000:	'GM-Cookies' zum Speichern der Menüstruktur
// @history			2.000:	Automatische-Update-Funktion
// @history			1.xxx:	Nur Crafting-, Bank- und Hotel-Button vorhanden, nicht verschiebbar
// ==/UserScript==

// Startvariablen
var TWM_DEV = GM_getValue ('TWM_DEV', false);
var TWM_DEBUG = GM_getValue ('TWM_DEBUG', false);
var TWM_VERSION = 2.316;
var TWM_LANGUAGE = 'de';
var TWM_URL = 'de';

location.assign('javascript:var TWM_DEV='+TWM_DEV+';void(0)');
location.assign('javascript:var TWM_DEBUG='+TWM_DEBUG+';void(0)');
location.assign('javascript:var TWM_VERSION='+TWM_VERSION+';void(0)');


// Sprache ermitteln
//////////////////////
if (location.href.indexOf('.the-west.') > -1) {
	if (TWM_DEBUG) GM_log ('Eine The-West-Seite wurde geladen: '+location.href);
	
	TWM_LANGUAGE = location.href.substr(7,2);
	
	if ('de, en, ro'.indexOf (TWM_LANGUAGE) == -1) {
		TWM_LANGUAGE = 'en';
	}

if (location.href.indexOf('.the-west.') > ro) {
	if (TWM_DEBUG) GM_log ('Eine The-West-Seite wurde geladen: '+location.href);
	
	TWM_LANGUAGE = location.href.substr(7,2);
	
	if ('de, en, ro'.indexOf (TWM_LANGUAGE) == ro) {
		TWM_LANGUAGE = 'ro';
	}
	
	// Sprache laden (falls gespeichert)
	GM_setValue ('TWM_LAST_LANG', TWM_LANGUAGE);
	TWM_LANGUAGE = GM_getValue ('TWM_LANGUAGE', TWM_LANGUAGE);
	
	// URL-Endungen festlegen
	switch (TWM_LANGUAGE) {
		case ('ro'):
			TWM_URL = 'ro';
		break;
		
		case ('pt'):
			TWM_URL = 'com.pt';
		break;
		
		case ('no'):
			TWM_URL = 'no.com';
		break;

		case ('ro'):
			TWM_URL = 'ro';
		break;
		
		default:
			TWM_URL = TWM_LANGUAGE;
		break;
	}
	if (TWM_DEBUG) GM_log ('TWM_LANGUAGE: ' +TWM_LANGUAGE+ ' / TWM_URL: ' +TWM_URL);
}



// Verschiedene Sprachen
//////////////////////////
TWM_LANGUAGEPACK = new Object ();
switch (TWM_LANGUAGE) {
	// DEUTSCH - de
	case ('de'):
		TWM_LANGUAGEPACK['settingsLink']				= 'Menü-Einstellungen';
		TWM_LANGUAGEPACK['noSettings']					= 'Momentan sind keine individuellen Einstellungen vorhanden.\nUm eigene Einstellungen zu speichern, klicken Sie auf den Link \'Menu-Einstellungen\' unter der Karte.';
		TWM_LANGUAGEPACK['settingsSaved']				= 'Einstellungen gespeichert.';
		TWM_LANGUAGEPACK['refreshPage']					= 'Laden Sie die Seite neu, damit die Änderungen wirksam werden!';
		TWM_LANGUAGEPACK['resetSettings']				= 'Die Einstellungen wurden zurückgesetzt. Laden Sie die Seite neu, damit die Änderungen wirksam werden!';
		TWM_LANGUAGEPACK['openSettings']				= '\'The-West - Menü\'-Einstellungen öffnen';
		TWM_LANGUAGEPACK['resetSettings']				= '\'The-West - Menü\'-Einstellungen zurücksetzen';
		TWM_LANGUAGEPACK['update_function']				= '\'The-West - Menü\'-Updates suchen';
		TWM_LANGUAGEPACK['debug_on']					= '\'The-West - Menü\'-Debug-Modus aktivieren';
		TWM_LANGUAGEPACK['debug_off']					= '\'The-West - Menü\'-Debug-Modus deaktivieren';
		TWM_LANGUAGEPACK['setLanguage']					= '\'The-West - Menü\'-Sprache einstellen';
		TWM_LANGUAGEPACK['resetLanguage']				= '\'The-West - Menü\'-Sprache zurücksetzen';
		TWM_LANGUAGEPACK['resetLanguageRequest']		= 'Wollen Sie die Spracheinstellungen wirklich zurücksetzen?';
		TWM_LANGUAGEPACK['resetLanguageDone']			= 'Sprache gelöscht. Laden Sie die Seite neu, damit die Änderungen angezeigt werden!';
		TWM_LANGUAGEPACK['operationCanceled']			= 'Vorgang abgebrochen.';
		TWM_LANGUAGEPACK['setLanguagePrompt']			= 'Bitte geben Sie ein unterstütztes Sprachenkürzel ein, um die Sprache festzulegen. Unterstützt Sprachen können sie unter dem folgenden Link sehen:\nhttp://meuchelfix77.cwsurf.de/TWM/website.php?lang=de#language';
		TWM_LANGUAGEPACK['setLanguageDone']				= 'Sprache wurde geändert. Laden Sie die Seite neu, damit die Änderungen angezeigt werden!';
		TWM_LANGUAGEPACK['visitTWpage']					= 'Besuchen Sie die The-West-Seite, um das Einstellungsfenster öffnen zu können!';
		TWM_LANGUAGEPACK['debug_on_done']				= 'Debug-Modus aktiviert.';
		TWM_LANGUAGEPACK['debug_off_done']				= 'Debug-Modus deaktiviert.';
	break;

	// Romanian - ro
	case ('ro'):
		TWM_LANGUAGEPACK['settingsLink']				= 'Meniu Setari';
		TWM_LANGUAGEPACK['noSettings']					= 'Momentan sind keine individuellen Einstellungen vorhanden.\nUm eigene Einstellungen zu speichern, klicken Sie auf den Link \'Menu-Einstellungen\' unter der Karte.';
		TWM_LANGUAGEPACK['settingsSaved']				= 'Einstellungen gespeichert.';
		TWM_LANGUAGEPACK['refreshPage']					= 'Laden Sie die Seite neu, damit die Änderungen wirksam werden!';
		TWM_LANGUAGEPACK['resetSettings']				= 'Die Einstellungen wurden zurückgesetzt. Laden Sie die Seite neu, damit die Änderungen wirksam werden!';
		TWM_LANGUAGEPACK['openSettings']				= '\'The-West - Menü\'-Einstellungen öffnen';
		TWM_LANGUAGEPACK['resetSettings']				= '\'The-West - Menü\'-Einstellungen zurücksetzen';
		TWM_LANGUAGEPACK['update_function']				= '\'The-West - Menü\'-Updates suchen';
		TWM_LANGUAGEPACK['debug_on']					= '\'The-West - Menü\'-Debug-Modus aktivieren';
		TWM_LANGUAGEPACK['debug_off']					= '\'The-West - Menü\'-Debug-Modus deaktivieren';
		TWM_LANGUAGEPACK['setLanguage']					= '\'The-West - Menü\'-Sprache einstellen';
		TWM_LANGUAGEPACK['resetLanguage']				= '\'The-West - Menü\'-Sprache zurücksetzen';
		TWM_LANGUAGEPACK['resetLanguageRequest']		= 'Wollen Sie die Spracheinstellungen wirklich zurücksetzen?';
		TWM_LANGUAGEPACK['resetLanguageDone']			= 'Sprache gelöscht. Laden Sie die Seite neu, damit die Änderungen angezeigt werden!';
		TWM_LANGUAGEPACK['operationCanceled']			= 'Vorgang abgebrochen.';
		TWM_LANGUAGEPACK['setLanguagePrompt']			= 'Bitte geben Sie ein unterstütztes Sprachenkürzel ein, um die Sprache festzulegen. Unterstützt Sprachen können sie unter dem folgenden Link sehen:\nhttp://meuchelfix77.cwsurf.de/TWM/website.php?lang=de#language';
		TWM_LANGUAGEPACK['setLanguageDone']				= 'Sprache wurde geändert. Laden Sie die Seite neu, damit die Änderungen angezeigt werden!';
		TWM_LANGUAGEPACK['visitTWpage']					= 'Besuchen Sie die The-West-Seite, um das Einstellungsfenster öffnen zu können!';
		TWM_LANGUAGEPACK['debug_on_done']				= 'Debug-Modus aktiviert.';
		TWM_LANGUAGEPACK['debug_off_done']				= 'Debug-Modus deaktiviert.';
	break;
	
	// ENGLISCH	- en
	default:
		TWM_LANGUAGEPACK['settingsLink']				= 'Menu-Settings';
		TWM_LANGUAGEPACK['noSettings']					= 'No settings available.\nClick on the link \'Menu-Settings\' below to configure this script.';
		TWM_LANGUAGEPACK['settingsSaved']				= 'Settings saved.';
		TWM_LANGUAGEPACK['refreshPage']					= 'Refresh the page to show changes!';
		TWM_LANGUAGEPACK['resetSettings']				= 'Settings reset. Refresh the page to show changes!';
		TWM_LANGUAGEPACK['openSettings']				= 'Open \'The-West - Menu\'-Settings';
		TWM_LANGUAGEPACK['resetSettings']				= 'Reset \'The-West - Menu\'-Settings';
		TWM_LANGUAGEPACK['update_function']				= 'Search for \'The-West - Menu\'-Updates';
		TWM_LANGUAGEPACK['debug_on']					= 'Activate \'The-West - Menu\'-Debug-Mode';
		TWM_LANGUAGEPACK['debug_off']					= 'Deactivate \'The-West - Menu\'-Debug-Mode';
		TWM_LANGUAGEPACK['setLanguage']					= 'Set \'The-West - Menu\'-Language';
		TWM_LANGUAGEPACK['resetLanguage']				= 'Reset \'The-West - Menu\'-Language';
		TWM_LANGUAGEPACK['resetLanguageRequest']		= 'You really want to reset the language?';
		TWM_LANGUAGEPACK['resetLanguageDone']			= 'Language reset. Refresh the page to show changes!';
		TWM_LANGUAGEPACK['operationCanceled']			= 'Operation canceled.';
		TWM_LANGUAGEPACK['setLanguagePrompt']			= 'Please type in a supported language token, to set the language. You can see the supported languages here:\nhttp://meuchelfix77.cwsurf.de/TWM/website.php?lang=en#language';
		TWM_LANGUAGEPACK['setLanguageDone']				= 'Language was changed. Refresh the page to show changes!';
		TWM_LANGUAGEPACK['visitTWpage']					= 'Visit any The-West-Page to open the Settings-Window!';
		TWM_LANGUAGEPACK['debug_on_done']				= 'Debug-Mode activated.';
		TWM_LANGUAGEPACK['debug_off_done']				= 'Debug-Mode deactivated.';
	break;
}





// Erstanwendung
//////////////////
var leftMenu = new Array();
var rightMenu = new Array ();

if (GM_getValue ('l_length', -1) == -1 || GM_getValue ('r_length', -1) == -1) {
	leftMenu = new Array ('Charakter', 'Fertigkeiten', 'Inventar', 'Quests', 'Stadt', 'Stadtforum', 'Duell', 'Erfolge');
	rightMenu = new Array ('Rangliste', 'Premium', 'Telegramme', 'Berichte', 'Arbeiten', 'Einstellungen', 'Fortuebersicht', 'Poker');
	
	GM_log('Keine Einstellungen vorhanden');
	if (location.href.indexOf('.the-west.') > -1) {
		alert (TWM_LANGUAGEPACK['noSettings']);
	}
	if (TWM_DEBUG) GM_log ('Keine Einstellungen gespeichert!');
} else {
	// Menü-Punkte aus "GM-Cookies" laden
	for (var l=0; l<GM_getValue('l_length'); l++) {
		leftMenu[l] = GM_getValue ('l_' + l);
		if (TWM_DEBUG) GM_log ('leftMenu['+l+']: ' +leftMenu[l]);
	}
	
	for (var r=0; r<GM_getValue ('r_length'); r++) {
		rightMenu[r] = GM_getValue ('r_' + r);
		if (TWM_DEBUG) GM_log ('rightMenu['+r+']: ' +rightMenu[r]);
	}
	
	
	
	// Arbeitsleisten verschieben
	if (location.href.indexOf('.the-west.') > -1) {
		var leftTop = 250 - (8 * 26) + (GM_getValue('l_length') * 26);
		var rightTop = 250 - (8 * 26) + (GM_getValue('r_length') * 26);
		var workbar_left = document.getElementById('workbar_left');
		document.getElementById('workbar_left').setAttribute ('style', 'top:' +leftTop+ 'px;');
		var workbar_right = document.getElementById('workbar_right');
		document.getElementById('workbar_right').setAttribute ('style', 'top:' +rightTop+ 'px;');
		if (TWM_DEBUG) GM_log ('leftTop: ' +leftTop);
		if (TWM_DEBUG) GM_log ('rightTop: ' +rightTop);
	}
}





// Menü-Punkt-Details
///////////////////////
MenuDetails = new Object ();
MenuDetails['Arbeiten']			= 'AjaxWindow.show(\'work\');';
MenuDetails['Bank']				= 'if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Berichte']			= 'AjaxWindow.show(\'reports\');';
MenuDetails['Bestatter']		= 'if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Buechsenmacher']	= 'if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Buendnis']			= 'if(document.getElementById(\'chatwindow_channelselect\').options[1].value.indexOf(\'room_alliance_\') > -1) Alliance.show(document.getElementById(\'chatwindow_channelselect\').options[1].value.replace(\'room_alliance_\', \'\'));';
MenuDetails['Charakter']		= 'try{CharacterWindow.open();} catch(e){AjaxWindow.show(\'character\');}';
MenuDetails['Duell']			= 'AjaxWindow.show(\'duel\');';
MenuDetails['Einladungen']		= 'AjaxWindow.show(\'invitations\');';
MenuDetails['Einstellungen']	= 'AjaxWindow.show(\'settings\');';
MenuDetails['Erfolge']			= 'try{AchievementWindow.open();} catch(e){AjaxWindow.show(\'achievement\');}';
MenuDetails['Fertigkeiten']		= 'AjaxWindow.show(\'skill\');';
MenuDetails['Fortuebersicht']	= 'AjaxWindow.show(\'fort_overview\');';
MenuDetails['Gemischtwaren']	= 'if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Haendler']			= 'AjaxWindow.show(\'item_trader\', {action:\'index\', h:h});';
MenuDetails['Handwerk']			= 'Crafting.open();';
MenuDetails['Hotel']			= 'if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Inventar']			= 'AjaxWindow.show(\'inventory\');';
MenuDetails['Kirche']			= 'if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Markt']			= 'AjaxWindow.show(\'building_market\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Poker']			= 'Poker.open();';
MenuDetails['Premium']			= 'AjaxWindow.show(\'premium\');';
MenuDetails['Quests']			= 'AjaxWindow.show(\'building_quest\');';
MenuDetails['Rangliste']		= 'AjaxWindow.show(\'ranking\');';
MenuDetails['Saloon']			= 'if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Schneider']		= 'if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Sheriff']			= 'if(Character.home_town != null) AjaxWindow.show(\'building_sheriff\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Stadthalle']		= 'if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Stadt']			= 'AjaxWindow.show(\'town\',null,Character.get_home_town()?Character.get_home_town().x+\'_\'+Character.get_home_town().y:null);';
MenuDetails['Stadtforum']		= 'AjaxWindow.show(\'forum\',undefined,undefined,undefined,{y:25});';
//MenuDetails['Statistik']		= 'javascript:AjaxWindow.show(\'statistic\',{});';
MenuDetails['Telegramme']		= 'AjaxWindow.show(\'messages\');';
MenuDetails['TheWestDataBase']	= 'window.open(\'http://www.tw-db.info/index.php?strana=welcome&lang='+TWM_LANGUAGE+'\', \'_blank\');';
MenuDetails['TheWestForts']		= 'window.open(\'http://www.westforts.com/\', \'_blank\');';
MenuDetails['TheWestStats']		= 'window.open(\'http://' +TWM_URL+ '.weststats.com/\', \'_blank\');';
MenuDetails['TheWestTimes']		= 'window.open(\'http://www.twtimes.de/\', \'_blank\'); Fader.removeButton(\'TheWestTimes\');';
MenuDetails['TheWestWiki']		= 'window.open(\'http://wiki.the-west.' +TWM_URL+ '/\', \'_blank\');';



// Nur auf The-West-Seiten anwenden
/////////////////////////////////////
if (location.href.indexOf('.the-west.') > -1) {
	// Alte Menü-Einträge verstecken
	var oldMenuLeft = new Array ('character', 'skill', 'inventory', 'quest', 'town', 'townforum', 'duel', 'achievement');
	
	var workbar_left = document.getElementById('workbar_left');
	for (var OMLC=0; OMLC<oldMenuLeft.length; OMLC++) {
		var tmpMenuEntry = document.getElementById('menu_'+oldMenuLeft[OMLC]);
		tmpMenuEntry.style.display = 'none';
		if (TWM_DEBUG) GM_log ('menu_' +oldMenuLeft[OMLC]+ ' wurde versteckt.');
	}

	var oldMenuRight = new Array ('ranking', 'premium', 'messages', 'reports', 'work', 'settings', 'forts', 'poker');
	var workbar_right = document.getElementById('workbar_right');
	for (var OMRC=0; OMRC<oldMenuRight.length; OMRC++) {
		var tmpMenuEntry = document.getElementById('menu_'+oldMenuRight[OMRC]);
		tmpMenuEntry.style.display = 'none';
		if (TWM_DEBUG) GM_log ('menu_' +oldMenuRight[OMRC]+ ' wurde versteckt.');
	}
	
	
if (location.href.indexOf('.the-west.') > 'ro') {
	// Alte Menü-Einträge verstecken
	var oldMenuLeft = new Array ('caracter', 'indemanari', 'inventory', 'quest', 'town', 'townforum', 'duel', 'achievement');
	
	var workbar_left = document.getElementById('workbar_left');
	for (var OMLC=0; OMLC<oldMenuLeft.length; OMLC++) {
		var tmpMenuEntry = document.getElementById('menu_'+oldMenuLeft[OMLC]);
		tmpMenuEntry.style.display = 'none';
		if (TWM_DEBUG) GM_log ('menu_' +oldMenuLeft[OMLC]+ ' wurde versteckt.');
	}

	var oldMenuRight = new Array ('ranking', 'premium', 'messages', 'reports', 'work', 'settings', 'forts', 'poker');
	var workbar_right = document.getElementById('workbar_right');
	for (var OMRC=0; OMRC<oldMenuRight.length; OMRC++) {
		var tmpMenuEntry = document.getElementById('menu_'+oldMenuRight[OMRC]);
		tmpMenuEntry.style.display = 'none';
		if (TWM_DEBUG) GM_log ('menu_' +oldMenuRight[OMRC]+ ' wurde versteckt.');
	}
	
	
	
	// Mögliche ActiveThumbs
	var possibleActiveThumbs = 'Berichte, Charakter, Fertigkeiten, Haendler, Stadtforum, Telegramme, TheWestTimes';
	// Neue Menü-Einträge hinzufügen
	for (var LMC=0; LMC<leftMenu.length; LMC++) {
		tmpMenuEntry = document.createElement('div');
		tmpMenuEntry.id = leftMenu[LMC];
		tmpMenuEntry.setAttribute('onmouseover', 'document.getElementById("'+leftMenu[LMC]+'_highlight").style.display="inline";');
		tmpMenuEntry.setAttribute('onmouseout', 'document.getElementById("'+leftMenu[LMC]+'_highlight").style.display="none";');
		tmpMenuEntry.cssText = 'background:url("/images/main/menu_inactive.png") repeat scroll -24px 0 transparent;';
		tmpMenuEntry.innerHTML = '<a href="#" onclick="' +MenuDetails[leftMenu[LMC]]+ '">'+
				'<img src="http://meuchelfix77.cwsurf.de/TWM/'+ (TWM_DEBUG ? 'DEBUG/' : '') +'menu_images/' +TWM_LANGUAGE+ '/' +leftMenu[LMC]+ '.png" />'+	// Text
				'<img style="display:none; position:absolute; left:0px;" id="'+leftMenu[LMC]+'_highlight" src="http://de2.the-west.de/images/main/menu_highlight.png" />'+	// Highlight
				'<img src="http://meuchelfix77.cwsurf.de/TWM/'+ (TWM_DEBUG ? 'DEBUG/' : '') +'menu_images/thumbs/' +leftMenu[LMC]+ '.png" />'+	// Thumb
				(possibleActiveThumbs.indexOf(leftMenu[LMC]) > -1 ? '<img class="activeThumbLeft activeThumb" id="' +leftMenu[LMC]+ '_activeThumb" src="http://meuchelfix77.cwsurf.de/TWM/'+ (TWM_DEBUG ? 'DEBUG/' : '') +'menu_images/thumbs/active/' +leftMenu[LMC]+ '.png" />' : '')+ // Active Thumb
				'<img src="http://meuchelfix77.cwsurf.de/TWM/'+ (TWM_DEBUG ? 'DEBUG/' : '') +'menu_images/border.png" /></a>';	// Border
		document.getElementsByClassName('menu_list')[0].appendChild (tmpMenuEntry);
	}
	
	for (var RMC=0; RMC<rightMenu.length; RMC++) {
		tmpMenuEntry = document.createElement('div');
		tmpMenuEntry.id = rightMenu[RMC];
		tmpMenuEntry.setAttribute('onmouseover', 'document.getElementById("'+rightMenu[RMC]+'_highlight").style.display="inline";');
		tmpMenuEntry.setAttribute('onmouseout', 'document.getElementById("'+rightMenu[RMC]+'_highlight").style.display="none";');
		tmpMenuEntry.cssText = 'background:url("/images/main/menu_inactive.png") repeat scroll -24px 0 transparent;';
		tmpMenuEntry.innerHTML = '<a href="#" onclick="' +MenuDetails[rightMenu[RMC]]+ '">'+
				'<img src="http://meuchelfix77.cwsurf.de/TWM/'+ (TWM_DEBUG ? 'DEBUG/' : '') +'menu_images/border.png" />'+	// Border
				'<img src="http://meuchelfix77.cwsurf.de/TWM/'+ (TWM_DEBUG ? 'DEBUG/' : '') +'menu_images/thumbs/' +rightMenu[RMC]+ '.png" />'+	// Thumb
				(possibleActiveThumbs.indexOf(rightMenu[RMC]) > -1 ? '<img class="activeThumbRight activeThumb" id="' +rightMenu[RMC]+ '_activeThumb" src="http://meuchelfix77.cwsurf.de/TWM/'+ (TWM_DEBUG ? 'DEBUG/' : '') +'menu_images/thumbs/active/' +rightMenu[RMC]+ '.png" />' : '')+	// Active Thumb
				'<img style="position:absolute; right:0px;" src="http://meuchelfix77.cwsurf.de/TWM/'+ (TWM_DEBUG ? 'DEBUG/' : '') +'menu_images/' +TWM_LANGUAGE+ '/' +rightMenu[RMC]+ '.png" />'+	// Text
				'<img style="display:none; position:absolute; right:0px;" id="'+rightMenu[RMC]+'_highlight" src="http://de2.the-west.de/images/main/menu_highlight.png" /></a>';	// Highlight
		document.getElementsByClassName('menu_list')[1].appendChild (tmpMenuEntry);
	}
	
	
	
	// ActiveThumbs ausblenden
	for (ATC in possibleActiveThumbs.split(', ') ) {
		var tmpActiveThumb = document.getElementById(possibleActiveThumbs.split(', ')[ATC]+'_activeThumb');
		if (tmpActiveThumb) {
			tmpActiveThumb.style.MozOpacity=0;
		}
		if (TWM_DEBUG) GM_log (possibleActiveThumbs.split(', ')[ATC]+'_activeThumb wurde versteckt.');
	}
	
	
	
	// Neue TW-Times-Ausgabe?
	var aktuelleAusgabe = '';
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.twtimes.de/',
		headers: {
			'User-Agent': 'Mozilla/5.0',
			'Accept': 'text/xml'
		},
		onload: function(response) {
			if (!response.responseXML) {
				response.responseXML = new DOMParser()
				.parseFromString(response.responseText, 'text/xml');
				aktuelleAusgabe = response.responseXML.getElementById('hasha').innerHTML;
				if (aktuelleAusgabe != GM_getValue('lastTWTimes', 'null') ) {
					location.assign ('javascript:Fader.addButton("TheWestTimes"); void(0)');
					if (TWM_DEBUG) GM_log ('Neue TW-Times-Ausgabe: ' +aktuelleAusgabe);
				}
			}
		}
	});
	
	
	
	// Einstellungen
	//////////////////

	// CSS für das Fenster
	var get_css_link = document.createElement('link');
	var css_link = (TWM_DEV ? 'http://localhost:8080/TWM/TW_inject.css' : 'http://meuchelfix77.cwsurf.de/TWM/'+ (TWM_DEBUG ? 'DEBUG/' : '') +'TW_inject.css');
	get_css_link.setAttribute('href', css_link);
	get_css_link.setAttribute('type', 'text/css');
	get_css_link.setAttribute('rel', 'stylesheet');
	document.getElementsByTagName('head')[0].appendChild(get_css_link);

	// Externes Script einbinden
	var main_script = document.createElement('script');
	main_script.setAttribute ('src', (TWM_DEV ? 'http://localhost:8080/TWM/TW_inject.js' : 'http://meuchelfix77.cwsurf.de/TWM/'+ (TWM_DEBUG ? 'DEBUG/' : '') +'TW_inject.js') );
	main_script.setAttribute('type', 'text/javascript');
	document.getElementsByTagName('head')[0].appendChild(main_script);

	// Einstellungs-Link erstellen und einfügen
	var settings = document.createElement('div');
	settings.id = 'MenuEinstellungen';
	settings.className = 'main_footnote';
	settings.style.cssText = 'cursor:pointer; z-index:99';
	var settingsLink = document.createElement('div');
	settingsLink.innerHTML = TWM_LANGUAGEPACK['settingsLink'];
	settingsLink.setAttribute ('onclick',  'show_settings_window(); if(document.getElementById(\'settingsWindowTaskBarEntry\')) close_settings_window(); document.getElementById(\'settingsWindow\').style.zIndex = lastIndex;');
	var footerLeft = document.createElement('div');
	footerLeft.className = 'main_footnote_left';
	var footerRight = document.createElement('div');
	footerRight.className = 'main_footnote_right';
	settings.appendChild(footerLeft);
	settings.appendChild(footerRight);
	settings.appendChild(settingsLink);
	var server_time = document.getElementsByClassName('main_footnote')[0];
	server_time.parentNode.insertBefore(settings, server_time.nextSibling.nextSilbing);
}



// Aktuelle TW-Times-Ausgabe speichern
if (location.href.indexOf('.twtimes.') > -1) {
	if (TWM_DEBUG) GM_log ('TW-Times geladen.');
	GM_setValue ('lastTWTimes', document.getElementById('hasha').innerHTML);
}


if (location.href.indexOf('TWM') > -1 && location.href.indexOf('update') == -1 && location.href.indexOf('show') == -1) {
	TWM_LANGUAGE = GM_getValue('TWM_LANGUAGE', GM_getValue('TWM_LAST_LANG', 'en') );
	if (TWM_DEBUG) GM_log ('TWM-Seite geladen.');
	
	// Version anzeigen
	var version_text = document.getElementById('version');
	version_text.innerHTML = '(v.'+TWM_VERSION+ (TWM_VERSION.toString().substr(TWM_VERSION.length-1, 1) == '0' ? '0' : '') +', '+GM_getValue('TWM_LAST_LANG', '')+'/'+TWM_LANGUAGE+'-'+TWM_URL+')';
	
	// Website-Link der Sprache anpassen
	var websiteBtn = document.getElementById('websiteBtn').parentNode;
	websiteBtn.href += TWM_LANGUAGE;
	
	// Event-Listener für Bestätigen- & Zruücksetzen-Buttons hinzufügen
	document.getElementById('submitBtn').addEventListener('click', TWM_saveSettings, false);
	document.getElementById('resetBtn').addEventListener('click', TWM_resetSettings, false);
	//document.getElementById('scriptSettingsBtn').addEventListener('click', TWM_openScriptSettings, false);
	
	// Gespeicherte Einträge verschieben
	for (var LMC=0; LMC<leftMenu.length; LMC++) {
		var tmpMenuEntry = document.getElementById(leftMenu[LMC]);
		tmpMenuEntry.parentNode.removeChild(tmpMenuEntry);
		tmpMenuEntry = document.createElement('li');
		tmpMenuEntry.className = '';
		tmpMenuEntry.id = leftMenu[LMC];
		tmpMenuEntry.innerHTML = '<img src="menu_images/'+TWM_LANGUAGE+'/'+leftMenu[LMC]+'.png" />';
		document.getElementById('left_sortable').appendChild(tmpMenuEntry);
	}
	
	for (var RMC=0; RMC<rightMenu.length; RMC++) {
		var tmpMenuEntry = document.getElementById(rightMenu[RMC]);
		tmpMenuEntry.parentNode.removeChild(tmpMenuEntry);
		tmpMenuEntry = document.createElement('li');
		tmpMenuEntry.className = '';
		tmpMenuEntry.id = rightMenu[RMC];
		tmpMenuEntry.innerHTML = '<img src="menu_images/'+TWM_LANGUAGE+'/'+rightMenu[RMC]+'.png" />';
		document.getElementById('right_sortable').appendChild(tmpMenuEntry);
	}
	
	// Bekannte Einträge aktivieren
	for (obj in MenuDetails) {
		var tmpEntry = document.getElementById(obj);
		if (tmpEntry) {
			tmpEntry.className = '';
		} else {
			GM_log (obj + ' nicht vorhanden!');
		}
	}
	
	// Sprache einstellen
	var entrys = document.getElementsByTagName('img');
	for (var i = 0; i < entrys.length; i++) {
		var tmp = entrys[i];
		tmp.src = tmp.src.replace('LANG', TWM_LANGUAGE);
		if (tmp.getAttribute ('onmouseover') ) {
			tmp.setAttribute ('onmouseover', tmp.getAttribute ('onmouseover').replace('LANG', TWM_LANGUAGE) );
		}
		if (tmp.getAttribute ('onmouseout') ) {
			tmp.setAttribute ('onmouseout', tmp.getAttribute ('onmouseout').replace('LANG', TWM_LANGUAGE) );
		}
	}
}

// Event-Listener-Funktionen
//////////////////////////////

// Einstellungen speichern
function TWM_saveSettings () {
	setTimeout (function () {
		if (TWM_DEBUG) GM_log (TWM_LANGUAGEPACK['settingsSaved']);
		try {
			var leftResArray = document.getElementById('leftRes').innerHTML.split(',');
			if (document.getElementById('leftRes').innerHTML.indexOf(',') > -1)
				GM_setValue ('l_length', leftResArray.length);
			else
				GM_setValue ('l_length', 0);
				
			for (var i=0; i<leftResArray.length; i++) {
				GM_setValue ('l_'+i, leftResArray[i]);
			}
			
			var rightResArray = document.getElementById('rightRes').innerHTML.split(',');
			if (document.getElementById('rightRes').innerHTML.indexOf(',') > -1)
				GM_setValue ('r_length', rightResArray.length);
			else
				GM_setValue ('r_length', 0);
			
			for (var i=0; i<rightResArray.length; i++) {
				GM_setValue ('r_'+i, rightResArray[i]);
			}
			
			alert (TWM_LANGUAGEPACK['refreshPage']);
		} catch (e) {
			GM_log (e);
		}
	}, 1000);
}



// Einstellungen zurücksetzen
function TWM_resetSettings () {
	GM_setValue ('l_length', -1);
	GM_setValue ('r_length', -1);
	if (TWM_DEBUG) GM_log ('Einstellungen gelöscht.');
	
	for (var LMC=0; LMC<leftMenu.length; LMC++) {
		GM_setValue ('l_'+LMC, leftMenu[LMC]);
	}
	for (var RMC=0; RMC<rightMenu.length; RMC++) {
		GM_setValue ('r_'+RMC, rightMenu[RMC]);
	}
	alert (TWM_LANGUAGEPACK['resetSettings']);
}



// Script-Einstellungen öffnen
/*function TWM_openScriptSettings () {
	//frame = parent.getElementById('settingFrame');
	//alert (frame.src);
	//frame.src = 'http://'+ (TWM_DEV ? 'localhost:8080' : 'cwsurf.de/TWM'+ (TWM_DEBUG ? '/DEBUG' : '') ) +'/scriptSettings.php';
	
	//location.assign('javascript:openScriptSettings();void(0)');
}*/



// Benutzerskript-Befehle
///////////////////////////
if (location.href.indexOf('.the-west.') > -1) {
	GM_registerMenuCommand(TWM_LANGUAGEPACK['openSettings'], TWM_openSettings, 'E');
	GM_registerMenuCommand(TWM_LANGUAGEPACK['resetSettings'], TWM_resetSettings, 'z');
}

GM_registerMenuCommand(TWM_LANGUAGEPACK['update_function'], TWM_update_function, 'U');

if (GM_getValue ('TWM_DEBUG', false) == false) {
	GM_registerMenuCommand(TWM_LANGUAGEPACK['debug_on'], TWM_debug_on, 'D');
} else {
	GM_registerMenuCommand(TWM_LANGUAGEPACK['debug_off'], TWM_debug_off, 'D');
}

GM_registerMenuCommand(TWM_LANGUAGEPACK['setLanguage'], TWM_setLanguage, 'S');
if (GM_getValue ('TWM_LANGUAGE', false) != false) {
	GM_registerMenuCommand(TWM_LANGUAGEPACK['resetLanguage'], TWM_resetLanguage, 'r');
}

function TWM_resetLanguage () {
	if (confirm(TWM_LANGUAGEPACK['resetLanguageRequest']) ) {
		GM_deleteValue ('TWM_LANGUAGE');
		alert (TWM_LANGUAGEPACK['resetLanguageDone']);
	} else {
		alert (TWM_LANGUAGEPACK['operationCanceled']);
	}
}

function TWM_setLanguage () {
	GM_setValue ('TWM_LANGUAGE', prompt (TWM_LANGUAGEPACK['setLanguagePrompt'], GM_getValue ('TWM_LANGUAGE', 'en') ) );
	alert (TWM_LANGUAGEPACK['setLanguageDone']);
}

function TWM_openSettings () {
	if (location.href.indexOf ('.the-west.') > -1)
		location.assign("javascript:show_window(); if(document.getElementById(\'settingsWindowTaskBarEntry\')) close_window(); document.getElementById(\'settingsWindow\').style.zIndex = lastIndex;void(0)");
	else
		alert (TWM_LANGUAGEPACK['visitTWpage']);
		
	if (TWM_DEBUG) GM_log ('Einstellungen öffnen.');
}

function TWM_debug_on () {
	GM_setValue ('TWM_DEBUG', true);
	alert (TWM_LANGUAGEPACK['debug_on_done']);
}

function TWM_debug_off () {
	GM_setValue ('TWM_DEBUG', false);
	alert (TWM_LANGUAGEPACK['debug_off_done']);
}





// Updates
////////////
function TWM_update_function () {
	if (location.href.indexOf('.the-west.') > -1) {
		var TWM_update_script = document.createElement('script');
		TWM_update_script.src = (TWM_DEV ? 'http://localhost:8080/' : 'http://www.meuchelfix77.cwsurf.de/') +'TWM/updater.php?v='+TWM_VERSION+'&lang='+TWM_LANGUAGE;
		TWM_update_script.type = 'text/javascript';
		document.getElementsByTagName('body')[0].appendChild(TWM_update_script);
	}
	GM_log ('Suche nach Updates.');
}
var updateInterval = setInterval(TWM_update_function, 1000*60*10);