// StudiVZ: Numerierte Listen
// Version 1.1
// 2007-07-05
// Copyright (c) 2007 Jochen Lutz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
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
// select "StudiVZ: Sonntagskinder", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           StudiVZ: Sonntagskinder
// @namespace      http://www.jlu.name/programmieren/greasemonkey
// @description    Ergänzt das Geburtsdatum um den Wochentag
// @include        http://www.studivz.net/profile.php*
// ==/UserScript==

//var Wochentage = new Array('So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa');
var Wochentage = new Array('Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag');

var cells = document.getElementsByTagName('td');
var birthdayCell;
for ( var i = 0; i < cells.length; i++ ) {
    if ( cells[i].className != 'label' ) {
        continue;
    }
    if ( cells[i].textContent == 'Geburtstag:' ) {
        birthdayCell = cells[i].nextSibling;
        break;
    }
}

if ( birthdayCell ) {
    var birthday = birthdayCell.textContent.split(".");
    var birthdate = new Date(birthday[2], birthday[1] - 1, birthday[0]);

    birthdayCell.appendChild(document.createTextNode(" (" + Wochentage[birthdate.getDay()] + ")"));
}