// ==UserScript==
// @name                Inc-Renamer
// @description          renamme incomming attack 
// @author                SlowTarget, angepasst von RokKeT und Harpstennah , ElchArrO
// @include                  http://ae*.tribalwars.ae/game.php*screen=info_command*
// ==/UserScript==

var win = window.opera ? window:unsafeWindow;

win.theFormat='{unit} - Start: {origin} - From {player} - at: {arrival} - back: {return}';
//win.theFormat='{unit} - Start:{origin} - {player} - F{distance} - Ank:{arrival}  Startzeit:{sent} - D:{duration}- R:{return} - ID:{incid} - Date{date}';

win.arrUnitNames=['Scout','Light','Heavy','Axe','Sword','Ram', 'cata', '**Noble**'];

win.$.ajaxSetup({ cache: true });
win.$.getScript('http://userscripts.org/scripts/source/136476.user.js');