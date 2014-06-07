// ==UserScript==
// @name           TC-Uhr
// author:         umbrella
// @description	   Ersetzt das WIKI-Bild durch eine Uhr, den Politik-Button durch einen Forums-Button und fuegt Logout-Button hinzu
// @include        *.garathor.com/*
// @exclude        http://www.garathor.com/forum/*
// ==/UserScript==


// WIKI-Bild ausblenden
var wiki_png = document.getElementById('wiki_box').getElementsByTagName('img');
wiki_png[0].style.visibility = 'hidden';

// Aktuelle Zeit auslesen
var akt_time = document.getElementById('header_clock_time').innerHTML;
var clock_text = "<div id=\"header_clock_time\" style=\"font-size:17px;position:relative;top:12px;\">" + akt_time + "</div>";

// Untere Uhr + Datum loeschen
document.getElementById('header_clock_date').innerHTML="";
document.getElementById('header_clock_time').innerHTML="edited by umbrella";

// Obere Uhr erstellen
document.getElementById('wiki_box').innerHTML= clock_text;

// Ersetze Politik-Button durch Forumslink
document.getElementById('nav3').innerHTML = "<a href=\"http://www.garathor.com/forum/\"><img src=\"http://images.testrunde.garathor.com/img_game/nav_forum.gif\"></a>";

// Logout-Button machen
document.getElementById('meldung').innerHTML = "<a href=\"/logout.php\"><img src=\"http://images.testrunde.garathor.com/img_game/logout.png\" style=\"position:absolute;right:34px;top:-225px\"/></a>";





