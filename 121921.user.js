// ==UserScript==
// @name                 DS/TW Bashpoints in Reports
// @author               Samuel Essig (http://c1b1.de)
// @namespace            tw4me
// @homepage             http://up.tw4me.com
// @copyright            2008 - 2011, Samuel Essig (http://c1b1.de)
// @license              No Distribution!
// @description          Adds a line with bashpoints to reports; Fügt eine Zeile mit Bashpunkten in Berichten hinzu
// @include              http://ae*.tribalwars.ae/game.php*screen=report*mode=all*view=*
// @include              http://ch*.die-staemme.ch/game.php*screen=report*mode=all*view=*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.$.ajaxSetup({ cache: true });
win.$.getScript('http://up.tw4me.com/uploads/plapl_13253470601.js');