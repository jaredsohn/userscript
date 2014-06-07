// ==UserScript==
// @name          DS Smilies-BB-Codes-List
// @version       2.15
// @author        Samuel Essig (http://c1b1.de)
// @description   Fügt ein Auswahlfeld im Internen Forum hinzu, damit man Smilies und Icons auswählen kann, außerdem die BB-Codes für Berichte und Code. Seit Version 2 können Texte gespeicherter werden.
// @namespace     c1b1.de
// @homepage      http://userscripts.org/scripts/show/39879
// @copyright     2009-2013, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @icon          http://www.die-staemme.de/favicon.ico

// @include       http://*.die-staemme.de/forum.php*answer=true*
// @include       http://*.die-staemme.de/forum.php*edit_post_id*
// @include       http://*.die-staemme.de/forum.php*mode=new_thread*
// @include       http://*.die-staemme.de/forum.php*mode=new_poll*

// @include       http://*.die-staemme.de/*screen=forum*answer=true*
// @include       http://*.die-staemme.de/*screen=forum*edit_post_id*
// @include       http://*.die-staemme.de/*screen=forum*mode=new_thread*
// @include       http://*.die-staemme.de/*screen=forum*mode=new_poll*

// @include       http://*.die-staemme.de/*answer=true*screen=forum*
// @include       http://*.die-staemme.de/*edit_post_id*screen=forum*
// @include       http://*.die-staemme.de/*mode=new_thread*screen=forum*
// @include       http://*.die-staemme.de/*mode=new_poll*screen=forum*

// @include       http://*.die-staemme.de/*screen=memo*
// @include       http://*.die-staemme.de/*edit=1*screen=info_player*
// @include       http://*.die-staemme.de/*screen=info_player*edit=1*

// @include       http://*.die-staemme.de/*screen=mail*mode=new*
// @include       http://*.die-staemme.de/*screen=mail*mode=view*
// @include       http://*.die-staemme.de/*mode=new*screen=mail*
// @include       http://*.die-staemme.de/*mode=view*screen=mail*

// @include       http://*.die-staemme.de/*screen=ally*mode=overview*
// @include       http://*.die-staemme.de/*screen=ally*mode=properties*

// @include       http://*.die-staemme.de/*mode=overview*screen=ally*
// @include       http://*.die-staemme.de/*mode=properties*screen=ally*



// @include       http://*.staemme.ch/forum.php*answer=true*
// @include       http://*.staemme.ch/forum.php*edit_post_id*
// @include       http://*.staemme.ch/forum.php*mode=new_thread*
// @include       http://*.staemme.ch/forum.php*mode=new_poll*

// @include       http://*.staemme.ch/*screen=forum*answer=true*
// @include       http://*.staemme.ch/*screen=forum*edit_post_id*
// @include       http://*.staemme.ch/*screen=forum*mode=new_thread*
// @include       http://*.staemme.ch/*screen=forum*mode=new_poll*

// @include       http://*.staemme.ch/*answer=true*screen=forum*
// @include       http://*.staemme.ch/*edit_post_id*screen=forum*
// @include       http://*.staemme.ch/*mode=new_thread*screen=forum*
// @include       http://*.staemme.ch/*mode=new_poll*screen=forum*

// @include       http://*.staemme.ch/*screen=memo*
// @include       http://*.staemme.ch/*edit=1*screen=info_player*
// @include       http://*.staemme.ch/*screen=info_player*edit=1*

// @include       http://*.staemme.ch/*screen=mail*mode=new*
// @include       http://*.staemme.ch/*screen=mail*mode=view*
// @include       http://*.staemme.ch/*mode=new*screen=mail*
// @include       http://*.staemme.ch/*mode=view*screen=mail*

// @include       http://*.staemme.ch/*screen=ally*mode=overview*
// @include       http://*.staemme.ch/*screen=ally*mode=properties*

// @include       http://*.staemme.ch/*mode=overview*screen=ally*
// @include       http://*.staemme.ch/*mode=properties*screen=ally*


// @include       http://*.tribalwars.net/forum.php*answer=true*
// @include       http://*.tribalwars.net/forum.php*edit_post_id*
// @include       http://*.tribalwars.net/forum.php*mode=new_thread*
// @include       http://*.tribalwars.net/forum.php*mode=new_poll*

// @include       http://*.tribalwars.net/*screen=forum*answer=true*
// @include       http://*.tribalwars.net/*screen=forum*edit_post_id*
// @include       http://*.tribalwars.net/*screen=forum*mode=new_thread*
// @include       http://*.tribalwars.net/*screen=forum*mode=new_poll*

// @include       http://*.tribalwars.net/*answer=true*screen=forum*
// @include       http://*.tribalwars.net/*edit_post_id*screen=forum*
// @include       http://*.tribalwars.net/*mode=new_thread*screen=forum*
// @include       http://*.tribalwars.net/*mode=new_poll*screen=forum*

// @include       http://*.tribalwars.net/*screen=memo*
// @include       http://*.tribalwars.net/*edit=1*screen=info_player*
// @include       http://*.tribalwars.net/*screen=info_player*edit=1*

// @include       http://*.tribalwars.net/*screen=mail*mode=new*
// @include       http://*.tribalwars.net/*screen=mail*mode=view*
// @include       http://*.tribalwars.net/*mode=new*screen=mail*
// @include       http://*.tribalwars.net/*mode=view*screen=mail*

// @include       http://*.tribalwars.net/*screen=ally*mode=overview*
// @include       http://*.tribalwars.net/*screen=ally*mode=properties*

// @include       http://*.tribalwars.net/*mode=overview*screen=ally*
// @include       http://*.tribalwars.net/*mode=properties*screen=ally*


// @include       http://*.tribalwars.nl/forum.php*answer=true*
// @include       http://*.tribalwars.nl/forum.php*edit_post_id*
// @include       http://*.tribalwars.nl/forum.php*mode=new_thread*
// @include       http://*.tribalwars.nl/forum.php*mode=new_poll*

// @include       http://*.tribalwars.nl/*screen=forum*answer=true*
// @include       http://*.tribalwars.nl/*screen=forum*edit_post_id*
// @include       http://*.tribalwars.nl/*screen=forum*mode=new_thread*
// @include       http://*.tribalwars.nl/*screen=forum*mode=new_poll*

// @include       http://*.tribalwars.nl/*answer=true*screen=forum*
// @include       http://*.tribalwars.nl/*edit_post_id*screen=forum*
// @include       http://*.tribalwars.nl/*mode=new_thread*screen=forum*
// @include       http://*.tribalwars.nl/*mode=new_poll*screen=forum*

// @include       http://*.tribalwars.nl/*screen=memo*
// @include       http://*.tribalwars.nl/*edit=1*screen=info_player*
// @include       http://*.tribalwars.nl/*screen=info_player*edit=1*

// @include       http://*.tribalwars.nl/*screen=mail*mode=new*
// @include       http://*.tribalwars.nl/*screen=mail*mode=view*
// @include       http://*.tribalwars.nl/*mode=new*screen=mail*
// @include       http://*.tribalwars.nl/*mode=view*screen=mail*

// @include       http://*.tribalwars.nl/*screen=ally*mode=overview*
// @include       http://*.tribalwars.nl/*screen=ally*mode=properties*

// @include       http://*.tribalwars.nl/*mode=overview*screen=ally*
// @include       http://*.tribalwars.nl/*mode=properties*screen=ally*


// @exclude       http://forum.die-staemme.de/*
// @exclude       http://forum.tribalwars.net/*
// @exclude       http://forum.beta.tribalwars.net/*
// @exclude       http://forum.tribalwars.nl/*

// ==/UserScript==

/*

http://userscripts.org/scripts/show/39879

############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this logo.

######################## Logo ########################
           ___   __       ___             __
  _____   <  /  / /_     <  /        ____/ /  ___
 / ___/   / /  / __ \    / /        / __  /  / _ \
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/

######################################################

If you have any questions, comments,
ideas, etc, feel free to contact me
and I will do my best to respond.

         mail:info@c1b1.de

         skype:c1b1_se

         http://c1b1.de

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en


##################### Description ####################


Funktioniert mit Firefox 4.0+ (GM 0.9.2+) und Opera 11+

Für Opera 9 und 10 wird folgende Scriptversion empfohlen:
http://userscripts.org/scripts/version/39879/112353.user.js

Fügt ein Auswahlfeld im Internen Forum hinzu, damit man Smilies und Icons auswählen kann, außerdem die BB-Codes für Berichte und Code.
Seit Version 2 können Texte gespeicherter werden.


Screenshot:
http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.smilies_bb-codes_0.png ( First Version )
http://s3.amazonaws.com/uso_ss/1407/large.png ( Version 1.7 )
http://s3.amazonaws.com/uso_ss/1406/large.png ( Version 1.7 )
http://s3.amazonaws.com/uso_ss/1405/large.png ( Version 1.8 )
http://s3.amazonaws.com/uso_ss/1408/large.png ( Version 1.8 )
http://s3.amazonaws.com/uso_ss/3652/large.jpeg ( Version 2.0 )




*/

function dsSmiliesBBCodesList() {


const ver = '2.15';


var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
api?api.register('DS Smilies-BB-Codes-List', [8.16, 8.17], 'Samuel Essig', 'scripts@online.de'):0;


// ############################################################## GM Functions


var GM_prefix = 'dsSmiliesBBCodesList639562_';

var unsafeWindow = window;

var GM_addStyle = function(css) {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

var GM_deleteValue = function(name) {
	localStorage.removeItem(GM_prefix+name);
}

var GM_getValue = function(name, defaultValue) {
	var value = localStorage.getItem(GM_prefix+name);
	if (!value)
	return defaultValue;
	var type = value[0];
	value = value.substring(1);
	switch (type) {
	case 'b':
		return value == 'true';
	case 'n':
		return Number(value);
	default:
		return value;
	}
}

var GM_log = function(message) {
	console.log(message);
}

var GM_registerMenuCommand = function(name, funk) {
	//todo
}

var GM_setValue = function(name, value) {
	value = (typeof value)[0] + value;
	localStorage.setItem(GM_prefix+name, value);
}

// ############################################################## Languages

var lang = {


  'de' : {

'buildings' : 'Gebäude',
'units' : 'Einheiten',
'bigunits' : 'Einheiten (groß)',
'villages' : 'Dörfer',
'ressources' : 'Ressourcen',
'points' : 'Punkte',
'arrows' : 'Pfeile',
'messages' : 'Nachrichten',
'leaders' : 'Führung',
'others' : 'Andere',
'report_url' : 'Gib die URL zum Bericht an:',
'linkreport' : 'Bericht verlinken',
'directreport' : 'Bericht direkt anzeigen',
'convertcoords' : 'Koordinaten in BB-Codes umwandeln',
'search' : 'Suchen . . . ',
'searchterm' : 'Suchbegriff',
'line' : 'Zeile',
'noresults' : 'Kein Treffer :(',
'personaltexts' : 'Persönliche Texte',
'noentries' : 'Bisher keine Einträge',
'editentry' : 'Bearbeiten',
'editpersonalentries' : 'Persönliche Texte bearbeiten',
'del' : 'Löschen',
'confirm_delete' : 'Soll dieser Eintrag wirklich gelöscht werden?',
'newentry' : 'Neu',
'close' : 'Schließen',
'editpersonaltext' : 'Persönlichen Text bearbeiten',
'newpersonaltext' : 'Neuer persönlicher Text',
'title' : 'Titel:',
'text' : 'Text:',
'ok' : 'OK',
'cancel' : 'Abbrechen',

'scriptname' : 'DS Smilies-BB-Codes-List',
'shortVersion' : 'ver',
'smiliesEditor' : 'Smilies Editor',
'close' : 'Schließen',
'plus' : 'Plus',
'addSmiley' : 'Neuen Smiley hinzufügen',
'addLineBreak' : 'Neuen Zeilenumbruch hinzufügen',
'action' : 'Aktion',
'uri' : 'URI',
'result': 'Ergebnis',
'resetSmilies' : 'Smilies auf Standardsmilies zurücksetzen',
'confirmResetSmilies' : 'Wirklich auf Standardsmilies zurücksetzen',
'doneResetSmilies' : 'Reset durchgeführt!',
'moveUp' : 'Nach oben',
'moveToTop' : 'An den Anfang verschieben',
'moveUpOneLine' : 'Um eine Zeile nach oben verschieben',
'moveDown' : 'Nach unten',
'moveDownOneLine' : 'Um eine Zeile nach unten verschieben',
'moveToBottom' : 'An das Ende verschieben',
'enterImageURL' : 'Gib die URL der Grafik ein:',
'mainMenu' : 'Hauptmenü',
'homepage' : 'Homepage:',
'scriptURL' : 'http://userscripts.org/scripts/show/39879',
'homepageInfos' : 'Script Homepage: Updates, News, ... ',
'setting_on' : 'Ja',
'setting_off' : 'Nein',
'setting_closeAfterAddImage' : 'Nach Smiley/Bild Popup auto. schließen',
'setting_quickPreview' : 'Quick Preview (Alpha Version):',
'setting_showAllImagesImmediately' : 'Alle Icons sofort anzeigen:',
'setting_openSmiliesEditor' : 'Smilies Editor öffnen',
'setting_smilies' : 'Smilies:',
'shortLicenseText' : 'Licensed under the CC Attribution-Noncommercial-Share Alike 3.0 license ',
'licenseURL' : 'http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode',
'licenseName' : 'CC Attribution-Noncommercial-Share Alike 3.0',
'authorHint' : 'Erstellt von Samuel Essig'

    },
	
  'ch' : {

'buildings' : 'Gebäude',
'units' : 'Einheiten',
'bigunits' : 'Einheiten (groß)',
'villages' : 'Dörfer',
'ressources' : 'Ressourcen',
'points' : 'Punkte',
'arrows' : 'Pfeile',
'messages' : 'Nachrichten',
'leaders' : 'Führung',
'others' : 'Andere',
'report_url' : 'Gib die URL zum Bericht an:',
'linkreport' : 'Bericht verlinken',
'directreport' : 'Bericht direkt anzeigen',
'convertcoords' : 'Koordinaten in BB-Codes umwandeln',
'search' : 'Suchen . . . ',
'searchterm' : 'Suchbegriff',
'line' : 'Zeile',
'noresults' : 'Kein Treffer :(',
'personaltexts' : 'Persönliche Texte',
'noentries' : 'Bisher keine Einträge',
'editentry' : 'Bearbeiten',
'editpersonalentries' : 'Persönliche Texte bearbeiten',
'del' : 'Löschen',
'confirm_delete' : 'Soll dieser Eintrag wirklich gelöscht werden?',
'newentry' : 'Neu',
'close' : 'Schließen',
'editpersonaltext' : 'Persönlichen Text bearbeiten',
'newpersonaltext' : 'Neuer persönlicher Text',
'title' : 'Titel:',
'text' : 'Text:',
'ok' : 'OK',
'cancel' : 'Abbrechen',

'scriptname' : 'DS Smilies-BB-Codes-List',
'shortVersion' : 'ver',
'smiliesEditor' : 'Smilies Editor',
'close' : 'Schließen',
'plus' : 'Plus',
'addSmiley' : 'Neuen Smiley hinzufügen',
'addLineBreak' : 'Neuen Zeilenumbruch hinzufügen',
'action' : 'Aktion',
'uri' : 'URI',
'result': 'Ergebnis',
'resetSmilies' : 'Smilies auf Standardsmilies zurücksetzen',
'confirmResetSmilies' : 'Wirklich auf Standardsmilies zurücksetzen',
'doneResetSmilies' : 'Reset durchgeführt!',
'moveUp' : 'Nach oben',
'moveToTop' : 'An den Anfang verschieben',
'moveUpOneLine' : 'Um eine Zeile nach oben verschieben',
'moveDown' : 'Nach unten',
'moveDownOneLine' : 'Um eine Zeile nach unten verschieben',
'moveToBottom' : 'An das Ende verschieben',
'enterImageURL' : 'Gib die URL der Grafik ein:',
'mainMenu' : 'Hauptmenü',
'homepage' : 'Homepage:',
'scriptURL' : 'http://userscripts.org/scripts/show/39879',
'homepageInfos' : 'Script Homepage: Updates, News, ... ',
'setting_on' : 'Ja',
'setting_off' : 'Nein',
'setting_closeAfterAddImage' : 'Nach Smiley/Bild Popup auto. schließen',
'setting_quickPreview' : 'Quick Preview (Alpha Version):',
'setting_showAllImagesImmediately' : 'Alle Icons sofort anzeigen:',
'setting_openSmiliesEditor' : 'Smilies Editor öffnen',
'setting_smilies' : 'Smilies:',
'shortLicenseText' : 'Licensed under the CC Attribution-Noncommercial-Share Alike 3.0 license ',
'licenseURL' : 'http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode',
'licenseName' : 'CC Attribution-Noncommercial-Share Alike 3.0',
'authorHint' : 'Erstellt von Samuel Essig'
    },	


  'nl' : {

'buildings' : 'Buildings',
'units' : 'Units',
'bigunits' : 'Units (big)',
'villages' : 'Villages',
'ressources' : 'Ressources',
'points' : 'Points',
'arrows' : 'Arrows',
'messages' : 'Mail',
'leaders' : 'Duke',
'others' : 'Others',
'report_url' : 'Please type in the URL of the publicized report:',
'linkreport' : 'Link report',
'directreport' : 'Direct link report',
'convertcoords' : 'Convert co-ordinates to BB-Codes',
'search' : 'Search . . . ',
'searchterm' : 'Search for: ',
'line' : 'Line',
'noresults' : 'No results :(',
'personaltexts' : 'Personal texts',
'noentries' : 'Currently no entries',
'editentry' : 'Edit',
'editpersonalentries' : 'Edit personal texts',
'del' : 'Delete',
'confirm_delete' : 'Do you really want to delete this text?',
'newentry' : 'New',
'close' : 'Close',
'editpersonaltext' : 'Edit personal text',
'newpersonaltext' : 'New personal text',
'title' : 'Title:',
'text' : 'Text:',
'ok' : 'OK',
'cancel' : 'Cancel',

'scriptname' : 'DS Smilies-BB-Codes-List',
'shortVersion' : 'ver',
'smiliesEditor' : 'Smilies Editor',
'close' : 'Close',
'plus' : 'Add',
'addSmiley' : 'Add a new smiley',
'addLineBreak' : 'Add a new linebreak',
'action' : 'Action',
'uri' : 'URL',
'result': 'Result',
'resetSmilies' : 'Reset smilies to standard smilies',
'confirmResetSmilies' : 'Really reset all smilies to standard?',
'doneResetSmilies' : 'Smilies reseted!',
'moveUp' : 'Move up',
'moveToTop' : 'Move to top',
'moveUpOneLine' : 'Move one line up',
'moveDown' : 'Move down',
'moveDownOneLine' : 'Move one line down',
'moveToBottom' : 'Move to bottom',
'enterImageURL' : 'Enter the URL of the image',
'mainMenu' : 'Main menu',
'homepage' : 'Homepage:',
'scriptURL' : 'http://userscripts.org/scripts/show/39879',
'homepageInfos' : 'Script Homepage: Updates, News, ... ',
'setting_on' : 'On',
'setting_off' : 'Off',
'setting_closeAfterAddImage' : 'Auto. close box after adding smilie/image',
'setting_quickPreview' : 'Quick Preview (Alpha Version):',
'setting_showAllImagesImmediately' : 'Show all icons/images immediately:',
'setting_openSmiliesEditor' : 'Open Smilies Editor',
'setting_smilies' : 'Smilies:',
'shortLicenseText' : 'Licensed under the CC Attribution-Noncommercial-Share Alike 3.0 license ',
'licenseURL' : 'http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode',
'licenseName' : 'CC Attribution-Noncommercial-Share Alike 3.0',
'authorHint' : 'Created by Samuel Essig'
  },


  'en' : {

'buildings' : 'Buildings',
'units' : 'Units',
'bigunits' : 'Units (big)',
'villages' : 'Villages',
'ressources' : 'Ressources',
'points' : 'Points',
'arrows' : 'Arrows',
'messages' : 'Mail',
'leaders' : 'Duke',
'others' : 'Others',
'report_url' : 'Please type in the URL of the publicized report:',
'linkreport' : 'Link report',
'directreport' : 'Direct link report',
'convertcoords' : 'Convert co-ordinates to BB-Codes',
'search' : 'Search . . . ',
'searchterm' : 'Search for: ',
'line' : 'Line',
'noresults' : 'No results :(',
'personaltexts' : 'Personal texts',
'noentries' : 'Currently no entries',
'editentry' : 'Edit',
'editpersonalentries' : 'Edit personal texts',
'del' : 'Delete',
'confirm_delete' : 'Do you really want to delete this text?',
'newentry' : 'New',
'close' : 'Close',
'editpersonaltext' : 'Edit personal text',
'newpersonaltext' : 'New personal text',
'title' : 'Title:',
'text' : 'Text:',
'ok' : 'OK',
'cancel' : 'Cancel',

'scriptname' : 'DS Smilies-BB-Codes-List',
'shortVersion' : 'ver',
'smiliesEditor' : 'Smilies Editor',
'close' : 'Close',
'plus' : 'Add',
'addSmiley' : 'Add a new smiley',
'addLineBreak' : 'Add a new linebreak',
'action' : 'Action',
'uri' : 'URL',
'result': 'Result',
'resetSmilies' : 'Reset smilies to standard smilies',
'confirmResetSmilies' : 'Really reset all smilies to standard?',
'doneResetSmilies' : 'Smilies reseted!',
'moveUp' : 'Move up',
'moveToTop' : 'Move to top',
'moveUpOneLine' : 'Move one line up',
'moveDown' : 'Move down',
'moveDownOneLine' : 'Move one line down',
'moveToBottom' : 'Move to bottom',
'enterImageURL' : 'Enter the URL of the image',
'mainMenu' : 'Main menu',
'homepage' : 'Homepage:',
'scriptURL' : 'http://userscripts.org/scripts/show/39879',
'homepageInfos' : 'Script Homepage: Updates, News, ... ',
'setting_on' : 'On',
'setting_off' : 'Off',
'setting_closeAfterAddImage' : 'Auto. close box after adding smilie/image',
'setting_quickPreview' : 'Quick Preview (Alpha Version):',
'setting_showAllImagesImmediately' : 'Show all icons/images immediately:',
'setting_openSmiliesEditor' : 'Open Smilies Editor',
'setting_smilies' : 'Smilies:',
'shortLicenseText' : 'Licensed under the CC Attribution-Noncommercial-Share Alike 3.0 license ',
'licenseURL' : 'http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode',
'licenseName' : 'CC Attribution-Noncommercial-Share Alike 3.0',
'authorHint' : 'Created by Samuel Essig'
  },

};

// ############################################################## Init correct languages
const url = document.location.href;
var l_matched = url.match(/\/\/(\D{2})\d+\./);
l_matched = l_matched?l_matched[1]:false;
var std_lang = 'en';
const languagecode = l_matched?l_matched:std_lang;
const say = lang[languagecode]?lang[languagecode]:lang[std_lang];




// ############################################################## Default Smilies and Images


var smilies = new Array(
'http://forum.die-staemme.de/images/phpbb_smilies/icon_biggrin.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_smile.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_wink.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_cool.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_razz.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_eek.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_surprised.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_twisted.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_evil.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_confused.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_neutral.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_sad.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_cry.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_mrgreen.gif',
'\n',
'http://c1b1.de/smile/smileys/em16.gif',
'http://c1b1.de/smile/smileys/em17.gif',
'http://c1b1.de/smile/smileys/em18.gif',
'http://c1b1.de/smile/smileys/em19.gif',
'http://c1b1.de/smile/smileys/em1500.gif',
'http://c1b1.de/smile/smileys/em2100.gif',
'http://c1b1.de/smile/smileys/em2200.gif',
'http://c1b1.de/smile/smileys/em2300.gif',
'http://c1b1.de/smile/smileys/em2400.gif',
'http://c1b1.de/smile/smileys/em2700.gif',
'http://c1b1.de/smile/smileys/em2700.gif',
'http://c1b1.de/smile/smileys/em2900.gif',
'http://c1b1.de/smile/smileys/em3000.gif',
'http://c1b1.de/smile/smileys/em3300.gif',
'http://c1b1.de/smile/smileys/em3400.gif');

var ds_icons = new Array(

new Array(
say.buildings,
'graphic/buildings/main.png',
'graphic/buildings/barracks.png',
'graphic/buildings/stable.png',
'graphic/buildings/garage.png',
'graphic/buildings/snob.png',
'graphic/buildings/smith.png',
'graphic/buildings/place.png',
'graphic/buildings/statue.png',
'graphic/buildings/church.png',
'graphic/buildings/market.png',
'graphic/buildings/wood.png',
'graphic/buildings/stone.png',
'graphic/buildings/iron.png',
'graphic/buildings/farm.png',
'graphic/buildings/storage.png',
'graphic/buildings/hide.png',
'graphic/buildings/wall.png'
),

new Array(
say.units,
'graphic/unit/unit_archer.png',
'graphic/unit/unit_axe.png',
'graphic/unit/unit_catapult.png',
'graphic/unit/unit_heavy.png',
'graphic/unit/unit_knight.png',
'graphic/unit/unit_light.png',
'graphic/unit/unit_marcher.png',
'graphic/unit/unit_priest.png',
'graphic/unit/unit_ram.png',
'graphic/unit/unit_snob.png',
'graphic/unit/unit_spear.png',
'graphic/unit/unit_spy.png',
'graphic/unit/unit_sword.png'
),

new Array(
say.bigunits,
'graphic/unit_big/archer.png',
'graphic/unit_big/axe.png',
'graphic/unit_big/catapult.png',
'graphic/unit_big/heavy.png',
'graphic/unit_big/knight.png',
'graphic/unit_big/light.png',
'graphic/unit_big/marcher.png',
'graphic/unit_big/ram.png',
'graphic/unit_big/snob.png',
'graphic/unit_big/spear.png',
'graphic/unit_big/spy.png',
'graphic/unit_big/sword.png'
),


new Array(
say.villages,
'graphic/map/b1.png',
'graphic/map/b1_left.png',
'graphic/map/b2.png',
'graphic/map/b2_left.png',
'graphic/map/b3.png',
'graphic/map/b3_left.png',
'graphic/map/b4.png',
'graphic/map/b4_left.png',
'graphic/map/b5.png',
'graphic/map/b5_left.png',
'graphic/map/b6.png',
'graphic/map/b6_left.png'
),

new Array(
say.ressources,
'graphic/eisen.png',
'graphic/holz.png',
'graphic/lehm.png',
'graphic/res.png'
),

new Array(
say.points,
'graphic/dots/blue.png',
'graphic/dots/brown.png',
'graphic/dots/green.png',
'graphic/dots/grey.png',
'graphic/dots/red.png',
'graphic/dots/yellow.png'
),

new Array(
say.arrows,
'graphic/forwarded.png',
'graphic/group_jump.png',
'graphic/group_left.png',
'graphic/group_right.png',
'graphic/links2.png',
'graphic/rechts2.png',
'graphic/links.png',
'graphic/rechts.png',
'graphic/oben.png',
'graphic/unten.png',
'graphic/pfeil.png',
'graphic/villages.png',
'graphic/overview/up.png',
'graphic/overview/down.png',
'graphic/map/map_ne.png',
'graphic/map/map_nw.png',
'graphic/map/map_se.png',
'graphic/map/map_sw.png'
),

new Array(
say.messages,
'graphic/answered_mail.png',
'graphic/deleted_mail.png',
'graphic/new_mail.png',
'graphic/read_mail.png'
),

new Array(
say.leaders,
'graphic/ally_rights/diplomacy.png',
'graphic/ally_rights/forum_mod.png',
'graphic/ally_rights/found.png',
'graphic/ally_rights/internal_forum.png',
'graphic/ally_rights/invite.png',
'graphic/ally_rights/lead.png',
'graphic/ally_rights/mass_mail.png'
),

new Array(
say.others,
'graphic/ally_forum.png',
'graphic/face.png',
'graphic/gold.png',
'graphic/klee.png',
'graphic/rabe.png',
'graphic/rename.png',
'graphic/command/attack.png',
'graphic/command/back.png',
'graphic/command/cancel.png',
'graphic/command/return.png',
'graphic/command/support.png',
'graphic/unit/def.png',
'graphic/unit/def_archer.png',
'graphic/unit/def_cav.png',
'graphic/unit/speed.png',
'graphic/unit/att.png',
'graphic/forum/forum_admin_unread.png',
'graphic/forum/thread_close.png',
'graphic/forum/thread_closed_unread.png',
'graphic/forum/thread_delete.png',
'graphic/forum/thread_open.png',
'graphic/forum/thread_unread.png'
)

);


var icon_smilies = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAACoFBM\
VEUAAACvsrfb0bHNwJS5ur7Zz7DJvJSusrbe1LStsbbKvJG4sAuyqgrVzK7c0rKvpwrQxJ7IuI/TyKKU\
jQfDs411bwns4Rm0rArf0xK0rAu3rwvNwZvFvA66si7e1J706Rje1LDRyJ7VzBHKwA7c0RTYzqC7snmz\
qgv79Brb0q779yva0Jnb0RHw6l9sZwmwqA3CuRCYkBfb0bDe1bDs53Lt5nP26xf78xweHQW2rXTXzRGn\
oA0ZGASRigyxqBCooAiRiiLNxJzc07Lw6lz68xv16Rbu4hXUyRMKCgOlng3SyRGbkwze1KyEfgm4sAys\
sLXf1a6im1359TTWzJ3y6y6fmA/r4BTm2xSnnhAjIgWyqg7OxQ+jmw0gHgWVjgu2rgyelQbd0hWBew7V\
yovr3xTn3BPJvxCSiw26sV/LwA67sg7k3Jr49DP89BqwqAqlnQeBexjy5xbMwYLZzhKwpxCclA/WzBHS\
yBHOxA/KwQ7GvA7Btw28tAzj2pqupwv17DKFfwiBexDJvxbJvIgKCQKspA+FfwzQxhDMww7Jvw7FvA3B\
uA28swzp3RSxqAppYwmHgAeFfRyimiTMv5HOwZfKu5K3rTCKhAy9tA7Hvg3DuQ3Atw28sw2zqgqYjwh0\
bgqXkAaPhzbGvRmzqVa1rAqblAqPiQ2/tg6+tgy6sguzrAq1rBGjmguTjAmJgQ2roWrGuYaclCOIggl/\
eQuhmgqvpgqRiQlybAuOiAuJgjHFuIu4rHOUjB2mnQmakgt4cgl1cAp9dgtzbQp2cAmWjwiTjAiHfyK5\
rn+7r3mSii6Rig+YkQaXjweVjQiUjQaTjAeIgRKRijy8sIGMhDLGuo24rXeimVGTizeNhS6TiziimVW3\
rHrIu5CGgAqupwy1rQpMLoSeAAAAAXRSTlMAQObYZgAAAWlJREFUeF5VzFOzK1EQgNG9xzOxk2Pbtm3b\
tm1b17Zt27b9V85k8nLzvXTXqq4GACP/C0JIYgBAAY7ohQswAHGKK8nE0dqe23AaQISdZsPOo0qrCeM6\
cyFFIakcpnln+Jouqy0sbTfaeFAId+np5WBXXhHr5Obiynf3F+qwsanZJ8TvVEBgUDAvNCxci3hEZFR0\
THZcfELiVHKKSJaOsyjNzGrPyc3LLygsKi4pFZV9krIorlRWVatrao3qG/78/dfS2iYmATTs6Ozq7unt\
6x8YHDIYUYyNG0IAicmD0zOzc/MLi0s8zcrq2gaCRWbTVqNt23fs3LWbp9mzd9/+AwzJInro8JGjx46f\
MDipOq04c/YcQ2vx/AX+xUuXVfwrV69dl924qUP01u07d+/df/Dw0eMnT5+hDOQQff7i5avXb96+e//h\
I4pqfxKb2T5/+frt+4+fv36zO8GiXLJFL4kcAwCjSb1oDKwDMvtwyB3q78QAAAAASUVORK5CYII=';

var icon_report_direct = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYFBMVEUAAACvsrebjHDXy7f5+Pausra0po2nmYC+s5qL\
e125ur7QxJ6WDArKvJHRv6rDEBCtsbbTyKLNwZvRgHLJvJTZl4rn3Na2Z1rVzK7t6OLIuI/Ds43Zz7DKu5Lb0bGssLVAcwUHAAAAAXRSTlMAQObYZgAAAKVJ\
REFUeF5tzdcOwzAIQFGG98ruHv//l8WtFNVyzhtXIACC/oOIOgDgpRMAH50R8NV5H8V2k501htvoiJViI3F/tJFTSl3Z1kdTxfY8DCdJhuwkMcboyJ7UNgzF\
EJUYNeA8k1HiuqREZRYIuK6e5FC2UiprJTFncp6t9+6cllzpb/SWvMl5W35xrNGRJ5aBOe+xg0dRy/eOxPvt2bjdA0AYdWMM8AFB7hjReYdZRgAAAABJRU5E\
rkJggg==';

var icon_report_link = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABIFBMVEUAAACbjHCvsrfJvJT5+PbXy7e0po2+s5qLe12n\
mYDKvJG5ur6tsbausrbb0bHRv6qWDArZz7DQxJ7DEBDRgHLZl4rNwZvn3NbTyKLDs43IuI+2Z1rt6OLVzK7Ku5KssLV1wtydqZxgosGVqKVXsVBq0eyBqZVf\
mJ26t5ZcndFtgnQsoD+J7vjAvpaKnomnqYlsoGJFWnEob3E8nbJPw+RQxeZKqdpIf8hSf5hsvENKUnkkR38xcaU2iMI5ic09ecc4Wbo1W48+hUxobH4lNoQf\
ZVohgFAudIAxUaksQagrQZo/WoSimotUX4cnY1IUfRwXgCglcl80Xpc8YKN1gZGrpJFqeIc/hVcymURAlXFVi7CCnai2r5JhyuhVlc9biqeITlZjAAAAAXRS\
TlMAQObYZgAAAPNJREFUeF5lzeNyBEEUgNG+bYy1jG3btu33f4t0MqnJbO3389QFQsYthTF2DUK4oy2DcNiWg7BXxITinHleVwkFMEoZ97z/yRQEpbTJVIFM\
NeK4YolDjmEoQFVoGsc+B/DzR1Xg1NZMggD86k8WIwl20U4Fgd/XMxxFkYtwBkIyJaVoBEl37+BElmGECUgFkk/1p0kyMDI0SYhFLUAC06NjjI1/fH5Na+1a\
zJuZnZtfWFxaXtHaKXB1bX1jc2t7Z7eMe/sHh0fHJ6dnWuMCzy8ur65vbu/uf2+Svx4en55fXt/eCbFYq3e2VK8ZhIzjtuQY9A0LLSCs0XdPPQAAAABJRU5E\
rkJggg==';

var icon_code = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHGQkYLjfIjVsA\
AAKeSURBVDjLnZRLSFRhFMd/3zejTir2cqNYZDkKPibMR20isVJa9bAWCe0q2rSQamPhIre5L4g2QZsWhVFmiESJoab5GEYszUc6YabkjPNq5t6vxXWuDs5YeeAP3+N//t+5555zBED7\
m07lCwb5HxMIc61QpNls1NZUC/GstU3lZwewWiRSCrZiuq6IaDqzSzuQAFaLNC/i4deyl67uQUKhMLqu8PuDdHUPsuILoOuKqMZKIGgISik2RXtHNzcaW0hJSUJKwYfeYa5ebza/Kgql\
lCH4N+vpc1JRVrS2/+jEUWLHZkuJzasQ/ybY2++ksqx43QMjHC4vicv9q+DUtJv5H0tUlhuCXq+P0bFJDlcUx//7z1rbVOGeUMzhpct3cI19BUCLaASCIdLTU40S0XV8/iBpqTaENOLp\
f/8EAOdMMlaA3yFPjGDd6aNULTkAePr8Ldsz0jh18ggArzt68Hh81J0+ZvLX/DMNQS0SiRGsra4w148ev6T+/AkunKkC4MWrLo4fK6P+/AmTE/UXYjWHmqbFxeSUm5+Lyxw6aEfTNDxe\
H6Ofpyl15MXlC4QRYSQcipvgvk8udu/KICdrJ5FwiP5PLgAK83MS+liNvtTMg4bbD8z15Mw8kYjGrab7AMy6F7FaLTQ2PzRKREpamq/E9PSGsrFYpAn390Wys3abd7NzC+RkZ8Zw1ptS\
qxGut3t3jRe/zS3wrttJ082LHMjNxuP1c/JcIw3XzlJZVpCwbhMWdv/QONszUtm/LwuAwZEJpBQ4inITi23WegNDXygtyUMIY6QNDI9TWLAXmy05oaCZQ4VlAwaGJig9aI/dO+xxuVGY\
rZcpXCQlSaTFsrUBq2mEwzr+lFJjjre/6VQrgSBiawMbpSB9m43amuqkP9SuNod5SVyuAAAAAElFTkSuQmCC';

var icon_icons = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHGQkaKOydSuwA\
AAMgSURBVDjLnZRPaBxlGMZ/839md5P9Y3Y3TTZry9pNtJVqD4b2EDWH1JMnteCpXgpBBO2hooeCBW+CJ/UiVFDw4CEQClsVzCUWqlbBGpVgUvxTaNxm081kd2Z35pvxMO402yyCeU/D\
937P8z3zvs/7SgALi7UwJOT/hIQUf4eEJE2TU3OzirSwWAurYw6qIiPLEvuJIAjxRcBfjQwqgKrIcWKvFJ0w6ACgqAaB6A4kVRWZHceNCAcpO/7cZbJTZYRrs3njx+jQ/Qnf6/DL1Q8H\
koZhiDwoMfPaZazcNsK16drbWIUpAMxciaNTVc6+/PbgukpSpHB3vHi+Rv7403hff8x0/k8SBy0sEzbqw+juXbZEFsdp4PhJLLW1h7RP4cmzy/zhjDG5/hmPlZKMFrMcO1KlWjnIo1MV\
XjhdBiBhWpx//cJAlXKvGUEQYv9+g+bKAoaukc0Mc/ihKhMHyhQeSDOSL5LPZRgvejhdGVVP8+ZbH8XYXkNVgG5nGwBtaILnj9xFsXQeHC9SKpVI6QZWIo9xu8746G2efOJvbm342G0H\
4fsxNoqRSKHw/SjZFHzzm42m6qSSSVK6QS6bjq837Xs1Mw2d764vx1jh+0jSvwqFEACIts3E2BjPzu5waGKD8uF1tFwJgIcbdb692qC+2WI83+C9S9+zG9ubHhXA9yLjaumoR7bd5dUL\
Na4srQGQHjIBePfiU2w1nZjskclKjI0NHjFHr2QmhzGNFvWtJG+8Mg3AlaU1mrbbBzo3/wwrq00kORljezPd58OECyThy+UmS9c0DlVmmK/MANBuOTjOHdyO4NbNLSR5CNMw7puU+3z4\
6cWjAHS9Do7r0m45MZkf3FNyp5vEEwHTJ078t7EBDowWMNSAhCHT2kUqRNB3T1Nk5k6W+8kkaS/hmdPH+HX1JqlwMz7reB6+EDiuj9sRmIbO6to6vt/o/+VeDUOUvsSl98+BJPPS/DsU\
CyNksgUArq+4XPthk08+OIMsBwNXsrSwWAtHpJ/RNBlZUfa3YIXA8wLaxuPRHv/8i6/CHcdF2t/CJgwhZZmcmpuV/wER7Et6eXrxhgAAAABJRU5ErkJggg==';

var icon_convertCoords = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAA\
ABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAANiSURBVDhPnZVdaFtlGMd/5+Tkc2maNBubTWzW1JTQ6kDprhRBalFECU7GvBoDZTL1wiHb\
wEtBL3Y5ZFgmeDfGrLMbtEOddirKtBCUdjE2nTbFNetam6YfyUl6kuP7npK5kkLUB55zzvue//M/z/t8HWVwcFDZ2xmrres6/0UUlHtwE5MdLhefDl1oVT7/\
4msz3LbclEuzqU0xMws+tLWSzr8B2+1aU0KLyzRNVHXTffmsKP8cpc6w3d527NJeux9cf5Z3qctLd7gzlbZs1Zad1t3uduH3Omnb3dHAKW0azmGRCp37NcnN\
775k9Idf6B8YIBxaI/nHOhPfXCayy0Xi2DtEu2INpFsiXauZXDt3mrdef5uy02eRRQIKe8wcHaEeXko8TmK/n+yCTjo1xdgHx/htcmILqeWhJJJy+vIwzkWT\
pR4fLk8rj7QrREOtrBX+5NKFs+RWFXoDFdq8KgPPPkN+vpvs2EVqvQ/fI1VlIOdULxczScZv/MTRN14h2tvJyaGz9MTCBO0lC1yw7aTvyado3xMkFuvFMIq0\
BHfj69xHWV+1VIpaz3CpXKKnP86Jax9ze+E2gbCf886QBZKkmXmDB7w1Fh1xHnv6BTbKOmfO5/CGuqlVDUtl+BuqtSSAZaGFYoGqVuVD/z6LdCKVZfnmKJXZ\
7xn+0cGr7/7O0YSHGVEFp87kGBkPiN4RWZYXz0KacrGMYX2pSlEvUTUM8ht58jnRRZ1wONEnPL3Be9OHcczeFXGvcvBkBrc7iNu5SjozR3fkQVTZhwpVDnV1\
8ej0ogiWapFV1iv8lSxwfP9Brs9HOPBiP0euPm95WyyV0cuGcKBmrT0eFw7HZgVq9QzLFwMvH6J1PM251HUKqWU+OfUm7qAfnohjbGwa66UVqjUbNs3O/e0d\
DHgR+UUZGh4xO7zT1pekKKIN797Kkvp2BKp52nwOUUIt6MVVllYqvD8mjtUSR7PvELEu81A0zPHXniMeTDJTiKJ8duWqGfJMWWSyGmUnK6pqZSw7OYk5lxWG\
szidHSjtETy79nLgxM9i7earj/osu7rMrnShXLoyaoY9mS0vtlvYNNt221v2sivRzV42aQ5WlOYYya7JSVsRWWsmptFQsg0mkssafnJqy+Eo4/Z/RGbXK8aa\
+AV4/was4VDzReWIEgAAAABJRU5ErkJggg==';

var icon_usertexts = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAA\
ABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAMpSURBVDhPjVVNb9NAEH3rtWM7SZOmBTWqgKqBVAJa4ILEmQP8XCQuCA6cOKKWUyVKJShq\
y1cp+awTfy1vNm3iNgeYyNpde+ftm5k3GwXa6zdvzXA0kul/m4Ka7jUwqAQBnj976qgXL1+ZjdWoAKTgqC6y1ANMB8b4yLMOHB3CcXKugVF0CpMreOEavNLC\
1PfwdBGurFztTF/+PnXR+f0dWv1Af3gdnjnAWdpCUNpDkq9D4xvHFR76CzfWciyHM99BNJoAOs6M/uHPGn4ct7G+6iBzH6Lma7J6At98QH3xCZLBRyw2t5AM\
9xGrGlnPUmVI3zIsmtYajx63cWP1LhJTQ9Vvo1pvIks2EFaWGe4dVBYWObbwaX+frodTd6WYrquARmVYai7h8/EvvN9+h+OTDkqBRn15BX7god5Ygus6KFer\
AAGu2hwglIOS76Hb7SFg5eRRkhIW45JxXUzVxTcbcp7Pdps84xq4eesmxxyNpYZlkjE/mnslrAsz3Me6XzrHAsbj3myTYek9jfbGhgUseR4ialRg+mQdj8eo\
1WpoNHgQ4Yq+wLVJUbI0nQLmWYo0ybGzs4OvBwcWMM8ySLHqBDI8pLXesswNjyn6Cnmbw4wOF4/k0NEKw+GQXxQGHIMwRL/ft3m1OS6VbE4FoOgr3WNDTpPx\
jGGaIElzlCsVJEmCwA/Q63UJWmboEUG7uN1qne9Xl3zlpQUk8SkgW4CAIws2GAxsqL7vo0qZVHhItVzGSrOJXHpwEvTUV3p6TtgwGUP20Grfwf0HW2w5n2dQ\
sA5TwVHLnI9U12IWTNbzgMqlcDW+Hx/ZUMMgtBUXdmIT2bAclJr8rto8IHWYpgYxK392FvHicK18pE/FXeaka6tZkK/FFebzgNxsmFMpyrejI2QclbwjYHIu\
ryFzm1CPvc4fzC4vyeh5Dic9MCFfLUuBMtTqddzb3ERE2ezt7lKLOcbRwDLzXOYw7qPkkjnTU7RJp0RjeJ7oT+PawglOvmwjjkVjMVQ2YiFSVtpD6MacG4pd\
I1VnVAfDJ3MRfsJmkFtbOkrxLyCXy7HQppdO/ddCqlsN7V+A/gtSUG0hEZwMIwAAAABJRU5ErkJggg==';

var icon_search = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAB41BMVEXlEmuusrbZz7CtsbavsrfKvJG5ur7JvJTb0bGssLX+343Ds43Iuo/VzK7GvqrUy66zr63Gvq23tLPF2+6ms87b5vLE0ebG\
xszMw6vY5/OopKrUyq296fvR8Pvd9frg9vvX8/u41O7O0NrWzK3BuaWyrrGZz/qz4vvE7PrO8PvP8PvI7vu45vuoweXMxr+ZlZdtlNKMxfuvrrCy4Pu86Py+6vy35PzOxKjMw6jKydDVy66Dgo9e\
h8lml9qHt+mZyPCfyuyZw+iXw+yTxvZ4s/a1vM3RyK2Kh49pjMd+p9qTt9ykxN2tyt1+j7mfwd2Otd50puLAwszRyKyspZhrgLCQtd2qyd/A2d7M4t/L4d671d+jw96Rr9bHwsHXza6p2vzCtI1y\
coeGnr+30dDP39Ld49La49LJ3dGqw9G4vM+0rZ+LpM6vpIhsbIuToLPQ3tPn49Li5NS8ycuqrcKzs8WyrKS6pXi8r4iHgYWDgpSRkaKWlaSgnKGjm4ufmJGwnY7xyGTMo0+i1PzAs428sIy/so2w\
nnbUix+GuvH75pDQpU2xh0jrnR3833zIoFK0h0TomRz+4I384oXTqU7IuY2th03pmxzgwXjItoi4iUPDhiyklpDEuJaryt7AsIq5p4K7rYxDXc45AAAAAXRSTlMAQObYZgAAARNJREFUeF5l0FOz\
xGAMgOHkQ9vFsW3btm3btm3bxk897WJ2d85zlzcXmQmAgGYYYyjIzeofASghxMPaNt7ezoYYUFBJUmqQo4Obk7OLq6SnAioFuE94enn7+Pr5p+gjlWNgVXBIaFh4RGRUtCnGxMbtJyQmJfecpqUb\
I8nIzMrOyc3LLygsKjYeIiWlZeUVlV/VNbV19YaIpKGxqbmlta29o7OrWxcRkPf29Q8MDg2PjI6Ncx0GTBQnp6ZnZufmFxaXlkUFAsqrldW19Y3Nre2d3T2tPCKouOLg8EjLj0/UZ+fyQOVocnGp\
vrpWIuNmbm7v7h8eGSA39/SsfnlFQNHC2/vHJ4KgsfD986tRXk/RAhXgD5aaN2cW9YgDAAAAAElFTkSuQmCC';



// ############################################################## Basic functions

// Opera & Firefox
var $ = function(x,data) {
  var y = this.alert?this.document:this;
  var add = function(l) { for(var i = 0; i < l.length; i++){ l[i].$ = $;} return l;};
  if(x[0] == '#') {
    var r = y.getElementById(x.substring(1));
    if(r)
      r.$ = $;
    return r;
    }
  else if(x[0] == '.') {
    var r = y.getElementsByClassName(x.substring(1))
    return add(r);
    }
  else if(x[0] == '-') {
    var r = y.getElementsByName(x.substring(1))
    return add(r);
    }
  else if(x.toString && x.toString() == '[object HTMLCollection]') {
    return add(x); 
    }
  else if(typeof(x) == 'object') {
    x.$ = $;
    return x; 
    }
  else if(x == '$d:') {
    var r = data;
	r.parentNode.removeChild(r);
	r.$ = $;
    return r;
    }	
  else if(x[0] == '$' || x.substring(0,3) == '$n:') {
    if(x.substring(0,3) == '$n:')
	  x = x.substring(2);

    var r = document.createElement(x.substring(1));
	if(data && typeof(data) == 'object') {
	  for (var attr in data) {
	    if(attr == 'styles') {
		  if(!r.style)
		    r.setAttribute('style','');
		  for (var key in data[attr]) {
		    r.style[key] = data[attr][key];		    		  
		    }	      
		  }	
	    else if(attr == 'html') {
		  r.innerHTML = data[attr];	      
		  }	
	    else if(attr == 'append') {
		  data[attr].appendChild(r);	      
		  }			  
		else {
		  r.setAttribute(attr,data[attr]) 
          }			 
        }
	  }
    r.$ = $;
    return r;
    }
  else {
    var r = y.getElementsByTagName(x)
    return add(r);
    }
  }

Array.prototype.remove = function()
  {
  for(var i = 0,l = arguments.length; i < l; i++)
    {
    var x = this[arguments[i]];
    if (x)
      this.splice(x,1);
    }
  return this;
  }

var rel_top = function(e)
  {
  var y = 0;
  while(e)
    y += e.offsetTop + e.clientTop,e = e.offsetParent;
  return y;
  }

var rel_left = function(e)
  {
  var x = 0;
  while(e)
    x += e.offsetLeft + e.clientLeft,e = e.offsetParent;
  return x;
  }
  
var fromJson = function(str,def) {
  try
    {
    var re = JSON.parse( str );
    }
  catch(e)
    {
    return def;
    }
  return re;
  }
  
var toJson = function(o) {
  return JSON.stringify( o );
  } 
  
// ############################################################## On which page are we?  
  
const forum = (url.indexOf('forum.php') != -1  || url.indexOf('screen=view_forum') != -1  || url.indexOf('screen=forum') != -1) && (url.indexOf('answer=true') != -1 || url.indexOf('mode=new_thread') != -1 || url.indexOf('edit_post_id') != -1 || url.indexOf('mode=new_poll') != -1);
const memo = url.indexOf('screen=memo') != -1;
const mail = url.indexOf('screen=mail') != -1 && (url.indexOf('mode=new') != -1 || url.indexOf('mode=view') != -1);
const answer = url.indexOf('view=') != -1;    // Diff. of mail
const ally = url.indexOf('screen=ally') != -1 && (url.indexOf('mode=overview') != -1 || url.indexOf('mode=properties') != -1);


// ############################################################## User settings via GM functions

var quick_preview = GM_getValue('quick_preview',false);
var close_after_add_image = GM_getValue('close_after_add_image',true);
var show_all_images_immediately = GM_getValue('show_all_images_immediately',false);

var default_smilies = smilies;
if(GM_getValue('personal_smilies',false)) {
  var str = GM_getValue('personal_smilies','[]');
  var smilies = fromJson(str,[]);
  smilies = smilies?smilies:[];
} else {
  GM_setValue('personal_smilies',toJson(smilies));
}


// ############################################################## Menus and Options (functions only)



var saveReload = function() { // Save text field content because of required reload	
  if(messageTextField && messageTextField.value) {
    GM_setValue('lastTextFieldEntry',messageTextField.value);
  } else {
    GM_setValue('lastTextFieldEntry',false);	
  }
  document.location.reload();
};

var toogle_quick_preview = function () {
  if(GM_getValue('quick_preview',false)) {
    GM_setValue('quick_preview',false); 
  } else {
    GM_setValue('quick_preview',true);   
  }

  saveReload();
};

var toogle_close_after_add_image = function () {
  if(GM_getValue('close_after_add_image',false)) {
    GM_setValue('close_after_add_image',false); 
  } else {
    GM_setValue('close_after_add_image',true);   
  }

  saveReload();
} ;  

var toogle_show_all_images_immediately = function () {
  if(GM_getValue('show_all_images_immediately',false)) {
    GM_setValue('show_all_images_immediately',false); 
  } else {
    GM_setValue('show_all_images_immediately',true);   
  }

  saveReload();
} ;  



    
var toogle_smiliesEditor = function (ev) {
	ev.preventDefault();
	if(document.getElementById('smilieseditor')) {
		saveReload();
		return;
	}
	
	
	// Create Smilies Editor 
	var div = document.createElement('div');
	div.setAttribute('style','overflow:auto; max-height:700px; width: 1050px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 60px; left: 10px; padding:5px; border-top-left-radius:20px; ');
	div.setAttribute('id','smilieseditor');
	
	document.body.appendChild(div);
	toggle('smilieseditor');
	toggle('mainmenu',false,true);	
	
	div.appendChild(document.createTextNode(say.scriptname+' ('+say.shortVersion+ver+')'));
	
	var h2 = document.createElement('h2');
	h2.appendChild(document.createTextNode(say.smiliesEditor));	
	div.appendChild(h2);
	
	
	var close = document.createElement('a');
	close.setAttribute('style','position:absolute; top: 0px; right: 0px; cursor:pointer; ');
	close.setAttribute('href','#');	
	close.appendChild(document.createTextNode(say.close));
    close.addEventListener('click',function() {			
	    saveReload();
		return; },false);	
    div.appendChild(close);
	
	
	// Table 0	
	var table = document.createElement('table');
	table.setAttribute('style','width: 1000px;');
	div.appendChild(table);
	
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);	

	var td = document.createElement('td');	
	td.setAttribute('colspan','3');
	tr.appendChild(td);
	
	var img = document.createElement('img');
	img.setAttribute('src','/graphic/plus.png');	  
	img.setAttribute('alt',say.plus);	 
	img.setAttribute('title',say.addSmiley);	 	    
	td.appendChild(img);	
	  
	td.appendChild(document.createTextNode(say.addSmiley));		
	
	td.addEventListener('click',smiliesEditor_op_add,false);	

	var tr = document.createElement('tr');	
	table.appendChild(tr);	

	var td = document.createElement('td');	
	td.setAttribute('colspan','3');
	tr.appendChild(td);
	
	var img = document.createElement('img');
	img.setAttribute('src','/graphic/plus.png');	  
	img.setAttribute('alt',say.plus);	 
	img.setAttribute('title',say.addLineBreak);	 	    
	td.appendChild(img);	
	  
	td.appendChild(document.createTextNode(say.addLineBreak));		
	
	td.addEventListener('click',smiliesEditor_op_addLB,false);	
		
	
	// Table 1
	var table = document.createElement('table');
	table.setAttribute('style','width: 1000px;');
	table.setAttribute('class','smiliesEditor_table');	
	div.appendChild(table);	
		
	var tr = document.createElement('tr');	
	table.appendChild(tr);
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.action));	
		
	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.uri));	
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.result));	
		
	
	for(var i = 0; i < smilies.length; i++) {	
	  var tr = smiliesEditor_tr(i);
	  table.appendChild(tr);
	}
	
	
	// Table 2
	var table = document.createElement('table');
	table.setAttribute('style','width: 1000px;');
	div.appendChild(table);		
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);	

	var td = document.createElement('td');	
    td.setAttribute('colspan','3');
	tr.appendChild(td);
	
	var img = document.createElement('img');
	img.setAttribute('src','/graphic/plus.png');	  
	img.setAttribute('alt',say.plus);	 
	img.setAttribute('title',say.addSmiley);	 	    
	td.appendChild(img);	
	  
	td.appendChild(document.createTextNode(say.addSmiley));		
	
	td.addEventListener('click',smiliesEditor_op_add,false);
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);	

	var td = document.createElement('td');	
	td.setAttribute('colspan','3');
	tr.appendChild(td);
	
	var img = document.createElement('img');
	img.setAttribute('src','/graphic/plus.png');	  
	img.setAttribute('alt',say.plus);	 
	img.setAttribute('title',say.addLineBreak);	 	    
	td.appendChild(img);	
	  
	td.appendChild(document.createTextNode(say.addLineBreak));		
	
	td.addEventListener('click',smiliesEditor_op_addLB,false);	
	
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);	

	var td = document.createElement('td');	
	td.setAttribute('colspan','3');
	tr.appendChild(td);
				  
	td.appendChild(document.createTextNode(say.resetSmilies));		
	
	td.addEventListener('click',function() { 
	  if(confirm(say.confirmResetSmilies)) 
	    smiliesEditor_op_reset();  
      alert(say.doneResetSmilies);
      saveReload();
	},false);		
	

	
	// Footer
	var footer = document.createElement('div');
	div.appendChild(footer);
	footer.appendChild(document.createElement('br'));	
	footer.appendChild(document.createTextNode(say.shortLicenseText));
    footer.appendChild(document.createElement('br'));	
	
	return false;

};
var smiliesEditor_tr = function(index) {


	  var tr = document.createElement('tr');		
	  
	  var td = document.createElement('td');	  
	  tr.appendChild(td);
	
	  td.setAttribute('class','smiliesindex_'+index);	 	
	  
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/forum/thread_delete.png');	  
	  img.setAttribute('alt',say.del);	 
	  img.setAttribute('title',say.del);	 
      img.addEventListener('click',smiliesEditor_op_del,false);	   
	  td.appendChild(img);	

	  td.appendChild(document.createTextNode(' '));		  
	  
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/forum/thread_unread.png');	  
	  img.setAttribute('alt',say.editentry);	 
	  img.setAttribute('title',say.editentry);
      img.addEventListener('click',smiliesEditor_op_edit,false);	   	  
	  td.appendChild(img);	

	  td.appendChild(document.createTextNode(' - '));	
	  
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/overview/up.png');	  
	  img.setAttribute('alt',say.moveUp);	 
	  img.setAttribute('title',say.moveToTop);
      img.addEventListener('click',smiliesEditor_op_top,false);	   	  
	  td.appendChild(img);		  
	
	  td.appendChild(document.createTextNode('  '));	
	
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/oben.png');	  
	  img.setAttribute('alt',say.moveUp);	 
	  img.setAttribute('title',say.moveUpOneLine);	 
      img.addEventListener('click',smiliesEditor_op_up,false);	 	  
	  td.appendChild(img);	
	  	
	  td.appendChild(document.createTextNode(' - '));	
		
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/unten.png');	  
	  img.setAttribute('alt',say.moveDown);	 
	  img.setAttribute('title',say.moveDownOneLine);	 	 
      img.addEventListener('click',smiliesEditor_op_down,false);	 	  
	  td.appendChild(img);	
	  
	  td.appendChild(document.createTextNode(' '));	
	  
	  var img = document.createElement('img');
	  img.setAttribute('src','graphic/overview/down.png');	  
	  img.setAttribute('alt',say.moveDown);	 
	  img.setAttribute('title',say.moveToBottom);
      img.addEventListener('click',smiliesEditor_op_bottom,false);	 	  
	  td.appendChild(img);		  
	  	  

	  
	  if(smilies[index] == '\n') {
	  
	    var td = document.createElement('td');	
	    td.setAttribute('colspan','2');
	    tr.appendChild(td);	    
	
		td.appendChild(document.createTextNode('#########################  Zeilenumbruch #########################'));
		
	  }	 else {	  
	  
	    var td = document.createElement('td');
	    tr.appendChild(td);
	    td.appendChild(document.createTextNode(smilies[index]));
        td.setAttribute('class','smiliesEditor_url');				

	    var td = document.createElement('td');	
	    tr.appendChild(td);
	    var img = document.createElement('img');
	    img.setAttribute('src',smilies[index]);
		img.setAttribute('class','smiliesEditor_img');
	    td.appendChild(img);
		
	  }	  

	  return tr;
};

var smiliesEditor_op_reset = function(ev) {
  GM_setValue('personal_smilies',toJson(default_smilies));
};

var smiliesEditor_op_del = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
  
  var n_arr = [];
  for(var i = 0; i < smilies.length; i++) {
    if(i !== index) {
	  n_arr.push(smilies[i]);
	}
  }
  smilies = n_arr;
  
  GM_setValue('personal_smilies',toJson(smilies));
    
  this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
};

var smiliesEditor_op_add = function (ev) {
  var new_url = prompt(say.enterImageURL,'');

  if(!new_url) {
    return;   
  }

  smilies.push(new_url);

  GM_setValue('personal_smilies',toJson(smilies));
  
  var tr = smiliesEditor_tr(smilies.length-1,new_url);
  
  this.parentNode.parentNode.parentNode.getElementsByClassName('smiliesEditor_table')[0].appendChild(tr); 
} ; 

var smiliesEditor_op_addLB = function (ev) {
  var new_url = '\n';

  smilies.push(new_url);

  GM_setValue('personal_smilies',toJson(smilies));
  
  var tr = smiliesEditor_tr(smilies.length-1,new_url);
  
  this.parentNode.parentNode.parentNode.getElementsByClassName('smiliesEditor_table')[0].appendChild(tr); 
};  
  
var smiliesEditor_op_edit = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
  
  var new_url = prompt(say.enterImageURL,smilies[index]);

  if(!new_url || new_url == smilies[index]) {
    return;   
  }

  smilies[index] = new_url;

  GM_setValue('personal_smilies',toJson(smilies));
	
  (this.parentNode.tagName == 'TR'?this.parentNode:this.parentNode.parentNode).getElementsByClassName('smiliesEditor_url')[0].innerHTML = new_url;
  (this.parentNode.tagName == 'TR'?this.parentNode:this.parentNode.parentNode).getElementsByClassName('smiliesEditor_img')[0].src = new_url;
}; 

var smiliesEditor_op_up = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
   
  var table = this.parentNode.parentNode.parentNode;
  
  smiliesEditor_op_switch(table,index,index-1);
}; 
 
var smiliesEditor_op_down = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
   
  var table = this.parentNode.parentNode.parentNode;
  
  smiliesEditor_op_switch(table,index,index+1);
}; 
 
var smiliesEditor_op_top  = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
   
  var table = this.parentNode.parentNode.parentNode;
  
  smiliesEditor_op_switch(table,index,0);
}; 
 
var smiliesEditor_op_bottom  = function (ev) {
  var index = parseInt(this.parentNode.className.split('_').pop());
   
  var table = this.parentNode.parentNode.parentNode;
  
  smiliesEditor_op_switch(table,index,smilies.length-1);
};   
	  
var smiliesEditor_op_switch = function(table,index0,index1) {
  if(index0 < 0 || index0 > smilies.length-1 || index1 < 0 || index1 > smilies.length-1) {
    return;
	}


  var tmp = smilies[index0];
  smilies[index0] = smilies[index1];
  smilies[index1] = tmp;
  GM_setValue('personal_smilies',toJson(smilies));
  
  var tr0 = table.getElementsByTagName('tr')[index0+1];
  var tr1 = table.getElementsByTagName('tr')[index1+1];  
  
  table.insertBefore(tr0,table.getElementsByTagName('tr')[index1+1]);
  table.insertBefore(tr1,table.getElementsByTagName('tr')[index0+1]); 

  tr0.getElementsByTagName('td')[0].setAttribute('class','smiliesindex_'+index1);	
  tr1.getElementsByTagName('td')[0].setAttribute('class','smiliesindex_'+index0);	  
  
};	  
	 
	 
  
  
  
  
// Main Menu
var mainmenu = function (ev) {
	ev.preventDefault();
	if(document.getElementById('mainmenu')) {
		toggle('mainmenu');
		return;
	}

	var div = document.createElement('div');
	div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 100px; left: 200px; padding:5px; ');
	div.setAttribute('id','mainmenu');
	
	document.body.appendChild(div);
	toggle('mainmenu',this);
	
	
	div.appendChild(document.createTextNode(say.scriptname+' ('+say.shortVersion+ver+')'));
	
	var h2 = document.createElement('h2');
	h2.appendChild(document.createTextNode(say.mainMenu));	
	div.appendChild(h2);
	
	var table = document.createElement('table');
	div.appendChild(table);
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.homepage));
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	var a = document.createElement('a');
	a.setAttribute('href',say.scriptURL);
	a.setAttribute('title',say.homepageInfos);
	a.appendChild(document.createTextNode(say.scriptURL));
	th.appendChild(a);
	
	
	// Option: Close After Smilie
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);

	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.setting_closeAfterAddImage));
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	var spanON = document.createElement('span');
	spanON.setAttribute('style','cursor:pointer; font-weight:'+(close_after_add_image?'bold':'normal'));
	spanON.appendChild(document.createTextNode(say.setting_on));
	if(!close_after_add_image) {
	  spanON.addEventListener('click',toogle_close_after_add_image,false);
	}
	
	var spanOFF = document.createElement('span');
	spanOFF.setAttribute('style','cursor:pointer; font-weight:'+(close_after_add_image?'normal':'bold'));
	spanOFF.appendChild(document.createTextNode(say.setting_off));	
	if(close_after_add_image) {
	  spanOFF.addEventListener('click',toogle_close_after_add_image,false);
	}
	
	th.appendChild(spanON);
	th.appendChild(document.createTextNode('/'));	
	th.appendChild(spanOFF);	
	
	
	// Option: Quick Preview
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);

	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.setting_quickPreview));
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	var spanON = document.createElement('span');
	spanON.setAttribute('style','cursor:pointer; font-weight:'+(quick_preview?'bold':'normal'));
	spanON.appendChild(document.createTextNode(say.setting_on));
	if(!quick_preview) {
	  spanON.addEventListener('click',toogle_quick_preview,false);
	}
	
	var spanOFF = document.createElement('span');
	spanOFF.setAttribute('style','cursor:pointer; font-weight:'+(quick_preview?'normal':'bold'));
	spanOFF.appendChild(document.createTextNode(say.setting_off));	
	if(quick_preview) {
	  spanOFF.addEventListener('click',toogle_quick_preview,false);
	}
	
	th.appendChild(spanON);
	th.appendChild(document.createTextNode('/'));	
	th.appendChild(spanOFF);


	// Option: Show All Icons Immediately
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);

	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.setting_showAllImagesImmediately));
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	var spanON = document.createElement('span');
	spanON.setAttribute('style','cursor:pointer; font-weight:'+(show_all_images_immediately?'bold':'normal'));
	spanON.appendChild(document.createTextNode(say.setting_on));
	if(!show_all_images_immediately) {
	  spanON.addEventListener('click',toogle_show_all_images_immediately,false);
	}
	
	var spanOFF = document.createElement('span');
	spanOFF.setAttribute('style','cursor:pointer; font-weight:'+(show_all_images_immediately?'normal':'bold'));
	spanOFF.appendChild(document.createTextNode(say.setting_off));	
	if(show_all_images_immediately) {
	  spanOFF.addEventListener('click',toogle_show_all_images_immediately,false);
	}
	
	th.appendChild(spanON);
	th.appendChild(document.createTextNode('/'));	
	th.appendChild(spanOFF);	
	
	
	
	

	// Open Smilies Editor
	
	var tr = document.createElement('tr');	
	table.appendChild(tr);

	var th = document.createElement('th');	
	tr.appendChild(th);
	th.appendChild(document.createTextNode(say.setting_smilies));
	
	var th = document.createElement('th');	
	tr.appendChild(th);
	var spanOpen = document.createElement('span');
	spanOpen.setAttribute('style','cursor:pointer; ');
	spanOpen.appendChild(document.createTextNode(say.setting_openSmiliesEditor));
    spanOpen.addEventListener('click',toogle_smiliesEditor,false);
	
	th.appendChild(spanOpen);

	
	
	// Footer
	
	
	var footer = document.createElement('div');
	div.appendChild(footer);
	footer.appendChild(document.createElement('br'));	
	footer.appendChild(document.createTextNode(say.shortLicenseText));
    footer.appendChild(document.createElement('br'));	
	var a = document.createElement('a');
	a.setAttribute('href',say.licenseURL);
	a.setAttribute('title',say.licenseName);
	a.appendChild(document.createTextNode(say.licenseURL));
	footer.appendChild(a);
	footer.appendChild(document.createElement('br'));	
	footer.appendChild(document.createElement('br'));			
	footer.appendChild(document.createTextNode(say.authorHint));
	
	
	return false;
}





// ##############################################################  User Texts (functions only)


  // User Texts' Box
  var show_userTextsBox = function (mainDiv)
    {
    if(document.getElementById('user_texts'))
      return;

    var div = document.createElement('div');
    div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 100px; left: 200px; ');
    div.setAttribute('id','user_texts');

    var table = document.createElement('table');

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode(say.personaltexts));
    tr.appendChild(th);
    table.appendChild(tr);

    var texts = getTexts();
    for(var i = 0,len = texts.length; i < len; i++)
      {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(texts[i].name));
      td.addEventListener('click',function(i) { return function() {
        insert(texts[i].value,'');
        toggle('user_texts',this);
       } }(i),false);
      td.setAttribute('class','tdbutton');
      tr.appendChild(td);
      table.appendChild(tr);
      }

    if(len == 0)
      {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.setAttribute('style','color:Silver; font-family:Courier,sans-serif; ');
      td.appendChild(document.createTextNode(say.noentries));
      tr.appendChild(td);
      table.appendChild(tr);
      }


    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(say.editentry));
    td.setAttribute('class','tdbutton');
    td.setAttribute('style','border-top:solid black 2px; ');
    td.addEventListener('click',function() {
      // User Texts Edit Box
      show_userTextsEditBox(mainDiv);

      toggle('user_texts',mainDiv);
      toggle('user_texts_edit',mainDiv);
      return false;
    },false);
    tr.appendChild(td);
    table.appendChild(tr);

    div.appendChild(table);

    mainDiv.appendChild(div);
    }

  // User Texts Edit Box
  var show_userTextsEditBox = function (mainDiv)
    {
    if(document.getElementById('user_texts_edit'))
      return;

    var div = document.createElement('div');
    div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 100px; left: 200px; ');
    div.setAttribute('id','user_texts_edit');

    var table = document.createElement('table');

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.setAttribute('colspan','4');
    th.appendChild(document.createTextNode(say.editpersonalentries));
    tr.appendChild(th);
    table.appendChild(tr);

    var texts = getTexts();
    for(var i = 0,len = texts.length; i < len; i++)
      {
      var tr = document.createElement('tr');

      var td = document.createElement('td');
      td.appendChild(document.createTextNode(texts[i].name));

      tr.appendChild(td);

      var td = document.createElement('td');
      td.setAttribute('style','font-size:x-small; font-family:monospace;');

      var text = texts[i].value.substring(0,250);
      if(text != texts[i].value)
        text += '...';

      text = text.split('\n');
      /*
      for each(var value in text)
        {
        td.appendChild(document.createTextNode(value));
        td.appendChild(document.createElement('br'));
        }
      */

      for(var attr in text)
        {
        if(typeof(text[attr]) != 'function')
          {
          td.appendChild(document.createTextNode(text[attr]));
          td.appendChild(document.createElement('br'));
          }
        }

      tr.appendChild(td);

      var td = document.createElement('td');
      td.setAttribute('class','tdbutton');
      td.setAttribute('title','Bearbeiten');
      td.appendChild(document.createTextNode('E'));
      td.addEventListener('click',function(i) { return function() {
        var re = workWithEntry(texts,i);
        mainDiv.appendChild( re );
       } }(i),false);
      tr.appendChild(td);


      var td = document.createElement('td');
      td.setAttribute('class','tdbutton');
      td.setAttribute('title',say.del);
      td.appendChild(document.createTextNode('X'));
      td.addEventListener('click',function(i) { return function() {
       var c = confirm(say.confirm_delete);
       if(c)
         {
         texts.remove(i);
         setTexts(texts);
         if(document.getElementById('user_texts'))
           {
           document.getElementById('user_texts').parentNode.removeChild(document.getElementById('user_texts'));
           }
         if(document.getElementById('user_texts_edit'))
           {
           document.getElementById('user_texts_edit').parentNode.removeChild(document.getElementById('user_texts_edit'));
           }
         show_userTextsBox(mainDiv);
         show_userTextsEditBox(mainDiv);
         toggle('user_texts_edit',this);
         }

       } }(i),false);

      tr.appendChild(td);
      table.appendChild(tr);
      }

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode(say.newentry));
    td.addEventListener('click',function() {
      var re = workWithEntry(texts);
      mainDiv.appendChild( re );
      return false;
    },false);
    tr.appendChild(td);

    var td = document.createElement('td');
    td.setAttribute('colspan','3');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode(say.close));
    td.addEventListener('click',function() {
      toggle('user_texts_edit',this);
      return false;
    },false);
    tr.appendChild(td);

    table.appendChild(tr);

    div.appendChild(table);

    mainDiv.appendChild(div);
    }

  // User Texts Edit Box - Work with Entry
  var workWithEntry = function (texts,n)
    {
    var texts = texts;
    if(typeof(n) != 'undefined')
      {
      var header = say.editpersonaltext;
      var name = texts[n].name;
      var text = texts[n].value;
      }
    else
      {
      var header = say.newpersonaltext;
      var name = '';
      var text = '';
      }


    var table = document.createElement('table');
    table.setAttribute('id','user_texts_edit_entry');
    table.setAttribute('style','clear:both; position:absolute; z-index:121; border: 2px solid #804000; background:#efe6c9; top: 100px; left: 200px; ');

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.setAttribute('colspan','2');

    th.appendChild(document.createTextNode(header));

    tr.appendChild(th);
    table.appendChild(tr);

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.appendChild(document.createTextNode(say.title));
    tr.appendChild(td);

    var td = document.createElement('td');
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('value',name);
    input.setAttribute('size',64);
    input.setAttribute('id','UserText_Name');
    td.appendChild(input);
    tr.appendChild(td);

    table.appendChild(tr);


    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.appendChild(document.createTextNode(say.text));
    tr.appendChild(td);

    var td = document.createElement('td');
    var textarea = document.createElement('textarea');
    textarea.setAttribute('cols','40');
    textarea.setAttribute('rows','12');
    textarea.setAttribute('id','UserText_Text');
    textarea.appendChild(document.createTextNode(text));
    td.appendChild(textarea);
    tr.appendChild(td);

    table.appendChild(tr);


    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode(say.ok));
    td.addEventListener('click',function() {
      var data = {
        'name' : document.getElementById('UserText_Name').value,
        'value' : document.getElementById('UserText_Text').value };

      if(typeof(n) != 'undefined')
        {
        texts[n] = data;
        }
      else
        {
        texts.push(data);
        }

      setTexts(texts);
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);


      if(document.getElementById('user_texts'))
        {
        document.getElementById('user_texts').parentNode.removeChild(document.getElementById('user_texts'));
        }
      if(document.getElementById('user_texts_edit'))
        {
        document.getElementById('user_texts_edit').parentNode.removeChild(document.getElementById('user_texts_edit'));
        }
      show_userTextsBox(mainDiv);

      return false;
    },false);
    tr.appendChild(td);

    var td = document.createElement('td');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode(say.cancel));
    td.addEventListener('click',function() {
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
      return false;
    },false);
    tr.appendChild(td);

    table.appendChild(tr);

    return table;
    }


var getTexts = function ()
  {
  var gm = GM_getValue('usertexts');

  if(typeof(gm) == 'undefined' || gm == '' || !gm)
    return new Array();

  try
    {
    var ar = JSON.parse( gm );
    }
  catch(e)
    {
    return new Array();
    }
  return ar;
  }

var setTexts = function (ar)
  {
  var str = JSON.stringify(ar);
  GM_setValue('usertexts',str);
  }


// ############################################################## Other basic functions

var toggleLine = function (e)
  {
  var elist = this.nextSibling.getElementsByTagName('a');
  var n = elist[0].style.display=='inline'?'none':'inline';
  for(var i = 0; i < elist.length; i++)
    {
    elist[i].style.display = n;
    }
  }

var toggle = function (id,parent,hide)
  {
  var e = document.getElementById(id);
  if(e.style.display == 'block' || hide) {
    e.style.display = 'none';
	}
  else {
    e.style.display = 'block';
	if(parent)	{
	  var top = rel_top(parent)+5;
	  var left = rel_left(parent)+10;	  
	  e.style.top = top +'px';
	  e.style.left = left +'px';	  
	  }
	}
		
  }


// Stolen Code:
// http://aktuell.de.selfhtml.org/artikel/javascript/bbcode/
var insert = function (aTag, eTag)
  {
  var input = messageTextField;
  input.focus();
  if(typeof input.selectionStart != undefined)
    {
    var start = input.selectionStart;
    var end = input.selectionEnd;
    var insText = input.value.substring(start, end);
    input.value = input.value.substr(0,start) + aTag + insText + eTag + input.value.substr(end);
    var pos;
    if(insText.length == 0)
      pos = start + aTag.length;
    else
      pos = start + aTag.length + insText.length + eTag.length;
    input.selectionStart = pos;
    input.selectionEnd = pos;
    }
  textarea_keyup();
  }
  
  
  





// ############################################################## Start and init things


if(document.getElementById('message') || document.getElementById('intern') || document.getElementById('desc_text') || document.getElementById('bb_bar'))
  {
  // Host
  var root = 'http://' + document.location.host;

  // Div
  if(document.getElementById('bb_bar')) 
    var mainDiv = document.getElementById('bb_bar');
  else if(ally && document.getElementById('desc_text'))
    var mainDiv = document.getElementById('bb_row').getElementsByTagName('div')[0];
  else if(ally && document.getElementById('bb_row'))
    var mainDiv = document.getElementById('bb_row').getElementsByTagName('div')[0];
  else if(forum || ally )
    var mainDiv = document.getElementsByTagName('form')[0].getElementsByTagName('div')[0];
  else if(answer)
    var mainDiv = document.getElementById('message').parentNode.parentNode.getElementsByTagName('div')[0];
  else if(mail)
    var mainDiv = document.getElementById('message').parentNode.parentNode.previousElementSibling.getElementsByTagName('div')[0];
  else if(memo)
    var mainDiv = document.getElementById('bb_bar');
	

  var messageTextField = document.getElementById('message');
  if(memo) {
    messageTextField = document.getElementsByName('memo')[0];
  }  else if(document.getElementById('desc_text')) {
    messageTextField = document.getElementById('desc_text');
  }
  
  
 	// Restore text field content because of required reload	   
	if(GM_getValue('lastTextFieldEntry',false)) {
	  messageTextField.value = GM_getValue('lastTextFieldEntry','');
	  GM_setValue('lastTextFieldEntry',false);	
	}

  
  // Restore Scroll Position
  if(messageTextField) {
    var left,top;
    var store = function() {
      top = this.scrollTop;
      left = this.scrollLeft;
      };
    var update = function() {
      this.scrollTop = top;
      this.scrollLeft = left;
      };

    messageTextField.addEventListener('mouseover',update,false);
    messageTextField.addEventListener('mouseout',store,false);
    }


  // Additional Style
  if(show_all_images_immediately) {
    var css = '#bb_icons img { max-width:40px; max-height:40px; } '; 
  } else {
    var css = '#bb_icons td a { display:none;  } #bb_icons img { max-width:40px; max-height:40px; } ';
  }
  
  css += ' .tdbutton { color:DarkBlue; font-family:"Courier New"; text-decoration:underline; } ';

  if (typeof GM_addStyle == "undefined")
    {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
    }
  else
    {
    GM_addStyle(css);
    }

  // Add button method
  mainDiv.addButton = function(title,img,fct,node)
    {
    var a = document.createElement('a');
    a.setAttribute('title',title);
    a.setAttribute('href','#');
    a.addEventListener('click',fct,false);
	
	var span = document.createElement('span');
    span.setAttribute('style','display:inline-block; zoom:1; *display:inline; background:url('+img+') no-repeat 0px 0px; padding-left: 0px; padding-bottom:0px; margin-right: 2px; margin-bottom:3px; width: 20px; height: 20px');
	span.innerHTML = '&nbsp;';	
    a.appendChild(span);

    //var div = document.createElement('div');
    //div.setAttribute('style','float:left; background:url('+img+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');
    //a.appendChild(div);

    if(node)
      this.insertBefore(a,node);
    else
      this.insertBefore(a,document.getElementById('bb_sizes'));
    return this;
    }
	
  // Remove original report button
  if(forum || memo || ally || mail)
    {
    mainDiv.removeChild(document.getElementById('bb_button_report_display'));
    }


  // Smilies' Box
  if(forum || memo)
    {	
    var table = document.createElement('table');
    table.setAttribute('id','bb_smilies');
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:100; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 100px; left: 200px; ');

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.setAttribute('style','padding:2px;');

    for(var i = 0; i < smilies.length; i++)
      {
      if(smilies[i] == '\n')
        {
        var br = document.createElement('br');
        td.appendChild(br);
        continue;
        }


      var img = new Image();
      img.setAttribute('src',smilies[i]);
      img.setAttribute('style','vertical-align:middle; ');
      img.setAttribute('alt','[img]'+smilies[i]+'[/img]');

      var a = document.createElement('a');
      a.setAttribute('href','#');
      a.setAttribute('style','vertical-align:middle; ');
      a.addEventListener('click',function() {
        insert(this.title,'');
		if(close_after_add_image) {
          toggle('bb_smilies',this);
		  }
        return false;
      },false);
      a.setAttribute('title','[img]'+smilies[i]+'[/img]');
      a.appendChild(img);

      td.appendChild(a);
      }

    tr.appendChild(td);
    table.appendChild(tr);
    mainDiv.appendChild(table);
    }

  // Icons' Box
  if(forum || memo)
    {
    var table = document.createElement('table');
    table.setAttribute('id','bb_icons');
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 100px; left: 200px; ');

    for(var i = 0; i < ds_icons.length; i++)
      {
      var tr = document.createElement('tr');

      var td = document.createElement('td');
      td.style.fontSize = '7pt';
      td.style.cursor = 'pointer';
      td.appendChild(document.createTextNode(ds_icons[i][0]+':'));
      td.addEventListener('click',toggleLine,false);
      tr.appendChild(td);


      var td = document.createElement('td');
      td.setAttribute('style','padding:2px;');

      for(var x = 1; x < ds_icons[i].length; x++)
        {
        var img = new Image();
        img.setAttribute('src',ds_icons[i][x]);
        img.setAttribute('style','padding:1px; border:solid 1px black; -moz-border-radius:5px 0px;');
        img.setAttribute('alt','[img]'+ds_icons[i][x]+'[/img]');

        var a = document.createElement('a');
        a.setAttribute('href','#');
        a.setAttribute('style','padding:2px; margin-right:1px;  margin-bottom:2px; ');
        a.style.fontSize = '';
        a.addEventListener('click',function() {
          insert(this.title,'');
          toggle('bb_icons',this);
          return false;
        },false);
        a.setAttribute('title','[img]'+root+'/'+ds_icons[i][x]+'[/img]');
        a.appendChild(img);

        td.appendChild(a);
        }
      tr.appendChild(td);
      table.appendChild(tr);
      }

    mainDiv.appendChild(table);
    }
	
  // Convert Coords to BB-Codes  Box
  if(forum || memo || mail || ally)
  {
	table = tr = td = a = 0; // Dirty bug fix	

    var table = document.createElement('table');
	mainDiv.appendChild(table);	
    table.setAttribute('id','bb_convertcoords');
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:100; border: 2px solid #804000; background:#efe6c9; top: 100px; left: 200px; ');

    var tr = document.createElement('tr');
	table.appendChild(tr);	

    var td = document.createElement('td');
	tr.appendChild(td);
	td.setAttribute('colspan',2);
	td.appendChild(document.createTextNode(say.convertcoords));	

    var tr = document.createElement('tr');
	table.appendChild(tr);

	tr.addEventListener('click',function() {
	  messageTextField.value = messageTextField.value.replace(/(\(\d{1,3}\|\d{1,3}\))(?!\[\/c[a-z]{4,4}\])/g,'[coord]$1[/coord]');
      messageTextField.value = messageTextField.value.replace(/(\d{1,3}\|\d{1,3})(?!.*\[\/c[a-z]{4,4}\])/g,'[coord]($1)[/coord]');
	  toggle('bb_convertcoords',this);
	  return false;
	},false);


    var td = document.createElement('td');
	tr.appendChild(td);
	td.setAttribute('style','padding:0;background:url(http://cdn.tribalwars.net/graphic//bbcodes/bbcodes.png?1) no-repeat -120px 0px; width: 20px; height: 20px');
	td.setAttribute('title','[coord]');
	td.appendChild(document.createTextNode(' '));	

    var td = document.createElement('td');
	tr.appendChild(td);
	td.appendChild(document.createTextNode('[coord]'));		

    var tr = document.createElement('tr');
	table.appendChild(tr);

	tr.addEventListener('click',function() {
	  messageTextField.value = messageTextField.value.replace(/(\(\d{1,3}\|\d{1,3}\))(?!\[\/c[a-z]{4,4}\])/g,'[claim]$1[/claim]');
      messageTextField.value = messageTextField.value.replace(/(\d{1,3}\|\d{1,3})(?!.*\[\/c[a-z]{4,4}\])/g,'[claim]($1)[/claim]');
	  toggle('bb_convertcoords',this);
	  return false;
	},false);

	var td = document.createElement('td');
	tr.appendChild(td);
	td.setAttribute('style','padding:0;background:url(http://cdn.tribalwars.net/graphic//bbcodes/bbcodes.png?1) no-repeat -340px 0px; width: 20px; height: 20px');
	td.setAttribute('title','[claim]');
	td.appendChild(document.createTextNode(' '));	

    var td = document.createElement('td');
	tr.appendChild(td);
	td.appendChild(document.createTextNode('[claim]'));	

	table = tr = td = a = 0; // Dirty bug fix		
  }	
	
	
  // ##### Buttons #####

  // Code      [code]  [/code]
  if(forum || memo || mail || ally)
    {
    mainDiv.addButton('Code',icon_code,function() {
      insert('[code]','[/code]');
      return false;
      }
    ,mainDiv.getElementsByTagName('a')[4]);
    }

  // Icons
  if(forum || memo)
    {
    mainDiv.addButton('Icons',icon_icons,function() {
      toggle('bb_icons',this);
      return false;
      },
	  document.getElementById('bb_button_units')
	  );
    }
	

  // Smilies
  if(forum || memo)
    {
    mainDiv.addButton('Smilies',icon_smilies,function() {
      toggle('bb_smilies',this);
      return false;
      },
	  document.getElementById('bb_button_units')
	  );
    }

  // Report Direct     [report]  [/report]
  if(forum || memo || ally || mail)
    {
    mainDiv.addButton(say.linkreport,icon_report_link,function() {
      var url = prompt(say.report_url,'');
      if(url != '')
        {
        if(url.indexOf('=') != -1)
          {
          url = url.split('=').pop();
          insert('[report]'+url+'[/report]','');
          }
        else
          {
          url = url.split('/').pop();
          insert('[report]'+url+'[/report]','');
          }
        }
      else
        insert('[report]','[/report]');
      return false;
      },
	  document.getElementById('bb_button_size')
	  );
    }

  // Report link      [report_display]  [/report_display]
  if(forum || memo || ally || mail)
    {
    mainDiv.addButton(say.directreport,icon_report_direct,function() {
      var url = prompt(say.directreport,'');
      if(url != '')
        {
        if(url.indexOf('=') != -1)
          {
          url = url.split('=').pop();
          insert('[report_display]'+url+'[/report_display]','');
          }
        else
          {
          url = url.split('/').pop();
          insert('[report_display]'+url+'[/report_display]','');
          }
        }
      else
        insert('[report_display]','[/report_display]');
      return false;
      },
	  document.getElementById('bb_button_size')
	  );
    }


  // Convert Coords to BB-Codes -- Thanks to MST1
  if(forum || memo || mail || ally)
    {
    mainDiv.addButton(say.convertcoords,icon_convertCoords,function() {
      toggle('bb_convertcoords',this);
      return false;
      });		
		
	/*	
    mainDiv.addButton(say.convertcoords,icon_convertCoords,function() {
      messageTextField.value = messageTextField.value.replace(/(\(\d{1,3}\|\d{1,3}\))(?!\[\/coord\])/g,'[coord]$1[/coord]');
      messageTextField.value = messageTextField.value.replace(/(\d{1,3}\|\d{1,3})(?!.*\[\/coord\])/g,'[coord]($1)[/coord]');
      return false;
      }); */
    }


  // Search function
  if(forum || memo || mail || ally)
    {
    mainDiv.addButton(say.search,icon_search,function() {
      var key = prompt(say.searchterm,'');
      var text = messageTextField.value;
      var ar = text.split('\n');
      var foundInRenderedLine = -1;
      var foundInRealLine = -1;
      var cols = 80;
      for (var i=x=0; i < ar.length; i++,x++)
        {
        if(foundInRenderedLine == -1 && ar[i] && ar[i].indexOf(key) != -1)
          {
          foundInRealLine = i;
          if(ar[i].length > cols)
            {
            var a = 0;
            var part = ar[a].substr((cols*a),cols);
            while(part)
              {
              if(part.indexOf(key) != -1)
                {
                break;
                }
              a++;
              part = ar[a].substr((cols*a),cols);
              }
            foundInRenderedLine = x + a;
            }
          else
            {
            foundInRenderedLine = x;
            }

          break;
          }
        else if(ar[i] && ar[i].length > cols)
          {
          x+=parseInt(ar[i].length / cols);
          }
        }

      if(foundInRenderedLine != -1)
        {
        var  x = foundInRenderedLine*17;      // Pixel from top (1 line = 17 pixel)
        top = x;
        alert(say.line+' '+foundInRenderedLine);
        messageTextField.scrollTop = x;
        }
      else
        {
        alert(say.noresults);
        }

      return false;
      });
    }


  // User Texts
  if(forum || memo || mail || ally)
    {
    mainDiv.addButton(say.personaltexts,icon_usertexts,function() {
      // User Texts' Box
      show_userTextsBox(mainDiv);
      toggle('user_texts',this);
      return false;
      });
    }

	
  // Infotext
  /*
  var a = document.createElement('a');
  a.setAttribute('href','http://userscripts.org/scripts/show/39879');
  a.setAttribute('title','Script Homepage: Updates, News, ... ');
  a.setAttribute('style','font-weight:bold; font-size:7pt; color:#0082BE; font-family:Broadway,Verdana,Arial; ');
  a.appendChild(document.createTextNode());
  a.addEventListener('click',mainmenu,false);
  mainDiv.appendChild(a);
  */
  
  // Button for Main Menu
  var mainmenuButton = mainDiv.addButton('(ver'+ver+') '+say.mainMenu,'http://cdn.tribalwars.net/graphic/buildings/garage.png',mainmenu);
  mainmenuButton.setAttribute('href',say.scriptURL);
  	
	
	
	
  }


  
  
 // ############################################################## Quick BBCode Preview 
  
  
 
 // "Global Vars":
var frame,body,message,postINframe;
  
  
// "Global Functions": 
var insertFrame = function (type,style)
  {
  var el = document.createElement(type);
  if(style)
    el.setAttribute('style',style);

  var sel = window.getSelection();
  var range = sel.getRangeAt(0);
  range.surroundContents(el);
  frame_keyup();
  } 

var htmlspecialchars = function (str) 
  {
  return str.replace('&','&amp;').replace('<','&lt;').replace('<','&lt;').replace('"','&quot;');
  }  
  

var textarea_keyup = function () {
   if(!quick_preview)
     return;

   var html = message.value;
      
   html = html.replace(/\n/gi,'<br />');   // Important cause String.replace can't match enjambments
   
   // [b]
   html = html.replace(/\[b\](.*?)\[\/b\]/gi,'<b>$1</b>');
   
    // [i]
   html = html.replace(/\[i\](.*?)\[\/i\]/gi,'<i>$1</i>');    
     
    // [u]
   html = html.replace(/\[u\](.*?)\[\/u\]/gi,'<span style="text-decoration:underline; ">$1</span>');
      
    // [s]
   html = html.replace(/\[s\](.*?)\[\/s\]/gi,'<span style="text-decoration:line-through; ">$1</span>');
         
   // [url]
   html = html.replace(/\[url\](.*?)\[\/url\]/gi,'<a href="http://www.die-staemme.de/redir.php?url=$1" style="color:rgb(64,64,208)">$1</a>');  
    
   // [url=some.google.de]
   html = html.replace(/\[url=(.*?)\](.*?)\[\/url\]/gi,'<a href="http://www.die-staemme.de/redir.php?url=$1" style="color:rgb(64,64,208)">$2</a>');    
   
   // [color=blue]
   html = html.replace(/\[color=(.*?)\](.*?)\[\/color\]/gi,'<span style="color:$1">$2</span>');    
     
   // [code]
   html = html.replace(/\[code\](.*?)\[\/code\]/gi,function(str, p1,offset, s) {  return '<pre>'+htmlspecialchars(p1.replace(/\<br \/\>/gi,'\n'))+'</pre>'; } );    
     	 
   postINframe.innerHTML = html;
} 
  
 var frame_keyup = function () {      
   /*	
   var html = postINframe.innerHTML;
   
   // [b]
   html = html.replace(/\<b\>(.*?)\<\/b\>/gi,'[b]$1[/b]');
   
    // [i]
   html = html.replace(/\<i\>(.*?)\<\/i\>/gi,'[i]$1[/i]');    
    
	
    // [u]
   html = html.replace(/\<span\>(.*?)\<\/u\>/gi,'<span style="text-decoration: underline;">$1</span>');
      
    // [s]
   html = html.replace(/\[s\](.*?)\[\/s\]/gi,'<span style="font-stlye: italic;">$1</span>');
    

   // [url]
   html = html.replace(/\[url\](.*?)\[\/url\]/gi,'<a href="http://www.die-staemme.de/redir.php?url=$1" style="color:rgb(64,64,208)">$1</a>');  
    
   // [url=some.google.de]
   html = html.replace(/\[url=(.*?)\](.*?)\[\/url\]/gi,'<a href="http://www.die-staemme.de/redir.php?url=$1" style="color:rgb(64,64,208)">$2</a>');    
   
   // [color=blue]
   html = html.replace(/\[color=(.*?)\](.*?)\[\/color\]/gi,'<span style="color:$1">$2</span>');    
     
   // [code]
   html = html.replace(/\[code\](.*?)\[\/code\]/gi,function(str, p1,offset, s) {  return '<pre>'+htmlspecialchars(p1.replace(/\<br \/\>/gi,'\n'))+'</pre>'; } );    
   
   html = html.replace(/\<br \/\>/gi,'\n');	 
		 
   html = html.replace(/\<br\>/gi,'\n');	
  
   html = html.replace(/\&nbsp;/gi,' ');	   
  
   */   
   
   
   
   var clone = postINframe.cloneNode(true);
   var html = '';
    
   // reduce and simplify the subtree
   var tags = clone.getElementsByTagName('*');
   for(var i = 0; i < tags.length; i++) {
     //GM_log(tags[i].tagName+':'+tags[i].rel);	 
	 var cn = tags[i];
	 var pn = tags[i].parentNode;
	 
	 switch(tags[i].tagName) {
	   case 'STRONG':
	   case 'B':
	     createSpanFromStyle(cn,pn,'fontWeight','bold'); 
		 i = 0;
	   break;
	   case 'I':
	     createSpanFromStyle(cn,pn,'fontStyle','italic');  
		 i = 0;
	   break;
	   case 'U':
	     createSpanFromStyle(cn,pn,'textDecoration','underline'); 
		 i = 0;		 
	   break;
	   case 'S':
	     createSpanFromStyle(cn,pn,'textDecoration','line-through');  
		 i = 0;
	   break;	 
	   case 'SPAN':
	   case 'P':	   
	   case 'DIV':	
 	     createSpanFromStyle(cn,pn);     	 
	   break;
	   
	   case 'A':
	   	 if(cn.rel != 'finished') {
    	   createAFromA(cn,pn);	   
         } else {	
           i += 1;	
         }	   
	   break;

	   
	 }

   }
       
   var tags = clone.getElementsByTagName('*');
      

   for(var i = 0; i < tags.length; i++) {
	 var cn = tags[i];
	 var pn = tags[i].parentNode;
	 
	 switch(tags[i].tagName) {
	   case 'SPAN':
         var bbtags = getBBTagsFromSpan(cn); 
		 var prefix = '';
		 var suffix = '';
		 for(var a = 0; a < bbtags.length; a++) {
		   prefix += '['+bbtags[a]+']';
		   suffix += '[/'+bbtags[a]+']';
		 }
		 //pn.replaceChild(document.createTextNode(prefix+tags[i].textContent+suffix),cn);	
		 //pn.replaceChild(document.createTextNode(prefix+'#-4#534-5654#'+suffix),cn);	
		 //pn.innerHTML = pn.innerHTML.replace('#-4#534-5654#',cn.innerHTML);

		 pn.innerHTML = pn.innerHTML.replace(new RegExp('\<span(.*?)\>'+cn.innerHTML+'\<\/span\>'),prefix+cn.innerHTML+suffix);		 
		 pn.innerHTML = pn.innerHTML.replace(new RegExp('\<span(.*?)\>'+cn.innerHTML+'\<\/span\>'),prefix+cn.innerHTML+suffix);		 		 
		 
		 
         tags = clone.getElementsByTagName('*');		 		 
         i = 0;		 
	   break;	
	   case 'A':
         var bbtag = 'URL'; 
		 var prefix = '';
		 var suffix = '';
		 var href = tags[i].href;
		 prefix += '['+bbtag+'='+href+']';
		 suffix += '[/'+bbtag+']';
		 pn.replaceChild(document.createTextNode(prefix+tags[i].textContent+suffix),cn);		 
	   break;	
	   
	 }

   }
   

   var code = clone.innerHTML;
   
   code = code.replace(/\<br\>/gi,'\n');  
   code = code.replace(/\<br \/\>/gi,'\n');  
   code = code.replace(/&nbsp;/gi,'');
   code = code.replace(/&amp;/gi,'&');   
      alert(code);
   message.value = code;

}  
  
 var getBBTagsFromSpan = function (span) {
   var tags = [];
   if(span.style['fontWeight'] == 'bold') {
     tags.push('b');
   }
   if(span.style['fontStyle'] == 'italic') {
     tags.push('i');
   } 
   if(span.style['textDecoration'] == 'underline') {
     tags.push('u');
   }    
   else if(span.style['textDecoration'] == 'line-through') {
     tags.push('s');
   }
  return tags;

}  
 
var createSpanFromStyle = function (cn,pn,styleattr,stylevalue) {
	   if(pn.textContent == cn.textContent) {
	     if(styleattr && !pn.style[styleattr]) {   
	       pn.style[styleattr] = stylevalue; 
		   }
		 else if(!styleattr) {
		   pn.setAttribute('style',pn.getAttribute('style') + ';' + cn.getAttribute('style')); 
		 }  
		 pn.removeChild(cn);
		 pn.innerHTML = cn.innerHTML;
	   }  
	   else {
	     var span = $('$span');
	     pn.insertBefore(span,cn);
		 span.setAttribute('style',cn.getAttribute('style'));
		 if(styleattr && !span.style[styleattr]) {
		   span.style[styleattr] = stylevalue;
		   }
		 span.innerHTML = cn.innerHTML;
		 pn.removeChild(cn);
	   }
}  
  
var createAFromA = function (cn,pn) {
       // Create an A that has only a href -> make it easily parseable
	   // Add existent style to parent node or create parent node <span>
	   
	   if(!cn.getAttribute('href')) {
	     pn.replaceChild(document.createTextNode(cn.textContent),cn); 
         return;		 
	   }
	   
	   if(cn.rel == 'finished') {
	     return;
	   }
	   
	   if(pn.textContent == cn.textContent) {  
	     // Do not create a new node, but use the parent node
		 pn.setAttribute('style',pn.getAttribute('style') + ';' + cn.getAttribute('style')); 
		 var a = $('$a',{href:cn.href,rel:'finished'});
		 a.innerHTML = cn.innerHTML;
		 pn.replaceChild(a,cn);		 
	   }  
	   else {
	     // Create new parent span for the styles
	     var span = $('$span');	  
		 span.setAttribute('style',cn.getAttribute('style'));
		 var a = $('$a',{href:cn.href,rel:'finished'});
		 a.innerHTML = cn.innerHTML;
		 span.appendChild(a);
		 pn.replaceChild(span,cn);
	   }
	   
	   
}   
  
  
var easySurroundButton = function (css,surround_bb,surround_html,style) {
  $(css).removeAttribute('onclick');
  $(css).addEventListener('click',function(ev) {
    if(message.hasFocus) {
	  insert('['+surround_bb+']','[/'+surround_bb+']');
	  }
	else {
	  insertFrame(surround_html,style);
	  }
    },false);

}
  
  
var modBBButtons = function modBBButtons() 
  {
  easySurroundButton('#bb_button_bold','b','b');
  easySurroundButton('#bb_button_italic','i','i');
  easySurroundButton('#bb_button_underline','u','span','text-decoration:underline');
  easySurroundButton('#bb_button_strikethrough','s','span','font-stlye:italic');
  
  /*
  $('#bb_button_bold').removeAttribute('onclick');
  $('#bb_button_bold').addEventListener('click',function(ev) {
    if(message.hasFocus) {
	  insert('[b]','[/b]');
	  }
	else {
	  insertFrame('b');
	  }
    },false);


  $('#bb_button_italic').removeAttribute('onclick');
  $('#bb_button_italic').addEventListener('click',function(ev) {
    if(message.hasFocus) {
	  insert('[i]','[/i]');
	  }
	else {
	  insertFrame('i');
	  }
    },false);
*/

  }  
  
var createContentEditable = function ()
  {
  message = messageTextField;
  frame = document.createElement('div');
  messageTextField.parentNode.appendChild(frame);
   
  frame.style.background = '#F7EED3';
  frame.width = message.clientWidth;
  frame.height = message.clientHeight;
  frame.setAttribute('style','border: black dotted 3px;');  
    
  frame.innerHTML = '<div class="post" style="color:Black; "><div class="igmline"><span class="author">Author</span><span class="right date">am 00.00. um 0:0 Uhr</span></div><div id="postINframe" contenteditable="true" class="text">Test</div></div>';

  postINframe = document.getElementById('postINframe');
  
  postINframe.addEventListener('keyup',frame_keyup,false);
  postINframe.addEventListener('focus',function() { frame.hasFocus = true; message.hasFocus = false; },false); 
  
  message.addEventListener('keyup',textarea_keyup,false);
  message.addEventListener('focus',function() { frame.hasFocus = false; message.hasFocus = true; },false);  
  
  message.focus();
  message.hasFocus = true;
  frame.hasFocus = false;
  
  textarea_keyup();
  modBBButtons();    
  }
  
   
   
// ############################################################## Start and Init  Quick BBCode Preview    
if(quick_preview && messageTextField) {
  createContentEditable();
  }
  


};

dsSmiliesBBCodesList();