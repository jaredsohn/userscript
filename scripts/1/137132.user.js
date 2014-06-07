// ==UserScript==
// @name           TW Polnisch Deutsch Übersetzer
// @namespace      ProKillia
// @description    Übersetzt Teile von the-west.pl  ins Deutsche
// @include        *.the-west.pl/*
// @include        the-west.pl/*
// @include        www.the-west.pl
// @include        the-west.pl
// @require        http://userscripts.org/scripts/source/85398.user.js
// ==/UserScript==

// Version 1

/* Ünterstützt von:
 * ProKillia
 *
 * Großteile des Skripts sind von TheWest-Menu kopiert, daher gibt es noch viele Sinnlose Abschnitte
 * Es handelt sich um eine chaotische preAlpha-Version! Die final Version wird (irgendwann) komplett neu geschrieben werden müssen,
 * aktuell werden nur verschiedene Möglichkeiten "ausprobiert"...
 */
window.setTimeout(function(){





var allLink, thisLink;
allLink = document.evaluate(
    '//a',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLink.snapshotLength; i++) {
    thisLink = allLink.snapshotItem(i);
    switch(thisLink.innerHTML){
        case '» Lista użytkowników':
            thisLink.innerHTML = '» Nutzerliste ';
            break;
        case '<img src="img.php?type=button&amp;subtype=normal&amp;value=new_thread">':
            thisLink.innerHTML = '<img src="http://de12.the-west.de/img.php?type=button&subtype=normal&value=new_thread">';
            break;
        case '» Otwórz forum w nowym oknie.':
            thisLink.innerHTML = '» Forum in neuem Fenster öffnen';
            break;
        case '» Zaznacz wszystkie tematy jako przeczytane':
            thisLink.innerHTML = '» Alle Themen als gelesen markieren';
            break;
        case '<img src="/images/transparent.png" class="post_quote">Cytuj':
            thisLink.innerHTML = '<img src="/images/transparent.png" class="post_quote">Zitieren';
            break;
       case '<img src="/images/transparent.png" class="post_edit">Opracuj':
            thisLink.innerHTML = '<img src="/images/transparent.png" class="post_edit">Bearbeiten';
            break;
       case '<img src="/images/transparent.png" class="post_delete">Kasuj':
           thisLink.innerHTML = '<img src="/images/transparent.png" class="post_delete">Löschen';
           break;
        case'<span class="button_left"></span><span class="button_middle">Bandyci</span><span class="button_right"></span><span style="clear: both;"></span>':
           thisLink.innerHTML = '<span class="button_left"></span><span class="button_middle">Banditen</span><span class="button_right"></span><span style="clear: both;"></span>';
           break;
        default:
            break;
    }
}

var allStrong, thisStrong;
allStrong = document.evaluate(
    '//strong',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allStrong.snapshotLength; i++) {
    thisStrong = allStrong.snapshotItem(i);
    switch(thisStrong.innerHTML){
        case 'Ważne:':
            thisStrong.innerHTML = 'Wichtig';
            break;
        case 'Ważne':
            thisStrong.innerHTML = 'Wichtig';
            break;
        case 'Sprzedaż gazet "Echo The West"':
            thisStrong.innerHTML = 'Zeitung austragen';
            break;
        case 'Obce miasto':
            thisStrong.innerHTML = 'fremde Stadt';
            break;
        default:
            break;
    }
}

var allImg, thisImg;

allImg = document.evaluate(
    '//img',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allImg.snapshotLength; i++) {
    thisImg = allImg.snapshotItem(i);
    switch(thisImg.alt){
    case '[[Antworten]]':
        thisImg.src = 'http://de12.the-west.de/img.php?type=button&subtype=normal&value=reply';
        break;
    default:
        break;
    }
}

var allh3, thish3;

allh3 = document.evaluate(
    '//h3',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allh3.snapshotLength; i++) {
    thish3 = allh3.snapshotItem(i);
    switch(thish3.innerHTML){
    case 'Utwórz nowy temat':
        thish3.innerHTML = 'Neues Thema erstellen';
        break;
    default:
        break;
    }
}

var allh2, thish2;

allh2 = document.evaluate(
    '//h2',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allh2.snapshotLength; i++) {
    thish2 = allh2.snapshotItem(i);
    switch(thish2.innerHTML){
    case 'Usuń post':
        thish2.innerHTML = 'Post löschen';
        break;
    default:
        break;
    }
}


var allInput, thisInput

allInput = document.evaluate(
    '//input',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allInput.snapshotLength; i++) {
    thisInput = allInput.snapshotItem(i);
    switch(thisInput.src){
    case 'http://pl16.the-west.pl/img.php?type=button&subtype=normal&value=send':
        thisInput.src = 'http://de12.the-west.de/img.php?type=button&subtype=normal&value=send';
        break;
    default:
        break;
    }
}

var alldiv, thisdiv;

alldiv = document.evaluate(
    '//div',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < alldiv.snapshotLength; i++) {
    thisdiv = alldiv.snapshotItem(i);
    switch(thisdiv.innerHTML){
    case '<img src="http://www.the-west.pl/images/throbber2.gif" alt="Proszę czekać..."> Proszę czekać...':
        thisdiv.innerHTML = '<img src="http://www.the-west.pl/images/throbber2.gif" alt="Proszę czekać..."> Wird geladen...';
        break;
    default:
        break;
    }
}




},50);




var seperatorsLeft = 0;
var seperatorsRight = 0;
var possibleActiveThumbs = 'Advent,Berichte,Charakter,Fertigkeiten,Haendler,Stadtforum,Telegramme,TheWestTimes,M77';


var workbar_right = document.getElementById ('workbar_right');
var workbar_left = document.getElementById ('workbar_left');
var left_menu = document.getElementsByClassName ('menu_list')[0];

var DEV = GM_getValue ('DEV', false);
var M77 = GM_getValue ('M77', false);
var DEBUG = GM_getValue ('DEBUG', false);
var BETA = GM_getValue ('BETA', false);
var LANGUAGE = GM_getValue ('LANGUAGE', 'en');
var SITE_LANG = 'en';
var URL = 'net';
//var UPDATE_INTERVAL = GM_getValue ('UPDATE_INTERVAL', 10) * 1000 * 60;
var VERSION = 3.032;
var DOMAIN = 'http://' + (DEV ? 'localhost:8080/TWM' : 'twm.pf-control.de') + '/';
var NEWS = GM_getValue ('NEWS', true);

LANGUAGE = 'de';

LANGUAGEPACK = new Object ();
LANGUAGEPACK['settingsLink']			= 'Menü-Einstellungen';
LANGUAGEPACK['noSettings']				= 'Momentan sind keine individuellen Einstellungen vorhanden.\nUm eigene Einstellungen zu speichern, klicke auf den Link \'Menü-Einstellungen\' unter dem Chat-Fenster.';
LANGUAGEPACK['settingsSaved']			= 'Einstellungen gespeichert.';
LANGUAGEPACK['NaN']				= 'Du musst eine Nummer eingeben!';
LANGUAGEPACK['goToTWpage']			= 'Du musst dich innerhalb von TheWest befinden, um deine Einstellungen zu ändern.';
LANGUAGEPACK['refreshPage']			= 'Laden Sie die Seite neu, damit die Änderungen wirksam werden!';
LANGUAGEPACK['resetSettings']			= 'Die Einstellungen wurden zurückgesetzt.';
LANGUAGEPACK['resetLanguageRequest']		= 'Wollen Sie die Spracheinstellungen wirklich zurücksetzen?';
LANGUAGEPACK['resetLanguageDone']			= 'Sprache gelöcht.';
LANGUAGEPACK['operationCanceled']			= 'Vorgang abgebrochen.';
LANGUAGEPACK['setLanguagePrompt']			= 'Bitte geben Sie ein unterstütztes Sprachenkürzel ein, um die Sprache festzulegen. Unterstützte Sprachen kannst du unter dem folgenden Link sehen:\nhttp://http://twm.pf-control.de/features.php?lang=de#language';
LANGUAGEPACK['setLanguageDone']			= 'Sprache wurde geändert.';
LANGUAGEPACK['debug_on_done']			= 'Debug-Modus aktiviert.';
LANGUAGEPACK['debug_off_done']			= 'Debug-Modus deaktiviert.';
LANGUAGEPACK['exitBeta']				= '\'The-West - Menü\'-Beta verlassen';
LANGUAGEPACK['setLanguageFail']			= 'Die Sprache konnte nicht eingestellt werden. Sprache ist nun Englisch!';

MenuDetails = new Object ();
MenuDetails['Advent']			= 'AjaxWindow.show(\'advent\', {}); Fader.removeButton(\'Advent\');';
MenuDetails['Aktivitaeten']		= 'try{DailyActivitiesWindow.open();} catch(e){new HumanMessage (\'Error! Not available!\');}';
MenuDetails['Arbeiten']			= 'AjaxWindow.show(\'work\');';
MenuDetails['Bank']				= 'if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Berichte']			= 'try{MessagesWindow.open(\'report\');} catch(e){AjaxWindow.show(\'reports\');}';
MenuDetails['Bestatter']		= 'if(Character.home_town != null){try{MorticianWindow.open(Character.home_town.town_id);} catch(e){AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);}}';
MenuDetails['Buechsenmacher']	= 'if(Character.home_town != null){try{Trader.open(\'gunsmith\',Character.home_town.town_id);} catch(e){AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);}}';
MenuDetails['Buendnis']			= 'var list=document.getElementById(\'chatwindow_channelselect\'); if(list){for(var i=0;i<list.options.length;i++){if (list.options[i].value.indexOf (\'room_alliance_\')>-1){Alliance.show(list.options[i].value.replace(\'room_alliance_\',\'\'));}}}';
MenuDetails['Charakter']		= 'try{CharacterWindow.open();} catch(e){AjaxWindow.show(\'character\');}';
MenuDetails['Duell']			= 'AjaxWindow.show(\'duel\');';
MenuDetails['ElUltimoDuelo']	= 'window.open(\'http://www.elultimoduelo.com/\', \'_blank\');';
MenuDetails['Einladungen']		= 'AjaxWindow.show(\'invitations\');';
MenuDetails['Einstellungen']	= 'try{OptionsWindow.open();} catch(e){AjaxWindow.show(\'settings\');}';
MenuDetails['Erfolge']			= 'try{AchievementWindow.open();} catch(e){AjaxWindow.show(\'achievement\');}';
MenuDetails['Fertigkeiten']		= 'try{SkillsWindow.open();} catch(e){AjaxWindow.show(\'skill\');}';
MenuDetails['Fortuebersicht']	= 'try{FortOverviewWindow.open();} catch(e){AjaxWindow.show(\'fort_overview\');}';
MenuDetails['Freunde']			= 'try{FriendslistWindow.open();} catch(e){new HumanMessage (\'Error! Not available!\');}';
MenuDetails['Gemischtwaren']	= 'if(Character.home_town != null){try{Trader.open(\'general\',Character.home_town.town_id);} catch(e){AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);}}';
MenuDetails['Haendler']			= 'try{Trader.open(\'item_trader\');} catch(e){AjaxWindow.show(\'item_trader\', {action:\'index\', h:h});}';
MenuDetails['Handwerk']			= 'try{CharacterWindow.open(); CharacterWindow.showTab(\'crafting\');} catch(e){Crafting.open();}';
MenuDetails['Hotel']			= 'if(Character.home_town != null){try{HotelWindow.open(Character.home_town.town_id);} catch(e){AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);}}';
MenuDetails['Inventar']			= 'try{Wear.open();} catch(e){AjaxWindow.show(\'inventory\');}';
MenuDetails['Kirche']			= 'if(Character.home_town != null){try{ChurchWindow.open(Character.home_town.town_id);} catch(e){AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);}}';
MenuDetails['Markt']			= 'if(Character.home_town != null){try{MarketWindow.open(Character.home_town.town_id, 10);} catch(e){AjaxWindow.show(\'building_market\',{town_id:Character.home_town.town_id},Character.home_town.town_id);}}';
MenuDetails['Notizen']			= 'openTWN();';
MenuDetails['Poker']			= 'Poker.open();';
MenuDetails['Premium']			= 'try{PremiumWindow.open();} catch(e){AjaxWindow.show(\'premium\');}';
MenuDetails['PremiumKaufen']	= 'PremiumBuyWindow.open();';
MenuDetails['Profil']			= 'AjaxWindow.show(\'profile\',{char_id:Character.playerId},Character.playerId);';
MenuDetails['Quests']			= 'AjaxWindow.show(\'building_quest\');';
MenuDetails['Rangliste']		= 'AjaxWindow.show(\'ranking\');';
MenuDetails['Saloon']			= 'if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Schlafen']			= 'if(Character.home_town != null) TWM_sleep(0);'
MenuDetails['Schneider']		= 'if(Character.home_town != null){try{Trader.open(\'tailor\',Character.home_town.town_id);} catch(e){AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);}}';
MenuDetails['Sheriff']			= 'if(Character.home_town != null) AjaxWindow.show(\'building_sheriff\',{town_id:Character.home_town.town_id},Character.home_town.town_id);';
MenuDetails['Stadthalle']		= 'if(Character.home_town != null){try{CityhallWindow.open(Character.home_town.town_id);} catch(e){AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);}}';
MenuDetails['Stadt']			= 'AjaxWindow.show(\'town\',null,Character.get_home_town()?Character.get_home_town().x+\'_\'+Character.get_home_town().y:null);';
MenuDetails['Stadtforum']		= 'AjaxWindow.show(\'forum\',undefined,undefined,undefined,{y:25});';
MenuDetails['Statistiken']		= 'try{AchievementWindow.open(Character.playerId, \'statistic\');} catch(e){AjaxWindow.show(\'achievement\');}';
MenuDetails['Telegramme']		= 'try{MessagesWindow.open();} catch(e){AjaxWindow.show(\'messages\');}';
MenuDetails['TheWestDataBase']	= 'window.open(\'http://tw-db.info/index.php?strana=welcome&lang='+LANGUAGE+(LANGUAGE == 'en' ? 'g' : '')+'\', \'_blank\');';
MenuDetails['TheWestForts']		= 'window.open(\'http://www.westforts.com/\', \'_blank\');';
MenuDetails['TheWestInsider']	= '(function(){ var head = document.getElementsByTagName(\'head\').item(0); var old = document.getElementById(\'TWIjs\'); if(old) head.removeChild(old); var js = document.createElement(\'script\'); js.setAttribute(\'id\', \'TWIjs\'); js.setAttribute(\'language\', \'javascript\'); js.setAttribute(\'type\', \'text/javascript\'); js.setAttribute(\'src\', \'http://www.TheWestInsider.com/scripts/1.js.php\'); head.appendChild(js); } )()';
MenuDetails['TheWestHelps']		= 'window.open(\'http://west-helps.blogspot.com/\', \'_blank\');';
MenuDetails['TheWestStats']		= 'window.open(\'http://'+(URL == 'net' ? 'www' : URL)+'.weststats.com/\', \'_blank\');';
MenuDetails['TheWestTimes']		= 'window.open(\'http://www.twtimes.de/\', \'_blank\'); Fader.removeButton(\'TheWestTimes\');';
MenuDetails['TheWestWiki']		= 'window.open(\'http://wiki.the-west.'+URL+'/\', \'_blank\');';
MenuDetails['UPShop']	 		= 'try{UPShopWindow.open();} catch(e){new HumanMessage (\'Error! Not available!\');}';
MenuDetails['Wegweiser']		= 'if(Character.home_town != null) AjaxWindow.show(\'fingerboard\',{town_id:Character.home_town.town_id},Character.home_town.town_id);'
MenuDetails['seperator']		= '';

GM_setValue ('LANGUAGE','de');

var leftMenu = new Array();
var rightMenu = new Array ();


leftMenu = new Array ('Charakter', 'Fertigkeiten', 'Inventar', 'Quests', 'Stadt', 'Stadtforum', 'Duell', 'Erfolge');
rightMenu = new Array ('Rangliste', 'Premium', 'Telegramme', 'Berichte', 'Arbeiten', 'Einstellungen', 'Fortuebersicht', 'Poker');

left_menu.style.cssText = 'background:url(' + DOMAIN + 'left_menu_bg.png);';
left_menu.style.height = ( (GM_getValue ('l_length', 8) - seperatorsLeft) * 26 + (seperatorsLeft * 16) - 1) + 'px';
var right_menu = document.getElementsByClassName ('menu_list')[1];
right_menu.style.cssText = 'background:url(' + DOMAIN + 'right_menu_bg.png);';
right_menu.style.height = ( (GM_getValue ('r_length', 8) - seperatorsRight) * 26 + (seperatorsRight * 16) - 1) + 'px';

	var oldMenuLeft = new Array ('character', 'skill', 'inventory', 'quest', 'town', 'townforum', 'duel', 'achievement');
	var oldMenuRight = new Array ('ranking', 'premium', 'messages', 'activities', 'reports', 'work', 'settings', 'forts', 'poker');
	
	for (var OLMC = 0; OLMC < oldMenuLeft.length; OLMC++) {
		var tmpLeft = document.getElementById ('menu_' + oldMenuLeft[OLMC]);
		if (tmpLeft)
			tmpLeft.style.display = 'none';
		else
			if (!DEBUG) GM_log ('Eintrag nicht gefunden: menu_' + oldMenuLeft[OLMC]);
	}
	
	for (var ORMC = 0; ORMC < oldMenuRight.length; ORMC++) {
		var tmpRight = document.getElementById ('menu_' + oldMenuRight[ORMC]);
		if (tmpRight)
			tmpRight.style.display = 'none';
		else
			if (!DEBUG) GM_log ('Eintrag nicht gefunden: menu_' + oldMenuRight[ORMC]);
	}


	for (var LMC = 0; LMC < leftMenu.length; LMC++) {
		var tmpMenuEntry;
		if (leftMenu[LMC] != 'seperator') {
			tmpMenuEntry = document.createElement ('div');
			tmpMenuEntry.id = leftMenu[LMC];
			tmpMenuEntry.setAttribute ('onmouseover', 'document.getElementById("' + leftMenu[LMC] + '_highlight").style.display="inline";');
			tmpMenuEntry.setAttribute ('onmouseout', 'document.getElementById("' + leftMenu[LMC] + '_highlight").style.display="none";');
			tmpMenuEntry.cssText = 'background:url("/images/main/menu_inactive.png") repeat scroll -24px 0 transparent;';
			tmpMenuEntry.innerHTML = '<a href="#" onclick="' + MenuDetails[leftMenu[LMC]] + '">'
					+ '<img src="' + DOMAIN + 'menu_images/' + (leftMenu[LMC] == 'seperator' ? '' : LANGUAGE) + '/' + leftMenu[LMC] + '.png">'
					+ '<img style="display:none; position:absolute; left:0px;" id="' + leftMenu[LMC] + '_highlight" src="http://de2.the-west.de/images/main/menu_highlight.png">'
					+ '<img src="' + DOMAIN + 'menu_images/thumbs/' + leftMenu[LMC] + '.png">'
					+ (possibleActiveThumbs.indexOf(leftMenu[LMC] + ',') > -1 ? '<img class="activeThumbLeft activeThumb" id="' +leftMenu[LMC]+ '_activeThumb" src="' + DOMAIN + 'menu_images/thumbs/active/' +leftMenu[LMC]+ '.png">' : '')
					+ '<img src="' + DOMAIN + 'menu_images/border.png"></a>';
		} else {
			tmpMenuEntry = document.createElement ('img');
			tmpMenuEntry.id = leftMenu[LMC] + LMC;
			tmpMenuEntry.className = 'seperator';
			tmpMenuEntry.src = DOMAIN + 'menu_images/seperator.png';
		}
		left_menu.appendChild (tmpMenuEntry);
	}
	
	for (var RMC = 0; RMC < rightMenu.length; RMC++) {
		var tmpMenuEntry;
		if (rightMenu[RMC] != 'seperator') {
			tmpMenuEntry = document.createElement ('div');
			tmpMenuEntry.id = rightMenu [RMC];
			tmpMenuEntry.setAttribute ('onmouseover', 'document.getElementById("' + rightMenu[RMC] + '_highlight").style.display="inline";');
			tmpMenuEntry.setAttribute ('onmouseout', 'document.getElementById("' + rightMenu[RMC] + '_highlight").style.display="none";');
			tmpMenuEntry.cssText = 'background:url("/images/main/menu_inactive.png") repeat scroll -24px 0 transparent;';
			tmpMenuEntry.innerHTML = '<a href="#" onclick="' + MenuDetails[rightMenu[RMC]] + '">'
					+ '<img src="' + DOMAIN + 'menu_images/border.png">'
					+ '<img src="' + DOMAIN + 'menu_images/thumbs/' + rightMenu[RMC] + '.png">'
					+ (possibleActiveThumbs.indexOf(rightMenu[RMC] + ',') > -1 ? '<img class="activeThumbRight activeThumb" id="' + rightMenu[RMC] + '_activeThumb" src="' + DOMAIN + 'menu_images/thumbs/active/' + rightMenu[RMC] + '.png">' : '')
					+ '<img style="position:absolute; right:0px;" src="' + DOMAIN + 'menu_images/' + (leftMenu[LMC] == 'seperator' ? '' : LANGUAGE) + '/' + rightMenu[RMC] + '.png">'
					+ '<img style="display:none; position:absolute; right:0px;" id="' + rightMenu[RMC] + '_highlight" src="http://de2.the-west.de/images/main/menu_highlight.png"></a>';
		} else {
			tmpMenuEntry = document.createElement ('img');
			tmpMenuEntry.id = rightMenu[RMC] + RMC;
			tmpMenuEntry.className = 'seperator';
			tmpMenuEntry.src = DOMAIN + 'menu_images/seperator.png';
		}
		right_menu.appendChild (tmpMenuEntry);
	}
	
	// ActiveThumbs ausblenden
	var pATarray = possibleActiveThumbs.split (',');
	for (ATC in pATarray) {
		var tmpActiveThumb = document.getElementById (pATarray[ATC]+'_activeThumb');
		if (tmpActiveThumb) {
			tmpActiveThumb.style.MozOpacity = 0;
		}
	}


