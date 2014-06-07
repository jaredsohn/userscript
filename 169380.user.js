// ==UserScript==
// @name         metrowar link
// @version      1.0
// @include      http://*.sofiawars.com/*
// @exclude      http://forum.sofiawars.com/*
// @author       Mr_Rage
// @run-at       document-end
// ==/UserScript==

$('<a class="metrowar" href="/metrowar/clan"><font color="#4a2074">Станции</font></a>').insertAfter('.clear.links b');
$('b.online').css('margin-right', '0px').css('text-shadow', 'none');
$('div.links.clear a').css('margin-left', '5px');