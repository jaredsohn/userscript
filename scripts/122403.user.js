// ==UserScript==
// @name        Buttons hinter Dörfer-Links erweitert
// @description Fügt sechs Buttons hinter den Dorf-Links ein: Dorfübersicht, Platz, Adelshof, auf Karte zentrieren, Truppen schicken, Anfordern.
// @author      Michael Richter
// @icon        http://tribes.v4n6u4rd.com/dlb_icon.png
// @include     http://ae*.tribalwars.ae/game.php*screen=info_command*
// @include     http://ae*.tribalwars.ae/game.php*screen=info_player*
// @include     http://ae*.tribalwars.ae/game.php*screen=info_village*
// @include     http://ae*.tribalwars.ae/game.php*screen=mail&mode=view*
// @include     http://ae*.tribalwars.ae/game.php*screen=overview_villages&mode=commands*
// @include     http://ae*.tribalwars.ae/game.php*screen=overview_villages&mode=incomings*
// @include     http://ae*.tribalwars.ae/game.php*screen=forum*view_thread*
// @include     http://ae*.tribalwars.ae/game.php*screen=report*view=*
// ==/UserScript==
// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });
$.getScript('http://up.tw4me.com/uploads/plapl_13258843271.js');