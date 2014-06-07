// ==UserScript==
// @name           TWAlertSounds
// @namespace      http://superbia.at/knight/
// @description    Mit diesem Skript gibt fuer jede neue Meldung im Chat ein Sound aus
// @include        http://*.the-west.de/game.php*
// @author         Knight
// ==/UserScript==

/*
Copyright (c) by Knight
Das Copyright dieses Scripts liegt beim Autor(Knight).
Veraenderung oder eigene Veroeffentlichung dieses Scripts erfordert eine Genehmigung 
des Autors(Knight). Weiterhin garantiert der Autor nach Veraenderung nicht mehr 
die Funktionstuechtigkeit und haftet nicht fuer eventuell aufkommende Schaeden.
Fragen oder Fehler koennen im TheWest Forum beim Autor(Knight) gemeldet werden.
Zum Schreiben von Nachrichten im TheWest Forum ist eine Registrierung notwendig!
Forum: http:/forum.the-west.de/
*/

var TWAlertSounds = document.createElement('script');
TWAlertSounds.src = 'http://superbia.at/knight/TWAlertSounds/twas.js';
TWAlertSounds.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWAlertSounds);

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_183', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_183', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=183&version=1.2';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();