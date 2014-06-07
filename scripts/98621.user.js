// ==UserScript==
// @name        Fotocommunity Design Enhancer
// @namespace   http://www.sammyshp.de/
// @description Viele Elemente auf den Foto-Seiten separat ein- und ausblenden
// @author      SammysHP
// @version     0.4
// @license     (CC) by-nc-nd
// @include     http://www.fotocommunity.de/pc/pc/*/display/*
// @include     http://www.fotocommunity.de/pc/pc/display/*
// ==/UserScript==

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff) {
    window[key] = GM_getValue(key, defaultValue);
    GM_registerMenuCommand((window[key] ? toggleOff : toggleOn), 
        function() {
            GM_setValue(key, !window[key]);
            location.reload();
    });
}



function hideMenu() {
    GM_addStyle('#upper_menu_layer, #container_menu, #fc_footer, #breadcrumb_10px, .alignc {display: none !important;}');
}

function hideNavigation() {
    GM_addStyle('#navigation {visibility: hidden !important;}');
}

function hideTitle() {
    GM_addStyle('#display_foto h2 {visibility: hidden !important;}');
}

function hideAuthor() {
    GM_addStyle('#infobox > center {display: none !important;}');
}

function hideDescription() {
    GM_addStyle('#image-description {display: none !important;}');
}

function hideInfo() {
    GM_addStyle('#panelContainer {display: none !important;}');
}

function hideComments() {
    GM_addStyle('#foto_description {display: none !important;}');
}

function hideAll() {
    GM_setValue('hideMenu', true);
    GM_setValue('hideNavigation', true);
    GM_setValue('hideTitle', true);
    GM_setValue('hideAuthor', true);
    GM_setValue('hideDescription', true);
    GM_setValue('hideInfo', true);
    GM_setValue('hideComments', true);
}

function showAll() {
    GM_setValue('hideMenu', false);
    GM_setValue('hideNavigation', false);
    GM_setValue('hideTitle', false);
    GM_setValue('hideAuthor', false);
    GM_setValue('hideDescription', false);
    GM_setValue('hideInfo', false);
    GM_setValue('hideComments', false);
}



makeMenuToggle('hideMenu', false, "[x] Menü und Footer", "[ ] Menü und Footer");
makeMenuToggle('hideNavigation', false, "[x] Navigation", "[ ] Navigation");
makeMenuToggle('hideTitle', false, "[x] Titel", "[ ] Titel");
makeMenuToggle('hideAuthor', false, "[x] Fotograf", "[ ] Fotograf");
makeMenuToggle('hideDescription', false, "[x] Beschreibung", "[ ] Beschreibung");
makeMenuToggle('hideInfo', false, "[x] Information", "[ ] Information");
makeMenuToggle('hideComments', false, "[x] Kommentare", "[ ] Kommentare");

GM_registerMenuCommand("---------------------------", function() {});

GM_registerMenuCommand("Alles anzeigen", 
    function() {
        showAll();
        location.reload();
    });

GM_registerMenuCommand("Alles ausblenden", 
    function() {
        hideAll();
        location.reload();
    });



if (GM_getValue('hideMenu')) {
    hideMenu();
}
if (GM_getValue('hideNavigation')) {
    hideNavigation();
}
if (GM_getValue('hideTitle')) {
    hideTitle();
}
if (GM_getValue('hideAuthor')) {
    hideAuthor();
}
if (GM_getValue('hideDescription')) {
    hideDescription();
}
if (GM_getValue('hideInfo')) {
    hideInfo();
}
if (GM_getValue('hideComments')) {
    hideComments();
}
