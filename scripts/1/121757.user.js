// ==UserScript==
// @name           No Reload
// @author         Milos
// @version        1.1
// @description    Neaktualizuje stránku při návratu armády z barbarek
// @include        http://*.divokekmeny.cz/game.php?*screen=overview
// @include        http://*.divoke-kmene.sk/game.php?*screen=overview
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://dkscripts.g6.cz/reload.js');