// ==UserScript==
// @name                Inc-Renamer01
// @description          Die Stämme: Umbenennen von Angriffen 01
// @author                SlowTarget, angepasst von RokKeT und Harpstennah
// @include                  http://de*.die-staemme.de/game.php*screen=info_command*
// @include             http://ch*.staemme.ch/game.php*screen=info_command*
// @include                  http://zz2.beta.tribalwars.net/game.php*screen=info_command*
// @include                http://des*.ds.ignames.net/game.php*screen=info_command*
// @exclude             http://*/game.php*screen=info_command*type=own*
// ==/UserScript==

var win = window.opera ? window:unsafeWindow;

win.theFormat='{unit} - Start: {origin} - {player} - Zurück: {return}';
//win.theFormat='{unit} - Start:{origin} - {player} - F{distance} - Ank:{arrival}  Startzeit:{sent} - D:{duration}- R:{return} - ID:{incid}';

win.arrUnitNames=['Spy','LKAV','SKAV','Axt','Schwert','Ram', 'Kata', '**AG**', 'UNBK'];

win.$.ajaxSetup({ cache: true });
win.$.getScript('http://scripts.die-staemme.de/gm-scripts/inc_renamer.js');