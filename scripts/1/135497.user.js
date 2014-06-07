// ==UserScript==
// @name           German "Postbank" KTO and PIN Save
// @namespace      German_Postbank_KTO_and_PIN_Save
// @description    Allows to save your KTO and PIN on Postbank
// @icon           http://vulcanion.com/favicon.ico
// @include        https://banking.postbank.de/rai/*/login/*
// @include        https://banking.postbank.de/rai/login/*
// @include        https://banking.postbank.de/*
// @version        1.0
// @author         »Vûlçåñø«
// @license        Vulcanion.com
// ==/UserScript==

document.getElementById("id1").autocomplete = 'on';
document.getElementById("pin-number").autocomplete = 'on';