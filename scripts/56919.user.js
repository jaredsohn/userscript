// ==UserScript==
// @name           chessmail skipscreen
// @namespace      http://userscripts.org/users/66259/scripts
// @description    Schließt den Screen nach dem Zug und springt wieder in die Auswahlliste oder das Forum.
// @include        http://www.chessmail.de/game_details_next.do
// ==/UserScript==
//
// Verweildauer 1000 = 1 Sekunde
// ==========================================================================
var interval = 2500;
//
// Gibt es weitere offene Spiele ?
// ==========================================================================
var allDivs = document.evaluate("//div[@class='menuarea']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var thisDiv = allDivs.snapshotItem(1).innerHTML;
// var tueck = allDivs.snapshotItem(1).innerHTML.split("<br>");
// var tueck=thisDiv.split("<br>")[0].split("</a>");
// alert(thisDiv.split("<br>")[0].split("</a>")[1]);
if (thisDiv.split("<br>")[0].split("</a>")[1]){
//
// Es gibt offene Spiele - URL für Auswahlseite zusammenstellen
// ==========================================================================
	thisDiv="location.href='http://www.chessmail.de" + thisDiv.split('"')[1] + "';";
} else {
//
// Es gibt kein offenen Spiele - URL "Forum" verwenden
// ==========================================================================
	thisDiv="location.href='http://www.chessmail.de/forumboards.do';";
}
//
// Neue Seite nach Wartezeit laden
// ==========================================================================
window.gm_auto_reload = window.setTimeout(thisDiv, interval);
//
// Fußnote an die HTML Seite anhängen
// ==========================================================================
document.body.innerHTML = document.body.innerHTML.replace( 
'Nutzungsbedingungen</a>',
'Nutzungsbedingungen</a></td></tr><tr><td id="footer" colspan="2" style="color: #0033FF; font-size: 11px; font-weight: normal;">Greasemonkey script <a style="text-decoration: underline;color: #0033FF; font-size: 11px; font-weight: normal;" href="http://userscripts.org/scripts/show/56919" target="_blank">chessmail skipscreen</a> Version 1.02');