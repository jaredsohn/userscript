// ==UserScript==
// @name           PopUP-EX | ABO-EX
// @namespace      http://userscripts.org/users/37728
// @description	   Schließt alle Nervenden Werbeseiten, die im Hintergrund bei Downloadportalen, Linkportalen und anderen Bekannten Seiten geöffnet und nicht vom Integrierten PopUP-Blocker erkannt werden sowie Abo- & Abzocke-Seiten
// @source         http://userscripts.org/scripts/show/38065
// @identifier     http://userscripts.org/scripts/source/38065.user.js
// @version        0.9
// @date           2009-01-16
// @creator        CJM
// 
//
// @include        http*://*.firstload.*
// @include        http*://*.gesichtserkennung.*
// @include        http*://*.gesichtsanalyse.*
// @include        http*://*.drevil.*
// @include        http*://*.usenext.*
// @include        http*://*.serienjunkies.org/ads/sponsoren.php?popup
// @include        http*://*.love-sms.tv
// @include        http*://*.code-server.biz
// @include        http*://*.opendownload.de*
// @include        http*://*.los-fahren.com *
// @include        http*://*.nachbarschaftspost.com*
// @include        http*://*.online-girlies.com*
// @include        http*://*.wie-anziehend-bist-du.de*
// @include        http*://*.mega-downloads.net*
// @include        http*://*.ihre-Rezepte.de*
// @include        http*://*.smsfree100.de*
// @include        http*://*.vorlagen-land.de*
// @include        http*://*.sudoku.de*
// @include        http*://*.sudoku-welt.*
// @include        http*://*.grafik-archiv.com*
// @include        http*://*.kochrezepte-donwload.de*
// @include        http*://*.every-game.com*
// @include        http*://*.www.routenplaner-server.com*
// @include        http*://*.astrologie-server.com*
// @include        http*://*.gehalts-rechner.de*
// @include        http*://*.hausaufgaben-server.com*
// @include        http*://*.online-flirten.de*
// @include        http*://*.condome.tv*
// @include        http*://*.genealogie.de*
// @include        http*://*.meine-wunderbare-katze.com*
// @include        http*://*.routenplan.de*
// @include        http*://*.haushaufgabenhilfe.de*
// @include        http*://*.berufs-verbraucherinformation*
// @include        http*://*.wahl.de*
// @include        http*://*.lebenserwartung.de*
// @include        http*://*.winmytv.de*
// ==/UserScript==




window.top.close();
window.close();
self.close();
parent.close();
top.close();
close();




document.write ("<div style=\"border:10pt solid #000000; background-color:#ff0000; color:#ffffff; padding:35px; text-align: center;\">");
document.write ("SIE BEFINDEN SICH AUF EINER SEITE, DIE VON PopUP-EX ALS POPUP ODER ALS ABO- & ABZOCKE-SEITE ERKANNT WURDE!");
document.write ("</div>");