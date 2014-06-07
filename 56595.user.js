// Automatikus frissítés
// Verzió 5.1
// 2009-09-11
// Copyright (c) 2009, Kis Tamás
// --------------------------------------------------------------------
//
// Ez egy Greasemonkey felhasználói script.
//
// A telepítéshez szükséged van Greasemonkeyra:
// https://addons.mozilla.org/hu/firefox/addon/748
// Ezután indítsd újra a Firefoxot.
// Az "Eszközök" menüpont alatt, lesz egy új sor: Greasemonkey.
// Itt pipáld ki az "Enable" menüpontot.
// Át kell írnod "Included" és az "Excluded pages" nevü listát a
// Greasemonkeyban, hogy személyre szabhasd a scriptet.
//
// A script törléséhez válaszd ki az Eszközök/Greasemonkey/Manage User Scripts
// menüpontot.
// Ezután jelöld ki az "Automatikus frissítés" sort, és kattints az "Uninstall" gombra.
//
// --------------------------------------------------------------------
//
// Hogy mire képes?
// Frissíti azoknak az oldalakat, melynek a címét megadtad az "Included page"
// nevü listán.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Automatikus frissítés
// @namespace      http://userscript.org
// @description    2 percenként frissíti az "Included pages" címü lista tartalmát.
// @include        http://*.the*west*.*/*.php*
// @include        http://*.travian*.*/*.php*
// @exclude        http://*.the*west.*/index.php?page=logout
// @exclude        http://*.travian*.*/hilfe.php*
// @exclude        http://*.travian*.*/log*.php*
// @exclude        http://*.travian*.*/index.php*
// @exclude        http://*.travian*.*/anleitung.php*
// @exclude        http://*.travian*.*/impressum.php*
// @exclude        http://*.travian*.*/anmelden.php*
// @exclude        http://*.travian*.*/gutscheine.php*
// @exclude        http://*.travian*.*/spielregeln.php*
// @exclude        http://*.travian*.*/links.php*
// @exclude        http://*.travian*.*/geschichte.php*
// @exclude        http://*.travian*.*/tutorial.php*
// @exclude        http://*.travian*.*/manual.php*
// @exclude        http://*.travian*.*/manual.php*
// @exclude        http://*.travian*.*/ajax.php*
// @exclude        http://*.travian*.*/ad/*
// @exclude        http://*.travian*.*/chat/*
// @exclude        http://forum.travian*.*
// @exclude        http://board.travian*.*
// @exclude        http://shop.travian*.*
// @exclude        http://*.travian*.*/activate.php*
// @exclude        http://*.travian*.*/support.php*
// @exclude        http://help.travian*.*

// ==/UserScript==


setTimeout(function() { document.location.reload(); } , 120000);