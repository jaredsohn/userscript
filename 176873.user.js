// ==UserScript==
// @name				DSsortingIncomings
// @author				Heinzel
// @description			Damit kann die Eintreffend-Uebersicht nach Angreifenden Spielern, langsamsten Einheiten, Ziel- und Herkunftsdoerfern gefiltert werden
// @namespace			http://userscripts.org
// @include				http://de*.die-staemme.de/game.php?*screen=overview_villages*
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });
$.getScript('http://scripts.die-staemme.de/gm-scripts/sort_incs.js');