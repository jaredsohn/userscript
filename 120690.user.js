// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "AutoTry", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           AutoTry
// @version        0.1f
// @namespace      i.am.timas-at-gmail.com
// @description    Ads Remover. 15x15 Map. Shortcuts Bar. twstats quick-access. Multi-Language and more!
// @include        http://pl*.plemiona.pl/*
// @include	   http://en*.ds.ignames.net/*
// @copyright      Copyright (c) 2007 - 2008, Gelu Kelu
// @maintainer     Timas
// ==/UserScript==

    var PLEMIONA = document;
        PLEMIONA = PLEMIONA.URL;

    if (PLEMIONA.indexOf('plemiona.pl/game.php') != -1) {

     /* ################### OPCJE SKRYPTU ################## */

        var INPUT_SPEAR  = '';      /* ### Ilość pikinierów; */
        var INPUT_SWORD  = '';      /* ### Ilość mieczników; */
        var INPUT_AXE    = '';      /* ### Ilość toporników; */
        var INPUT_SPY    = '1';     /* ### Ilość zwiadowców; */
        var INPUT_LIGHT  = '15';    /* ### Ilość lekkiej kawalerii; */
        var INPUT_HEAVY  = '';      /* ### Ilość ciężkiej kawalerii; */

        var INPUT_ARCHER  = '';     /* ### Ilość łuczników (jeśli występują na danym świecie); */
        var INPUT_MARCHER = '5';    /* ### Ilość łuczników na koniu (jeśli występują na danym świecie); */

     /* #################################################### */

        if ((PLEMIONA.indexOf('screen=place') != -1) &&
            (document.getElementById('target_attack')) && (!(document.getElementById('error')))) {
        if ((/^\d+$/i.test(document.getElementById('inputx').value)) && (/^\d+$/i.test(document.getElementById('inputy').value))) {

            if (document.getElementById('unit_input_spear'))   { document.getElementById('unit_input_spear').value = INPUT_SPEAR; };
            if (document.getElementById('unit_input_sword'))   { document.getElementById('unit_input_sword').value = INPUT_SWORD; };
            if (document.getElementById('unit_input_axe'))     { document.getElementById('unit_input_axe').value = INPUT_AXE; };
            if (document.getElementById('unit_input_archer'))  { document.getElementById('unit_input_archer').value = INPUT_ARCHER; };
            if (document.getElementById('unit_input_spy'))     { document.getElementById('unit_input_spy').value = INPUT_SPY; };
            if (document.getElementById('unit_input_light'))   { document.getElementById('unit_input_light').value = INPUT_LIGHT; };
            if (document.getElementById('unit_input_marcher')) { document.getElementById('unit_input_marcher').value = INPUT_MARCHER; };
            if (document.getElementById('unit_input_heavy'))   { document.getElementById('unit_input_heavy').value = INPUT_HEAVY; }; }}};

 /* ##################################################################### */
 /* ###                                                               ### */
 /* ###    Skrypt został pobrany ze strony: http://fishbone.cba.pl    ### */
 /* ###                                                               ### */
 /* ##################################################################### */
