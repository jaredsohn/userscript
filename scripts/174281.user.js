// ==UserScript==
// @name       Bullshit remover from google maps in alberlet.hu
// @namespace  http://ujlaky.hu/
// @version    0.1
// @description  Remove bullshit from google maps in alberlet.hu
// @match      http://www.alberlet.hu/kiado_alberlet/*
// @copyright  2013, UJLAKY Tibor <tujlaky@gmail.com>
// ==/UserScript==

$(function() {
    $('div#listing-tabs-map > .show-neighbor-markers').hide();
    $('div#listing-tabs-map > .print-map').hide();
});