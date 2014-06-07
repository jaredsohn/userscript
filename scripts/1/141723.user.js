// ==UserScript==
// @name           Farmhelf
// @description    Versieht das Spiel an etlichen stellen mit Shortcuts, welche einem beim Farmen helfen!
// @description    Auerdem faerbt es Berichte mit Truppen, die voll zurueck gekehrt sind, farbig ein!
// @description    Desweitren ist es moeglich mithilfe der Tasten "Y, X und C" truppen im versammlungsplatz abzuschicken,
// @description    die man vorher definiert hat!
// @include        http://*.tribalwars.ae/game.php?*screen=place*try=confirm*
// @include        http://*.tribalwars.ae/game.php?*screen=place*
// @include        http://*.tribalwars.ae/game.php?*screen=info_village*
// @include        http://*.tribalwars.ae/game.php?*screen=report*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://userscripts.org/scripts/source/141718.user.js');