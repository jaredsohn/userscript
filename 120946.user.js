// ==UserScript==
// @name				Inc-Renamer
// @description  		Die Stämme: Umbenennen von Angriffen 
// @author				SlowTarget, angepasst von RokKeT
// @include	  			http://de*.die-staemme.de/game.php*screen=info_command*
// ==/UserScript==

var win = window.opera ? window:unsafeWindow;

win.theFormat='{unit} - Start: {origin} - spieler {player} - Ank: {arrival} - Zurück: {return}';//win.theFormat='{unit} - Start:{origin} - {player} - F{distance} - Ank:{arrival}  Startzeit:{sent} - D:{duration}- R:{return} - ID:{incid} - Date{date}';
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://scripts.die-staemme.de/gm-scripts/inc_renamer.js');