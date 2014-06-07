// ==UserScript==
// @name           Berichte Filtern V2
// @author         Kevin Moechel
// @namespace      KSTM.Javascript.DS
// @description    Erweitertes Filtern von Berichten
// @include        http://de*.die-staemme.de/game.php?*screen=report*
// @exclude        http://de*.die-staemme.de/game.php?*screen=report*view=*
// @exclude        http://de*.die-staemme.de/game.php?*screen=report&mode=group_create
// ==/UserScript==

// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------
var win = window.opera ? window : unsafeWindow;
win.AV_KM_INVERT=true;
var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });
$.getScript('http://scripts.die-staemme.de/gm-scripts/report_filter.js');